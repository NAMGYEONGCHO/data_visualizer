import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useNightMode from './hooks/useNightMode';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [nightMode, setNightMode] = useNightMode();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen w-screen p-6 bg-white dark:bg-black">
      {/* App Bar */}
      <header className="bg-gray-800 text-white py-4 px-6">
        <button
          className="dark:text-white text-black bg-sky-500 dark:bg-green-500"
          onClick={() => setNightMode(nightMode === 'light' ? 'dark' : 'light')}
        >
          TOGGLE THEME
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Side Bar */}
        {sidebarOpen && (
          <aside className="bg-gray-200 w-full md:w-1/6 py-2 px-2 dark:bg-dblue dark:text-white">
            Side Bar
          </aside>
        )}

        {/* Content */}
        <div className="flex-grow">
          <div className="md:ml-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
