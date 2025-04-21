
/**
 * This file contains interfaces for database tables that aren't part of the primary schema
 * but are still needed for type checking in the application.
 */

export interface CadastroPredefinido {
  id: string;
  tipo: string;
  valor: string;
  descricao?: string;
  ordem?: number;
  ativo?: boolean;
  created_at?: string;
  updated_at?: string;
  empresa_id?: string;
}

export interface TableItemBase {
  id: string;
  nome: string;
  codigo?: string;
  categoria?: string;
  descricao?: string;
  created_at?: string;
  updated_at?: string;
  empresa_id?: string;
}

// Adding missing interfaces for item tables
export interface EPIItem extends TableItemBase {
  ca_numero?: string;
  validade_dias?: number;
  estoque_atual?: number;
  estoque_minimo?: number;
  foto_url?: string;
}

export interface FerramentaItem extends TableItemBase {
  status?: string;
  foto_url?: string;
  ultima_manutencao?: string;
  proxima_manutencao?: string;
}

export interface MaquinaItem extends TableItemBase {
  status?: string;
  foto_url?: string;
  valor_aquisicao?: number;
  data_aquisicao?: string;
  ultima_manutencao?: string;
  proxima_manutencao?: string;
}

export interface InsumoItem extends TableItemBase {
  unidade?: string;
  estoque_atual?: number;
  estoque_minimo?: number;
  valor_unitario?: number;
  foto_url?: string;
}
