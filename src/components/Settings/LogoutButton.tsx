import React from 'react';
import { LogOut } from 'lucide-react';
import { az } from '../../constants/translations';

interface Props {
  onLogout: () => void;
}

export const LogoutButton: React.FC<Props> = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-red-600 
                 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50
                 transition-colors duration-200"
    >
      <LogOut size={20} />
      <span>{az.auth.logout}</span>
    </button>
  );
};