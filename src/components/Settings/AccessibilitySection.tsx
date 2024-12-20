import React from 'react';
import { AccessibilitySettings } from '../../types';
import { az } from '../../constants/translations';
import { Eye } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { Toggle } from './Toggle';
import { storage } from '../../services/storage';

interface Props {
  settings: AccessibilitySettings;
  onSave: (settings: AccessibilitySettings) => void;
}

export const AccessibilitySection: React.FC<Props> = ({ settings, onSave }) => {
  const [editedSettings, setEditedSettings] = React.useState(settings);

  const handleSave = () => {
    // Save to local storage
    storage.setAccessibilitySettings(editedSettings);
    
    // Call the onSave prop to update parent state
    onSave(editedSettings);

    // Apply accessibility changes
    document.documentElement.classList.toggle('high-contrast', editedSettings.highContrast);
    document.documentElement.classList.toggle('reduce-animations', editedSettings.reduceAnimations);
    document.documentElement.classList.toggle('dyslexic-font', editedSettings.dyslexicFont);
    
    // Enable screen reader announcements if needed
    if (editedSettings.screenReader) {
      document.documentElement.setAttribute('role', 'application');
      document.documentElement.setAttribute('aria-live', 'polite');
    } else {
      document.documentElement.removeAttribute('role');
      document.documentElement.removeAttribute('aria-live');
    }

    // Initialize text-to-speech if enabled
    if (editedSettings.textToSpeech) {
      window.speechSynthesis?.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance('Text to speech is now enabled');
      window.speechSynthesis?.speak(utterance);
    }
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