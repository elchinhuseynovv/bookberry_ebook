import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  isActive: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  gradient: string;
  activeGradient: string;
  borderColor: string;
  shadowColor: string;
}

export const SettingsTab: React.FC<Props> = ({
  isActive,
  onClick,
  icon: Icon,
  label,
  gradient,
  activeGradient,
  borderColor,
  shadowColor
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2.5 rounded-xl
        border-2 ${borderColor}
        font-medium text-sm transition-all duration-300
        hover:scale-[1.02] active:scale-[0.98]
        ${isActive
          ? `bg-gradient-to-r ${activeGradient} text-white shadow-lg ${shadowColor}`
          : `bg-gradient-to-r ${gradient} text-gray-700 dark:text-gray-200 shadow-md ${shadowColor}`
        }
      `}
    >
      <Icon size={18} className={isActive ? 'text-white' : ''} />
      <span className="hidden sm:inline whitespace-nowrap">{label}</span>
    </button>
  );
};