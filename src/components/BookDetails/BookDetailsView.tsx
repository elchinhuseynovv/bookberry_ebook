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
  onToggleFavorite: (book: Book) => void;
}

export const BookDetailsView: React.FC<Props> = ({ book, onClose, onToggleFavorite }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 rounded-xl bg-black/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/20"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <BookHeader book={book} onToggleFavorite={onToggleFavorite} />
        
        <div className="space-y-8 p-8">
          <BookProgress book={book} />
          <BookInfo book={book} />
          <BookReviews book={book} />
        </div>
      </div>
    </div>
  );
};