import { createContext, useContext } from 'react';

export type ThemeContextType = {
  nightMode: string,
  setNightMode: (mode: string) => void
};

export const ThemeContext = createContext<ThemeContextType>({
  nightMode: 'light',
  setNightMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);
