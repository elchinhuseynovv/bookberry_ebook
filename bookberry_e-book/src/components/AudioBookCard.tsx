import React from 'react';
import { Book } from '../types';
import { Headphones, Clock } from 'lucide-react';
import { az } from '../constants/translations';

interface Props {
  book: Book;
  onClick: (book: Book) => void;
}

export const AudioBookCard: React.FC<Props> = ({ book, onClick }) => {
  return (
    <div
      onClick={() => onClick(book)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer dark:bg-gray-800"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 rounded-full bg-black/60 p-2">
          <Headphones className="h-4 w-4 text-white" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="mb-1 font-semibold line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-1">{book.author}</p>
        <p className="mt-1 text-xs text-purple-300 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {book.duration} {az.minutes}
        </p>
        <p className="text-xs text-purple-300 line-clamp-1">{book.narrator}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-gray-300/30">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{ width: `${book.progress}%` }}
            />
          </div>
          <span className="text-xs text-purple-300">{book.progress}%</span>
        </div>
      </div>
    </div>
  );
};