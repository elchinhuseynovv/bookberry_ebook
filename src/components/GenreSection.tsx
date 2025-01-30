import React from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { AudioBookCard } from './AudioBookCard';

interface Props {
  genre: string;
  books: Book[];
  onBookClick: (book: Book) => void;
}

export const GenreSection: React.FC<Props> = ({ genre, books, onBookClick }) => {
  if (books.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {genre}
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