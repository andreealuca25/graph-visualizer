import { useState, useRef, useMemo } from "react";
import ContextMenu from "../menu/ContextMenu";
import GraphNode from "./GraphNode";
import { useNodeContext, NodeGraph } from "../../contexts/NodeContext";
import GraphEdge from "./GraphEdge";
import ErrorNotification from "../notification/ErrorNotification";

const GraphContainer: React.FC = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: { label: string; onClick: () => void }[];
  } | null>(null);
  const { nodes, setNodes, edges, traversalOrder } = useNodeContext();
  const [nodeCount, setNodeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleAddNode = (x: number, y: number) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newX = x - containerRect.left;
      const newY = y - containerRect.top;
      const margin = 30;

      if (
        newX < margin ||
        newX > containerRect.width - margin ||
        newY < margin ||
        newY > containerRect.height - margin
      ) {
        setErrorVisible(true);
        return;
      }

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

  const renderEdges = useMemo(() => {
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
  }, [edges]);

  return (
    <div className="flex justify-center items-center mx-10 relative">
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}
      <div
        ref={containerRef}
        className="w-[70vw] h-[60vh] border-4 border-indigo-500/50 relative bg-white"
        onContextMenu={handleContextMenu}
      >
        <svg className="absolute w-full h-full">{renderEdges}</svg>
        {nodes.map((node: NodeGraph) => {
          const orderIndex = traversalOrder.findIndex(
            (traversalNode) => traversalNode.id === node.id
          );
          const backgroundColor = orderIndex >= 0 ? "red" : "gray";

          return (
            <GraphNode
              key={node.id}
              nodeValue={node.val}
              style={{
                position: "absolute",
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: "translate(-50%, -50%)",
                backgroundColor,
              }}
            />
          );
        })}

        <ErrorNotification
          message="Node position is within the margin. Node not added."
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
        />
      </div>
    </div>
  );
};

export default GraphContainer;
