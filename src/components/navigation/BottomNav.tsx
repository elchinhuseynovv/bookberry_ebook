import React from 'react';
import { Library, BookMarked, Settings, Headphones } from 'lucide-react';
import { ViewMode } from '../../types';
import { az } from '../../constants/translations';
import { NavButton } from './NavButton';

interface Props {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const navItems = [
  { view: 'library' as ViewMode, icon: Library, label: az.library },
  { view: 'audiobooks' as ViewMode, icon: Headphones, label: az.audiobooks },
  { view: 'bookmarks' as ViewMode, icon: BookMarked, label: az.bookmarks },
  { view: 'settings' as ViewMode, icon: Settings, label: az.settings }
];

export const BottomNav: React.FC<Props> = ({ currentView, onViewChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 opacity-80" />

      {/* Navigation container */}
      <nav className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-t border-purple-100 dark:border-purple-900/50">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-stretch justify-between">
            {navItems.map(({ view, icon, label }) => (
              <NavButton
                key={view}
                view={view}
                currentView={currentView}
                icon={icon}
                label={label}
                onClick={() => onViewChange(view)}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};