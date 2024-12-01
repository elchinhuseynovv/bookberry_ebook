import React from 'react';
import { NotificationSettings } from '../../types';
import { az } from '../../constants/translations';
import { Bell } from 'lucide-react';

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
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-purple-600">{az.notifications.title}</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          {[
            { key: 'dailyReminder', label: az.notifications.dailyReminder },
            { key: 'weeklyProgress', label: az.notifications.weeklyProgress },
            { key: 'newBookAlerts', label: az.notifications.newBookAlerts },
            { key: 'systemNotifications', label: az.notifications.systemNotifications }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">{setting.label}</span>
              <button
                onClick={() =>
                  setEditedSettings({
                    ...editedSettings,
                    [setting.key]: !editedSettings[setting.key as keyof NotificationSettings]
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  editedSettings[setting.key as keyof NotificationSettings]
                    ? 'bg-purple-600'
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    editedSettings[setting.key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
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
              className="rounded-lg border border-gray-200 p-2 focus:border-purple-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            {az.profile.save}
          </button>
        </div>
      </div>
    </div>
  );
};