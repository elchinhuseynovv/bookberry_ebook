import React from 'react';
import { CreditCard } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { SubscriptionPlans } from '../subscription/SubscriptionPlans';
import { useSubscription } from '../../hooks/useSubscription';
import { useAuth } from '../../hooks/useAuth';
import { az } from '../../constants/translations';

export const SubscriptionSection: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    subscription,
    selectedPeriod,
    setSelectedPeriod,
    handleSubscribe,
    cancelSubscription
  } = useSubscription(currentUser?.id || '');

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<CreditCard size={24} />}
        title={az.settings.subscription}
        className="text-emerald-700 dark:text-emerald-400"
      />

      <SubscriptionPlans
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        onSubscribe={handleSubscribe}
      />

      {subscription && subscription.status === 'active' && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={cancelSubscription}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            {az.subscription.cancel}
          </button>
        </div>
      )}
    </div>
  );
};