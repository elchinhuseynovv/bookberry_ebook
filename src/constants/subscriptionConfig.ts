export const SUBSCRIPTION_CONFIG = {
  prices: {
    monthly: 5,
    yearly: 50
  },
  limits: {
    free: {
      books: 5,
      audiobooks: 2
    },
    premium: {
      books: Infinity,
      audiobooks: Infinity
    }
  }
} as const;