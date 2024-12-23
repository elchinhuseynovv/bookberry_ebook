import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { authDB } from '../services/database/auth';
import { storage } from '../services/storage';

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await authDB.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleLogin = async (data: LoginData) => {
    try {
      const user = await authDB.login(data);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const user = await authDB.register({
        name: data.name,
        email: data.email,
        password: data.password
      });

      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    storage.clearCurrentUserEmail();
    setShowSignUp(false);
    setShowResetPassword(false);
  };

  return {
    isAuthenticated,
    currentUser,
    showSignUp,
    showResetPassword,
    setShowSignUp,
    setShowResetPassword,
    handleLogin,
    handleSignUp,
    handleLogout
  };
};