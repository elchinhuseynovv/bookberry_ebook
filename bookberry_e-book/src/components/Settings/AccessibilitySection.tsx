import React from 'react';
import { AccessibilitySettings } from '../../types';
import { az } from '../../constants/translations';
import { Eye } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { Toggle } from './Toggle';

interface Props {
  settings: AccessibilitySettings;
  onSave: (settings: AccessibilitySettings) => void;
}

export const AccessibilitySection: React.FC<Props> = ({ settings, onSave }) => {
  const [editedSettings, setEditedSettings] = React.useState(settings);

  const handleSave = () => {
    onSave(editedSettings);
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<Eye size={24} />}
        title={az.accessibility.title}
        className="text-indigo-700 dark:text-indigo-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        <div className="space-y-4">
          {[
            { key: 'highContrast', label: az.accessibility.highContrast },
            { key: 'reduceAnimations', label: az.accessibility.reduceAnimations },
            { key: 'screenReader', label: az.accessibility.screenReader },
            { key: 'dyslexicFont', label: az.accessibility.dyslexicFont },
            { key: 'textToSpeech', label: az.accessibility.textToSpeech }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">{setting.label}</span>
              <Toggle
                enabled={editedSettings[setting.key as keyof AccessibilitySettings]}
                onChange={() =>
                  setEditedSettings({
                    ...editedSettings,
                    [setting.key]: !editedSettings[setting.key as keyof AccessibilitySettings]
                  })
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="rounded-xl bg-indigo-600 px-6 py-2 font-medium text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 dark:shadow-indigo-900/20"
          >
            {az.profile.save}
          </button>
        </div>
      </div>
    </div>
  );
};