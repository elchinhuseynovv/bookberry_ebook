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

  const tabs = [
    { id: 'account', label: az.settings, icon: SettingsIcon, color: 'violet' },
    { id: 'reading', label: az.readingPreferences.title, icon: BookOpen, color: 'sky' },
    { id: 'notifications', label: az.notifications.title, icon: Bell, color: 'rose' },
    { id: 'accessibility', label: az.accessibility.title, icon: Eye, color: 'indigo' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-[0_4px_20px_rgba(124,58,237,0.15)] rounded-3xl p-6">
              <ProfileSection profile={profile} onSave={handleProfileSave} />
            </div>
            <div className="bg-white shadow-[0_4px_20px_rgba(22,163,74,0.15)] rounded-3xl p-6">
              <SecuritySection settings={securitySettings} onSave={handleSecuritySave} />
            </div>
          </div>
        );
      case 'reading':
        return (
          <div className="bg-white shadow-[0_4px_20px_rgba(14,165,233,0.15)] rounded-3xl p-6">
            <ReadingPreferencesSection preferences={readingPreferences} onSave={handleReadingPreferencesSave} />
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white shadow-[0_4px_20px_rgba(244,63,94,0.15)] rounded-3xl p-6">
            <NotificationsSection settings={notificationSettings} onSave={handleNotificationsSave} />
          </div>
        );
      case 'accessibility':
        return (
          <div className="bg-white shadow-[0_4px_20px_rgba(99,102,241,0.15)] rounded-3xl p-6">
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
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
                ${activeTab === tab.id
                  ? `bg-${tab.color}-600 text-white shadow-lg shadow-${tab.color}-500/25`
                  : `bg-white text-gray-600 shadow-md hover:shadow-lg hover:scale-105 
                     hover:bg-${tab.color}-50 hover:text-${tab.color}-600`
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