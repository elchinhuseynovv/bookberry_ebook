// Add these functions to the existing storage.ts file

const USER_SUBSCRIPTION = 'bookberry_user_subscription_';

export const storage = {
  // ... existing storage methods ...

  getUserSubscription(userId: string) {
    return getItem(`${USER_SUBSCRIPTION}${userId}`);
  },

  setUserSubscription(userId: string, subscription: any) {
    setItem(`${USER_SUBSCRIPTION}${userId}`, subscription);
  }
};