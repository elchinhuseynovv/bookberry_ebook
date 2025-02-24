import { useState, useEffect } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async ({ email, password }: LoginData) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data.user;
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(authError.message);
    }
  };

  const handleSignUp = async ({ name, email, password }: SignUpData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) throw error;
      return data.user;
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(authError.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setCurrentUser(null);
      setIsAuthenticated(false);
      setShowSignUp(false);
      setShowResetPassword(false);

      // Clear any stored auth data
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('favorites');
      localStorage.removeItem('bookmarks');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(authError.message);
    }
  };

  return {
    isAuthenticated,
    currentUser,
    loading,
    showSignUp,
    showResetPassword,
    setShowSignUp,
    setShowResetPassword,
    handleLogin,
    handleSignUp,
    handleLogout,
    handleResetPassword
  };
};