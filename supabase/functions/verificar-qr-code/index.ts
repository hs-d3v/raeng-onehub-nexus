
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
    
    const { qrHash, empresaId } = await req.json();
    
    if (!qrHash) {
      throw new Error("Hash do QR Code é obrigatório");
    }
    
    // Buscar colaborador pelo hash do crachá
    const { data: colaborador, error: colaboradorError } = await supabase
      .from("colaboradores")
      .select("*, usuarios(id, nome, email, meta_data)")
      .eq("cracha_hash", qrHash)
      .single();
    
    if (colaboradorError || !colaborador) {
      throw new Error("Crachá não reconhecido ou inválido");
    }
    
    // Verificar se o colaborador está ativo
    if (!colaborador.ativo) {
      throw new Error("Este colaborador está inativo no sistema");
    }
    
    // Verificar se pertence à empresa informada (se fornecida)
    if (empresaId && colaborador.empresa_id !== empresaId) {
      throw new Error("Colaborador não pertence à empresa informada");
    }
    
    // Registrar log de autenticação
    await supabase.from("logs_sistema").insert({
      empresa_id: colaborador.empresa_id,
      usuario_id: colaborador.usuarios?.id,
      acao: "AUTENTICACAO_QR_CODE",
      entidade: "colaboradores",
      entidade_id: colaborador.id,
      dados_novos: { 
        dataHora: new Date().toISOString(),
        dispositivo: req.headers.get("user-agent") || "Desconhecido",
        ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "0.0.0.0"
      }
    });

    // Em um cenário real, aqui você geraria/atualizaria o JWT do usuário
    // Para a simulação, apenas retornamos os dados do colaborador e usuário
    
    return new Response(
      JSON.stringify({
        success: true,
        colaborador: {
          id: colaborador.id,
          nome: colaborador.nome,
          matricula: colaborador.matricula,
          cargo: colaborador.cargo,
          departamento: colaborador.departamento,
          foto_url: colaborador.foto_url,
          empresa_id: colaborador.empresa_id
        },
        usuario: colaborador.usuarios ? {
          id: colaborador.usuarios.id,
          nome: colaborador.usuarios.nome,
          email: colaborador.usuarios.email,
          meta_data: colaborador.usuarios.meta_data
        } : null,
        message: "Autenticação por QR Code realizada com sucesso"
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
    
  } catch (error) {
    console.error("Erro na autenticação por QR Code:", error);
    
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
