import React from 'react';
import { ThemeContext } from './ThemeContext';
import { Routes, Route } from 'react-router-dom';
import useNightMode from './hooks/useNightMode';
import Dashboard from './pages/Dashboard';
import { Moon, Sun } from 'react-feather';

const body_colorset = "text-black bg-sunlight dark:bg-dblue dark:text-white ";
const appbar_colorset = "text-black bg-white-500 dark:bg-dblue dark:text-white ";
const sidebar_colorset = "text-black bg-sidebar border-2 border-blue-200 rounded-md dark:border-yellow-200 dark:bg-gray-700 dark:text-white ";

const App: React.FC = () => {
  const [nightMode, setNightMode] = useNightMode();
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeContext.Provider value={{ nightMode, setNightMode }}>
    <div className={`${body_colorset} flex flex-col w-screen p-6`}>
      {/* App Bar */}
      <header className="text-white py-4 px-6">
        <button
          className={`${appbar_colorset} rounded-full`}
          onClick={() => setNightMode(nightMode === 'light' ? 'dark' : 'light')}
        >
          {nightMode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Side Bar */}
        {/* {sidebarOpen && ( */}
          <aside className={`${sidebar_colorset} w-full md:w-1/6 py-2 px-2`}>  
            Side Bar
          </aside>
       {/*  )} */}

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
    </ThemeContext.Provider>
  );
};

export default App;
