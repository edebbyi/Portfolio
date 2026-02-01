export interface NodeData {
  id: string;
  title: string;
  category: 'table' | 'query' | 'result';
  fields?: string[];
  x: number;
  y: number;
  color: string;
  width?: number; // Optional custom width for specific nodes
  content?: {
    description: string;
    details: string[];
  };
}

export interface Connection {
  from: string;
  to: string;
  fromSide: 'left' | 'right';
  toSide: 'left' | 'right';
}

export interface Position {
  x: number;
  y: number;
}