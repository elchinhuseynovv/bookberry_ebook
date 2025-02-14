import React, { useState, useEffect } from 'react';
import { Book } from '../../types';
import { BookmarkPlus, BookmarkCheck, Share2, Star, Clock, Check, Copy, Facebook, Instagram, MessageCircle, Heart, HeartOff, Download, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { storage } from '../../services/storage';
import { pdfToEpubConverter } from '../../services/conversion/pdfToEpub';
import { PDFReader } from '../BookReader/PDFReader';
import { downloadManager } from '../../services/download/downloadManager';

interface Props {
  book: Book;
  onToggleFavorite: (book: Book) => void;
  initialPage?: number;
}

export const BookHeader: React.FC<Props> = ({ book, onToggleFavorite, initialPage }) => {
  const { t } = useTranslation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(book.isFavorite || false);
  const [showPdfReader, setShowPdfReader] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [epubUrl, setEpubUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);

      await downloadManager.downloadBook(book);
      
    } catch (error) {
      console.error('Error downloading:', error);
      setDownloadError(t('downloadError'));
      
      // Auto-hide error after 3 seconds
      setTimeout(() => {
        setDownloadError(null);
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReadClick = async () => {
    if (book.pdfUrl) {
      if (!epubUrl) {
        setIsConverting(true);
        try {
          const convertedUrl = await pdfToEpubConverter.convert(book);
          setEpubUrl(convertedUrl);
          setShowPdfReader(true);
        } catch (error) {
          console.error('Error converting PDF:', error);
          // If conversion fails, show PDF directly
          setShowPdfReader(true);
        } finally {
          setIsConverting(false);
        }
      } else {
        setShowPdfReader(true);
      }
    }
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    // Save bookmark state to local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (!isBookmarked) {
      bookmarks.push(book.id);
    } else {
      const index = bookmarks.indexOf(book.id);
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onToggleFavorite({ ...book, isFavorite: newFavoriteState });
  };

  const isShareSupported = () => {
    try {
      return navigator.share !== undefined && 
             !window.location.href.includes('stackblitz.com') &&
             !window.location.href.includes('localhost') &&
             window.location.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
      return true;
    } catch {
      return false;
    }
  };

  const getShareText = () => {
    return `${book.title} by ${book.author}\n${window.location.href}`;
  };

  const handleShare = async (platform?: string) => {
    const shareText = getShareText();
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(window.location.href);

    if (platform) {
      let shareUrl = '';
      switch (platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodedText}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
          break;
        case 'instagram':
          // Instagram doesn't have a direct sharing URL, but we can copy to clipboard
          await copyToClipboard(shareText);
          alert(t('shareToInstagramGuide'));
          return;
        default:
          break;
      }
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      setShowShareMenu(false);
    } else {
      // Try native sharing first, fall back to menu if it fails
      if (isShareSupported()) {
        try {
          await navigator.share({
            title: book.title,
            text: `Check out "${book.title}" by ${book.author}`,
            url: window.location.href
          });
        } catch (error) {
          // If share fails for any reason (denied permission, etc), show the menu
          setShowShareMenu(true);
        }
      } else {
        setShowShareMenu(true);
      }
    }
  };

  // Close share menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showShareMenu && !(event.target as Element).closest('.share-menu')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showShareMenu]);

  // Check if book is bookmarked on component mount
  React.useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(book.id));
  }, [book.id]);

  return (
    <>
      <div className="relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={book.cover}
            alt=""
            className="w-full h-full object-cover filter blur-xl opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white dark:to-gray-900" />
        </div>

        {/* Content */}
        <div className="relative px-4 md:px-8 pt-16 md:pt-20 pb-6 md:pb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Book cover */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={book.cover}
                alt={book.title}
                className="w-40 h-60 md:w-48 md:h-72 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Book info */}
            <div className="flex flex-col justify-end text-center md:text-left">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {book.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200">
                  {book.author}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-4">
                  {book.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-white">
                        {book.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  {book.duration && (
                    <div className="flex items-center gap-1 text-gray-200">
                      <Clock className="h-5 w-5" />
                      <span>{book.duration} {t('minutes')}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                  <button 
                    onClick={handleReadClick}
                    disabled={isConverting}
                    className={`rounded-xl px-6 py-2.5 font-medium text-white shadow-lg transition-colors
                      ${isConverting 
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 shadow-purple-500/25 hover:bg-purple-700'
                      }`}
                  >
                    {isConverting ? t('converting') : book.isAudio ? t('listen') : t('read')}
                  </button>

                  {/* Download Button - Always visible */}
                  <div className="relative">
                    <button 
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className={`rounded-xl bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white shadow-lg hover:bg-white/20 transition-colors
                        ${isDownloading ? 'cursor-not-allowed opacity-75' : ''}`}
                      aria-label={isDownloading ? t('downloading') : t('download')}
                    >
                      <Download className={`h-5 w-5 ${isDownloading ? 'animate-pulse' : ''}`} />
                    </button>
                    {downloadError && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg whitespace-nowrap flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {downloadError}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handleBookmarkClick}
                    className="rounded-xl bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white shadow-lg hover:bg-white/20 transition-colors"
                    aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-5 w-5 text-purple-400" />
                    ) : (
                      <BookmarkPlus className="h-5 w-5" />
                    )}
                  </button>
                  <button 
                    onClick={handleFavoriteClick}
                    className="rounded-xl bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white shadow-lg hover:bg-white/20 transition-colors"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? (
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    ) : (
                      <Heart className="h-5 w-5" />
                    )}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => handleShare()}
                      className="rounded-xl bg-white/10 backdrop-blur-sm px-6 py-2.5 font-medium text-white shadow-lg hover:bg-white/20 transition-colors group"
                      aria-label="Share"
                    >
                      {showCopySuccess ? (
                        <Check className="h-5 w-5 text-green-400" />
                      ) : (
                        <Share2 className="h-5 w-5" />
                      )}
                    </button>

                    {/* Share Menu */}
                    {showShareMenu && (
                      <div className="share-menu absolute bottom-full left-0 mb-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg p-2 z-50">
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <MessageCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-200">WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Facebook className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700 dark:text-gray-200">Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare('instagram')}
                          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-pink-600" />
                          <span className="text-gray-700 dark:text-gray-200">Instagram</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(getShareText())}
                          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Copy className="h-5 w-5 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-200">{t('copyLink')}</span>
                        </button>
                      </div>
                    )}

                    {showCopySuccess && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg whitespace-nowrap">
                        {t('copiedToClipboard')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPdfReader && book.pdfUrl && (
        <PDFReader 
          url={epubUrl || book.pdfUrl}
          initialPage={initialPage}
          onClose={() => {
            setShowPdfReader(false);
            if (epubUrl) {
              URL.revokeObjectURL(epubUrl);
              setEpubUrl(null);
            }
          }} 
        />
      )}
    </>
  );
};