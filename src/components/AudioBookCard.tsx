import React from 'react';
import { Book } from '../types';
import { Headphones, Clock, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  book: Book;
  onClick: (book: Book) => void;
}

export const AudioBookCard: React.FC<Props> = ({ book, onClick }) => {
  const { t } = useTranslation();

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when downloading
    
    if (!book.audioUrl) {
      console.error('No audio URL available');
      return;
    }

    try {
      const response = await fetch(book.audioUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading audiobook:', error);
    }
  };

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
        {book.audioUrl && (
          <button
            onClick={handleDownload}
            className="absolute top-3 left-3 rounded-full bg-black/60 p-2 hover:bg-black/80 transition-colors"
            title={t('download')}
          >
            <Download className="h-4 w-4 text-white" />
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="mb-1 font-semibold text-lg text-white drop-shadow-md line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-100 drop-shadow-md line-clamp-1">
          {book.author}
        </p>
        <p className="mt-1 text-xs text-purple-300 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {book.duration} {t('minutes')}
        </p>
        <p className="text-xs text-purple-300 line-clamp-1">
          {t('narrator')}: {book.narrator}
        </p>
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