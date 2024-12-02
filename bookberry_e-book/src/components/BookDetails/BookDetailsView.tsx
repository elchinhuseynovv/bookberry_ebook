import React, { useEffect } from 'react';
import { Book } from '../../types';
import { BookHeader } from './BookHeader';
import { BookInfo } from './BookInfo';
import { BookProgress } from './BookProgress';
import { BookReviews } from './BookReviews';
import { X } from 'lucide-react';
import { az } from '../../constants/translations';

interface Props {
  book: Book;
  onClose: () => void;
}

export const BookDetailsView: React.FC<Props> = ({ book, onClose }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 rounded-xl bg-white/10 p-2 text-gray-600 backdrop-blur-sm transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <X size={24} />
        </button>

        <div className="h-full overflow-y-auto">
          <BookHeader book={book} />
          
          <div className="space-y-8 p-8">
            <BookProgress book={book} />
            <BookInfo book={book} />
            <BookReviews book={book} />
          </div>
        </div>
      </div>
    </div>
  );
};