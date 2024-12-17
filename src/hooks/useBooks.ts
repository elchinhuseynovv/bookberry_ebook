import { useState, useEffect } from 'react';
import { DBBook, DBUserProgress } from '../types/database';
import { booksDB } from '../services/database/books';

export const useBooks = (userId: string) => {
  const [books, setBooks] = useState<DBBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBooks(booksDB.getAllBooks());
    setLoading(false);
  }, []);

  const getUserProgress = (bookId: string): DBUserProgress | undefined => {
    return booksDB.getUserProgress(userId, bookId);
  };

  const updateProgress = (progress: DBUserProgress) => {
    booksDB.updateUserProgress(progress);
  };

  const getBooksByGenre = (genre: string): DBBook[] => {
    return booksDB.getBooksByGenre(genre);
  };

  const getBooksByAuthor = (author: string): DBBook[] => {
    return booksDB.getBooksByAuthor(author);
  };

  return {
    books,
    loading,
    getUserProgress,
    updateProgress,
    getBooksByGenre,
    getBooksByAuthor
  };
};