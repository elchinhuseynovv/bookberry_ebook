import { useState, useMemo } from 'react';
import { Book } from '../types';
import { books } from '../data/books';
import { audiobooks } from '../data/audiobooks';
import { useTranslation } from 'react-i18next';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [localBooks, setLocalBooks] = useState(books);
  const [localAudioBooks, setLocalAudioBooks] = useState(audiobooks);
  const { t } = useTranslation();

  const languages = useMemo(() => {
    const allBooks = [...localBooks, ...localAudioBooks];
    const uniqueLanguages = new Set(
      allBooks
        .map(book => book.language)
        .filter((lang): lang is string => !!lang)
    );
    return Array.from(uniqueLanguages);
  }, [localBooks, localAudioBooks]);

  const filteredBooks = useMemo(() => {
    return localBooks.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLanguage = !selectedLanguage || book.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });
  }, [searchQuery, selectedLanguage, localBooks]);

  const filteredAudioBooks = useMemo(() => {
    return localAudioBooks.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.narrator && book.narrator.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLanguage = !selectedLanguage || book.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });
  }, [searchQuery, selectedLanguage, localAudioBooks]);

  // Initialize favorites from localStorage
  useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.length > 0) {
      setLocalBooks(books.map(book => ({
        ...book,
        isFavorite: favorites.includes(book.id)
      })));
      setLocalAudioBooks(audiobooks.map(book => ({
        ...book,
        isFavorite: favorites.includes(book.id)
      })));
    }
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    languages,
    filteredBooks,
    filteredAudioBooks,
    setFilteredBooks: setLocalBooks,
    setFilteredAudioBooks: setLocalAudioBooks
  };
};