import React, { useState } from 'react';
import { KeyRound, Mail, ArrowLeft, Send } from 'lucide-react';
import { Logo } from '../Logo';
import { useDynamicTitles } from '../../utils/dynamicTitles';
import { az } from '../../constants/translations';

interface Props {
  onBackToLogin: () => void;
  onResetPassword: (email: string) => void;
}

export const ResetPasswordPage: React.FC<Props> = ({ onBackToLogin, onResetPassword }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { getResetPasswordTitle } = useDynamicTitles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResetPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Back Button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft size={20} />
          {az.auth.backToLogin}
        </button>

        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {getResetPasswordTitle()}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {az.auth.resetPasswordDescription}
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
              <Send size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {az.auth.checkYourEmail}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {az.auth.resetEmailSent}
            </p>
            <button
              onClick={onBackToLogin}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl
                       hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                       transition-colors font-medium"
            >
              {az.auth.backToLogin}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {az.auth.email}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl
                       hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                       transition-colors font-medium"
            >
              <KeyRound size={20} />
              {az.auth.sendResetLink}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};