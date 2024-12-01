import React from 'react';
import { AccessibilitySettings } from '../../types';
import { az } from '../../constants/translations';
import { Eye } from 'lucide-react';

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
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-purple-600">{az.accessibility.title}</h2>
      </div>

      <div className="space-y-6">
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
              <button
                onClick={() =>
                  setEditedSettings({
                    ...editedSettings,
                    [setting.key]: !editedSettings[setting.key as keyof AccessibilitySettings]
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  editedSettings[setting.key as keyof AccessibilitySettings]
                    ? 'bg-purple-600'
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    editedSettings[setting.key as keyof AccessibilitySettings] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

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