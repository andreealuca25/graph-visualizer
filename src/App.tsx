import Menu from "./components/menu/Menu";
import GraphContainer from "./components/graph/GraphContainer";
import Instructions from "./components/instructions/Instructions";
const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-2xl">Graph Visualizer</h1>
      <Menu />
      <div className="flex flex-end">
        <GraphContainer />
        <Instructions />
      </div>
    </div>
  );
};

export default App;
