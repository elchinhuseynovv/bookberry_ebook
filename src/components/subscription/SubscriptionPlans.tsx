import React from 'react';
import { Check, X } from 'lucide-react';
import { subscriptionPlans } from '../../data/subscriptionPlans';
import { BillingPeriod } from '../../types/subscription';
import { az } from '../../constants/translations';

interface Props {
  selectedPeriod: BillingPeriod;
  onPeriodChange: (period: BillingPeriod) => void;
  onSubscribe: (planId: string) => void;
}

export const SubscriptionPlans: React.FC<Props> = ({
  selectedPeriod,
  onPeriodChange,
  onSubscribe
}) => {
  const filteredPlans = subscriptionPlans.filter(
    plan => !plan.billingPeriod || plan.billingPeriod === selectedPeriod
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Billing Period Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg">
          <div className="flex gap-1">
            <button
              onClick={() => onPeriodChange('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === 'monthly'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {az.subscription.monthly}
            </button>
            <button
              onClick={() => onPeriodChange('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === 'yearly'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {az.subscription.yearly}
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6
              border-2 transition-all duration-300
              ${plan.tier === 'premium'
                ? 'border-purple-400 dark:border-purple-500 shadow-xl shadow-purple-500/10'
                : 'border-gray-200 dark:border-gray-700 shadow-lg'
              }
            `}
          >
            {/* Popular Badge */}
            {plan.tier === 'premium' && selectedPeriod === 'yearly' && (
              <div className="absolute top-5 right-5">
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {az.subscription.bestValue}
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {plan.price > 0 ? 'AZN' : ''}
                </span>
                {plan.billingPeriod && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    /{plan.billingPeriod === 'monthly' ? az.subscription.perMonth : az.subscription.perYear}
                  </span>
                )}
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {plan.tier === 'premium' ? (
                    <Check className="h-5 w-5 text-purple-500" />
                  ) : (
                    <X className="h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Subscribe Button */}
            <button
              onClick={() => onSubscribe(plan.id)}
              className={`
                w-full rounded-xl px-6 py-3 font-medium transition-all
                ${plan.tier === 'premium'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {plan.tier === 'free' ? az.subscription.currentPlan : az.subscription.subscribe}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};