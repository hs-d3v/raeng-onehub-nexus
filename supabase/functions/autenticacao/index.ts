
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
    
    const { email, password, nome, tipo = 'usuario', metadata = {} } = await req.json();
    
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    // Verificar se é um login ou um cadastro
    const isSignUp = Boolean(nome);
    
    if (isSignUp) {
      // Fluxo de cadastro de novo usuário
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
            tipo,
            ...metadata
          }
        }
      });
      
      if (authError) {
        throw new Error(`Erro no cadastro: ${authError.message}`);
      }
      
      // Inserir também na tabela de usuários para facilitar consultas
      if (authData.user) {
        const { error: insertError } = await supabase
          .from('usuarios')
          .insert({
            id: authData.user.id,
            email,
            nome,
            tipo,
            meta_data: metadata
          });
        
        if (insertError) {
          console.error("Erro ao inserir na tabela de usuários:", insertError);
        }
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          user: authData.user,
          session: authData.session,
          message: "Cadastro realizado com sucesso"
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    } else {
      // Fluxo de login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) {
        throw new Error(`Erro no login: ${authError.message}`);
      }
      
      // Buscar dados adicionais do usuário
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authData.user.id)
        .single();
      
      if (userError) {
        console.error("Erro ao buscar dados do usuário:", userError);
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          user: authData.user,
          userData: userData || null,
          session: authData.session,
          message: "Login realizado com sucesso"
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  } catch (error) {
    console.error("Erro na autenticação:", error);
    
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
