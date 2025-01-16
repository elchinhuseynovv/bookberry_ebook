import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubscriptionCard } from './SubscriptionCard';
import { subscriptionPlans } from '../../constants/subscriptionPlans';
import { SubscriptionPlan } from '../../types/subscription';

interface Props {
  onSelect: (plan: SubscriptionPlan) => void;
}

export const SubscriptionSelector: React.FC<Props> = ({ onSelect }) => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<string>('free');

  const handleSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan.id);
    onSelect(plan);
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};