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
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
      const user = await authDB.login(data);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        storage.setCurrentUserEmail(user.email);
      }
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    try {
      setError(null);
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const user = await authDB.register({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        storage.setCurrentUserEmail(user.email);
      }
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    storage.clearCurrentUserEmail();
  };

  return {
    isAuthenticated,
    currentUser,
    showSignUp,
    showResetPassword,
    error,
    setShowSignUp,
    setShowResetPassword,
    handleLogin,
    handleSignUp,
    handleLogout
  };
};