import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Bookmark, BookmarkPlus, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  url: string;
  onClose: () => void;
  initialPage?: number;
}

export const PDFReader: React.FC<Props> = ({ url, onClose, initialPage }) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showPageSearch, setShowPageSearch] = useState(false);
  const [searchPage, setSearchPage] = useState('');
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const stored = localStorage.getItem(`bookmarks-${url}`);
    return stored ? JSON.parse(stored) : [];
  });

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.page-search-container')) {
        setShowPageSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load the initial page or last viewed page
  useEffect(() => {
    if (initialPage) {
      setPageNumber(initialPage);
    } else {
      const lastPage = localStorage.getItem(`last-page-${url}`);
      if (lastPage) {
        const savedPage = parseInt(lastPage, 10);
        if (savedPage !== pageNumber) {
          const confirmNavigation = window.confirm(
            t('bookmarks.resumePrompt', {
              defaultValue: 'Would you like to resume from your last reading position (page {{page}})?',
              page: savedPage
            })
          );
          if (confirmNavigation) {
            setPageNumber(savedPage);
          }
        }
      }
    }
  }, [url, initialPage, t]);

  // Save the current page when it changes
  useEffect(() => {
    localStorage.setItem(`last-page-${url}`, pageNumber.toString());
  }, [pageNumber, url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    if (numPages) {
      setPageNumber(prevPage => {
        const newPage = prevPage + offset;
        return Math.max(1, Math.min(newPage, numPages));
      });
    }
  };

  const handlePageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(searchPage, 10);
    if (numPages && !isNaN(page) && page >= 1 && page <= numPages) {
      setPageNumber(page);
      setSearchPage('');
      setShowPageSearch(false);
    }
  };

  const adjustZoom = (delta: number) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.max(0.5, Math.min(newScale, 2.5));
    });
  };

  const toggleBookmark = () => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(pageNumber)
        ? prev.filter(p => p !== pageNumber)
        : [...prev, pageNumber].sort((a, b) => a - b);
      
      localStorage.setItem(`bookmarks-${url}`, JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const isCurrentPageBookmarked = bookmarks.includes(pageNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex flex-wrap items-center justify-between gap-2 p-4 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => adjustZoom(-0.1)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={t('zoom.out')}
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={() => adjustZoom(0.1)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={t('zoom.in')}
          >
            <ZoomIn size={20} />
          </button>
          <span className="text-white">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-2 order-last w-full sm:w-auto sm:order-none">
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isCurrentPageBookmarked
                ? 'bg-purple-500 hover:bg-purple-600'
                : 'bg-white/10 hover:bg-white/20'
            }`}
            title={isCurrentPageBookmarked ? t('bookmarks.remove') : t('bookmarks.add')}
          >
            {isCurrentPageBookmarked ? <Bookmark size={20} className="text-white" /> : <BookmarkPlus size={20} className="text-white" />}
          </button>

          {/* Page Navigation */}
          <div className="flex-1 sm:flex-none flex items-center bg-gray-800 rounded-lg border border-gray-600 min-w-0 sm:min-w-[200px]">
            <form onSubmit={handlePageSearch} className="flex-1 flex items-center px-3">
              <input
                type="number"
                value={searchPage}
                onChange={(e) => setSearchPage(e.target.value)}
                min={1}
                max={numPages || 1}
                className="w-12 sm:w-16 bg-transparent text-white text-center focus:outline-none"
                placeholder={pageNumber.toString()}
              />
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-400">{numPages || '--'}</span>
            </form>
            <button
              type="submit"
              onClick={handlePageSearch}
              className="p-2 text-white hover:bg-gray-700 rounded-r-lg transition-colors border-l border-gray-600"
            >
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= (numPages || 0)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="h-full w-full overflow-auto pt-28 sm:pt-20 pb-4 px-4">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">{t('loading')}...</div>
          </div>
        )}
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-white text-lg">{t('loading')}...</div>}
          error={<div className="text-red-500">{t('errorLoadingPDF')}</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            loading={<div className="text-white text-lg">{t('loading')}...</div>}
            className="flex justify-center"
          />
        </Document>
      </div>
    </div>
  );
};