import React from 'react';
import { NotificationSettings } from '../../types';
import { az } from '../../constants/translations';
import { Bell } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { Toggle } from './Toggle';

interface Props {
  settings: NotificationSettings;
  onSave: (settings: NotificationSettings) => void;
}

export const NotificationsSection: React.FC<Props> = ({ settings, onSave }) => {
  const [editedSettings, setEditedSettings] = React.useState(settings);

  const handleSave = () => {
    onSave(editedSettings);
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<Bell size={24} />}
        title={az.notifications.title}
        className="text-pink-700 dark:text-pink-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        <div className="space-y-4">
          {[
            { key: 'dailyReminder', label: az.notifications.dailyReminder },
            { key: 'weeklyProgress', label: az.notifications.weeklyProgress },
            { key: 'newBookAlerts', label: az.notifications.newBookAlerts },
            { key: 'systemNotifications', label: az.notifications.systemNotifications }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">{setting.label}</span>
              <Toggle
                enabled={editedSettings[setting.key as keyof NotificationSettings]}
                onChange={() =>
                  setEditedSettings({
                    ...editedSettings,
                    [setting.key]: !editedSettings[setting.key as keyof NotificationSettings]
                  })
                }
              />
            </div>
          ))}
        </div>

        {editedSettings.dailyReminder && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              {az.notifications.reminderTime}
            </label>
            <input
              type="time"
              value={editedSettings.reminderTime}
              onChange={(e) => setEditedSettings({ ...editedSettings, reminderTime: e.target.value })}
              className="rounded-xl border-2 border-pink-100 bg-white p-2 focus:border-pink-400 focus:outline-none dark:border-pink-900 dark:bg-gray-900"
            />
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="rounded-xl bg-pink-600 px-6 py-2 font-medium text-white shadow-lg shadow-pink-200 hover:bg-pink-700 dark:shadow-pink-900/20"
          >
            {az.profile.save}
          </button>
        </div>
      </div>
    </div>
  );
};