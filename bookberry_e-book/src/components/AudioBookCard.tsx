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
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/60 rounded-full p-2">
          <Headphones className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-lg font-semibold text-white">{book.title}</h3>
        <p className="text-sm text-gray-200">{book.author}</p>
        <p className="text-xs text-purple-300 mt-1 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {book.duration} {az.minutes}
        </p>
        <p className="text-xs text-purple-300">{book.narrator}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-gray-300">
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