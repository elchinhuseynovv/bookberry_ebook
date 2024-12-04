import React, { useState, useEffect } from 'react';
import { ProfileSection } from './ProfileSection';
import { SecuritySection } from './SecuritySection';
import { ReadingPreferencesSection } from './ReadingPreferencesSection';
import { NotificationsSection } from './NotificationsSection';
import { AccessibilitySection } from './AccessibilitySection';
import { 
  UserProfile, 
  ReadingPreferences, 
  NotificationSettings, 
  AccessibilitySettings,
  SecuritySettings 
} from '../../types';
import { Settings as SettingsIcon, BookOpen, Bell, Eye } from 'lucide-react';
import { az } from '../../constants/translations';
import { storage } from '../../services/storage';

type SettingsTab = 'account' | 'reading' | 'notifications' | 'accessibility';

const defaultProfile: UserProfile = {
  name: 'İstifadəçi',
  email: 'istifadeci@example.com',
  preferredLanguage: 'az',
  readingGoal: 4
};

const defaultSecuritySettings: SecuritySettings = {
  twoFactorEnabled: false,
  lastPasswordChange: new Date(),
  securityQuestions: []
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
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(defaultSecuritySettings);
  const [readingPreferences, setReadingPreferences] = useState<ReadingPreferences>(defaultReadingPreferences);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings);

  // Load saved settings on component mount
  useEffect(() => {
    const savedProfile = storage.getUserProfile();
    if (savedProfile) setProfile(savedProfile);

    const savedSecurity = storage.getSecuritySettings();
    if (savedSecurity) setSecuritySettings(savedSecurity);

    const savedReadingPrefs = storage.getReadingPreferences();
    if (savedReadingPrefs) setReadingPreferences(savedReadingPrefs);

    const savedNotifications = storage.getNotificationSettings();
    if (savedNotifications) setNotificationSettings(savedNotifications);

    const savedAccessibility = storage.getAccessibilitySettings();
    if (savedAccessibility) setAccessibilitySettings(savedAccessibility);
  }, []);

  const handleProfileSave = (newProfile: UserProfile) => {
    storage.setUserProfile(newProfile);
    setProfile(newProfile);
  };

  const handleSecuritySave = (settings: SecuritySettings) => {
    storage.setSecuritySettings(settings);
    setSecuritySettings(settings);
  };

  const handleReadingPreferencesSave = (preferences: ReadingPreferences) => {
    storage.setReadingPreferences(preferences);
    setReadingPreferences(preferences);
    // Apply font size to root element
    document.documentElement.style.fontSize = `${preferences.fontSize}px`;
  };

  const handleNotificationsSave = (settings: NotificationSettings) => {
    storage.setNotificationSettings(settings);
    setNotificationSettings(settings);
  };

  const handleAccessibilitySave = (settings: AccessibilitySettings) => {
    storage.setAccessibilitySettings(settings);
    setAccessibilitySettings(settings);
  };

  const tabs = [
    { id: 'account', label: az.settings, icon: SettingsIcon },
    { id: 'reading', label: az.readingPreferences.title, icon: BookOpen },
    { id: 'notifications', label: az.notifications.title, icon: Bell },
    { id: 'accessibility', label: az.accessibility.title, icon: Eye }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-800/20 rounded-3xl p-6 shadow-lg">
              <ProfileSection profile={profile} onSave={handleProfileSave} />
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-800/20 rounded-3xl p-6 shadow-lg">
              <SecuritySection settings={securitySettings} onSave={handleSecuritySave} />
            </div>
          </div>
        );
      case 'reading':
        return (
          <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-800/20 rounded-3xl p-6 shadow-lg">
            <ReadingPreferencesSection preferences={readingPreferences} onSave={handleReadingPreferencesSave} />
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-800/20 rounded-3xl p-6 shadow-lg">
            <NotificationsSection settings={notificationSettings} onSave={handleNotificationsSave} />
          </div>
        );
      case 'accessibility':
        return (
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-3xl p-6 shadow-lg">
            <AccessibilitySection settings={accessibilitySettings} onSave={handleAccessibilitySave} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Settings Navigation */}
      <nav className="mb-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 dark:shadow-violet-900/20'
                  : 'text-gray-600 hover:bg-violet-50 dark:text-gray-300 dark:hover:bg-violet-900/20'
                }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Settings Content */}
      <div className="space-y-6">
        {renderContent()}
      </div>
    </div>
  );
};