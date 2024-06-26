import { FC, useState, useEffect } from "react";
import { useNodeContext, NodeGraph } from "../../contexts/NodeContext";
import {
  dijkstra,
  bellmanFord,
  aStar,
} from ".//../../util/traversal-algorithms";

const Menu: FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("dijkstra");
  const [startNode, setStartNode] = useState<number | null>(null);
  const [endNode, setEndNode] = useState<number | null>(null);
  const { nodes, edges, setTraversalOrder } = useNodeContext();

  useEffect(() => {
    if (nodes.length > 0) {
      setStartNode(nodes[0].id);
      setEndNode(nodes[1]?.id || nodes[0].id);
    }
  }, [nodes]);

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleStartNodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartNode(parseInt(event.target.value, 10));
  };

  const handleEndNodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndNode(parseInt(event.target.value, 10));
  };

  const handleStart = async () => {
    if (startNode === null || endNode === null) return;

    setTraversalOrder([]);
    let traversalOrder: NodeGraph[] = [];
    switch (selectedAlgorithm) {
      case "dijkstra":
        traversalOrder = dijkstra(nodes, edges, startNode, endNode);
        break;
      case "bellman-ford":
        const bellmanFordResult = bellmanFord(nodes, edges, startNode, endNode);
        if (bellmanFordResult !== null) {
          traversalOrder = bellmanFordResult;
        }
        break;
      case "a-star":
        const aStarResult = aStar(nodes, edges, startNode, endNode);
        if (aStarResult !== null) {
          traversalOrder = aStarResult;
        }
        break;
      default:
        console.log("No algorithm selected");
    }

    for (let i = 0; i < traversalOrder.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTraversalOrder(traversalOrder.slice(0, i + 1));
    }
  };

  const handleReset = () => {
    setTraversalOrder([]);
  };

  return (
    <ul className="flex flex-row justify-evenly py-8 items-center">
      <li>
        <label htmlFor="algorithm-select" className="mr-2">
          Select algorithm:
        </label>
        <select
          id="algorithm-select"
          className="border border-gray-300 rounded-md px-2 py-1"
          value={selectedAlgorithm}
          onChange={handleAlgorithmChange}
        >
          <option value="dijkstra">Dijkstra's Algorithm</option>
          <option value="bellman-ford">Bellman-Ford Algorithm</option>
          <option value="a-star">A* Algorithm</option>
        </select>
      </li>
      <li>
        <label htmlFor="start-node" className="mr-2">
          Start node:
        </label>
        <select
          id="start-node"
          className="border border-gray-300 rounded-md px-2 py-1"
          value={startNode ?? ""}
          onChange={handleStartNodeChange}
        >
          <option value="" disabled>
            Select start node
          </option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              Node {node.id}
            </option>
          ))}
        </select>
      </li>
      <li>
        <label htmlFor="end-node" className="mr-2">
          End node:
        </label>
        <select
          id="end-node"
          className="border border-gray-300 rounded-md px-2 py-1"
          value={endNode ?? ""}
          onChange={handleEndNodeChange}
        >
          <option value="" disabled>
            Select end node
          </option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              Node {node.id}
            </option>
          ))}
        </select>
      </li>
      <li>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          onClick={handleStart}
          disabled={startNode === null || endNode === null}
        >
          Start
        </button>
      </li>
      <li>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleReset}
        >
          Reset
        </button>
      </li>
    </ul>
  );
};

export default Menu;
