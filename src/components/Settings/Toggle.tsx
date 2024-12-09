import React from 'react';

interface Props {
  enabled: boolean;
  onChange: () => void;
  size?: 'sm' | 'md';
  color?: string;
}

export const Toggle: React.FC<Props> = ({ 
  enabled, 
  onChange, 
  size = 'md',
  color = 'purple'
}) => {
  const sizes = {
    sm: {
      toggle: 'h-5 w-9',
      circle: 'h-3 w-3',
      translate: 'translate-x-4'
    },
    md: {
      toggle: 'h-6 w-11',
      circle: 'h-4 w-4',
      translate: 'translate-x-6'
    }
  };

  const colors = {
    purple: 'bg-purple-600',
    blue: 'bg-blue-600',
    pink: 'bg-pink-600',
    indigo: 'bg-indigo-600',
    green: 'bg-green-600'
  };

  return (
    <button
      onClick={onChange}
      className={`
        relative inline-flex ${sizes[size].toggle} items-center rounded-full 
        transition-colors duration-300
        ${enabled 
          ? colors[color as keyof typeof colors]
          : 'bg-gray-200 dark:bg-gray-700'
        }
      `}
    >
      <span
        className={`
          inline-block ${sizes[size].circle} transform rounded-full 
          bg-white shadow-lg
          transition-transform duration-300
          ${enabled ? sizes[size].translate : 'translate-x-1'}
        `}
      />
    </button>
  );
};