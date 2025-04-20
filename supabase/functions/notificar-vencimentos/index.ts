
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabaseUrl = "https://yoezezhdzubxlzgrqkuz.supabase.co";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseServiceKey) {
      throw new Error("Chave de serviço do Supabase não encontrada");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verificar parâmetros da solicitação
    const { empresaId, diasAlerta = 7, tiposAlerta = ["epis", "treinamentos", "contratos"] } = await req.json();
    
    if (!empresaId) {
      throw new Error("ID da empresa é obrigatório");
    }
    
    const notificacoes = [];
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setDate(hoje.getDate() + diasAlerta);
    
    // Verificar EPIs com vencimento próximo
    if (tiposAlerta.includes("epis")) {
      const { data: epiVencendo, error: epiError } = await supabase
        .from("entregas_epi")
        .select(`
          id, 
          colaborador_id,
          colaboradores(nome, usuario_id),
          epis(nome, codigo)
        `)
        .eq("empresa_id", empresaId)
        .eq("status", "entregue")
        .lt("data_vencimento", dataLimite.toISOString())
        .gt("data_vencimento", hoje.toISOString());
      
      if (epiError) {
        console.error("Erro ao buscar EPIs com vencimento próximo:", epiError);
      } else if (epiVencendo) {
        for (const epi of epiVencendo) {
          notificacoes.push({
            empresa_id: empresaId,
            usuario_id: epi.colaboradores?.usuario_id,
            titulo: "EPI com vencimento próximo",
            mensagem: `O EPI ${epi.epis?.nome} (${epi.epis?.codigo}) está prestes a vencer. Por favor, providencie a substituição.`,
            tipo: "epi_vencimento",
            link: `/epis/entrega/${epi.id}`
          });
        }
      }
    }
    
    // Verificar Treinamentos com vencimento próximo
    if (tiposAlerta.includes("treinamentos")) {
      const { data: treinamentosVencendo, error: treinamentoError } = await supabase
        .from("colaborador_treinamento")
        .select(`
          id,
          colaborador_id,
          colaboradores(nome, usuario_id),
          treinamentos(nome)
        `)
        .eq("empresa_id", empresaId)
        .eq("status", "concluido")
        .lt("data_vencimento", dataLimite.toISOString())
        .gt("data_vencimento", hoje.toISOString());
      
      if (treinamentoError) {
        console.error("Erro ao buscar treinamentos com vencimento próximo:", treinamentoError);
      } else if (treinamentosVencendo) {
        for (const treinamento of treinamentosVencendo) {
          notificacoes.push({
            empresa_id: empresaId,
            usuario_id: treinamento.colaboradores?.usuario_id,
            titulo: "Treinamento precisa ser renovado",
            mensagem: `Seu treinamento de ${treinamento.treinamentos?.nome} está prestes a vencer. Agende a renovação.`,
            tipo: "treinamento_vencimento",
            link: `/treinamentos/colaborador/${treinamento.id}`
          });
        }
      }
    }
    
    // Verificar Contratos próximos do fim
    if (tiposAlerta.includes("contratos")) {
      const { data: contratosVencendo, error: contratoError } = await supabase
        .from("contratos")
        .select("id, nome, cliente")
        .eq("empresa_id", empresaId)
        .lt("data_fim", dataLimite.toISOString())
        .gt("data_fim", hoje.toISOString());
      
      if (contratoError) {
        console.error("Erro ao buscar contratos com vencimento próximo:", contratoError);
      } else if (contratosVencendo) {
        // Buscar gestores para notificar
        const { data: gestores } = await supabase
          .from("user_roles")
          .select("user_id")
          .eq("role", "gestor")
          .then(({ data }) => {
            return supabase
              .from("usuarios")
              .select("id")
              .eq("empresa_id", empresaId)
              .in("id", data?.map(g => g.user_id) || []);
          });
          
        if (gestores) {
          for (const contrato of contratosVencendo) {
            for (const gestor of gestores) {
              notificacoes.push({
                empresa_id: empresaId,
                usuario_id: gestor.id,
                titulo: "Contrato próximo do vencimento",
                mensagem: `O contrato ${contrato.nome} com ${contrato.cliente} está próximo do fim. Avalie a renovação.`,
                tipo: "contrato_vencimento",
                link: `/contratos/${contrato.id}`
              });
            }
          }
        }
      }
    }
    
    // Registrar notificações no banco
    if (notificacoes.length > 0) {
      const { error: notifError } = await supabase
        .from("notificacoes")
        .insert(notificacoes);
      
      if (notifError) {
        throw new Error(`Erro ao inserir notificações: ${notifError.message}`);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        notificacoesGeradas: notificacoes.length,
        tipos: tiposAlerta
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
    
  } catch (error) {
    console.error("Erro ao processar vencimentos:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
