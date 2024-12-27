import { SubscriptionPlan } from '../types/subscription';
import { az } from './translations';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    tier: 'free',
    name: az.subscription.freePlan,
    price: 0,
    features: [
      az.subscription.features.basicAccess,
      az.subscription.features.limitedBooks,
      az.subscription.features.adsSupported
    ]
  },
  {
    id: 'premium-monthly',
    tier: 'premium',
    name: az.subscription.premiumPlan,
    price: 5,
    billingPeriod: 'monthly',
    features: [
      az.subscription.features.fullAccess,
      az.subscription.features.unlimitedBooks,
      az.subscription.features.noAds,
      az.subscription.features.offlineReading,
      az.subscription.features.prioritySupport
    ]
  },
  {
    id: 'premium-yearly',
    tier: 'premium',
    name: az.subscription.premiumPlan,
    price: 50,
    billingPeriod: 'yearly',
    features: [
      az.subscription.features.fullAccess,
      az.subscription.features.unlimitedBooks,
      az.subscription.features.noAds,
      az.subscription.features.offlineReading,
      az.subscription.features.prioritySupport
    ]
  }
];