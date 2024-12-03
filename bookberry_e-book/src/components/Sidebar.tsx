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
    return `rounded-lg p-3 ${
      currentView === view
        ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
        : 'text-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900/20'
    }`;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-white shadow-lg dark:bg-gray-900">
      <div className="flex h-full flex-col items-center py-4">
        <div className="mb-8 text-purple-600">
          <Library size={28} />
        </div>
        <nav className="flex flex-1 flex-col gap-4">
          <button 
            className={getButtonClass('library')} 
            title={az.library}
            onClick={() => onViewChange('library')}
          >
            <Library size={24} />
          </button>
          <button 
            className={getButtonClass('audiobooks')} 
            title={az.audiobooks}
            onClick={() => onViewChange('audiobooks')}
          >
            <Headphones size={24} />
          </button>
          <button 
            className={getButtonClass('bookmarks')} 
            title={az.bookmarks}
            onClick={() => onViewChange('bookmarks')}
          >
            <BookMarked size={24} />
          </button>
        </nav>
        <button 
          className={getButtonClass('settings')} 
          title={az.settings}
          onClick={() => onViewChange('settings')}
        >
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
};