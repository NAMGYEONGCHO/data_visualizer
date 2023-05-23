import React from 'react';
import useNightMode from "./hooks/useNightMode";

const App: React.FC = () => {
  const [nightMode, setNightMode] = useNightMode();

  return (
    <div className="flex flex-col h-screen w-screen p-6 bg-white dark:bg-black">
      {/* App Bar */}
      <header className="bg-gray-800 text-white py-4 px-6">
      <button
        className="dark:text-white text-black bg-sky-500 dark:bg-green-500"
        onClick={() => setNightMode(nightMode === "light" ? "dark" : "light")}
      >
        TOGGLE THEME
      </button>
      </header>

      {/* Body */}
      <div className="flex flex-grow">
        {/* Side Bar */}
        <aside className="bg-gray-200 w-1/6 py-4 px-6">Side Bar</aside>

        {/* Content */}
        <div className="flex flex-grow flex-col">
          {/* Top Row */}
          <div className="flex justify-between bg-gray-100 py-4 px-6">
            <div className="w-1/4">Column 1</div>
            <div className="w-1/4">Column 2</div>
            <div className="w-1/4">Column 3</div>
            <div className="w-1/4">Column 4</div>
          </div>

          {/* Center Row */}
          <div className="flex bg-gray-300">
            <div className="w-3/4 flex">
              <div className="w-3/3 bg-gray-400">Column 2</div>
            </div>
              <div className="w-1/3 bg-gray-500">Column 3</div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between bg-gray-200 py-4 px-6">
            <div className="w-1/3">Column 1</div>
            <div className="w-1/3">Column 2</div>
            <div className="w-1/3">Column 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
