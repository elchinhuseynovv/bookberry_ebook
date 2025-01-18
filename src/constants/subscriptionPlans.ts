import { SubscriptionPlan } from '../types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    tier: 'free',
    name: 'freePlan',
    price: 0,
    features: [
      'basicAccess',
      'limitedBooks',
      'adsSupported'
    ]
  },
  {
    id: 'premium-monthly',
    tier: 'premium',
    name: 'premiumPlan',
    price: 7,
    billingPeriod: 'monthly',
    features: [
      'fullAccess',
      'unlimitedBooks',
      'noAds',
      'offlineReading',
      'prioritySupport',
      'audiobooks',
      'deviceSync',
      'customCollections',
      'readingStats',
      'bookmarks',
      'highlights'
    ]
  },
  {
    id: 'premium-yearly',
    tier: 'premium',
    name: 'premiumPlan',
    price: 70,
    billingPeriod: 'yearly',
    features: [
      'fullAccess',
      'unlimitedBooks',
      'noAds',
      'offlineReading',
      'prioritySupport',
      'audiobooks',
      'deviceSync',
      'customCollections',
      'readingStats',
      'bookmarks',
      'highlights'
    ]
  }
];