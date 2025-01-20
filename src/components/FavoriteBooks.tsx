import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { AudioBookCard } from './AudioBookCard';
import { Heart } from 'lucide-react';

interface Props {
  books: Book[];
  onBookClick: (book: Book) => void;
}

export const FavoriteBooks: React.FC<Props> = ({ books, onBookClick }) => {
  const { t } = useTranslation();

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
          {t('favorites.empty')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t('favorites.addSome')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-fr pb-20">
      {books.map((book) => (
        book.isAudio ? (
          <AudioBookCard key={book.id} book={book} onClick={onBookClick} />
        ) : (
          <BookCard key={book.id} book={book} onClick={onBookClick} />
        )
      ))}
    </div>
  );
};