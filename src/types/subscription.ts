export type SubscriptionTier = 'free' | 'premium';
export type BillingPeriod = 'monthly' | 'yearly';

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  price: number;
  billingPeriod?: BillingPeriod;
  features: string[];
}

export interface UserSubscription {
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
  autoRenew: boolean;
}