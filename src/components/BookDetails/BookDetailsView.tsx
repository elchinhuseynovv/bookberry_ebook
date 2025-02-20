import React, { useEffect } from 'react';
import { Book } from '../../types';
import { BookHeader } from './BookHeader';
import { BookInfo } from './BookInfo';
import { AudioBookInfo } from './AudioBookInfo';
import { BookProgress } from './BookProgress';
import { BookReviews } from './BookReviews';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  book: Book;
  onClose: () => void;
  onToggleFavorite: (book: Book) => void;
  initialPage?: number;
}

export const BookDetailsView: React.FC<Props> = ({ book, onClose, onToggleFavorite, initialPage }) => {
  const { t } = useTranslation();

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

  if (!book) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl overflow-y-auto rounded-none md:rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-xl bg-black/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/20"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Hero Section with Blurred Background */}
        <div className="relative">
          {/* Blurred Background Cover */}
          <div 
            className="absolute inset-0 h-[300px] bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${book.cover})`,
              filter: 'blur(20px)',
              transform: 'scale(1.1)', // Prevent blur edges from showing
              opacity: 0.3
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 h-[300px] bg-gradient-to-b from-black/60 via-black/40 to-white dark:to-gray-900" />

          {/* Content Container */}
          <div className="relative px-6 pt-16 pb-6 md:px-8 md:pt-8 md:pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Book Cover */}
              <div className="w-40 md:w-56 mx-auto md:mx-0 flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black/5"
                  style={{ aspectRatio: '2/3' }}
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-200 mb-4">{book.author}</p>
                {book.isAudio && book.narrator && (
                  <p className="text-sm text-gray-300">
                    {t('audiobook.narrator')}: {book.narrator}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="mt-8">
                  <BookHeader 
                    book={book} 
                    onToggleFavorite={onToggleFavorite}
                    initialPage={initialPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Book Details */}
        <div className="space-y-8 p-6 md:p-8">
          <BookProgress book={book} />
          {book.isAudio ? (
            <AudioBookInfo book={book} />
          ) : (
            <BookInfo book={book} />
          )}
          {book.reviews && book.reviews.length > 0 && (
            <BookReviews book={book} />
          )}
        </div>
      </div>
    </div>
  );
};