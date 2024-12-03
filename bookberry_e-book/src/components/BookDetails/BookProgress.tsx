import React from 'react';
import { Book } from '../../types';
import { az } from '../../constants/translations';

interface Props {
  book: Book;
}

export const BookProgress: React.FC<Props> = ({ book }) => {
  return (
    <div className="rounded-2xl bg-purple-50 p-6 dark:bg-purple-900/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-purple-900 dark:text-purple-100">
          {book.isAudio ? az.listeningProgress : az.readingProgress}
        </h3>
        <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
          {book.progress}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-purple-200 dark:bg-purple-900">
        <div
          className="h-full rounded-full bg-purple-600 transition-all duration-300"
          style={{ width: `${book.progress}%` }}
        />
      </div>
    </div>
  );
};