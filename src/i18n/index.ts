import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import az from './locales/az.json';
import en from './locales/en.json';
import ru from './locales/ru.json';
import bookmarks from './locales/bookmarks.json';
import bookDetails from './locales/bookDetails.json';
import languages from './locales/languages.json';
import bookmarkMessages from './locales/bookmarkMessages.json';
import genres from './locales/genres.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      az: {
        translation: {
          ...az,
          ...bookmarks.az,
          ...bookDetails.az,
          ...languages.az,
          ...genres.az
        },
        bookmarkMessages: bookmarkMessages.az
      },
      en: {
        translation: {
          ...en,
          ...bookmarks.en,
          ...bookDetails.en,
          ...languages.en,
          ...genres.en
        },
        bookmarkMessages: bookmarkMessages.en
      },
      ru: {
        translation: {
          ...ru,
          ...bookmarks.ru,
          ...bookDetails.ru,
          ...languages.ru,
          ...genres.ru
        },
        bookmarkMessages: bookmarkMessages.ru
      }
    },
    fallbackLng: 'az',
    lng: 'az', // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;