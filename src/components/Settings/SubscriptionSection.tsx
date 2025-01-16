import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { SubscriptionSelector } from '../subscription/SubscriptionSelector';
import { SubscriptionPlan } from '../../types/subscription';

interface Props {
  currentPlan: SubscriptionPlan;
  onPlanChange: (plan: SubscriptionPlan) => void;
}

export const SubscriptionSection: React.FC<Props> = ({ currentPlan, onPlanChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<CreditCard size={24} />}
        title={t('subscription.title')}
        className="text-orange-700 dark:text-orange-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('subscription.currentPlan')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {currentPlan.name} - {currentPlan.price === 0 ? t('subscription.free') : `${currentPlan.price} ${t('subscription.currency')}`}
            {currentPlan.billingPeriod && ` / ${t(`subscription.${currentPlan.billingPeriod}`)}`}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <SubscriptionSelector onSelect={onPlanChange} />
        </div>
      </div>
    </div>
  );
};