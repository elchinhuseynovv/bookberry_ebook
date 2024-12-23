import { SubscriptionPlan } from '../types/subscription';
import { az } from '../constants/translations';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    tier: 'free',
    name: az.subscription.freePlan,
    price: 0,
    features: [
      az.subscription.features.limitedBooks,
      az.subscription.features.basicFeatures,
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
      az.subscription.features.unlimitedBooks,
      az.subscription.features.noAds,
      az.subscription.features.offlineAccess,
      az.subscription.features.prioritySupport,
      az.subscription.features.exclusiveContent
    ]
  },
  {
    id: 'premium-yearly',
    tier: 'premium',
    name: az.subscription.premiumPlan,
    price: 50,
    billingPeriod: 'yearly',
    features: [
      az.subscription.features.unlimitedBooks,
      az.subscription.features.noAds,
      az.subscription.features.offlineAccess,
      az.subscription.features.prioritySupport,
      az.subscription.features.exclusiveContent,
      az.subscription.features.yearlyDiscount
    ]
  }
];