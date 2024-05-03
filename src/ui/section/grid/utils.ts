import { Graph, GraphNode, GridNode } from '@globalTypes/index';

const getNodeById = (nodes: GraphNode[], id: string) => {
  let node = undefined;
  for (const n of nodes) {
    if (n.id === id) {
      node = n;
      break;
    }
  }
  return node;
};

export const buildGraph = (grid: GridNode[][], defaultDistance: number = Infinity): Graph => {
  const nodes: GraphNode[] = [];
  const rowLength = grid.length;
  for (let row = 0; row < rowLength; row++) {
    const mRow = grid[row];
    const colLength = mRow.length;
    for (let col = 0; col < colLength; col++) {
      const node = mRow[col];
      if (node.nodeType === 'wallNode') continue;
      const neighborsIds: string[] = [];
      if (row > 0) {
        const tNode = grid[row - 1][col];
        if (tNode.nodeType !== 'wallNode') neighborsIds.push(tNode.id);
      }
      if (row < rowLength - 1) {
        const tNode = grid[row + 1][col];
        if (tNode.nodeType !== 'wallNode') neighborsIds.push(tNode.id);
      }
      if (col > 0) {
        const tNode = grid[row][col - 1];
        if (tNode.nodeType !== 'wallNode') neighborsIds.push(tNode.id);
      }
      if (col < colLength - 1) {
        const tNode = grid[row][col + 1];
        if (tNode.nodeType !== 'wallNode') neighborsIds.push(tNode.id);
      }
      const mNode: GraphNode = {
        id: node.id,
        neighborsIds,
        distance: defaultDistance,
        previous: undefined,
        visited: false,
      };
      nodes.push(mNode);
    }
  }
  const graph: Graph = {
    nodes,
    getNodeById,
  };
  return graph;
};

export const getShortestPath = (
  startNode: GraphNode | undefined,
  endNode: GraphNode | undefined
): string[] => {
  if (startNode == null) return [];
  if (endNode == null) return [];
  const path: string[] = [];
  let currentNode: GraphNode | undefined = endNode.previous;
  while (currentNode != null) {
    if (currentNode.id === startNode.id) break;
    path.push(currentNode.id);
    currentNode = currentNode.previous;
  }
  return path.reverse();
};

export const dijkstra = (
  graph: Graph,
  startNode: GraphNode | undefined,
  endNode: GraphNode | undefined
): string[] => {
  if (startNode == null) return [];
  if (endNode == null) return [];
  const visitedNodes: string[] = [];
  startNode.distance = 0;
  const queue: GraphNode[] = [startNode];
  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const u = queue.shift() as GraphNode;
    u.visited = true;
    visitedNodes.push(u.id);
    if (u.id === endNode.id) break;
    for (const neighborsId of u.neighborsIds) {
      const v = graph.getNodeById(graph.nodes, neighborsId) as GraphNode;
      if (v.visited) continue;
      if (v.distance > u.distance + 1) {
        v.distance = u.distance + 1;
        v.previous = u;
        queue.push(v);
      }
    }
  }
  return visitedNodes;
};
