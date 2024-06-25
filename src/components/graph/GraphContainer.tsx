import { useState, useRef } from "react";
import ContextMenu from "../menu/ContextMenu";
import GraphNode from "./GraphNode";
import { useNodeContext, NodeGraph } from "../../contexts/NodeContext";
import GraphEdge from "./GraphEdge";

const GraphContainer: React.FC = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: { label: string; onClick: () => void }[];
  } | null>(null);
  const { nodes, setNodes, edges } = useNodeContext();
  const [nodeCount, setNodeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddNode = (x: number, y: number) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect(); //container element relative to the viewport
      const newX = x - containerRect.left;
      const newY = y - containerRect.top;

      const newNode: NodeGraph = {
        id: nodeCount,
        x: newX,
        y: newY,
        val: nodeCount,
      };
      setNodes((prevNodes: NodeGraph[]) => [...prevNodes, newNode]);
      setNodeCount((prevCount) => prevCount + 1);
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      items: [
        {
          label: "Add node",
          onClick: () => {
            handleAddNode(event.clientX, event.clientY);
            setContextMenu(null);
          },
        },
      ],
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const renderEdges = () => {
    return edges.flatMap((edge) =>
      edge.to.map((toNode) => {
        const fromNode = nodes.find((node) => node.id === edge.from);
        if (!fromNode) return null;
        return (
          <GraphEdge
            key={`${fromNode.id}-${toNode.id}`}
            from={fromNode}
            to={toNode}
          />
        );
      })
    );
  };

  return (
    <div className="flex justify-center items-center mx-10 relative">
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={handleCloseContextMenu}
        />
      )}
      <div
        ref={containerRef}
        className="w-[70vw] h-[60vh] border-4 border-indigo-500/50 relative"
        onContextMenu={handleContextMenu}
      >
        <svg className="absolute w-full h-full">{renderEdges()}</svg>
        {nodes.map((node: NodeGraph) => (
          <GraphNode
            key={node.id}
            nodeValue={node.val}
            style={{
              position: "absolute",
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GraphContainer;
