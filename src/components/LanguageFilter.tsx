import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface Props {
  selectedLanguage: string | null;
  onLanguageSelect: (language: string | null) => void;
  languages: string[];
}

export const LanguageFilter: React.FC<Props> = ({ selectedLanguage, onLanguageSelect, languages }) => {
  const { t } = useTranslation();

  const getLanguageDisplay = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'azərbaycanca':
        return t('languages.az');
      case 'english':
        return t('languages.en');
      case 'русский':
        return t('languages.ru');
      default:
        return lang;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="h-5 w-5 text-purple-500" />
        <h3 className="font-medium text-gray-900 dark:text-white">{t('language')}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onLanguageSelect(null)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors
            ${!selectedLanguage
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              : 'bg-gray-100 text-gray-600 hover:bg-purple-50 dark:bg-gray-800 dark:text-gray-300'
            }`}
        >
          {t('allLanguages')}
        </button>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageSelect(lang)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors
              ${selectedLanguage === lang
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                : 'bg-gray-100 text-gray-600 hover:bg-purple-50 dark:bg-gray-800 dark:text-gray-300'
              }`}
          >
            {getLanguageDisplay(lang)}
          </button>
        ))}
      </div>
    </div>
  );
};