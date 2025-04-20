
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { encode as base64Encode } from "https://deno.land/std@0.177.0/encoding/base64.ts";

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
    
    const { tipoRelatorio, empresaId, filtros = {}, formato = "csv", usuarioId } = await req.json();
    
    if (!tipoRelatorio || !empresaId || !usuarioId) {
      throw new Error("Tipo de relatório, ID da empresa e ID do usuário são obrigatórios");
    }
    
    // Verificar permissões do usuário
    const { data: userRole } = await supabase
      .rpc('has_role', { _user_id: usuarioId, _role: 'admin' });
      
    const isAdmin = userRole;
    
    const { data: isGestor } = await supabase
      .rpc('has_role', { _user_id: usuarioId, _role: 'gestor' });
      
    if (!isAdmin && !isGestor) {
      throw new Error("Usuário sem permissão para exportar relatórios");
    }
    
    // Registrar a solicitação de exportação
    await supabase.from("logs_sistema").insert({
      empresa_id: empresaId,
      usuario_id: usuarioId,
      acao: "EXPORTACAO_RELATORIO",
      entidade: tipoRelatorio,
      dados_novos: { filtros, formato },
    });

    // Definir a consulta com base no tipo de relatório
    let dados;
    let error;
    let colunas;

    switch (tipoRelatorio) {
      case "colaboradores":
        ({ data: dados, error } = await supabase
          .from("colaboradores")
          .select("id, nome, cpf, matricula, cargo, departamento, data_admissao, ativo")
          .eq("empresa_id", empresaId)
          .order("nome"));
          
        colunas = ["ID", "Nome", "CPF", "Matrícula", "Cargo", "Departamento", "Data Admissão", "Ativo"];
        break;
        
      case "epis":
        ({ data: dados, error } = await supabase
          .from("epis")
          .select("id, nome, codigo, categoria, ca, validade_dias, qtd_estoque, estoque_minimo, ativo")
          .eq("empresa_id", empresaId)
          .order("nome"));
          
        colunas = ["ID", "Nome", "Código", "Categoria", "CA", "Dias Validade", "Estoque", "Estoque Mínimo", "Ativo"];
        break;
        
      case "entregas_epi":
        ({ data: dados, error } = await supabase
          .from("entregas_epi")
          .select(`
            id, 
            colaboradores(nome),
            epis(nome, codigo),
            quantidade, 
            motivo,
            data_entrega, 
            data_vencimento,
            status
          `)
          .eq("empresa_id", empresaId)
          .order("data_entrega", { ascending: false }));
          
        // Transformar os dados para formato plano
        if (dados) {
          dados = dados.map(e => ({
            id: e.id,
            colaborador: e.colaboradores?.nome,
            epi: e.epis?.nome,
            codigo: e.epis?.codigo,
            quantidade: e.quantidade,
            motivo: e.motivo,
            data_entrega: e.data_entrega,
            data_vencimento: e.data_vencimento,
            status: e.status
          }));
        }
        
        colunas = ["ID", "Colaborador", "EPI", "Código", "Quantidade", "Motivo", "Data Entrega", "Data Vencimento", "Status"];
        break;
        
      case "treinamentos_colaborador":
        ({ data: dados, error } = await supabase
          .from("colaborador_treinamento")
          .select(`
            id,
            colaboradores(nome),
            treinamentos(nome, tipo, carga_horaria),
            data_inicio,
            data_conclusao,
            data_vencimento,
            status,
            nota
          `)
          .eq("empresa_id", empresaId)
          .order("data_inicio", { ascending: false }));
          
        // Transformar os dados para formato plano
        if (dados) {
          dados = dados.map(t => ({
            id: t.id,
            colaborador: t.colaboradores?.nome,
            treinamento: t.treinamentos?.nome,
            tipo: t.treinamentos?.tipo,
            carga_horaria: t.treinamentos?.carga_horaria,
            data_inicio: t.data_inicio,
            data_conclusao: t.data_conclusao,
            data_vencimento: t.data_vencimento,
            status: t.status,
            nota: t.nota
          }));
        }
        
        colunas = ["ID", "Colaborador", "Treinamento", "Tipo", "Carga Horária", "Data Início", "Data Conclusão", "Data Vencimento", "Status", "Nota"];
        break;
        
      default:
        throw new Error(`Tipo de relatório não suportado: ${tipoRelatorio}`);
    }
    
    if (error) {
      throw new Error(`Erro ao buscar dados para o relatório: ${error.message}`);
    }
    
    if (!dados || dados.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Nenhum dado encontrado para os critérios especificados."
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    
    // Gerar relatório em formato CSV
    let conteudo = "";
    
    if (formato === "csv") {
      // Cabeçalho
      conteudo = colunas.join(';') + '\n';
      
      // Dados
      dados.forEach(item => {
        const linha = Object.values(item)
          .map(valor => {
            if (valor === null || valor === undefined) return '';
            if (typeof valor === 'string' && valor.includes(';')) return `"${valor}"`;
            if (valor instanceof Date) return valor.toLocaleDateString('pt-BR');
            return String(valor);
          })
          .join(';');
          
        conteudo += linha + '\n';
      });
    }
    
    // Codificar em base64 para download
    const contentBase64 = base64Encode(new TextEncoder().encode(conteudo));
    
    return new Response(
      JSON.stringify({
        success: true,
        dados: {
          filename: `relatorio-${tipoRelatorio}-${new Date().toISOString().split('T')[0]}.${formato}`,
          contentType: formato === 'csv' ? 'text/csv' : 'application/json',
          content: contentBase64,
          recordCount: dados.length
        }
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
    
  } catch (error) {
    console.error("Erro ao exportar relatório:", error);
    
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
