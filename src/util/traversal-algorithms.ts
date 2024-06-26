import { NodeGraph, Edge } from "../contexts/NodeContext";

export const dijkstra = (
  nodes: NodeGraph[],
  edges: Edge[],
  startId: number,
  endId: number
): NodeGraph[] => {
  const distances: Record<number, number> = {};
  const previous: Record<number, number | null> = {};
  const visited: Record<number, boolean> = {};
  const pq: { node: number; distance: number }[] = [];

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    visited[node.id] = false;
  });

  distances[startId] = 0;
  pq.push({ node: startId, distance: 0 });

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance);
    const { node } = pq.shift()!;
    visited[node] = true;

    if (node === endId) break;

    const currentEdges = edges.find((edge) => edge.from === node);
    if (currentEdges) {
      currentEdges.to.forEach((neighbor) => {
        if (!visited[neighbor.id]) {
          const newDist = distances[node] + 1; // Assuming all edges have weight 1
          if (newDist < distances[neighbor.id]) {
            distances[neighbor.id] = newDist;
            previous[neighbor.id] = node;
            pq.push({ node: neighbor.id, distance: newDist });
          }
        }
      });
    }
  }

  const path: NodeGraph[] = [];
  let currentNode = endId;
  while (currentNode != null) {
    path.unshift(nodes.find((node) => node.id === currentNode)!);
    currentNode = previous[currentNode]!;
  }

  return path;
};

export const bellmanFord = (
  nodes: NodeGraph[],
  edges: Edge[],
  startId: number,
  endId: number
): NodeGraph[] | null => {
  const distances: Record<number, number> = {};
  const previous: Record<number, number | null> = {};

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  });

  distances[startId] = 0;

  for (let i = 0; i < nodes.length - 1; i++) {
    let updated = false;

    edges.forEach((edge) => {
      edge.to.forEach((neighbor) => {
        const newDist = distances[edge.from] + 1;
        if (newDist < distances[neighbor.id]) {
          distances[neighbor.id] = newDist;
          previous[neighbor.id] = edge.from;
          updated = true;
        }
      });
    });

    if (!updated) break;
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    edges.forEach((edge) => {
      edge.to.forEach((neighbor) => {
        const newDist = distances[edge.from] + 1;
        if (newDist < distances[neighbor.id]) {
          return null;
        }
      });
    });
  }

  const path: NodeGraph[] = [];
  let currentNode = endId;
  while (currentNode != null) {
    path.unshift(nodes.find((node) => node.id === currentNode)!);
    currentNode = previous[currentNode]!;
  }

  return path.length > 1 ? path : null;
};

const heuristic = (a: NodeGraph, b: NodeGraph): number => {
  //manhattan distance
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export const aStar = (
  nodes: NodeGraph[],
  edges: Edge[],
  startId: number,
  goalId: number
): NodeGraph[] | null => {
  const startNode = nodes.find((node) => node.id === startId);
  const goalNode = nodes.find((node) => node.id === goalId);

  if (!startNode || !goalNode) return null;

  const openSet: Set<number> = new Set([startId]);
  const cameFrom: Record<number, number | null> = {};

  const gScore: Record<number, number> = {};
  const fScore: Record<number, number> = {};

  nodes.forEach((node) => {
    gScore[node.id] = Infinity;
    fScore[node.id] = Infinity;
  });

  gScore[startId] = 0;
  fScore[startId] = heuristic(startNode, goalNode);

  while (openSet.size > 0) {
    let currentNode = Array.from(openSet).reduce((a, b) =>
      fScore[a] < fScore[b] ? a : b
    );

    if (currentNode === goalId) {
      const path: NodeGraph[] = [];
      while (currentNode != null) {
        path.unshift(nodes.find((node) => node.id === currentNode)!);
        currentNode = cameFrom[currentNode]!;
      }
      return path;
    }

    openSet.delete(currentNode);
    const currentEdges = edges.find((edge) => edge.from === currentNode);
    if (currentEdges) {
      currentEdges.to.forEach((neighbor) => {
        const tentativeGScore = gScore[currentNode] + 1;

        if (tentativeGScore < gScore[neighbor.id]) {
          cameFrom[neighbor.id] = currentNode;
          gScore[neighbor.id] = tentativeGScore;
          fScore[neighbor.id] =
            gScore[neighbor.id] + heuristic(neighbor, goalNode);
          if (!openSet.has(neighbor.id)) {
            openSet.add(neighbor.id);
          }
        }
      });
    }
  }

  return null;
};
