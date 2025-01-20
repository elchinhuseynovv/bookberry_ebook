import React from 'react';
import { Grape } from 'lucide-react';
import { az } from '../constants/translations';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900">
      <div className="relative mb-8 transform scale-150">
        {/* Logo Container with Glow Effect */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-0 blur-xl bg-purple-400/30 dark:bg-purple-600/30 rounded-full" />
          </div>
          <Grape 
            size={96}
            className="text-purple-600 dark:text-purple-400 transform -rotate-45 relative z-10" 
            style={{ 
              filter: 'drop-shadow(0 8px 16px rgba(124, 58, 237, 0.3))',
              animation: 'float 3s ease-in-out infinite'
            }}
          />
          {/* Decorative Dot */}
          <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-blue-400">
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping" />
          </div>
        </div>
      </div>

      {/* App Name with Fade In Animation */}
      <div className="space-y-2 text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h1 className="text-5xl font-bold text-purple-600 dark:text-purple-400 tracking-tight">
          {az.appName}
        </h1>
        <p className="text-purple-500/70 dark:text-purple-300/70">
          Rəqəmsal Kitabxana
        </p>
      </div>

      {/* Add custom floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(-45deg); }
            50% { transform: translateY(-10px) rotate(-45deg); }
          }
        `}
      </style>
    </div>
  );
};