import React, { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  className?: string;
}

export const SettingHeader: React.FC<Props> = ({ icon, title, className = '' }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className={`rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm p-2 ${className}`}>
        {icon}
      </div>
      <h2 className={`text-lg font-bold ${className}`}>{title}</h2>
    </div>
  );
};