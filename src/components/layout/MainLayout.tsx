import React from 'react';
import { ThemeMode, ViewMode } from '../../types';
import { ThemeToggle } from '../ThemeToggle';
import { BottomNav } from '../navigation/BottomNav';
import { Logo } from '../Logo';
import { az } from '../../constants/translations';

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
  return (
    <div className={`min-h-screen ${themeClasses[theme]} transition-colors duration-300`}>
      <main className="p-4 pb-32">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-3xl font-bold text-purple-600 tracking-tight hidden sm:block">
              {az.appName}
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