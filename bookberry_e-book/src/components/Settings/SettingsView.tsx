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
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl p-8 shadow-lg">
        <ProfileSection profile={defaultProfile} onSave={handleProfileSave} />
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8 shadow-lg">
        <ReadingPreferencesSection preferences={defaultReadingPreferences} onSave={handleReadingPreferencesSave} />
      </div>
      
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-3xl p-8 shadow-lg">
        <NotificationsSection settings={defaultNotificationSettings} onSave={handleNotificationsSave} />
      </div>
      
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-3xl p-8 shadow-lg">
        <AccessibilitySection settings={defaultAccessibilitySettings} onSave={handleAccessibilitySave} />
      </div>
    </div>
  );
};