import { FC, CSSProperties } from "react";

interface GraphNodeProps {
  nodeValue: string;
  style?: CSSProperties;
}

const GraphNode: FC<GraphNodeProps> = ({ nodeValue, style }) => {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full absolute text-white"
      style={style}
    >
      {nodeValue}
    </div>
  );
};

export default GraphNode;
