import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReadingPreferences } from '../../types';
import { Type, AlignLeft, AlignCenter, AlignJustify, Check, AlertCircle } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { Toggle } from './Toggle';
import { storage } from '../../services/storage';

interface Props {
  preferences: ReadingPreferences;
  onSave: (preferences: ReadingPreferences) => void;
}

export const ReadingPreferencesSection: React.FC<Props> = ({ preferences, onSave }) => {
  const { t } = useTranslation();
  const [editedPreferences, setEditedPreferences] = useState(preferences);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewText, setPreviewText] = useState('');

  // Update preview text based on language
  useEffect(() => {
    setPreviewText(t('readingPreferences.previewText'));
  }, [t]);

  // Apply preferences immediately for preview
  const applyPreviewStyles = useCallback((newPreferences: ReadingPreferences) => {
    const previewElement = document.getElementById('reading-preview');
    if (previewElement) {
      previewElement.style.fontSize = `${newPreferences.fontSize}px`;
      previewElement.style.textAlign = newPreferences.textAlignment;
      previewElement.classList.toggle('highlight-links', newPreferences.highlightLinks);
    }
  }, []);

  // Update preview when preferences change
  useEffect(() => {
    applyPreviewStyles(editedPreferences);
  }, [editedPreferences, applyPreviewStyles]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setEditedPreferences(prev => ({ ...prev, fontSize: newSize }));
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'justify') => {
    setEditedPreferences(prev => ({ ...prev, textAlignment: alignment }));
  };

  const handleToggleChange = (key: keyof ReadingPreferences) => {
    setEditedPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setShowError(false);
      await storage.setReadingPreferences(editedPreferences);
      onSave(editedPreferences);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<Type size={24} />}
        title={t('readingPreferences.title')}
        className="text-blue-700 dark:text-blue-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        {/* Preview Section */}
        <div className="mb-8 rounded-xl bg-white p-6 dark:bg-gray-900">
          <h3 className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t('readingPreferences.preview')}
          </h3>
          <div
            id="reading-preview"
            className="prose dark:prose-invert max-w-none"
            style={{
              fontSize: `${editedPreferences.fontSize}px`,
              textAlign: editedPreferences.textAlignment,
            }}
          >
            {previewText}
          </div>
        </div>

        {/* Font Size Control */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {t('readingPreferences.fontSize')} ({editedPreferences.fontSize}px)
          </label>
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={editedPreferences.fontSize}
            onChange={handleFontSizeChange}
            className="h-2 w-full appearance-none rounded-full bg-blue-100 accent-blue-600 
                     dark:bg-blue-900/30 dark:accent-blue-400
                     transition-all duration-200 ease-in-out
                     hover:bg-blue-200 dark:hover:bg-blue-900/40"
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>12px</span>
            <span className="font-medium">{editedPreferences.fontSize}px</span>
            <span>24px</span>
          </div>
        </div>

        {/* Text Alignment Controls */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-600 dark:text-gray-300">
            {t('readingPreferences.textAlignment')}
          </label>
          <div className="flex gap-2">
            {[
              { value: 'left', icon: <AlignLeft size={20} />, label: 'Left' },
              { value: 'center', icon: <AlignCenter size={20} />, label: 'Center' },
              { value: 'justify', icon: <AlignJustify size={20} />, label: 'Justify' }
            ].map((alignment) => (
              <button
                key={alignment.value}
                onClick={() => handleAlignmentChange(alignment.value as any)}
                className={`
                  rounded-xl p-3 transition-all duration-200
                  ${editedPreferences.textAlignment === alignment.value
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 scale-105'
                    : 'text-gray-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500'
                  }
                `}
                aria-label={`Align text ${alignment.label}`}
                title={`Align text ${alignment.label}`}
              >
                {alignment.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Controls */}
        <div className="space-y-4">
          {[
            { key: 'autoPlayAudio', label: t('readingPreferences.autoPlayAudio') },
            { key: 'showPageNumber', label: t('readingPreferences.showPageNumber') },
            { key: 'highlightLinks', label: t('readingPreferences.highlightLinks') }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">{setting.label}</span>
              <Toggle
                enabled={editedPreferences[setting.key as keyof ReadingPreferences]}
                onChange={() => handleToggleChange(setting.key as keyof ReadingPreferences)}
                color="blue"
                size="md"
              />
            </div>
          ))}
        </div>

        {/* Save Button and Feedback */}
        <div className="flex items-center justify-end gap-4 pt-4">
          {showError && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{t('profile.saveError')}</span>
            </div>
          )}
          {showSaveSuccess && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Check size={20} />
              <span className="text-sm font-medium">{t('profile.saveSuccess')}</span>
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
              rounded-xl px-6 py-2 font-medium text-white shadow-lg 
              transition-all duration-200
              ${isSaving
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }
              shadow-blue-200 dark:shadow-blue-900/20
            `}
          >
            {isSaving ? t('profile.saving') : t('profile.save')}
          </button>
        </div>
      </div>
    </div>
  );
};