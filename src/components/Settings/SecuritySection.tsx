import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SecuritySettings } from '../../types';
import { Shield, Key, AlertCircle, Check } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { Toggle } from './Toggle';
import { authDB } from '../../services/database/auth';
import { useAuth } from '../../hooks/useAuth';
import { useDynamicTitles } from '../../utils/dynamicTitles';

interface Props {
  settings: SecuritySettings;
  onSave: (settings: SecuritySettings) => void;
}

export const SecuritySection: React.FC<Props> = ({ settings, onSave }) => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { getResetPasswordTitle } = useDynamicTitles();
  const [editedSettings, setEditedSettings] = useState(settings);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (!currentUser) {
        throw new Error(t('auth.notLoggedIn'));
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error(t('auth.passwordsDoNotMatch'));
      }

      if (passwordForm.newPassword.length < 6) {
        throw new Error(t('auth.passwordTooShort'));
      }

      // Verify current password
      const isCurrentPasswordValid = await authDB.verifyPassword(
        currentUser.email,
        passwordForm.currentPassword
      );

      if (!isCurrentPasswordValid) {
        throw new Error(t('auth.currentPasswordIncorrect'));
      }

      // Update password
      await authDB.updatePassword(currentUser.email, passwordForm.newPassword);

      // Clear form and show success message
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccess(t('auth.passwordChangeSuccess'));

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.passwordChangeError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!currentUser?.email) return;
    
    try {
      setIsLoading(true);
      await authDB.sendPasswordResetEmail(currentUser.email);
      setSuccess(t('auth.resetEmailSent'));
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.resetPasswordError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<Shield size={24} />}
        title={t('security.title')}
        className="text-green-700 dark:text-green-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        {/* Password Change Form */}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('security.changePassword')}
          </h3>

          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              {t('security.currentPassword')}
            </label>
            <div className="relative">
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full rounded-xl border-2 border-green-100 bg-white p-3 pl-10
                         focus:border-green-400 focus:outline-none
                         dark:border-green-900 dark:bg-gray-900"
                placeholder={t('security.currentPasswordPlaceholder')}
              />
              <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              {t('security.newPassword')}
            </label>
            <div className="relative">
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full rounded-xl border-2 border-green-100 bg-white p-3 pl-10
                         focus:border-green-400 focus:outline-none
                         dark:border-green-900 dark:bg-gray-900"
                placeholder={t('security.newPasswordPlaceholder')}
              />
              <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
              {t('security.confirmNewPassword')}
            </label>
            <div className="relative">
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full rounded-xl border-2 border-green-100 bg-white p-3 pl-10
                         focus:border-green-400 focus:outline-none
                         dark:border-green-900 dark:bg-gray-900"
                placeholder={t('security.confirmNewPasswordPlaceholder')}
              />
              <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Check size={20} />
              <span className="text-sm">{success}</span>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-green-600 px-6 py-2 font-medium text-white 
                       shadow-lg shadow-green-200 hover:bg-green-700 
                       dark:shadow-green-900/20 disabled:opacity-50"
            >
              {isLoading ? t('auth.changing') : t('security.changePassword')}
            </button>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={isLoading}
              className="rounded-xl bg-gray-100 px-6 py-2 font-medium text-gray-700
                       hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200
                       dark:hover:bg-gray-600 disabled:opacity-50"
            >
              {getResetPasswordTitle()}
            </button>
          </div>
        </form>

        {/* Two-Factor Authentication */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="rounded-xl border-2 border-green-100 p-4 dark:border-green-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('security.twoFactorAuth')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('security.twoFactorAuthDescription')}
                </p>
              </div>
              <Toggle
                enabled={editedSettings.twoFactorEnabled}
                onChange={() => setEditedSettings({ ...editedSettings, twoFactorEnabled: !editedSettings.twoFactorEnabled })}
                color="green"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};