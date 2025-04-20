
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
      canal = "email", // email, whatsapp, telegram
      destinatario, 
      titulo, 
      mensagem, 
      empresaId, 
      usuarioId, 
      dadosAdicionais = {} 
    } = await req.json();
    
    if (!destinatario || !mensagem || !empresaId) {
      throw new Error("Destinatário, mensagem e ID da empresa são obrigatórios");
    }
    
    // Verificar o tipo de canal e enviar a notificação
    let resultado = { success: false, message: "Canal não implementado" };
    
    switch (canal.toLowerCase()) {
      case "email":
        // Exemplo utilizando um serviço de e-mail (necessitaria de API keys configuradas)
        if (Deno.env.get("EMAIL_API_KEY")) {
          // Aqui você implementaria a integração com serviço de e-mail como Resend, SendGrid, etc.
          resultado = {
            success: true,
            message: "E-mail enviado com sucesso (simulado)",
            details: {
              to: destinatario,
              subject: titulo,
              sentAt: new Date()
            }
          };
        } else {
          resultado = { 
            success: false, 
            message: "API key de e-mail não configurada" 
          };
        }
        break;
        
      case "whatsapp":
        // Exemplo utilizando API do WhatsApp Business
        if (Deno.env.get("WHATSAPP_API_KEY")) {
          // Implementação da integração com WhatsApp Business API
          resultado = {
            success: true,
            message: "Mensagem de WhatsApp enviada com sucesso (simulada)",
            details: {
              to: destinatario,
              sentAt: new Date()
            }
          };
        } else {
          resultado = { 
            success: false, 
            message: "API key de WhatsApp não configurada" 
          };
        }
        break;
        
      case "telegram":
        // Exemplo utilizando Telegram Bot API
        if (Deno.env.get("TELEGRAM_BOT_TOKEN")) {
          // Implementação da integração com API de bots do Telegram
          resultado = {
            success: true,
            message: "Mensagem de Telegram enviada com sucesso (simulada)",
            details: {
              to: destinatario,
              sentAt: new Date()
            }
          };
        } else {
          resultado = { 
            success: false, 
            message: "Token do bot de Telegram não configurado" 
          };
        }
        break;
        
      default:
        resultado = { 
          success: false, 
          message: `Canal de notificação não suportado: ${canal}` 
        };
    }
    
    // Registrar o log da tentativa de notificação
    await supabase.from("logs_sistema").insert({
      empresa_id: empresaId,
      usuario_id: usuarioId || null,
      acao: `NOTIFICACAO_${canal.toUpperCase()}`,
      dados_anteriores: {
        destinatario,
        titulo,
        mensagem: mensagem.substring(0, 100) + (mensagem.length > 100 ? "..." : "")
      },
      dados_novos: resultado
    });
    
    // Se a notificação foi bem-sucedida e temos um usuário associado, registrar também na tabela de notificações
    if (resultado.success && usuarioId) {
      await supabase.from("notificacoes").insert({
        empresa_id: empresaId,
        usuario_id: usuarioId,
        titulo: `Notificação enviada via ${canal}`,
        mensagem: `${titulo}: ${mensagem.substring(0, 100)}${mensagem.length > 100 ? "..." : ""}`,
        tipo: `envio_${canal}`,
      });
    }
    
    return new Response(
      JSON.stringify({
        ...resultado,
        canal,
        timestamp: new Date().toISOString()
      }),
      {
        status: resultado.success ? 200 : 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
    
  } catch (error) {
    console.error("Erro ao enviar notificação externa:", error);
    
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
