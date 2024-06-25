import React, {
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

interface NodeContextType {
  nodes: NodeGraph[];
  setNodes: Dispatch<SetStateAction<NodeGraph[]>>;
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
  return (
    <NodeContext.Provider value={{ nodes, setNodes }}>
      {children}
    </NodeContext.Provider>
  );
};
