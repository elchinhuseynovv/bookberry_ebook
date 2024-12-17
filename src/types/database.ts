export interface DBBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  pdfUrl: string;
  publishedYear?: number;
  language?: string;
  pages?: number;
  genre?: string;
  description?: string;
  isPublicDomain: boolean;
  source: string;
  lastUpdated: string;
}

export interface DBCollection {
  id: string;
  name: string;
  description: string;
  bookIds: string[];
}

export interface DBUserProgress {
  userId: string;
  bookId: string;
  currentPage: number;
  totalPages: number;
  lastRead: string;
  bookmarks: DBBookmark[];
}

export interface DBBookmark {
  id: string;
  page: number;
  note?: string;
  createdAt: string;
}