import { useState } from "react";
import ContextMenu from "../menu/ContextMenu";
import GraphNode from "./GraphNode";

const GraphContainer: React.FC = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: { label: string; onClick: () => void }[];
  } | null>(null);

  const [nodes, setNodes] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [nodeCount, setNodeCount] = useState(0);

  const handleAddNode = (x: number, y: number) => {
    console.log("handleAddNode");
    const newNode = { id: nodeCount, x, y };
    setNodes((prevNodes) => [...prevNodes, newNode]);
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
        {nodes.map((node) => (
          <GraphNode
            key={node.id}
            nodeValue={`${node.id}`}
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
