import React from 'react';
import { Grape } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Grape 
          size={32} 
          className="text-purple-600 transform -rotate-45" 
          style={{ filter: 'drop-shadow(0 2px 4px rgba(124, 58, 237, 0.3))' }}
        />
        <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-blue-400" />
      </div>
    </div>
  );
};