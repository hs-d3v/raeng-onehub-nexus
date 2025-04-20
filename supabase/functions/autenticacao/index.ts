
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
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
    
    const { action, email, password, userData } = await req.json();
    
    switch (action) {
      case "create_user":
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: userData
        });
        
        if (createError) throw createError;
        
        return new Response(JSON.stringify({
          success: true,
          user: newUser
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
        
      default:
        throw new Error("Ação não suportada");
    }
    
  } catch (error) {
    console.error("Erro na autenticação:", error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
