import { DBBook, DBUserProgress } from '../../types/database';
import { pdfBooks } from '../../data/pdf-books';

class BooksDatabase {
  private books: Map<string, DBBook>;
  private userProgress: Map<string, DBUserProgress>;

  constructor() {
    this.books = new Map();
    this.userProgress = new Map();
    this.initializeBooks();
  }

  private initializeBooks(): void {
    pdfBooks.forEach(book => {
      this.books.set(book.id, book);
    });
  }

  public getBook(id: string): DBBook | undefined {
    return this.books.get(id);
  }

  public getAllBooks(): DBBook[] {
    return Array.from(this.books.values());
  }

  public getBooksByGenre(genre: string): DBBook[] {
    return this.getAllBooks().filter(book => book.genre === genre);
  }

  public getBooksByAuthor(author: string): DBBook[] {
    return this.getAllBooks().filter(book => book.author === author);
  }

  public getUserProgress(userId: string, bookId: string): DBUserProgress | undefined {
    const key = `${userId}-${bookId}`;
    return this.userProgress.get(key);
  }

  public updateUserProgress(progress: DBUserProgress): void {
    const key = `${progress.userId}-${progress.bookId}`;
    this.userProgress.set(key, progress);
    this.saveProgressToStorage(key, progress);
  }

  private saveProgressToStorage(key: string, progress: DBUserProgress): void {
    try {
      localStorage.setItem(`progress-${key}`, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  private loadProgressFromStorage(key: string): DBUserProgress | undefined {
    try {
      const stored = localStorage.getItem(`progress-${key}`);
      return stored ? JSON.parse(stored) : undefined;
    } catch (error) {
      console.error('Error loading progress:', error);
      return undefined;
    }
  }
}

export const booksDB = new BooksDatabase();