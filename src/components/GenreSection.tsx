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
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {books.map((book) => (
            <div key={book.id} className="flex-shrink-0 w-48">
              {book.isAudio ? (
                <AudioBookCard book={book} onClick={onBookClick} />
              ) : (
                <BookCard book={book} onClick={onBookClick} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};