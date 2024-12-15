import { useState } from 'react';
import { Book } from '../types';
import { books } from '../data/books';
import { audiobooks } from '../data/audiobooks';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAudioBooks = audiobooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.narrator && book.narrator.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredBooks,
    filteredAudioBooks
  };
};