import { FC, CSSProperties, MouseEvent } from "react";
import { useNodeContext, NodeGraph } from "../../contexts/NodeContext";

interface GraphNodeProps {
  nodeValue: number;
  style?: CSSProperties;
}

const GraphNode: FC<GraphNodeProps> = ({ nodeValue, style }) => {
  const {
    retrieveNodeByValue,
    selectedNodes,
    setSelectedNodes,
    setEdges,
    edges,
  } = useNodeContext();

  const handleSelectedNode = (event: MouseEvent<HTMLButtonElement>): void => {
    if (selectedNodes.length === 1) {
      const toNode = retrieveNodeByValue(nodeValue);
      if (toNode) {
        const fromNodeValue = selectedNodes[0].val;
        const existingEdgeIndex = edges.findIndex(
          (edge) => edge.from === fromNodeValue
        );

        if (existingEdgeIndex >= 0) {
          const updatedEdges = [...edges];
          updatedEdges[existingEdgeIndex] = {
            ...updatedEdges[existingEdgeIndex],
            to: [...updatedEdges[existingEdgeIndex].to, toNode],
          };
          setEdges(updatedEdges);
        } else {
          setEdges([...edges, { from: fromNodeValue, to: [toNode] }]);
        }
      }
      setSelectedNodes([]);
    } else if (selectedNodes.length === 0) {
      const node = retrieveNodeByValue(nodeValue);
      if (node) {
        setSelectedNodes([node]);
      }
    }
  };

  const isSelected = selectedNodes.some((node) => node.val === nodeValue);
  const borderColor = isSelected ? "border-purple-500" : "border-transparent";

  return (
    <button
      onClick={handleSelectedNode}
      className={`flex items-center justify-center w-10 h-10 rounded-full absolute text-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110 border-4 ${borderColor}`}
      style={style}
    >
      {nodeValue}
    </button>
  );
};

export default GraphNode;
