import { FC } from "react";
import { NodeGraph } from "../../contexts/NodeContext";

interface GraphEdgeProps {
  from: NodeGraph;
  to: NodeGraph;
}

const GraphEdge: FC<GraphEdgeProps> = ({ from, to }) => {
  return (
    <line
      key={`${from.id}-${to.id}`}
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="black"
    />
  );
};

export default GraphEdge;
