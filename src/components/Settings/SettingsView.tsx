import React, { useState, useEffect } from 'react';
import { ProfileSection } from './ProfileSection';
import { SecuritySection } from './SecuritySection';
import { ReadingPreferencesSection } from './ReadingPreferencesSection';
import { NotificationsSection } from './NotificationsSection';
import { AccessibilitySection } from './AccessibilitySection';
import { SettingsTab } from './SettingsTab';
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

type TabId = 'account' | 'reading' | 'notifications' | 'accessibility';

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

const tabs = [
  { 
    id: 'account', 
    label: az.settings, 
    icon: SettingsIcon, 
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    shadow: 'shadow-violet-500/25'
  },
  { 
    id: 'reading', 
    label: az.readingPreferences.title, 
    icon: BookOpen, 
    color: 'sky',
    gradient: 'from-sky-500 to-blue-600',
    shadow: 'shadow-sky-500/25'
  },
  { 
    id: 'notifications', 
    label: az.notifications.title, 
    icon: Bell, 
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    shadow: 'shadow-rose-500/25'
  },
  { 
    id: 'accessibility', 
    label: az.accessibility.title, 
    icon: Eye, 
    color: 'indigo',
    gradient: 'from-indigo-500 to-blue-600',
    shadow: 'shadow-indigo-500/25'
  }
];

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(defaultSecuritySettings);
  const [readingPreferences, setReadingPreferences] = useState<ReadingPreferences>(defaultReadingPreferences);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings);

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

  const activeTabData = tabs.find(tab => tab.id === activeTab)!;

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-lg shadow-violet-500/10">
              <ProfileSection profile={profile} onSave={handleProfileSave} />
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-lg shadow-green-500/10">
              <SecuritySection settings={securitySettings} onSave={handleSecuritySave} />
            </div>
          </div>
        );
      case 'reading':
        return (
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/50 dark:to-blue-950/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-lg shadow-sky-500/10">
            <ReadingPreferencesSection preferences={readingPreferences} onSave={handleReadingPreferencesSave} />
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/50 dark:to-pink-950/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-lg shadow-rose-500/10">
            <NotificationsSection settings={notificationSettings} onSave={handleNotificationsSave} />
          </div>
        );
      case 'accessibility':
        return (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-lg shadow-indigo-500/10">
            <AccessibilitySection settings={accessibilitySettings} onSave={handleAccessibilitySave} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Settings Navigation */}
      <nav className="mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="flex gap-2 sm:gap-3 min-w-max sm:flex-wrap">
          {tabs.map((tab) => (
            <SettingsTab
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              icon={tab.icon}
              label={tab.label}
              gradient={tab.gradient}
              shadow={tab.shadow}
            />
          ))}
        </div>
      </nav>

      {/* Settings Content */}
      <div 
        className="space-y-4 sm:space-y-6 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at top left, 
            var(--tw-gradient-from), 
            transparent 80%)`
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};