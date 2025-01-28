import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '../types';
import { Bookmark } from 'lucide-react';

interface Props {
  books: Book[];
  onBookClick: (book: Book, page: number) => void;
}

export const BookmarksList: React.FC<Props> = ({ books, onBookClick }) => {
  const { t } = useTranslation(['translation', 'bookmarkMessages']);

  const getBookmarks = () => {
    return books.map(book => {
      const bookmarks = localStorage.getItem(`bookmarks-${book.pdfUrl}`);
      return {
        book,
        pages: bookmarks ? JSON.parse(bookmarks) as number[] : []
      };
    }).filter(item => item.pages.length > 0);
  };

  const bookmarkedBooks = getBookmarks();

  if (bookmarkedBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bookmark className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
          {t('empty', { ns: 'bookmarkMessages' })}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t('addSome', { ns: 'bookmarkMessages' })}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {bookmarkedBooks.map(({ book, pages }) => (
        <div 
          key={book.id}
          className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
        >
          <div className="flex items-center gap-4 p-6 border-b border-gray-100 dark:border-gray-700">
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-24 object-cover rounded-lg shadow-md"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {book.author}
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
              {t('bookmark_pages')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => onBookClick(book, page)}
                  className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 
                           text-purple-600 dark:text-purple-400 text-sm font-medium
                           hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                >
                  {t('bookmark_page')} {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};