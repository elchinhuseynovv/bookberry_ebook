import { useState } from 'react';

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
  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = (data: LoginData) => {
    console.log('Login attempt:', data);
    setIsAuthenticated(true);
  };

  const handleSignUp = (data: SignUpData) => {
    console.log('Sign up attempt:', data);
    setIsAuthenticated(true);
  };

  const handleResetPassword = (email: string) => {
    console.log('Reset password attempt for:', email);
  };

  return {
    isAuthenticated,
    showSignUp,
    showResetPassword,
    setShowSignUp,
    setShowResetPassword,
    handleLogin,
    handleSignUp,
    handleResetPassword
  };
};