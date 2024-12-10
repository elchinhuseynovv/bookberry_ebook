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
        flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl font-medium text-sm
        transition-all duration-300 transform whitespace-nowrap
        ${isActive
          ? `bg-gradient-to-r ${gradient} text-white ${shadow}`
          : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-opacity-90 backdrop-blur-sm'
        }
        shadow-md hover:shadow-lg
      `}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};