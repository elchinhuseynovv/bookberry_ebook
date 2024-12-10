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
    const isActive = currentView === view;
    return `
      relative flex flex-col items-center gap-1.5 py-2 px-3
      transition-all duration-300 group
      ${isActive 
        ? 'text-purple-600' 
        : 'text-gray-400 hover:text-purple-500'
      }
    `;
  };

  const getIndicatorClass = (view: ViewMode) => {
    const isActive = currentView === view;
    return `
      absolute -top-1.5 left-1/2 -translate-x-1/2
      w-12 h-1.5 rounded-full
      transition-all duration-300 transform
      ${isActive
        ? 'bg-purple-600 scale-100 opacity-100'
        : 'bg-transparent scale-0 opacity-0'
      }
    `;
  };

  const getIconWrapperClass = (view: ViewMode) => {
    const isActive = currentView === view;
    return `
      relative flex items-center justify-center
      w-12 h-12 rounded-2xl
      transition-all duration-300 transform
      ${isActive
        ? 'bg-purple-100 dark:bg-purple-900/30 scale-110'
        : 'bg-transparent group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:scale-105'
      }
    `;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 opacity-80" />

      {/* Navigation container */}
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-t border-purple-100 dark:border-purple-900/50">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-around">
            {[
              { view: 'library' as ViewMode, icon: Library, label: az.library },
              { view: 'audiobooks' as ViewMode, icon: Headphones, label: az.audiobooks },
              { view: 'bookmarks' as ViewMode, icon: BookMarked, label: az.bookmarks },
              { view: 'settings' as ViewMode, icon: Settings, label: az.settings }
            ].map(({ view, icon: Icon, label }) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={getButtonClass(view)}
              >
                <div className={getIndicatorClass(view)} />
                <div className={getIconWrapperClass(view)}>
                  <Icon 
                    size={22} 
                    className={`transition-transform duration-300 ${
                      currentView === view ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                </div>
                <span className="text-xs font-medium tracking-wide">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};