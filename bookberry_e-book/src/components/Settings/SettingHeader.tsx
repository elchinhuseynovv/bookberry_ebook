import React, { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  className?: string;
}

export const SettingHeader: React.FC<Props> = ({ icon, title, className = '' }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`${className}`}>
        {icon}
      </div>
      <h2 className={`text-2xl font-bold ${className}`}>{title}</h2>
    </div>
  );
};