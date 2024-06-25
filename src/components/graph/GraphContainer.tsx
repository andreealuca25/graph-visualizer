import React, { useState } from "react";
import ContextMenu from "../menu/ContextMenu";
import GraphNode from "./GraphNode";
import { useNodeContext, NodeGraph } from "../../contexts/NodeContext";

const GraphContainer: React.FC = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: { label: string; onClick: () => void }[];
  } | null>(null);
  const { nodes, setNodes } = useNodeContext();
  const [nodeCount, setNodeCount] = useState(0);

  const handleAddNode = (x: number, y: number) => {
    //TODO: check if there are other nodes which may be overlapping this
    // and if the selected node is near the edge of the graph container and may go over the edge
    const newNode: NodeGraph = { id: nodeCount, x, y, val: nodeCount };
    setNodes((prevNodes: NodeGraph[]) => [...prevNodes, newNode]);
    setNodeCount((prevCount) => prevCount + 1);
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

  return (
    <div className="flex justify-center items-center mx-10">
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={handleCloseContextMenu}
        />
      )}
      <div
        className="w-[70vw] h-[60vh] border-4 border-indigo-500/50 flex items-center justify-center"
        onContextMenu={handleContextMenu}
      >
        {nodes.map((node: NodeGraph) => (
          <GraphNode
            key={node.id}
            nodeValue={`${node.val}`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GraphContainer;
