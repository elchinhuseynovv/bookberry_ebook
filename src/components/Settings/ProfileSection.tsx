import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { az } from '../../constants/translations';
import { Camera, User } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { LogoutButton } from './LogoutButton';

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
      <div className="flex items-center justify-between">
        <SettingHeader
          icon={<User size={24} />}
          title={az.profile.title}
          className="text-purple-700 dark:text-purple-400"
        />
        <LogoutButton />
      </div>
      
      {/* Rest of the existing ProfileSection code... */}
    </div>
  );
};