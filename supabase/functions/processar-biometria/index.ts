
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
    
    const { 
      tipoBiometria,  // 'facial' ou 'digital'
      dadosBiometricos,  // Base64 dos dados biométricos
      empresaId,
      dispositivo = "Desconhecido"
    } = await req.json();
    
    if (!tipoBiometria || !dadosBiometricos || !empresaId) {
      throw new Error("Tipo de biometria, dados biométricos e ID da empresa são obrigatórios");
    }
    
    // Em uma implementação real, aqui seria feita uma chamada a um serviço de biometria
    // Por exemplo, Azure Face API, AWS Rekognition ou serviço proprietário
    
    // Simulação de processamento biométrico
    console.log(`Simulando processamento de biometria ${tipoBiometria}`);
    
    // Gerar ID de simulação
    const biometriaId = crypto.randomUUID().substring(0, 8);
    
    // Buscar um colaborador para simulação (em uma implementação real, seria o resultado da pesquisa biométrica)
    const { data: colaborador, error: colaboradorError } = await supabase
      .from("colaboradores")
      .select("*, usuarios(id, nome, email)")
      .eq("empresa_id", empresaId)
      .limit(1)
      .single();
    
    if (colaboradorError) {
      throw new Error(`Erro ao buscar colaborador para simulação: ${colaboradorError.message}`);
    }
    
    // Em um cenário real, atualizaríamos o ID biométrico do colaborador
    let atualizado = {};
    
    if (tipoBiometria === 'facial') {
      await supabase
        .from("colaboradores")
        .update({ face_id: biometriaId })
        .eq("id", colaborador.id);
      
      atualizado = { face_id: biometriaId };
    } else if (tipoBiometria === 'digital') {
      await supabase
        .from("colaboradores")
        .update({ digital_id: biometriaId })
        .eq("id", colaborador.id);
      
      atualizado = { digital_id: biometriaId };
    }
    
    // Registrar log
    await supabase.from("logs_sistema").insert({
      empresa_id: empresaId,
      usuario_id: colaborador.usuarios?.id,
      acao: `BIOMETRIA_${tipoBiometria.toUpperCase()}_PROCESSADA`,
      entidade: "colaboradores",
      entidade_id: colaborador.id,
      dados_novos: atualizado
    });
    
    return new Response(
      JSON.stringify({
        success: true,
        colaboradorId: colaborador.id,
        colaboradorNome: colaborador.nome,
        usuarioId: colaborador.usuarios?.id,
        biometriaId: tipoBiometria === 'facial' ? biometriaId : (tipoBiometria === 'digital' ? biometriaId : null),
        message: `Biometria ${tipoBiometria} processada com sucesso (simulação)`
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
    
  } catch (error) {
    console.error(`Erro ao processar biometria:`, error);
    
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
