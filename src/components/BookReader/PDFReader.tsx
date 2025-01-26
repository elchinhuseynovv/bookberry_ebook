import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  url: string;
  onClose: () => void;
}

export const PDFReader: React.FC<Props> = ({ url, onClose }) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);

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

  const adjustZoom = (delta: number) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.max(0.5, Math.min(newScale, 2.5));
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => adjustZoom(-0.1)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={() => adjustZoom(0.1)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ZoomIn size={20} />
          </button>
          <span className="text-white">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-4 text-white">
          <span>
            {pageNumber} / {numPages || '--'}
          </span>
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= (numPages || 0)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="h-full w-full overflow-auto pt-20 pb-4 px-4">
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