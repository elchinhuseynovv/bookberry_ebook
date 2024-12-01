import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { az } from '../../constants/translations';
import { Camera, X } from 'lucide-react';

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
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-purple-600">{az.profile.title}</h2>
      
      <div className="mb-6 flex items-center">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-purple-100 dark:border-purple-900">
            {editedProfile.avatar ? (
              <img
                src={editedProfile.avatar}
                alt={editedProfile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-purple-50 text-2xl font-bold text-purple-300 dark:bg-purple-900/50">
                {editedProfile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isEditing && (
            <button
              className="absolute bottom-0 right-0 rounded-full bg-purple-600 p-2 text-white shadow-lg hover:bg-purple-700"
              title={az.profile.uploadPhoto}
            >
              <Camera size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {az.profile.name}
          </label>
          <input
            type="text"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-200 p-2 focus:border-purple-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {az.profile.email}
          </label>
          <input
            type="email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-200 p-2 focus:border-purple-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {az.profile.readingGoal}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editedProfile.readingGoal || 0}
              onChange={(e) => setEditedProfile({ ...editedProfile, readingGoal: parseInt(e.target.value) })}
              disabled={!isEditing}
              className="w-24 rounded-lg border border-gray-200 p-2 focus:border-purple-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">{az.profile.booksPerMonth}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {az.profile.cancel}
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                {az.profile.save}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              {az.profile.save}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};