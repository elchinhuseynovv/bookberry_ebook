import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeMode, ViewMode } from '../../types';
import { ThemeToggle } from '../ThemeToggle';
import { BottomNav } from '../navigation/BottomNav';
import { Logo } from '../Logo';

interface Props {
  theme: ThemeMode;
  themeClasses: Record<ThemeMode, string>;
  onThemeChange: (theme: ThemeMode) => void;
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
  theme,
  themeClasses,
  onThemeChange,
  currentView,
  onViewChange,
  children
}) => {
  const { t } = useTranslation();

  const handleLogoClick = () => {
    onViewChange('library');
  };

  return (
    <div className={`min-h-screen ${themeClasses[theme]} transition-colors duration-300`}>
      <main className="px-3 pb-24 pt-4 sm:px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo onClick={handleLogoClick} />
            <h1 className="text-2xl font-bold text-purple-600 tracking-tight hidden sm:block">
              {t('appName')}
            </h1>
          </div>
          <ThemeToggle currentTheme={theme} onThemeChange={onThemeChange} />
        </div>
        
        {children}
      </main>

      <BottomNav currentView={currentView} onViewChange={onViewChange} />
    </div>
  );
};