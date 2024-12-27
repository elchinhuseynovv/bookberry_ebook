import React, { useState } from 'react';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import { Logo } from '../Logo';
import { SubscriptionSelector } from '../subscription/SubscriptionSelector';
import { SubscriptionPlan } from '../../types/subscription';
import { az } from '../../constants/translations';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscriptionPlan: SubscriptionPlan | null;
}

interface Props {
  onSignUp: (data: SignUpFormData) => void;
  onBackToLogin: () => void;
}

export const SignUpPage: React.FC<Props> = ({ onSignUp, onBackToLogin }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    subscriptionPlan: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(az.auth.passwordsDoNotMatch);
      return;
    }
    if (!formData.subscriptionPlan) {
      alert(az.subscription.selectPlanRequired);
      return;
    }
    onSignUp(formData);
  };

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setFormData({ ...formData, subscriptionPlan: plan });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
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
            {az.auth.createAccount}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {az.auth.fillDetails}
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {az.auth.name}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                         transition-colors pl-12"
                placeholder={az.auth.namePlaceholder}
                required
              />
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {az.auth.confirmPassword}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                         transition-colors pl-12"
                placeholder={az.auth.confirmPasswordPlaceholder}
                required
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="mt-8">
            <SubscriptionSelector onSelect={handlePlanSelect} />
          </div>

          {/* Terms and Submit button */}
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                required
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                {az.auth.acceptTerms}{' '}
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  {az.auth.termsAndConditions}
                </button>
              </span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl
                       hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                       transition-colors font-medium"
            >
              <UserPlus size={20} />
              {az.auth.createAccount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};