import { useState, useEffect } from 'react';
import { UserSubscription, BillingPeriod } from '../types/subscription';
import { storage } from '../services/storage';
import { calculateEndDate } from '../utils/subscriptionUtils';

export const useSubscription = (userId: string) => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<BillingPeriod>('monthly');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = () => {
      const savedSubscription = storage.getUserSubscription(userId);
      if (savedSubscription) {
        setSubscription(savedSubscription);
      }
      setIsLoading(false);
    };

    loadSubscription();
  }, [userId]);

  const handleSubscribe = async (planId: string) => {
    const now = new Date();
    const endDate = calculateEndDate(planId);

    const newSubscription: UserSubscription = {
      userId,
      planId,
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      status: 'active',
      autoRenew: true
    };

    storage.setUserSubscription(userId, newSubscription);
    setSubscription(newSubscription);
  };

  const cancelSubscription = () => {
    if (subscription) {
      const updatedSubscription = {
        ...subscription,
        status: 'cancelled',
        autoRenew: false
      };
      storage.setUserSubscription(userId, updatedSubscription);
      setSubscription(updatedSubscription);
    }
  };

  return {
    subscription,
    selectedPeriod,
    setSelectedPeriod,
    handleSubscribe,
    cancelSubscription,
    isLoading
  };
};