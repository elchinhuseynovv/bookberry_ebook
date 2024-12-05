import React from 'react';
import { Grape } from 'lucide-react';
import { az } from '../constants/translations';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900">
      <div className="relative mb-4">
        <Grape 
          size={80}
          className="text-purple-600 transform -rotate-45 animate-pulse" 
          style={{ filter: 'drop-shadow(0 4px 8px rgba(124, 58, 237, 0.5))' }}
        />
        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-blue-400 animate-ping" />
      </div>
      <h1 className="text-4xl font-bold text-purple-600 tracking-tight opacity-0 animate-fade-in">
        {az.appName}
      </h1>
    </div>
  );
};