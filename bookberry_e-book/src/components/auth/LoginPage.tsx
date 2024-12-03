import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../Logo';
import { az } from '../../constants/translations';

interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  onLogin: (data: LoginFormData) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export const LoginPage: React.FC<Props> = ({ onLogin, onSignUp, onForgotPassword }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {az.auth.welcomeBack}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {az.auth.loginToContinue}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {az.auth.email}
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                         transition-colors pl-12"
                placeholder={az.auth.emailPlaceholder}
                required
              />
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {az.auth.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                         transition-colors pl-12"
                placeholder={az.auth.passwordPlaceholder}
                required
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                {az.auth.rememberMe}
              </span>
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            >
              {az.auth.forgotPassword}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl
                     hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                     transition-colors font-medium"
          >
            <LogIn size={20} />
            {az.auth.login}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            {az.auth.noAccount}{' '}
            <button
              type="button"
              onClick={onSignUp}
              className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              {az.auth.signUp}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};