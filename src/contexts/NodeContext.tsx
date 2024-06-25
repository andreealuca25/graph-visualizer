import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface NodeGraph {
  id: number;
  x: number;
  y: number;
  val: number;
}

export interface Edge {
  from: number;
  to: NodeGraph[];
}

interface NodeContextType {
  nodes: NodeGraph[];
  edges: Edge[];
  setNodes: Dispatch<SetStateAction<NodeGraph[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  retrieveNodeByValue: (value: number) => NodeGraph | undefined;
  retrieveEdgesByFromNode: (value: number) => NodeGraph[];
  selectedNodes: NodeGraph[];
  setSelectedNodes: Dispatch<SetStateAction<NodeGraph[]>>;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export const useNodeContext = (): NodeContextType => {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNodeContext must be used within a NodeProvider");
  }
  return context;
};

export const NodeProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<NodeGraph[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<NodeGraph[]>([]);

  const retrieveNodeByValue = (val: number): NodeGraph | undefined => {
    return nodes.find((node) => node.val === val);
  };

  const retrieveEdgesByFromNode = (val: number): NodeGraph[] => {
    const edge = edges.find((edge) => edge.from === val);
    return edge ? edge.to : [];
  };

  return (
    <NodeContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        retrieveNodeByValue,
        selectedNodes,
        setSelectedNodes,
        retrieveEdgesByFromNode,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
