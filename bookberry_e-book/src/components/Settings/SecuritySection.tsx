import React from 'react';
import { SecuritySettings } from '../../types';
import { az } from '../../constants/translations';
import { Shield, Key } from 'lucide-react';
import { SettingHeader } from './SettingHeader';

interface Props {
  settings: SecuritySettings;
  onSave: (settings: SecuritySettings) => void;
}

export const SecuritySection: React.FC<Props> = ({ settings, onSave }) => {
  const [editedSettings, setEditedSettings] = React.useState(settings);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert(az.auth.passwordsDoNotMatch);
      return;
    }
    onSave({
      ...editedSettings,
      password: newPassword
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<Shield size={24} />}
        title={az.security.title}
        className="text-green-700 dark:text-green-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              {az.security.currentPassword}
            </label>
            <div className="relative">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-green-100 bg-white p-3 pl-10
                         focus:border-green-400 focus:outline-none
                         dark:border-green-900 dark:bg-gray-900"
                placeholder={az.security.currentPasswordPlaceholder}
              />
              <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              {az.security.newPassword}
            </label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-green-100 bg-white p-3 pl-10
                         focus:border-green-400 focus:outline-none
                         dark:border-green-900 dark:bg-gray-900"
                placeholder={az.security.newPasswordPlaceholder}
              />
              <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              {az.security.confirmNewPassword}
            </label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-green-100 bg-white p-3 pl-10
                         focus:border-green-400 focus:outline-none
                         dark:border-green-900 dark:bg-gray-900"
                placeholder={az.security.confirmNewPasswordPlaceholder}
              />
              <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="rounded-xl border-2 border-green-100 p-4 dark:border-green-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {az.security.twoFactorAuth}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {az.security.twoFactorAuthDescription}
                </p>
              </div>
              <button
                onClick={() => setEditedSettings({ ...editedSettings, twoFactorEnabled: !editedSettings.twoFactorEnabled })}
                className={`rounded-xl px-4 py-2 font-medium ${
                  editedSettings.twoFactorEnabled
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {editedSettings.twoFactorEnabled ? az.security.enabled : az.security.disabled}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="rounded-xl bg-green-600 px-6 py-2 font-medium text-white shadow-lg 
                     shadow-green-200 hover:bg-green-700 dark:shadow-green-900/20"
          >
            {az.profile.save}
          </button>
        </div>
      </div>
    </div>
  );
};