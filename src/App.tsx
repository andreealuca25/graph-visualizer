import Menu from "./components/menu/Menu";
import GraphContainer from "./components/graph/GraphContainer";
import Instructions from "./components/instructions/Instructions";
import { NodeProvider } from "./contexts/NodeContext";

const App: React.FC = () => {
  return (
    <NodeProvider>
      <div className="bg-violet-100 h-full">
        <h1 className="text-center text-4xl font-bold text-violet-700">
          Graph Visualizer
        </h1>
        <Menu />
        <div className="flex flex-end">
          <GraphContainer />
          <Instructions />
        </div>
      </div>
    </NodeProvider>
  );
};

export default App;
