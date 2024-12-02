import React from 'react';
import { ReadingPreferences } from '../../types';
import { az } from '../../constants/translations';
import { Type, AlignLeft, AlignCenter, AlignJustify } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { Toggle } from './Toggle';

interface Props {
  preferences: ReadingPreferences;
  onSave: (preferences: ReadingPreferences) => void;
}

export const ReadingPreferencesSection: React.FC<Props> = ({ preferences, onSave }) => {
  const [editedPreferences, setEditedPreferences] = React.useState(preferences);

  const handleSave = () => {
    onSave(editedPreferences);
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<Type size={24} />}
        title={az.readingPreferences.title}
        className="text-blue-700 dark:text-blue-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {az.readingPreferences.fontSize}
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={editedPreferences.fontSize}
            onChange={(e) => setEditedPreferences({ ...editedPreferences, fontSize: Number(e.target.value) })}
            className="h-2 w-full appearance-none rounded-full bg-blue-100 accent-blue-600"
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>12px</span>
            <span className="font-medium">{editedPreferences.fontSize}px</span>
            <span>24px</span>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {az.readingPreferences.textAlignment}
          </label>
          <div className="flex gap-2">
            {[
              { value: 'left', icon: <AlignLeft size={20} /> },
              { value: 'center', icon: <AlignCenter size={20} /> },
              { value: 'justify', icon: <AlignJustify size={20} /> }
            ].map((alignment) => (
              <button
                key={alignment.value}
                onClick={() => setEditedPreferences({ ...editedPreferences, textAlignment: alignment.value as any })}
                className={`rounded-xl p-3 transition-colors ${
                  editedPreferences.textAlignment === alignment.value
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                {alignment.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[
            { key: 'autoPlayAudio', label: az.readingPreferences.autoPlayAudio },
            { key: 'showPageNumber', label: az.readingPreferences.showPageNumber },
            { key: 'highlightLinks', label: az.readingPreferences.highlightLinks }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">{setting.label}</span>
              <Toggle
                enabled={editedPreferences[setting.key as keyof ReadingPreferences]}
                onChange={() =>
                  setEditedPreferences({
                    ...editedPreferences,
                    [setting.key]: !editedPreferences[setting.key as keyof ReadingPreferences]
                  })
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-6 py-2 font-medium text-white shadow-lg shadow-blue-200 hover:bg-blue-700 dark:shadow-blue-900/20"
          >
            {az.profile.save}
          </button>
        </div>
      </div>
    </div>
  );
};