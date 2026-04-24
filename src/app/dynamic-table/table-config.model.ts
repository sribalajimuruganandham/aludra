export type FieldType = 'text' | 'number' | 'date' | 'dropdown';

export interface ColumnConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
}

export interface TableConfig {
  module: string;
  api: string;
  columns: ColumnConfig[];
}
