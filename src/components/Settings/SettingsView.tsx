import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileSection } from './ProfileSection';
import { SecuritySection } from './SecuritySection';
import { ReadingPreferencesSection } from './ReadingPreferencesSection';
import { NotificationsSection } from './NotificationsSection';
import { AccessibilitySection } from './AccessibilitySection';
import { LanguageSelector } from './LanguageSelector';
import { SubscriptionSection } from './SubscriptionSection';
import { SettingsTab } from './SettingsTab';
import { 
  UserProfile, 
  ReadingPreferences, 
  NotificationSettings, 
  AccessibilitySettings,
  SecuritySettings 
} from '../../types';
import { Settings as SettingsIcon, BookOpen, Bell, Eye, Globe, CreditCard, Shield } from 'lucide-react';
import { storage } from '../../services/storage';
import { useAuth } from '../../hooks/useAuth';
import { profileDB } from '../../services/database/profile';
import { subscriptionPlans } from '../../constants/subscriptionPlans';
import { SubscriptionPlan } from '../../types/subscription';

type TabId = 'account' | 'security' | 'subscription' | 'reading' | 'notifications' | 'accessibility' | 'language';

const defaultProfile: UserProfile = {
  name: '',
  surname: '',
  email: '',
  phoneNumber: '',
  preferredLanguage: 'az',
  readingGoal: 4
};

export const SettingsView: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(subscriptionPlans[0]);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    password: ''
  });
  const [readingPreferences, setReadingPreferences] = useState<ReadingPreferences>({
    fontSize: 16,
    textAlignment: 'left',
    autoPlayAudio: false,
    showPageNumber: true,
    highlightLinks: true
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    dailyReminder: false,
    weeklyProgress: true,
    newBookAlerts: true,
    systemNotifications: true,
    reminderTime: '09:00'
  });
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    highContrast: false,
    reduceAnimations: false,
    screenReader: false,
    dyslexicFont: false,
    textToSpeech: false
  });

  // Get language-specific title
  const getLanguageTitle = () => {
    switch (i18n.language) {
      case 'az':
        return 'Dil';
      case 'ru':
        return 'Язык';
      default:
        return 'Language';
    }
  };

  // Load profile data on mount and whenever settings view is shown
  useEffect(() => {
    const loadProfileData = () => {
      if (currentUser?.email) {
        const userProfile = profileDB.getProfile(currentUser.email);
        if (userProfile) {
          setProfile(userProfile);
        } else {
          setProfile({ ...defaultProfile, email: currentUser.email });
        }
      }
    };

    loadProfileData();

    // Add event listener for visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadProfileData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser]);

  // Reload profile data when switching to account tab
  useEffect(() => {
    if (activeTab === 'account' && currentUser?.email) {
      const userProfile = profileDB.getProfile(currentUser.email);
      if (userProfile) {
        setProfile(userProfile);
      }
    }
  }, [activeTab, currentUser]);

  // Load other settings when component mounts
  useEffect(() => {
    if (currentUser?.email) {
      const savedSecuritySettings = storage.getSecuritySettings();
      if (savedSecuritySettings) {
        setSecuritySettings(savedSecuritySettings);
      }

      const savedReadingPreferences = storage.getReadingPreferences();
      if (savedReadingPreferences) {
        setReadingPreferences(savedReadingPreferences);
      }

      const savedNotificationSettings = storage.getNotificationSettings();
      if (savedNotificationSettings) {
        setNotificationSettings(savedNotificationSettings);
      }

      const savedAccessibilitySettings = storage.getAccessibilitySettings();
      if (savedAccessibilitySettings) {
        setAccessibilitySettings(savedAccessibilitySettings);
      }
    }
  }, [currentUser]);

  const handleProfileSave = (updatedProfile: UserProfile) => {
    if (currentUser?.email) {
      const profileToSave = {
        ...updatedProfile,
        email: currentUser.email
      };
      profileDB.updateProfile(currentUser.email, profileToSave);
      setProfile(profileToSave);
    }
  };

  const handleSecuritySave = (settings: SecuritySettings) => {
    setSecuritySettings(settings);
    storage.setSecuritySettings(settings);
  };

  const handleReadingPreferencesSave = (preferences: ReadingPreferences) => {
    setReadingPreferences(preferences);
    storage.setReadingPreferences(preferences);
  };

  const handleNotificationsSave = (settings: NotificationSettings) => {
    setNotificationSettings(settings);
    storage.setNotificationSettings(settings);
  };

  const handleAccessibilitySave = (settings: AccessibilitySettings) => {
    setAccessibilitySettings(settings);
    storage.setAccessibilitySettings(settings);
  };

  const handlePlanChange = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan);
  };

  const tabs = [
    { 
      id: 'account', 
      label: t('settings'), 
      icon: SettingsIcon,
      gradient: 'from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40',
      activeGradient: 'from-purple-500 to-violet-600',
      borderColor: 'border-purple-200 dark:border-purple-800',
      shadowColor: 'shadow-purple-500/20 dark:shadow-purple-400/10'
    },
    {
      id: 'security',
      label: t('security.title'),
      icon: Shield,
      gradient: 'from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40',
      activeGradient: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-200 dark:border-green-800',
      shadowColor: 'shadow-green-500/20 dark:shadow-green-400/10'
    },
    { 
      id: 'subscription',
      label: t('subscription.title'),
      icon: CreditCard,
      gradient: 'from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40',
      activeGradient: 'from-orange-500 to-amber-600',
      borderColor: 'border-orange-200 dark:border-orange-800',
      shadowColor: 'shadow-orange-500/20 dark:shadow-orange-400/10'
    },
    { 
      id: 'reading', 
      label: t('readingPreferences.title'), 
      icon: BookOpen,
      gradient: 'from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40',
      activeGradient: 'from-blue-500 to-sky-600',
      borderColor: 'border-blue-200 dark:border-blue-800',
      shadowColor: 'shadow-blue-500/20 dark:shadow-blue-400/10'
    },
    { 
      id: 'notifications', 
      label: t('notifications.title'), 
      icon: Bell,
      gradient: 'from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40',
      activeGradient: 'from-pink-500 to-rose-600',
      borderColor: 'border-pink-200 dark:border-pink-800',
      shadowColor: 'shadow-pink-500/20 dark:shadow-pink-400/10'
    },
    { 
      id: 'accessibility', 
      label: t('accessibility.title'), 
      icon: Eye,
      gradient: 'from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40',
      activeGradient: 'from-indigo-500 to-blue-600',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      shadowColor: 'shadow-indigo-500/20 dark:shadow-indigo-400/10'
    },
    { 
      id: 'language', 
      label: getLanguageTitle(), 
      icon: Globe,
      gradient: 'from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40',
      activeGradient: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      shadowColor: 'shadow-emerald-500/20 dark:shadow-emerald-400/10'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Settings Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {tabs.map((tab) => (
          <SettingsTab
            key={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            icon={tab.icon}
            label={tab.label}
            gradient={tab.gradient}
            activeGradient={tab.activeGradient}
            borderColor={tab.borderColor}
            shadowColor={tab.shadowColor}
          />
        ))}
      </div>

      {/* Settings Content */}
      <div className="space-y-8">
        {activeTab === 'account' && (
          <ProfileSection profile={profile} onSave={handleProfileSave} />
        )}
        {activeTab === 'security' && (
          <SecuritySection settings={securitySettings} onSave={handleSecuritySave} />
        )}
        {activeTab === 'subscription' && (
          <SubscriptionSection
            currentPlan={currentPlan}
            onPlanChange={handlePlanChange}
          />
        )}
        {activeTab === 'reading' && (
          <ReadingPreferencesSection
            preferences={readingPreferences}
            onSave={handleReadingPreferencesSave}
          />
        )}
        {activeTab === 'notifications' && (
          <NotificationsSection
            settings={notificationSettings}
            onSave={handleNotificationsSave}
          />
        )}
        {activeTab === 'accessibility' && (
          <AccessibilitySection
            settings={accessibilitySettings}
            onSave={handleAccessibilitySave}
          />
        )}
        {activeTab === 'language' && (
          <LanguageSelector />
        )}
      </div>
    </div>
  );
};