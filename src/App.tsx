import Menu from "./components/menu/Menu";
import NodesArea from "./components/node/NodesArea";
const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-2xl">Graph Visualizer</h1>
      <Menu />
      <NodesArea />
    </div>
  );
};

export default App;
