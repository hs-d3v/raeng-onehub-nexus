export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      colaboradores: {
        Row: {
          ativo: boolean | null
          cargo: string | null
          cracha_hash: string | null
          created_at: string | null
          data_admissao: string | null
          data_demissao: string | null
          departamento: string | null
          email: string | null
          empresa_id: string | null
          foto_url: string | null
          id: string
          matricula: string
          nome: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cargo?: string | null
          cracha_hash?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          departamento?: string | null
          email?: string | null
          empresa_id?: string | null
          foto_url?: string | null
          id?: string
          matricula: string
          nome: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cargo?: string | null
          cracha_hash?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          departamento?: string | null
          email?: string | null
          empresa_id?: string | null
          foto_url?: string | null
          id?: string
          matricula?: string
          nome?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contratos: {
        Row: {
          created_at: string | null
          data_fim: string | null
          data_inicio: string
          descricao: string | null
          empresa_id: string | null
          id: string
          numero: string
          responsavel_id: string | null
          status: string | null
          titulo: string
          updated_at: string | null
          valor: number | null
        }
        Insert: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio: string
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          numero: string
          responsavel_id?: string | null
          status?: string | null
          titulo: string
          updated_at?: string | null
          valor?: number | null
        }
        Update: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          numero?: string
          responsavel_id?: string | null
          status?: string | null
          titulo?: string
          updated_at?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          ativa: boolean | null
          cnpj: string | null
          created_at: string | null
          email: string | null
          endereco: string | null
          id: string
          logo_url: string | null
          nome: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          logo_url?: string | null
          nome: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          logo_url?: string | null
          nome?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      epi_entregas: {
        Row: {
          colaborador_id: string
          created_at: string | null
          data_entrega: string
          data_vencimento: string | null
          empresa_id: string | null
          epi_id: string
          id: string
          observacao: string | null
          quantidade: number
          status: string | null
          termo_url: string | null
          updated_at: string | null
          usuario_id: string | null
        }
        Insert: {
          colaborador_id: string
          created_at?: string | null
          data_entrega?: string
          data_vencimento?: string | null
          empresa_id?: string | null
          epi_id: string
          id?: string
          observacao?: string | null
          quantidade: number
          status?: string | null
          termo_url?: string | null
          updated_at?: string | null
          usuario_id?: string | null
        }
        Update: {
          colaborador_id?: string
          created_at?: string | null
          data_entrega?: string
          data_vencimento?: string | null
          empresa_id?: string | null
          epi_id?: string
          id?: string
          observacao?: string | null
          quantidade?: number
          status?: string | null
          termo_url?: string | null
          updated_at?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "epi_entregas_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epi_entregas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epi_entregas_epi_id_fkey"
            columns: ["epi_id"]
            isOneToOne: false
            referencedRelation: "epis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epi_entregas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      epis: {
        Row: {
          ca_numero: string | null
          categoria: string | null
          codigo: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: string | null
          estoque_atual: number | null
          estoque_minimo: number | null
          foto_url: string | null
          id: string
          nome: string
          updated_at: string | null
          validade_dias: number | null
        }
        Insert: {
          ca_numero?: string | null
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          foto_url?: string | null
          id?: string
          nome: string
          updated_at?: string | null
          validade_dias?: number | null
        }
        Update: {
          ca_numero?: string | null
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          foto_url?: string | null
          id?: string
          nome?: string
          updated_at?: string | null
          validade_dias?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "epis_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ferramenta_movimentacoes: {
        Row: {
          colaborador_id: string
          created_at: string | null
          data_devolucao: string | null
          data_movimentacao: string
          data_prevista_devolucao: string | null
          empresa_id: string | null
          ferramenta_id: string
          id: string
          observacao: string | null
          status: string | null
          tipo: string
          updated_at: string | null
          usuario_id: string | null
        }
        Insert: {
          colaborador_id: string
          created_at?: string | null
          data_devolucao?: string | null
          data_movimentacao?: string
          data_prevista_devolucao?: string | null
          empresa_id?: string | null
          ferramenta_id: string
          id?: string
          observacao?: string | null
          status?: string | null
          tipo: string
          updated_at?: string | null
          usuario_id?: string | null
        }
        Update: {
          colaborador_id?: string
          created_at?: string | null
          data_devolucao?: string | null
          data_movimentacao?: string
          data_prevista_devolucao?: string | null
          empresa_id?: string | null
          ferramenta_id?: string
          id?: string
          observacao?: string | null
          status?: string | null
          tipo?: string
          updated_at?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ferramenta_movimentacoes_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ferramenta_movimentacoes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ferramenta_movimentacoes_ferramenta_id_fkey"
            columns: ["ferramenta_id"]
            isOneToOne: false
            referencedRelation: "ferramentas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ferramenta_movimentacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ferramentas: {
        Row: {
          categoria: string | null
          codigo: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: string | null
          foto_url: string | null
          id: string
          nome: string
          proxima_manutencao: string | null
          status: string | null
          ultima_manutencao: string | null
          updated_at: string | null
        }
        Insert: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          foto_url?: string | null
          id?: string
          nome: string
          proxima_manutencao?: string | null
          status?: string | null
          ultima_manutencao?: string | null
          updated_at?: string | null
        }
        Update: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          foto_url?: string | null
          id?: string
          nome?: string
          proxima_manutencao?: string | null
          status?: string | null
          ultima_manutencao?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ferramentas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      insumo_movimentacoes: {
        Row: {
          created_at: string | null
          data_movimentacao: string
          empresa_id: string | null
          id: string
          insumo_id: string
          observacao: string | null
          quantidade: number
          responsavel_id: string | null
          tipo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data_movimentacao?: string
          empresa_id?: string | null
          id?: string
          insumo_id: string
          observacao?: string | null
          quantidade: number
          responsavel_id?: string | null
          tipo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data_movimentacao?: string
          empresa_id?: string | null
          id?: string
          insumo_id?: string
          observacao?: string | null
          quantidade?: number
          responsavel_id?: string | null
          tipo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insumo_movimentacoes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumo_movimentacoes_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumo_movimentacoes_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
        ]
      }
      insumos: {
        Row: {
          categoria: string | null
          codigo: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: string | null
          estoque_atual: number | null
          estoque_minimo: number | null
          foto_url: string | null
          id: string
          nome: string
          unidade: string | null
          updated_at: string | null
          valor_unitario: number | null
        }
        Insert: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          foto_url?: string | null
          id?: string
          nome: string
          unidade?: string | null
          updated_at?: string | null
          valor_unitario?: number | null
        }
        Update: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          foto_url?: string | null
          id?: string
          nome?: string
          unidade?: string | null
          updated_at?: string | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "insumos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquina_manutencoes: {
        Row: {
          created_at: string | null
          custo: number | null
          data_programada: string | null
          data_realizada: string | null
          descricao: string | null
          empresa_id: string | null
          id: string
          maquina_id: string
          responsavel_id: string | null
          status: string | null
          tipo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custo?: number | null
          data_programada?: string | null
          data_realizada?: string | null
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          maquina_id: string
          responsavel_id?: string | null
          status?: string | null
          tipo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custo?: number | null
          data_programada?: string | null
          data_realizada?: string | null
          descricao?: string | null
          empresa_id?: string | null
          id?: string
          maquina_id?: string
          responsavel_id?: string | null
          status?: string | null
          tipo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maquina_manutencoes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maquina_manutencoes_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maquina_manutencoes_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
        ]
      }
      maquinas: {
        Row: {
          categoria: string | null
          codigo: string | null
          created_at: string | null
          data_aquisicao: string | null
          descricao: string | null
          empresa_id: string | null
          foto_url: string | null
          id: string
          nome: string
          proxima_manutencao: string | null
          status: string | null
          ultima_manutencao: string | null
          updated_at: string | null
          valor_aquisicao: number | null
        }
        Insert: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          data_aquisicao?: string | null
          descricao?: string | null
          empresa_id?: string | null
          foto_url?: string | null
          id?: string
          nome: string
          proxima_manutencao?: string | null
          status?: string | null
          ultima_manutencao?: string | null
          updated_at?: string | null
          valor_aquisicao?: number | null
        }
        Update: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          data_aquisicao?: string | null
          descricao?: string | null
          empresa_id?: string | null
          foto_url?: string | null
          id?: string
          nome?: string
          proxima_manutencao?: string | null
          status?: string | null
          ultima_manutencao?: string | null
          updated_at?: string | null
          valor_aquisicao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maquinas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      notificacoes: {
        Row: {
          created_at: string | null
          data_envio: string | null
          empresa_id: string | null
          entidade_id: string | null
          entidade_tipo: string | null
          id: string
          lida: boolean | null
          mensagem: string
          tipo: string
          titulo: string
          updated_at: string | null
          usuario_id: string | null
        }
        Insert: {
          created_at?: string | null
          data_envio?: string | null
          empresa_id?: string | null
          entidade_id?: string | null
          entidade_tipo?: string | null
          id?: string
          lida?: boolean | null
          mensagem: string
          tipo: string
          titulo: string
          updated_at?: string | null
          usuario_id?: string | null
        }
        Update: {
          created_at?: string | null
          data_envio?: string | null
          empresa_id?: string | null
          entidade_id?: string | null
          entidade_tipo?: string | null
          id?: string
          lida?: boolean | null
          mensagem?: string
          tipo?: string
          titulo?: string
          updated_at?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          id: string
          meta_data: Json | null
          nome: string
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          meta_data?: Json | null
          nome: string
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          meta_data?: Json | null
          nome?: string
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

export interface Colaborador {
  id: string;
  nome: string;
  matricula: string;
  cargo?: string;
  departamento?: string;
  ativo: boolean;
  data_admissao?: string;
  data_demissao?: string;
  email?: string;
  telefone?: string;
  foto_url?: string;
  cracha_hash?: string;
  empresa_id?: string;
  created_at: string;
  updated_at: string;
}
