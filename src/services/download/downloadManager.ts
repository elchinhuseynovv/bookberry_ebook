import { Book } from '../../types';

class DownloadManager {
  private readonly DEFAULT_PDF_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  private readonly DEFAULT_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  public async downloadBook(book: Book): Promise<void> {
    try {
      let url: string;
      let filename: string;

      if (book.isAudio) {
        url = book.audioUrl || this.DEFAULT_AUDIO_URL;
        filename = `${this.sanitizeFilename(book.title)}.mp3`;
      } else {
        url = book.pdfUrl || this.DEFAULT_PDF_URL;
        filename = `${this.sanitizeFilename(book.title)}.pdf`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }

  private sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9]/g, '_') // Replace non-alphanumeric characters with underscore
      .replace(/_+/g, '_') // Replace multiple underscores with single underscore
      .toLowerCase();
  }
}

export const downloadManager = new DownloadManager();