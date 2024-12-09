import React from 'react';
import { Library, BookMarked, Settings, Headphones } from 'lucide-react';
import { az } from '../constants/translations';
import { ViewMode } from '../types';

interface Props {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Sidebar: React.FC<Props> = ({ currentView, onViewChange }) => {
  const getButtonClass = (view: ViewMode) => {
    return `rounded-lg p-2 sm:p-3 transition-all duration-300 ${
      currentView === view
        ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 scale-110'
        : 'text-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:scale-110'
    }`;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-12 sm:w-16 bg-white/80 backdrop-blur-sm shadow-lg dark:bg-gray-900/80 z-10">
      <div className="flex h-full flex-col items-center py-4">
        <div className="mb-8 text-purple-600">
          <Library size={24} className="sm:w-7 sm:h-7" />
        </div>
        <nav className="flex flex-1 flex-col gap-4">
          <button 
            className={getButtonClass('library')} 
            title={az.library}
            onClick={() => onViewChange('library')}
          >
            <Library size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button 
            className={getButtonClass('audiobooks')} 
            title={az.audiobooks}
            onClick={() => onViewChange('audiobooks')}
          >
            <Headphones size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button 
            className={getButtonClass('bookmarks')} 
            title={az.bookmarks}
            onClick={() => onViewChange('bookmarks')}
          >
            <BookMarked size={20} className="sm:w-6 sm:h-6" />
          </button>
        </nav>
        <button 
          className={getButtonClass('settings')} 
          title={az.settings}
          onClick={() => onViewChange('settings')}
        >
          <Settings size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};