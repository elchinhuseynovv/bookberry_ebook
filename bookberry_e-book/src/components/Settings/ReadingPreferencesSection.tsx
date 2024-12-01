import React from 'react';
import { ReadingPreferences } from '../../types';
import { az } from '../../constants/translations';
import { Type, AlignLeft, AlignCenter, AlignJustify } from 'lucide-react';

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
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <Type className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-purple-600">{az.readingPreferences.title}</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {az.readingPreferences.fontSize}
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={editedPreferences.fontSize}
            onChange={(e) => setEditedPreferences({ ...editedPreferences, fontSize: Number(e.target.value) })}
            className="w-full accent-purple-600"
          />
          <div className="mt-1 flex justify-between text-sm text-gray-500">
            <span>12px</span>
            <span>24px</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
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
                className={`p-2 rounded-lg ${
                  editedPreferences.textAlignment === alignment.value
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {alignment.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: 'autoPlayAudio', label: az.readingPreferences.autoPlayAudio },
            { key: 'showPageNumber', label: az.readingPreferences.showPageNumber },
            { key: 'highlightLinks', label: az.readingPreferences.highlightLinks }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">{setting.label}</span>
              <button
                onClick={() =>
                  setEditedPreferences({
                    ...editedPreferences,
                    [setting.key]: !editedPreferences[setting.key as keyof ReadingPreferences]
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  editedPreferences[setting.key as keyof ReadingPreferences]
                    ? 'bg-purple-600'
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    editedPreferences[setting.key as keyof ReadingPreferences] ? 'translate-x-6' : 'translate-x-1'
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