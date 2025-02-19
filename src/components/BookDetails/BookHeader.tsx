import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from '../../types';
import { Heart, Share2, Download } from 'lucide-react';
import { downloadManager } from '../../services/download/downloadManager';
import { PDFReader } from '../BookReader/PDFReader';
import { pdfToEpubConverter } from '../../services/conversion/pdfToEpub';

interface Props {
  book: Book;
  onToggleFavorite: (book: Book) => void;
  initialPage?: number;
}

export const BookHeader: React.FC<Props> = ({ book, onToggleFavorite, initialPage }) => {
  const { t } = useTranslation();
  const [showPdfReader, setShowPdfReader] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [epubUrl, setEpubUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleReadClick = async () => {
    if (book.pdfUrl) {
      // For local PDFs, we can show them directly
      setShowPdfReader(true);
    } else {
      // For remote PDFs that need conversion
      setIsConverting(true);
      try {
        const convertedUrl = await pdfToEpubConverter.convert(book);
        setEpubUrl(convertedUrl);
        setShowPdfReader(true);
      } catch (error) {
        console.error('Error processing PDF:', error);
        // If conversion fails, try showing PDF directly
        setShowPdfReader(true);
      } finally {
        setIsConverting(false);
      }
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadManager.downloadBook(book);
    } catch (error) {
      console.error('Download error:', error);
      alert(t('downloadError'));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareText = `${t('sharePrompt')}\n${book.title} - ${book.author}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <>
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        {/* Cover Image */}
        <img
          src={book.cover}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            {book.title}
          </h1>
          <p className="text-lg text-gray-200">{book.author}</p>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            onClick={handleShare}
            className="relative rounded-xl bg-black/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/20"
            aria-label={t('copyLink')}
          >
            <Share2 size={20} />
            {showShareTooltip && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1 text-sm">
                {t('copiedToClipboard')}
              </div>
            )}
          </button>

          <button
            onClick={() => onToggleFavorite(book)}
            className={`rounded-xl p-2.5 text-white backdrop-blur-sm transition-colors
              ${book.isFavorite
                ? 'bg-purple-500/80 hover:bg-purple-600/80'
                : 'bg-black/10 hover:bg-black/20'
              }`}
            aria-label="Toggle favorite"
          >
            <Heart
              size={20}
              className={book.isFavorite ? 'fill-white' : ''}
            />
          </button>

          {(book.pdfUrl || book.audioUrl) && (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="rounded-xl bg-black/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/20 disabled:opacity-50"
              aria-label={t('download')}
            >
              <Download size={20} />
            </button>
          )}
        </div>

        {/* Main Action Button */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
          <button
            onClick={handleReadClick}
            disabled={isConverting}
            className="rounded-xl bg-purple-600 px-6 py-2.5 font-medium text-white shadow-lg 
                     transition-all hover:bg-purple-700 hover:shadow-xl disabled:opacity-70"
          >
            {isConverting ? t('converting') : book.isAudio ? t('listen') : t('read')}
          </button>
        </div>
      </div>

      {/* PDF Reader */}
      {showPdfReader && book.pdfUrl && (
        <PDFReader
          url={epubUrl || book.pdfUrl}
          onClose={() => setShowPdfReader(false)}
          initialPage={initialPage}
        />
      )}
    </>
  );
};