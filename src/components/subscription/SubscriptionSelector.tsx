import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubscriptionCard } from './SubscriptionCard';
import { subscriptionPlans } from '../../constants/subscriptionPlans';
import { SubscriptionPlan } from '../../types/subscription';
import { CreditCard, X } from 'lucide-react';

interface Props {
  onSelect: (plan: SubscriptionPlan) => void;
}

export const SubscriptionSelector: React.FC<Props> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan.id);
    setShowPaymentButton(plan.tier !== 'free');
    onSelect(plan);
  };

  const handleContinueToPayment = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('subscription.choosePlan')}
      </h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={() => handleSelect(plan)}
          />
        ))}
      </div>

      {/* Continue to Payment Section */}
      {showPaymentButton && (
        <div className="flex justify-center pt-8">
          <button
            onClick={handleContinueToPayment}
            className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl
                     hover:bg-purple-700 transition-colors duration-300 font-medium
                     shadow-lg shadow-purple-200 dark:shadow-purple-900/20"
          >
            <CreditCard className="w-5 h-5" />
            {t('subscription.continueToPayment')}
          </button>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <button
              onClick={handleClosePaymentModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('subscription.payment.title')}
              </h3>

              <div className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('subscription.payment.cardNumber')}
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none"
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('subscription.payment.expiry')}
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('subscription.payment.cvv')}
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('subscription.payment.nameOnCard')}
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none"
                  />
                </div>

                {/* Pay Button */}
                <button
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl
                           hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                           transition-colors font-medium mt-4"
                >
                  <CreditCard className="w-5 h-5" />
                  {t('subscription.payment.payNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};