import React from 'react';
import { Sun, Moon, Coffee } from 'lucide-react';
import { ThemeMode } from '../types';
import { az } from '../constants/translations';

interface Props {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const ThemeToggle: React.FC<Props> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="flex gap-1 sm:gap-2 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
      <button
        onClick={() => onThemeChange('light')}
        className={`p-1.5 sm:p-2 rounded-md transition-colors ${
          currentTheme === 'light' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-white/10'
        }`}
        title={az.theme.light}
      >
        <Sun size={18} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={() => onThemeChange('dark')}
        className={`p-1.5 sm:p-2 rounded-md transition-colors ${
          currentTheme === 'dark' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-white/10'
        }`}
        title={az.theme.dark}
      >
        <Moon size={18} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={() => onThemeChange('sepia')}
        className={`p-1.5 sm:p-2 rounded-md transition-colors ${
          currentTheme === 'sepia' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-white/10'
        }`}
        title={az.theme.sepia}
      >
        <Coffee size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};