import React from 'react';

import useNightMode from "./hooks/useNightMode";

function App() {
  const [nightMode, setNightMode] = useNightMode();

  return (
    <div className="h-screen w-screen p-6 bg-white dark:bg-black">
      <button
        className="dark:text-white text-black bg-sky-500 dark:bg-green-500"
        onClick={() => setNightMode(nightMode === "light" ? "dark" : "light")}
      >
        TOGGLE THEME
      </button>
    </div>
  );
}

export default App;
