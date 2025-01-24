// Storage keys
const CURRENT_USER_EMAIL = 'bookberry_current_user_email';
const USER_PROFILE = 'bookberry_user_profile';
const SECURITY_SETTINGS = 'bookberry_security_settings';
const READING_PREFERENCES = 'bookberry_reading_preferences';
const NOTIFICATION_SETTINGS = 'bookberry_notification_settings';
const ACCESSIBILITY_SETTINGS = 'bookberry_accessibility_settings';
const READING_PREFERENCES_KEY = 'bookberry_reading_preferences';

// Helper functions
const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item from storage (${key}):`, error);
    return null;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in storage (${key}):`, error);
  }
};

export const storage = {
  // User email
  getCurrentUserEmail(): string | null {
    return localStorage.getItem(CURRENT_USER_EMAIL);
  },

  setCurrentUserEmail(email: string): void {
    localStorage.setItem(CURRENT_USER_EMAIL, email);
  },

  clearCurrentUserEmail(): void {
    localStorage.removeItem(CURRENT_USER_EMAIL);
  },

  // User profile
  getUserProfile() {
    return getItem(USER_PROFILE);
  },

  setUserProfile(profile: any) {
    setItem(USER_PROFILE, profile);
  },

  // Security settings
  getSecuritySettings() {
    return getItem(SECURITY_SETTINGS);
  },

  setSecuritySettings(settings: any) {
    setItem(SECURITY_SETTINGS, settings);
  },

  // Reading preferences
  async setReadingPreferences(preferences: any): Promise<void> {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        try {
          localStorage.setItem(READING_PREFERENCES_KEY, JSON.stringify(preferences));
          // Apply preferences to document
          this.applyReadingPreferences(preferences);
          resolve();
        } catch (error) {
          console.error('Error saving reading preferences:', error);
          throw error;
        }
      }, 500);
    });
  },

  getReadingPreferences(): any {
    try {
      const stored = localStorage.getItem(READING_PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error getting reading preferences:', error);
      return null;
    }
  },

  applyReadingPreferences(preferences: any): void {
    if (!preferences) return;

    // Apply font size
    document.documentElement.style.setProperty('--reading-font-size', `${preferences.fontSize}px`);

    // Apply text alignment
    document.documentElement.style.setProperty('--text-align', preferences.textAlignment);

    // Apply link highlighting
    document.documentElement.classList.toggle('highlight-links', preferences.highlightLinks);

    // Apply page numbers
    document.documentElement.classList.toggle('show-page-numbers', preferences.showPageNumber);
  },

  // Notification settings
  getNotificationSettings() {
    return getItem(NOTIFICATION_SETTINGS);
  },

  setNotificationSettings(settings: any) {
    setItem(NOTIFICATION_SETTINGS, settings);
  },

  // Accessibility settings
  getAccessibilitySettings() {
    return getItem(ACCESSIBILITY_SETTINGS);
  },

  setAccessibilitySettings(settings: any) {
    setItem(ACCESSIBILITY_SETTINGS, settings);
  }
};