import React from 'react';
import { ProfileSection } from './ProfileSection';
import { ReadingPreferencesSection } from './ReadingPreferencesSection';
import { NotificationsSection } from './NotificationsSection';
import { AccessibilitySection } from './AccessibilitySection';
import { UserProfile, ReadingPreferences, NotificationSettings, AccessibilitySettings } from '../../types';

const defaultProfile: UserProfile = {
  name: 'İstifadəçi',
  email: 'istifadeci@example.com',
  preferredLanguage: 'az',
  readingGoal: 4
};

const defaultReadingPreferences: ReadingPreferences = {
  fontSize: 16,
  lineSpacing: 1.5,
  fontFamily: 'Quicksand',
  textAlignment: 'left',
  autoPlayAudio: false,
  showPageNumber: true,
  highlightLinks: true
};

const defaultNotificationSettings: NotificationSettings = {
  dailyReminder: true,
  reminderTime: '20:00',
  weeklyProgress: true,
  newBookAlerts: true,
  systemNotifications: true
};

const defaultAccessibilitySettings: AccessibilitySettings = {
  highContrast: false,
  reduceAnimations: false,
  screenReader: false,
  dyslexicFont: false,
  textToSpeech: false
};

export const SettingsView: React.FC = () => {
  const handleProfileSave = (profile: UserProfile) => {
    console.log('Saving profile:', profile);
  };

  const handleReadingPreferencesSave = (preferences: ReadingPreferences) => {
    console.log('Saving reading preferences:', preferences);
  };

  const handleNotificationsSave = (settings: NotificationSettings) => {
    console.log('Saving notification settings:', settings);
  };

  const handleAccessibilitySave = (settings: AccessibilitySettings) => {
    console.log('Saving accessibility settings:', settings);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <ProfileSection profile={defaultProfile} onSave={handleProfileSave} />
      <ReadingPreferencesSection preferences={defaultReadingPreferences} onSave={handleReadingPreferencesSave} />
      <NotificationsSection settings={defaultNotificationSettings} onSave={handleNotificationsSave} />
      <AccessibilitySection settings={defaultAccessibilitySettings} onSave={handleAccessibilitySave} />
    </div>
  );
};