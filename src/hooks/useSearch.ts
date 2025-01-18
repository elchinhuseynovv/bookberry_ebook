import { useState, useMemo } from 'react';
import { Book } from '../types';
import { books } from '../data/books';
import { audiobooks } from '../data/audiobooks';
import { useTranslation } from 'react-i18next';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const { t } = useTranslation();

  const languages = useMemo(() => {
    const allBooks = [...books, ...audiobooks];
    const uniqueLanguages = new Set(
      allBooks
        .map(book => book.language)
        .filter((lang): lang is string => !!lang)
    );
    return Array.from(uniqueLanguages);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLanguage = !selectedLanguage || book.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });
  }, [searchQuery, selectedLanguage]);

  const filteredAudioBooks = useMemo(() => {
    return audiobooks.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.narrator && book.narrator.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLanguage = !selectedLanguage || book.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });
  }, [searchQuery, selectedLanguage]);

  return {
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    languages,
    filteredBooks,
    filteredAudioBooks
  };
};