import { useState } from 'react';
import { ThemeMode } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const themeClasses = {
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
    sepia: 'bg-[#f4ecd8] text-[#5c4b37]'
  };

  return {
    theme,
    setTheme,
    themeClasses
  };
};