import Menu from "./components/menu/Menu";
import GraphContainer from "./components/graph/GraphContainer";
import Instructions from "./components/instructions/Instructions";
import { NodeProvider } from "./contexts/NodeContext";
const App: React.FC = () => {
  return (
    <NodeProvider>
      <h1 className="text-center text-2xl">Graph Visualizer</h1>
      <Menu />
      <div className="flex flex-end">
        <GraphContainer />
        <Instructions />
      </div>
    </NodeProvider>
  );
};

export default App;
