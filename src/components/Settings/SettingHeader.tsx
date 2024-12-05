import React, { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  className?: string;
}

export const SettingHeader: React.FC<Props> = ({ icon, title, className = '' }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`rounded-xl bg-white/50 p-2 dark:bg-white/5 ${className}`}>
        {icon}
      </div>
      <h2 className={`text-xl font-bold ${className}`}>{title}</h2>
    </div>
  );
};