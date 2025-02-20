import React from 'react';
import { Book } from '../types';
import { Clock, Headphones, FileAudio, Gauge } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  book: Book;
}

export const AudioBookInfo: React.FC<Props> = ({ book }) => {
  const { t } = useTranslation();

  const details = [
    book.duration && { 
      icon: <Clock className="h-5 w-5" />, 
      label: t('audiobook.duration'), 
      value: `${book.duration} ${t('minutes')}` 
    },
    book.narrator && { 
      icon: <Headphones className="h-5 w-5" />, 
      label: t('audiobook.narrator'), 
      value: book.narrator 
    },
    (book.format && book.fileSize) && { 
      icon: <FileAudio className="h-5 w-5" />, 
      label: t('audiobook.format'), 
      value: `${book.format} (${book.fileSize})` 
    },
    book.quality && { 
      icon: <Gauge className="h-5 w-5" />, 
      label: t('audiobook.quality'), 
      value: book.quality 
    }
  ].filter(Boolean) as Array<{
    icon: JSX.Element;
    label: string;
    value: string;
  }>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('audiobook.details')}</h2>

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