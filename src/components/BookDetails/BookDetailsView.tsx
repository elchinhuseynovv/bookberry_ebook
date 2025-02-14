import React, { useEffect } from 'react';
import { Book } from '../../types';
import { BookHeader } from './BookHeader';
import { BookInfo } from './BookInfo';
import { AudioBookInfo } from './AudioBookInfo';
import { BookProgress } from './BookProgress';
import { BookReviews } from './BookReviews';
import { X } from 'lucide-react';
import { az } from '../../constants/translations';

interface Props {
  book: Book;
  onClose: () => void;
  onToggleFavorite: (book: Book) => void;
  initialPage?: number;
}

export const BookDetailsView: React.FC<Props> = ({ book, onClose, onToggleFavorite, initialPage }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl overflow-y-auto rounded-none md:rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-xl bg-black/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/20"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <BookHeader 
          book={book} 
          onToggleFavorite={onToggleFavorite}
          initialPage={initialPage}
        />
        
        {/* Add pb-32 for mobile to prevent content from being hidden behind the bottom navigation */}
        <div className="space-y-8 p-4 md:p-8 pb-32 md:pb-8">
          <BookProgress book={book} />
          {book.isAudio ? (
            <AudioBookInfo book={book} />
          ) : (
            <BookInfo book={book} />
          )}
          <BookReviews book={book} />
        </div>
      </div>
    </div>
  );
};