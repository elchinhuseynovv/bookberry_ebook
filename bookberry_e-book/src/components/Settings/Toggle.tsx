import React from 'react';

interface Props {
  enabled: boolean;
  onChange: () => void;
  size?: 'sm' | 'md';
}

export const Toggle: React.FC<Props> = ({ enabled, onChange, size = 'md' }) => {
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

  return (
    <button
      onClick={onChange}
      className={`relative inline-flex ${sizes[size].toggle} items-center rounded-full transition-colors ${
        enabled ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block ${sizes[size].circle} transform rounded-full bg-white transition-transform ${
          enabled ? sizes[size].translate : 'translate-x-1'
        }`}
      />
    </button>
  );
};