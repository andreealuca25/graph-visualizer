import { FC } from "react";
import { NodeGraph, useNodeContext } from "../../contexts/NodeContext";

interface GraphEdgeProps {
  from: NodeGraph;
  to: NodeGraph;
}

const GraphEdge: FC<GraphEdgeProps> = ({ from, to }) => {
  const { removeEdge } = useNodeContext();
  const handleDeleteEdge = () => {
    removeEdge(from, to);
  };

  return (
    <g className="group">
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="purple" />
      <foreignObject
        x={(from.x + to.x) / 2 - 20}
        y={(from.y + to.y) / 2 - 20}
        width="40"
        height="40"
        className="relative"
      >
        <div className="relative w-full h-full">
          <button
            onClick={handleDeleteEdge}
            className="hidden group-hover:flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white border-none rounded-full w-8 h-8 text-m font-bold "
          >
            &#10006;
          </button>
        </div>
      </foreignObject>
    </g>
  );
};

export default GraphEdge;
