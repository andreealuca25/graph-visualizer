import React from "react";

const Menu: React.FC = () => {
  return (
    <ul className="flex flex-row justify-evenly py-8 items-center">
      <li>
        <label htmlFor="algorithm-select" className="mr-2">
          Select algorithm:
        </label>
        <select
          id="algorithm-select"
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="algorithm1">Dijkstra</option>
          <option value="algorithm2">Bellman-Ford</option>
          <option value="algorithm3">A*</option>
        </select>
      </li>
      <li>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md">
          Start
        </button>
      </li>
    </ul>
  );
};

export default Menu;
