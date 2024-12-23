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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await onLogin(formData);
    } catch (err) {
      setError(az.auth.invalidCredentials);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {az.auth.login}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

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

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            >
              {az.auth.forgotPassword}
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl
                     hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                     transition-colors font-medium"
          >
            <LogIn size={20} />
            {az.auth.login}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSignUp}
              className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            >
              {az.auth.createAccount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};