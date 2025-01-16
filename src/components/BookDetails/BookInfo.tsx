import React from 'react';
import { Book } from '../../types';
import { Calendar, Book as BookIcon, Globe, Layout } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  book: Book;
}

export const BookInfo: React.FC<Props> = ({ book }) => {
  const { t } = useTranslation();

  const details = [
    { icon: <Calendar className="h-5 w-5" />, label: t('publishedYear'), value: book.publishedYear },
    { icon: <BookIcon className="h-5 w-5" />, label: t('pages'), value: book.pages },
    { icon: <Globe className="h-5 w-5" />, label: t('language'), value: book.language },
    { icon: <Layout className="h-5 w-5" />, label: t('genre'), value: book.genre }
  ].filter(detail => detail.value);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('bookDetails')}</h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {details.map((detail, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800"
          >
            <div className="mb-2 text-purple-600 dark:text-purple-400">
              {detail.icon}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {detail.label}
            </div>
            <div className="font-medium text-gray-900 dark:text-white">
              {detail.value}
            </div>
          </div>
        ))}
      </div>

      {book.description && (
        <div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">
          <h3 className="mb-3 font-medium text-gray-900 dark:text-white">
            {t('description')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{book.description}</p>
        </div>
      )}
    </div>
  );
};