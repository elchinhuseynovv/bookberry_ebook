import React from 'react';
import { Book } from '../../types';
import { BookmarkPlus, Share2, Star, Clock } from 'lucide-react';
import { az } from '../../constants/translations';

interface Props {
  book: Book;
}

export const BookHeader: React.FC<Props> = ({ book }) => {
  return (
    <div className="relative h-[40vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover blur-xl opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/20 dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-900/20" />
      </div>

      <div className="relative flex h-full items-end p-8">
        <div className="flex gap-8">
          <img
            src={book.cover}
            alt={book.title}
            className="h-64 w-48 rounded-2xl object-cover shadow-2xl"
          />

          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{book.author}</p>
            </div>

            <div className="flex items-center gap-4">
              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {book.rating.toFixed(1)}
                  </span>
                </div>
              )}
              {book.duration && (
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Clock className="h-5 w-5" />
                  <span>{book.duration} {az.minutes}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button className="rounded-xl bg-purple-600 px-6 py-2 font-medium text-white shadow-lg shadow-purple-200 hover:bg-purple-700 dark:shadow-purple-900/20">
                {book.isAudio ? az.listen : az.read}
              </button>
              <button className="rounded-xl bg-white px-6 py-2 font-medium text-gray-700 shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                <BookmarkPlus className="h-5 w-5" />
              </button>
              <button className="rounded-xl bg-white px-6 py-2 font-medium text-gray-700 shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};