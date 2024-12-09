import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  isActive: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  gradient: string;
  shadow: string;
}

export const SettingsTab: React.FC<Props> = ({
  isActive,
  onClick,
  icon: Icon,
  label,
  gradient,
  shadow
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium
        transition-all duration-300 transform whitespace-nowrap text-sm sm:text-base
        ${isActive
          ? `bg-gradient-to-r ${gradient} text-white ${shadow} scale-105`
          : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:scale-105 backdrop-blur-sm'
        }
        shadow-lg hover:shadow-xl
      `}
    >
      <Icon size={20} />
      {label}
    </button>
  );
};