// Add these functions to your existing storage.ts file

const CURRENT_USER_EMAIL = 'bookberry_current_user_email';

// Add these methods to your storage object
export const storage = {
  // ... existing methods ...

  getCurrentUserEmail(): string | null {
    return localStorage.getItem(CURRENT_USER_EMAIL);
  },

  setCurrentUserEmail(email: string): void {
    localStorage.setItem(CURRENT_USER_EMAIL, email);
  },

  clearCurrentUserEmail(): void {
    localStorage.removeItem(CURRENT_USER_EMAIL);
  }
};