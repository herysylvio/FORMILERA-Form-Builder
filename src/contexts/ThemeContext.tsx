import React, { createContext, useContext } from 'react';
import type { ThemeMode } from '../types/form';

const ThemeContext = createContext<ThemeMode>('dark');

interface ThemeProviderProps {
  value: ThemeMode;
  children: React.ReactNode;
}

export function ThemeProvider({ value, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeMode {
  return useContext(ThemeContext);
}