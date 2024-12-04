import { ReadingPreferences, NotificationSettings, AccessibilitySettings, UserProfile, SecuritySettings } from '../types';

const STORAGE_KEYS = {
  READING_PREFERENCES: 'bookberry_reading_preferences',
  NOTIFICATION_SETTINGS: 'bookberry_notification_settings',
  ACCESSIBILITY_SETTINGS: 'bookberry_accessibility_settings',
  USER_PROFILE: 'bookberry_user_profile',
  SECURITY_SETTINGS: 'bookberry_security_settings'
} as const;

export const storage = {
  getReadingPreferences(): ReadingPreferences | null {
    const stored = localStorage.getItem(STORAGE_KEYS.READING_PREFERENCES);
    return stored ? JSON.parse(stored) : null;
  },

  setReadingPreferences(preferences: ReadingPreferences): void {
    localStorage.setItem(STORAGE_KEYS.READING_PREFERENCES, JSON.stringify(preferences));
  },

  getNotificationSettings(): NotificationSettings | null {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
    return stored ? JSON.parse(stored) : null;
  },

  setNotificationSettings(settings: NotificationSettings): void {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
  },

  getAccessibilitySettings(): AccessibilitySettings | null {
    const stored = localStorage.getItem(STORAGE_KEYS.ACCESSIBILITY_SETTINGS);
    return stored ? JSON.parse(stored) : null;
  },

  setAccessibilitySettings(settings: AccessibilitySettings): void {
    localStorage.setItem(STORAGE_KEYS.ACCESSIBILITY_SETTINGS, JSON.stringify(settings));
  },

  getUserProfile(): UserProfile | null {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return stored ? JSON.parse(stored) : null;
  },

  setUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getSecuritySettings(): SecuritySettings | null {
    const stored = localStorage.getItem(STORAGE_KEYS.SECURITY_SETTINGS);
    return stored ? JSON.parse(stored) : null;
  },

  setSecuritySettings(settings: SecuritySettings): void {
    localStorage.setItem(STORAGE_KEYS.SECURITY_SETTINGS, JSON.stringify(settings));
  },

  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
};