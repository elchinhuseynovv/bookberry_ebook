import React, { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  className?: string;
}

export const SettingHeader: React.FC<Props> = ({ icon, title, className = '' }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
      <div className={`rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm p-2 sm:p-2.5 ${className}`}>
        {icon}
      </div>
      <h2 className={`text-lg sm:text-xl font-bold ${className}`}>{title}</h2>
    </div>
  );
};