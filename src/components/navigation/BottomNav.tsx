import React from 'react';
import { Library, BookMarked, Settings, Headphones, Heart } from 'lucide-react';
import { ViewMode } from '../../types';
import { useTranslation } from 'react-i18next';
import { NavButton } from './NavButton';

interface Props {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const BottomNav: React.FC<Props> = ({ currentView, onViewChange }) => {
  const { t } = useTranslation();

  const navItems = [
    { view: 'library' as ViewMode, icon: Library, label: t('library') },
    { view: 'audiobooks' as ViewMode, icon: Headphones, label: t('audiobooks') },
    { view: 'favorites' as ViewMode, icon: Heart, label: t('favorites.title') },
    { view: 'bookmarks' as ViewMode, icon: BookMarked, label: t('bookmarks') },
    { view: 'settings' as ViewMode, icon: Settings, label: t('settings') }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 opacity-80" />
      <nav className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-t border-purple-100 dark:border-purple-900/50">
        <div className="max-w-lg mx-auto">
          <div className="flex items-stretch justify-between px-2 py-1">
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