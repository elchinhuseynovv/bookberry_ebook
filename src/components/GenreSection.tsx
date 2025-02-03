import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { AudioBookCard } from './AudioBookCard';

interface Props {
  genre: string;
  books: Book[];
  onBookClick: (book: Book) => void;
}

export const GenreSection: React.FC<Props> = ({ genre, books, onBookClick }) => {
  const { t } = useTranslation();

  if (books.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 sepia:from-[#8B4513] sepia:to-[#A0522D] bg-clip-text text-transparent">
        {t(`genres.${genre}`)}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {books.map((book) => (
          <div key={book.id}>
            {book.isAudio ? (
              <AudioBookCard book={book} onClick={onBookClick} />
            ) : (
              <BookCard book={book} onClick={onBookClick} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};