export interface Cell {
  cell_type: string;
  code?: string;
  errors?: string[];
  execution_count?: number | null;
  inputs?: CellInput[];
  language?: string;
  loading?: boolean;
  metadata: {
    tags?: string[];
    trusted?: boolean;
  };
  outputs?: CellOutput[];
  output?: string;
  hideEditor?: boolean;
  hideCount?: boolean;
  source: string;
  timesExecuted?: number;
  selected?: boolean;
}

export interface CellInput {
  prompt?: string;
  password?: boolean;
}

export interface CellOutput {
  data: Record<string, string>;
  execution_count?: number;
  metadata?: {
    [key: string]: string | number | Record<string, unknown>;
  };
  output_type?: string;
}
