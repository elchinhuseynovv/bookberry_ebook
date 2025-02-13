import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { ViewMode } from '../../types';

interface Props {
  view: ViewMode;
  currentView: ViewMode;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const NavButton: React.FC<Props> = ({
  view,
  currentView,
  icon: Icon,
  label,
  onClick
}) => {
  const isActive = currentView === view;

  return (
    <button
      onClick={onClick}
      className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2 min-w-[3rem] max-w-[5rem] mx-auto"
    >
      {/* Indicator */}
      <div
        className={`
          absolute -top-1 left-1/2 -translate-x-1/2
          w-8 h-1 rounded-full
          transition-all duration-300 transform
          ${isActive
            ? 'bg-purple-600 scale-100 opacity-100'
            : 'bg-transparent scale-0 opacity-0'
          }
        `}
      />

      {/* Icon Container */}
      <div
        className={`
          relative flex items-center justify-center
          w-10 h-10 rounded-xl
          transition-all duration-300 transform
          ${isActive
            ? 'bg-purple-100 dark:bg-purple-900/30 scale-110'
            : 'bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105'
          }
        `}
      >
        <Icon 
          size={20} 
          className={`
            transition-all duration-300
            ${isActive 
              ? 'text-purple-600 scale-110' 
              : 'text-gray-400 group-hover:text-purple-500 group-hover:scale-105'
            }
          `}
        />
      </div>

      {/* Label */}
      <span className={`
        text-[0.65rem] font-medium tracking-wide leading-none
        ${isActive ? 'text-purple-600' : 'text-gray-400'}
      `}>
        {label}
      </span>
    </button>
  );
};