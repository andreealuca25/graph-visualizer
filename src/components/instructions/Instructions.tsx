import { FC } from "react";

const Instructions: FC = () => {
  return (
    <div className="p-4 text-center text-indigo-600 text-right rtl animate-slide-in-right">
      <p className="mb-2">
        <strong>Add a Node:</strong> Right-click anywhere within the graph area
        and select "Add node" from the context menu.
      </p>
      <p className="mb-2">
        <strong>Select Algorithm:</strong> Use the dropdown menu to select one
        of the available algorithms (Dijkstra's, Bellman-Ford, A*).
      </p>
      <p className="mb-2">
        <strong>Set Start and End Nodes:</strong> Use the dropdown menus to
        select the start and end nodes for the traversal.
      </p>
      <p className="mb-2">
        <strong>Start Visualization:</strong> Click the "Start" button to
        visualize the traversal. The nodes will be highlighted one by one to
        show the path found by the selected algorithm.
      </p>
    </div>
  );
};

export default Instructions;
