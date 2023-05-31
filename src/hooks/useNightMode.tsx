import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

// Define the useNightMode custom hook
const useNightMode = () => {
  // Use the useLocalStorage hook to persist the color mode (light or dark)
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  // Use the useEffect hook to update the body class when the color mode changes
  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    // If the color mode is 'dark', add the 'dark' class to the body,
    // otherwise, remove it
    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
      // Re-run the effect when the color mode changes
  }, [colorMode]);

  // Return the color mode and the function to set it
  return [colorMode, setColorMode];
};

export default useNightMode;