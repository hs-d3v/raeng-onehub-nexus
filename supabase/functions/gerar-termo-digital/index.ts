
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TermoRequest {
  colaboradorId: string;
  termoId: string;
  empresaId: string;
  tipoReferencia: string;
  referenciaId?: string;
  dadosExtras?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { colaboradorId, termoId, empresaId, tipoReferencia, referenciaId, dadosExtras } = await req.json() as TermoRequest;
    
    // Criar cliente Supabase com a key do serviço para ter acesso completo
    const supabaseUrl = "https://yoezezhdzubxlzgrqkuz.supabase.co";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseServiceKey) {
      throw new Error("Chave de serviço do Supabase não encontrada");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Buscar informações do colaborador
    const { data: colaborador, error: colaboradorError } = await supabase
      .from("colaboradores")
      .select("*, usuarios(nome, email)")
      .eq("id", colaboradorId)
      .single();
      
    if (colaboradorError || !colaborador) {
      throw new Error(`Colaborador não encontrado: ${colaboradorError?.message}`);
    }
    
    // Buscar o termo digital
    const { data: termo, error: termoError } = await supabase
      .from("termos_digitais")
      .select("*")
      .eq("id", termoId)
      .single();
      
    if (termoError || !termo) {
      throw new Error(`Termo não encontrado: ${termoError?.message}`);
    }
    
    // Gerar conteúdo do PDF substituindo marcadores por valores
    const conteudo = termo.conteudo
      .replace("{{NOME_COLABORADOR}}", colaborador.nome)
      .replace("{{CPF_COLABORADOR}}", colaborador.cpf || "N/A")
      .replace("{{MATRICULA}}", colaborador.matricula || "N/A")
      .replace("{{DATA_ATUAL}}", new Date().toLocaleDateString("pt-BR"))
      .replace("{{CARGO}}", colaborador.cargo || "N/A");

    // Gerar hash para validação (poderia integrar com um serviço de assinatura digital real)
    const hashValidacao = crypto.randomUUID();
    
    // Registrar a assinatura na base de dados
    const { data: assinatura, error: assinaturaError } = await supabase
      .from("assinaturas")
      .insert({
        empresa_id: empresaId,
        colaborador_id: colaboradorId,
        termo_id: termoId,
        referencia_id: referenciaId || null,
        referencia_tipo: tipoReferencia,
        hash_validacao: hashValidacao,
        dispositivo: req.headers.get("user-agent") || "Desconhecido",
        ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "0.0.0.0"
      })
      .select()
      .single();
    
    if (assinaturaError) {
      throw new Error(`Erro ao registrar assinatura: ${assinaturaError.message}`);
    }

    // Adicionar logs de sistema
    await supabase.from("logs_sistema").insert({
      empresa_id: empresaId,
      usuario_id: colaborador.usuario_id, 
      acao: "TERMO_DIGITAL_GERADO",
      entidade: "termos_digitais",
      entidade_id: termoId,
      dados_novos: { assinatura_id: assinatura.id, hash: hashValidacao },
      ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "0.0.0.0"
    });

    // Retornar dados para processamento no frontend
    return new Response(
      JSON.stringify({
        success: true,
        assinaturaId: assinatura.id,
        termo: {
          titulo: termo.titulo,
          conteudo: conteudo,
          tipo: termo.tipo,
          versao: termo.versao
        },
        hashValidacao,
        dataAssinatura: assinatura.data_assinatura
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Erro na geração de termo digital:", error);
    
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
