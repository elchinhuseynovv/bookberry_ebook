import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { az } from '../../constants/translations';
import { Camera, User } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { Toggle } from './Toggle';

interface Props {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export const ProfileSection: React.FC<Props> = ({ profile, onSave }) => {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<User size={24} />}
        title={az.profile.title}
        className="text-purple-700 dark:text-purple-400"
      />
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-purple-100 dark:border-purple-900 bg-gradient-to-br from-purple-500 to-purple-600">
            {editedProfile.avatar ? (
              <img
                src={editedProfile.avatar}
                alt={editedProfile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                {editedProfile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isEditing && (
            <button
              className="absolute -bottom-2 -right-2 rounded-xl bg-white p-2 text-purple-600 shadow-lg hover:bg-purple-50 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
              title={az.profile.uploadPhoto}
            >
              <Camera size={18} />
            </button>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
            disabled={!isEditing}
            className="w-full bg-transparent text-2xl font-bold text-gray-800 dark:text-white focus:outline-none disabled:opacity-75"
            placeholder={az.profile.name}
          />
          <input
            type="email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
            disabled={!isEditing}
            className="w-full bg-transparent text-gray-600 dark:text-gray-300 focus:outline-none disabled:opacity-75"
            placeholder={az.profile.email}
          />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {az.profile.readingGoal}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={editedProfile.readingGoal || 0}
              onChange={(e) => setEditedProfile({ ...editedProfile, readingGoal: parseInt(e.target.value) })}
              disabled={!isEditing}
              className="w-24 rounded-xl border-2 border-purple-100 bg-white p-2 text-center font-medium focus:border-purple-400 focus:outline-none dark:border-purple-900 dark:bg-gray-900"
              min="0"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">{az.profile.booksPerMonth}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-xl px-6 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {az.profile.cancel}
              </button>
              <button
                onClick={handleSave}
                className="rounded-xl bg-purple-600 px-6 py-2 font-medium text-white shadow-lg shadow-purple-200 hover:bg-purple-700 dark:shadow-purple-900/20"
              >
                {az.profile.save}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-purple-600 px-6 py-2 font-medium text-white shadow-lg shadow-purple-200 hover:bg-purple-700 dark:shadow-purple-900/20"
            >
              {az.profile.edit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};