import React, { useState, useEffect } from 'react';
import { ProfileSection } from './ProfileSection';
import { SecuritySection } from './SecuritySection';
import { ReadingPreferencesSection } from './ReadingPreferencesSection';
import { NotificationsSection } from './NotificationsSection';
import { AccessibilitySection } from './AccessibilitySection';
import { SubscriptionSection } from './SubscriptionSection';
import { SettingsTab } from './SettingsTab';
import { 
  UserProfile, 
  ReadingPreferences, 
  NotificationSettings, 
  AccessibilitySettings,
  SecuritySettings 
} from '../../types';
import { Settings as SettingsIcon, BookOpen, Bell, Eye, CreditCard } from 'lucide-react';
import { az } from '../../constants/translations';
import { storage } from '../../services/storage';
import { useAuth } from '../../hooks/useAuth';

type TabId = 'account' | 'reading' | 'notifications' | 'accessibility' | 'subscription';

const tabs = [
  { 
    id: 'account' as TabId, 
    label: az.settings.account, 
    icon: SettingsIcon,
    gradient: 'from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40',
    activeGradient: 'from-purple-500 to-violet-600',
    borderColor: 'border-purple-200 dark:border-purple-800',
    shadowColor: 'shadow-purple-500/20 dark:shadow-purple-400/10'
  },
  { 
    id: 'reading' as TabId, 
    label: az.settings.reading, 
    icon: BookOpen,
    gradient: 'from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40',
    activeGradient: 'from-blue-500 to-sky-600',
    borderColor: 'border-blue-200 dark:border-blue-800',
    shadowColor: 'shadow-blue-500/20 dark:shadow-blue-400/10'
  },
  { 
    id: 'notifications' as TabId, 
    label: az.settings.notifications, 
    icon: Bell,
    gradient: 'from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40',
    activeGradient: 'from-pink-500 to-rose-600',
    borderColor: 'border-pink-200 dark:border-pink-800',
    shadowColor: 'shadow-pink-500/20 dark:shadow-pink-400/10'
  },
  { 
    id: 'accessibility' as TabId, 
    label: az.settings.accessibility, 
    icon: Eye,
    gradient: 'from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40',
    activeGradient: 'from-indigo-500 to-blue-600',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    shadowColor: 'shadow-indigo-500/20 dark:shadow-indigo-400/10'
  },
  { 
    id: 'subscription' as TabId, 
    label: az.settings.subscription, 
    icon: CreditCard,
    gradient: 'from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40',
    activeGradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    shadowColor: 'shadow-emerald-500/20 dark:shadow-emerald-400/10'
  }
];

// ... rest of the imports and type definitions ...

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('account');
  // ... rest of the state declarations ...

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border-2 border-purple-100 dark:border-purple-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl shadow-purple-500/10 dark:shadow-purple-400/5">
              <div className="bg-gradient-to-br from-purple-100/80 to-violet-100/80 dark:from-purple-900/40 dark:to-violet-900/40 px-6 py-4">
                <ProfileSection profile={profile} onSave={handleProfileSave} />
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-100 dark:border-emerald-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl shadow-emerald-500/10 dark:shadow-emerald-400/5">
              <div className="bg-gradient-to-br from-emerald-100/80 to-green-100/80 dark:from-emerald-900/40 dark:to-green-900/40 px-6 py-4">
                <SecuritySection settings={securitySettings} onSave={handleSecuritySave} />
              </div>
            </div>
          </div>
        );
      case 'reading':
        return (
          <div className="overflow-hidden rounded-2xl border-2 border-blue-100 dark:border-blue-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl shadow-blue-500/10 dark:shadow-blue-400/5">
            <div className="bg-gradient-to-br from-blue-100/80 to-sky-100/80 dark:from-blue-900/40 dark:to-sky-900/40 px-6 py-4">
              <ReadingPreferencesSection preferences={readingPreferences} onSave={handleReadingPreferencesSave} />
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="overflow-hidden rounded-2xl border-2 border-pink-100 dark:border-pink-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl shadow-pink-500/10 dark:shadow-pink-400/5">
            <div className="bg-gradient-to-br from-pink-100/80 to-rose-100/80 dark:from-pink-900/40 dark:to-rose-900/40 px-6 py-4">
              <NotificationsSection settings={notificationSettings} onSave={handleNotificationsSave} />
            </div>
          </div>
        );
      case 'accessibility':
        return (
          <div className="overflow-hidden rounded-2xl border-2 border-indigo-100 dark:border-indigo-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-400/5">
            <div className="bg-gradient-to-br from-indigo-100/80 to-blue-100/80 dark:from-indigo-900/40 dark:to-blue-900/40 px-6 py-4">
              <AccessibilitySection settings={accessibilitySettings} onSave={handleAccessibilitySave} />
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="overflow-hidden rounded-2xl border-2 border-emerald-100 dark:border-emerald-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl shadow-emerald-500/10 dark:shadow-emerald-400/5">
            <div className="bg-gradient-to-br from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/40 dark:to-teal-900/40 px-6 py-4">
              <SubscriptionSection />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
      {/* Settings Navigation */}
      <div className="mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-2">
          {tabs.map((tab) => (
            <SettingsTab
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={tab.icon}
              label={tab.label}
              gradient={tab.gradient}
              activeGradient={tab.activeGradient}
              borderColor={tab.borderColor}
              shadowColor={tab.shadowColor}
            />
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="space-y-6 transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
};