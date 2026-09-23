export type TabType = 'procedure' | 'checklist' | 'flowchart';

export interface DocumentItem {
  id: string | number;
  code: string;
  title: string;
  category: string;
  date: string;
  type: 'procedure' | 'checklist';
  fileType?: 'gdoc' | 'drive' | 'docx' | 'pdf';
  description?: string;
  steps?: string[];
  pdfUrl: string;
  isFolder?: boolean;
  badge?: string;
  subItems?: SubProcedureItem[];
}

export interface SubProcedureItem {
  id: string;
  code: string;
  title: string;
  date: string;
  pdfUrl: string;
  fileType?: 'gdoc' | 'drive' | 'docx' | 'pdf';
}

export interface SubProcedure {
  id: string;
  title: string;
  pdfUrl: string;
  date: string;
}

export interface PreviewDocumentState {
  url: string | null;
  title: string;
  category: string;
  code?: string;
}

export interface FlowLane {
  id: string;
  name: string;
  color: string;
}

export interface FlowNode {
  id: string;
  label: string;
  type: 'start' | 'task' | 'decision' | 'end';
  laneId: string;
  x: number;
  y: number;
  description?: string;
}

export interface FlowConnection {
  from: string;
  to: string;
  label?: string;
  condition?: 'yes' | 'no';
}

export interface FlowchartItem {
  id: string;
  code: string;
  title: string;
  category: string;
  date: string;
  description: string;
  lanes: FlowLane[];
  nodes: FlowNode[];
  connections: FlowConnection[];
  subprocesses: {
    name: string;
    description: string;
    steps: string[];
  }[];
}

