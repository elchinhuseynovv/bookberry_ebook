import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDynamicTitles } from '../../utils/dynamicTitles';

export const LogoutButton: React.FC = () => {
  const { handleLogout } = useAuth();
  const { getLogoutTitle } = useDynamicTitles();

  const handleClick = () => {
    handleLogout();
    // Force a page reload to ensure clean state
    window.location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-red-600 
                 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50
                 transition-colors duration-200"
    >
      <LogOut size={20} />
      <span>{getLogoutTitle()}</span>
    </button>
  );
};