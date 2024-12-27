import React from 'react';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';
import { az } from '../../constants/translations';

interface Props {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export const SubscriptionCard: React.FC<Props> = ({ plan, isSelected, onSelect }) => {
  return (
    <div
      className={`
        relative rounded-2xl p-6 transition-all duration-300
        ${isSelected 
          ? 'bg-purple-50 border-2 border-purple-500 dark:bg-purple-900/30 dark:border-purple-400' 
          : 'bg-white border-2 border-gray-100 dark:bg-gray-800 dark:border-gray-700'
        }
      `}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {plan.name}
        </h3>
        <div className="mt-2">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {plan.price} AZN
          </span>
          {plan.billingPeriod && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              /{plan.billingPeriod === 'monthly' ? az.subscription.perMonth : az.subscription.perYear}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="mb-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Select Button */}
      <button
        onClick={onSelect}
        className={`
          w-full rounded-xl py-2.5 font-medium transition-colors
          ${isSelected
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50'
          }
        `}
      >
        {isSelected ? az.subscription.selected : az.subscription.select}
      </button>
    </div>
  );
};