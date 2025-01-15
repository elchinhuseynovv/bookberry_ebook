import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SettingHeader } from './SettingHeader';

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'az', name: t('language.az') },
    { code: 'en', name: t('language.en') }
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<Globe size={24} />}
        title={t('language.title')}
        className="text-emerald-700 dark:text-emerald-400"
      />

      <div className="space-y-4 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        <div className="grid grid-cols-2 gap-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`
                rounded-xl p-4 text-center transition-all
                ${i18n.language === language.code
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-emerald-900/20'
                }
              `}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};