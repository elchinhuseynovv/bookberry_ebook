import React from 'react';
import { Book } from '../../types';
import { BookmarkPlus, Share2, Star, Clock } from 'lucide-react';
import { az } from '../../constants/translations';

interface Props {
  book: Book;
}

export const BookHeader: React.FC<Props> = ({ book }) => {
  const handleReadClick = () => {
    if (book.pdfUrl) {
      window.open(book.pdfUrl, '_blank');
    }
  };

  return (
    <div className="relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={book.cover}
          alt=""
          className="w-full h-full object-cover filter blur-xl opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white dark:to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative px-8 pt-20 pb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book cover */}
          <div className="flex-shrink-0">
            <img
              src={book.cover}
              alt={book.title}
              className="w-48 h-72 object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Book info */}
          <div className="flex flex-col justify-end">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">
                {book.title}
              </h1>
              <p className="text-xl text-gray-200">
                {book.author}
              </p>

              <div className="flex items-center gap-4">
                {book.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-white">
                      {book.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                {book.duration && (
                  <div className="flex items-center gap-1 text-gray-200">
                    <Clock className="h-5 w-5" />
                    <span>{book.duration} {az.minutes}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleReadClick}
                  className="rounded-xl bg-purple-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-purple-500/25 hover:bg-purple-700 transition-colors"
                >
                  {book.isAudio ? az.listen : az.read}
                </button>
                <button className="rounded-xl bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white shadow-lg hover:bg-white/20 transition-colors">
                  <BookmarkPlus className="h-5 w-5" />
                </button>
                <button className="rounded-xl bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white shadow-lg hover:bg-white/20 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};