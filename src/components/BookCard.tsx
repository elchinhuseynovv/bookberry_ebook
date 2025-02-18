import React from 'react';
import { Book } from '../types';
import { Bookmark } from 'lucide-react';

interface Props {
  book: Book;
  onClick: (book: Book) => void;
}

export const BookCard: React.FC<Props> = ({ book, onClick }) => {
  const handleClick = () => {
    if (book.pdfUrl) {
      // If it's a local PDF, open it in the PDF viewer component
      onClick(book);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer dark:bg-gray-800"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="mb-1 font-semibold text-lg text-white drop-shadow-md line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-100 drop-shadow-md line-clamp-1">
          {book.author}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-gray-300/30">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{ width: `${book.progress}%` }}
            />
          </div>
          <Bookmark className="h-4 w-4 text-purple-300" />
        </div>
      </div>
    </div>
  );
};