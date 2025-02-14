import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const AuthLanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'az', name: t('languages.az') },
    { code: 'en', name: t('languages.en') },
    { code: 'ru', name: t('languages.ru') }
  ];

  return (
    <div className="flex items-center gap-2 justify-center">
      <Globe className="h-4 w-4 text-gray-400" />
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`text-sm px-2 py-1 rounded-md transition-colors
              ${i18n.language === lang.code
                ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400'
                : 'text-gray-500 hover:text-purple-500 dark:text-gray-400'
              }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}