export type NodeType = 'startNode' | 'endNode' | 'wallNode' | 'basicNode';
export type MoveOptions = 'Start' | 'End' | 'Wall';
export type ClockActions = 'INITIAL' | 'START' | 'STOP';
export interface GridNode {
  id: string;
  row: number;
  col: number;
  nodeType: NodeType;
}

export interface Graph {
  nodes: GraphNode[];
  getNodeById: (nodes: GraphNode[], id: string) => GraphNode | undefined;
}

export interface GraphNode {
  id: string;
  neighborsIds: string[];
  distance: number;
  previous: GraphNode | undefined;
  visited: boolean;
}
