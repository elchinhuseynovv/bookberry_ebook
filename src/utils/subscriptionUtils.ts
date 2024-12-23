import { UserSubscription } from '../types/subscription';

export const isSubscriptionActive = (subscription: UserSubscription | null): boolean => {
  if (!subscription) return false;
  return subscription.status === 'active' && new Date(subscription.endDate) > new Date();
};

export const getSubscriptionTier = (subscription: UserSubscription | null): 'free' | 'premium' => {
  if (!subscription || !isSubscriptionActive(subscription)) return 'free';
  return subscription.planId.includes('premium') ? 'premium' : 'free';
};

export const calculateEndDate = (planId: string): Date => {
  const endDate = new Date();
  if (planId.includes('yearly')) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    endDate.setMonth(endDate.getMonth() + 1);
  }
  return endDate;
};