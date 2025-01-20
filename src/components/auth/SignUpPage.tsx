import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, ArrowLeft, CreditCard } from 'lucide-react';
import { Logo } from '../Logo';
import { SubscriptionSelector } from '../subscription/SubscriptionSelector';
import { SubscriptionPlan } from '../../types/subscription';
import { AuthLanguageSelector } from './LanguageSelector';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscriptionPlan: SubscriptionPlan | null;
  paymentDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
}

interface Props {
  onSignUp: (data: SignUpFormData) => void;
  onBackToLogin: () => void;
}

export const SignUpPage: React.FC<Props> = ({ onSignUp, onBackToLogin }) => {
  const { t } = useTranslation();
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('profile.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('profile.emailRequired');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsDoNotMatch');
    }

    if (!formData.subscriptionPlan) {
      newErrors.subscription = t('subscription.selectPlanRequired');
    }

    // Validate payment details for premium plans
    if (formData.subscriptionPlan?.tier === 'premium') {
      if (!formData.paymentDetails?.cardNumber) {
        newErrors.cardNumber = t('subscription.payment.cardNumberRequired');
      }
      if (!formData.paymentDetails?.expiryDate) {
        newErrors.expiryDate = t('subscription.payment.expiryRequired');
      }
      if (!formData.paymentDetails?.cvv) {
        newErrors.cvv = t('subscription.payment.cvvRequired');
      }
      if (!formData.paymentDetails?.nameOnCard) {
        newErrors.nameOnCard = t('subscription.payment.nameRequired');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSignUp(formData);
    }
  };

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setFormData({ 
      ...formData, 
      subscriptionPlan: plan,
      // Reset payment details when switching plans
      paymentDetails: plan.tier === 'premium' ? {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
      } : undefined
    });
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
          {t('auth.backToLogin')}
        </button>

        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('auth.createAccount')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {t('auth.fillDetails')}
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {t('auth.name')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.name ? 'border-red-300' : 'border-gray-200'
                } dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                transition-colors pl-12`}
                placeholder={t('auth.namePlaceholder')}
              />
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {t('auth.email')}
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                } dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                transition-colors pl-12`}
                placeholder={t('auth.emailPlaceholder')}
              />
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t('auth.password')}
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
                  placeholder={t('auth.passwordPlaceholder')}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t('auth.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                  } dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                  transition-colors pl-12`}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
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
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="mt-8">
            <SubscriptionSelector onSelect={handlePlanSelect} />
            {errors.subscription && (
              <p className="mt-1 text-sm text-red-500">{errors.subscription}</p>
            )}
          </div>

          {/* Payment Details for Premium Plans */}
          {formData.subscriptionPlan?.tier === 'premium' && (
            <div className="space-y-6 rounded-2xl border-2 border-purple-100 dark:border-purple-900/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('subscription.payment.title')}
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t('subscription.payment.cardNumber')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.paymentDetails?.cardNumber || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentDetails: {
                          ...formData.paymentDetails,
                          cardNumber: e.target.value
                        }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.cardNumber ? 'border-red-300' : 'border-gray-200'
                      } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none pl-12`}
                      placeholder="1234 5678 9012 3456"
                    />
                    <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Name on Card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t('subscription.payment.nameOnCard')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.paymentDetails?.nameOnCard || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentDetails: {
                          ...formData.paymentDetails,
                          nameOnCard: e.target.value
                        }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.nameOnCard ? 'border-red-300' : 'border-gray-200'
                      } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none pl-12`}
                      placeholder="John Doe"
                    />
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.nameOnCard && (
                    <p className="mt-1 text-sm text-red-500">{errors.nameOnCard}</p>
                  )}
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t('subscription.payment.expiry')}
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetails?.expiryDate || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      paymentDetails: {
                        ...formData.paymentDetails,
                        expiryDate: e.target.value
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.expiryDate ? 'border-red-300' : 'border-gray-200'
                    } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none`}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                  )}
                </div>

                {/* CVV */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t('subscription.payment.cvv')}
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetails?.cvv || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      paymentDetails: {
                        ...formData.paymentDetails,
                        cvv: e.target.value
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.cvv ? 'border-red-300' : 'border-gray-200'
                    } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

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
                {t('auth.acceptTerms')}{' '}
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  {t('auth.termsAndConditions')}
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
              {t('auth.createAccount')}
            </button>

            <div className="pt-4 text-center">
              <AuthLanguageSelector />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};