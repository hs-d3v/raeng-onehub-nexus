
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
