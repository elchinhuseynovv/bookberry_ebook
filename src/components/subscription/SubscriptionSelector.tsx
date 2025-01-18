import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubscriptionCard } from './SubscriptionCard';
import { subscriptionPlans } from '../../constants/subscriptionPlans';
import { SubscriptionPlan } from '../../types/subscription';
import { CreditCard } from 'lucide-react';

interface Props {
  onSelect: (plan: SubscriptionPlan) => void;
}

export const SubscriptionSelector: React.FC<Props> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  const handleSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan.id);
    setShowPaymentButton(plan.tier !== 'free');
    onSelect(plan);
  };

  const handleContinueToPayment = () => {
    // Here you would typically handle the payment flow
    console.log('Continuing to payment for plan:', selectedPlan);
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
    </div>
  );
};