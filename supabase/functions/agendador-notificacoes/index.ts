
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Esta função é projetada para ser executada pelo agendador cron
// Ela verificará todos os vencimentos para todas as empresas
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
    
    // Buscar todas as empresas ativas
    const { data: empresas, error: empresasError } = await supabase
      .from("empresas")
      .select("id")
      .eq("ativo", true);
      
    if (empresasError) {
      throw new Error(`Erro ao buscar empresas: ${empresasError.message}`);
    }
    
    const resultados = [];
    
    // Para cada empresa, chamar a função de verificação de vencimentos
    for (const empresa of empresas) {
      try {
        // Chamar a função de notificar vencimentos para cada empresa
        const respNotificacao = await fetch(
          `${supabaseUrl}/functions/v1/notificar-vencimentos`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseServiceKey}`
            },
            body: JSON.stringify({
              empresaId: empresa.id,
              diasAlerta: 7,  // Padrão: alertar com 7 dias de antecedência
              tiposAlerta: ["epis", "treinamentos", "contratos"]
            })
          }
        );
        
        const resultado = await respNotificacao.json();
        
        resultados.push({
          empresaId: empresa.id,
          sucesso: resultado.success,
          notificacoes: resultado.notificacoesGeradas || 0,
          erro: resultado.error || null
        });
        
      } catch (empresaError) {
        console.error(`Erro ao processar empresa ${empresa.id}:`, empresaError);
        resultados.push({
          empresaId: empresa.id,
          sucesso: false,
          notificacoes: 0,
          erro: empresaError.message
        });
      }
    }
    
    // Verificar e excluir arquivos temporários mais antigos que 7 dias
    const { data: arquivosAntigos, error: arquivosError } = await supabase
      .storage
      .from('temp')
      .list();
      
    if (!arquivosError && arquivosAntigos) {
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
      
      const arquivosParaExcluir = arquivosAntigos
        .filter(arquivo => new Date(arquivo.created_at) < seteDiasAtras)
        .map(arquivo => arquivo.name);
        
      if (arquivosParaExcluir.length > 0) {
        await supabase.storage.from('temp').remove(arquivosParaExcluir);
        
        console.log(`Limpeza: ${arquivosParaExcluir.length} arquivos temporários excluídos`);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        empresasProcessadas: empresas.length,
        resultados,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
    
  } catch (error) {
    console.error("Erro no agendador de notificações:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
