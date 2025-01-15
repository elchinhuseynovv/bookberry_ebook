import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../../types';
import { User } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { LogoutButton } from './LogoutButton';
import { profileDB } from '../../services/database/profile';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export const ProfileSection: React.FC<Props> = ({ profile, onSave }) => {
  const { t } = useTranslation();
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { currentUser } = useAuth();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedProfile.name.trim()) {
      newErrors.name = t('profile.nameRequired');
    }

    if (!editedProfile.surname.trim()) {
      newErrors.surname = t('profile.surnameRequired');
    }

    if (!editedProfile.phoneNumber.trim()) {
      newErrors.phoneNumber = t('profile.phoneRequired');
    } else if (!validatePhoneNumber(editedProfile.phoneNumber)) {
      newErrors.phoneNumber = t('profile.invalidPhone');
    }

    if (editedProfile.age && (editedProfile.age < 0 || editedProfile.age > 150)) {
      newErrors.age = t('profile.invalidAge');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm() && currentUser?.email) {
      try {
        // Save to database
        profileDB.updateProfile(currentUser.email, {
          ...editedProfile,
          email: currentUser.email
        });
        
        // Update parent state
        onSave(editedProfile);

        // Show success feedback (optional)
        alert('Profile saved successfully!');
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SettingHeader
          icon={<User size={24} />}
          title={t('profile.title')}
          className="text-purple-700 dark:text-purple-400"
        />
        <LogoutButton />
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            {t('profile.name')}
          </label>
          <input
            type="text"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              errors.name ? 'border-red-300' : 'border-gray-200'
            } dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
            transition-colors`}
            placeholder={t('profile.namePlaceholder')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Surname Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            {t('profile.surname')}
          </label>
          <input
            type="text"
            value={editedProfile.surname}
            onChange={(e) => setEditedProfile({ ...editedProfile, surname: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              errors.surname ? 'border-red-300' : 'border-gray-200'
            } dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
            transition-colors`}
            placeholder={t('profile.surnamePlaceholder')}
          />
          {errors.surname && (
            <p className="mt-1 text-sm text-red-500">{errors.surname}</p>
          )}
        </div>

        {/* Age Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            {t('profile.age')}
          </label>
          <input
            type="number"
            value={editedProfile.age || ''}
            onChange={(e) => setEditedProfile({ ...editedProfile, age: e.target.value ? Number(e.target.value) : undefined })}
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              errors.age ? 'border-red-300' : 'border-gray-200'
            } dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
            transition-colors`}
            placeholder={t('profile.agePlaceholder')}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-500">{errors.age}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            {t('profile.phoneNumber')}
          </label>
          <input
            type="tel"
            value={editedProfile.phoneNumber}
            onChange={(e) => setEditedProfile({ ...editedProfile, phoneNumber: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              errors.phoneNumber ? 'border-red-300' : 'border-gray-200'
            } dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
            transition-colors`}
            placeholder={t('profile.phonePlaceholder')}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            {t('profile.email')}
          </label>
          <input
            type="email"
            value={currentUser?.email || ''}
            disabled
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400
                     cursor-not-allowed"
            placeholder={t('profile.emailPlaceholder')}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="rounded-xl bg-purple-600 px-6 py-2 font-medium text-white 
                     shadow-lg shadow-purple-200 hover:bg-purple-700 
                     dark:shadow-purple-900/20 transition-colors"
          >
            {t('profile.save')}
          </button>
        </div>
      </div>
    </div>
  );
};