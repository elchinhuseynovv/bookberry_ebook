import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { SplashScreen } from './components/SplashScreen';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { ViewMode } from './types';
import { useSearch } from './hooks/useSearch';
import { LanguageFilter } from './components/LanguageFilter';
import { GenreSection } from './components/GenreSection';
import { FavoriteBooks } from './components/FavoriteBooks';
import { BookmarksList } from './components/BookmarksList';
import { SettingsView } from './components/Settings/SettingsView';
import { BookDetailsView } from './components/BookDetails/BookDetailsView';
import { books } from './data/books';
import { audiobooks } from './data/audiobooks';
import { Book } from './types';

function App() {
  const { t } = useTranslation();
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewMode>('library');
  const { theme, setTheme, themeClasses } = useTheme();
  const {
    isAuthenticated,
    loading,
    showSignUp,
    showResetPassword,
    setShowSignUp,
    setShowResetPassword,
    handleLogin,
    handleSignUp,
    handleResetPassword
  } = useAuth();

  const {
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    languages,
    filteredBooks,
    filteredAudioBooks,
    setFilteredBooks,
    setFilteredAudioBooks
  } = useSearch();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : 'auto';
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [showSplash]);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseBookDetails = () => {
    setSelectedBook(null);
  };

  const handleToggleFavorite = (book: Book) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.includes(book.id);
    
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== book.id)
      : [...favorites, book.id];
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    if (book.isAudio) {
      setFilteredAudioBooks(
        filteredAudioBooks.map(b => 
          b.id === book.id ? { ...b, isFavorite: !isFavorite } : b
        )
      );
    } else {
      setFilteredBooks(
        filteredBooks.map(b => 
          b.id === book.id ? { ...b, isFavorite: !isFavorite } : b
        )
      );
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'library':
        return (
          <div className="space-y-8">
            {/* Search and Filter */}
            <div className="space-y-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchBooks')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none"
              />
              <LanguageFilter
                selectedLanguage={selectedLanguage}
                onLanguageSelect={setSelectedLanguage}
                languages={languages}
              />
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <GenreSection
                genre="all"
                books={filteredBooks}
                onBookClick={handleBookClick}
              />
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                {t('noBooks')}
              </div>
            )}
          </div>
        );

      case 'audiobooks':
        return (
          <div className="space-y-8">
            {/* Search and Filter */}
            <div className="space-y-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchBooks')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none"
              />
              <LanguageFilter
                selectedLanguage={selectedLanguage}
                onLanguageSelect={setSelectedLanguage}
                languages={languages}
              />
            </div>

            {/* Audiobooks Grid */}
            {filteredAudioBooks.length > 0 ? (
              <GenreSection
                genre="all"
                books={filteredAudioBooks}
                onBookClick={handleBookClick}
              />
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                {t('noBooks')}
              </div>
            )}
          </div>
        );

      case 'favorites':
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favoriteBooks = [...books, ...audiobooks].filter(book => 
          favoriteIds.includes(book.id)
        );
        return (
          <FavoriteBooks
            books={favoriteBooks}
            onBookClick={handleBookClick}
          />
        );

      case 'bookmarks':
        return (
          <BookmarksList
            books={[...books, ...audiobooks]}
            onBookClick={(book, page) => {
              setSelectedBook(book);
              // You can handle the page number here if needed
            }}
          />
        );

      case 'settings':
        return <SettingsView />;

      default:
        return null;
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    if (showResetPassword) {
      return (
        <ResetPasswordPage 
          onResetPassword={handleResetPassword}
          onBackToLogin={() => setShowResetPassword(false)}
        />
      );
    }

    if (showSignUp) {
      return (
        <SignUpPage 
          onSignUp={handleSignUp} 
          onBackToLogin={() => setShowSignUp(false)} 
        />
      );
    }

    return (
      <LoginPage 
        onLogin={handleLogin} 
        onSignUp={() => setShowSignUp(true)}
        onForgotPassword={() => setShowResetPassword(true)}
      />
    );
  }

  return (
    <>
      {showSplash && <SplashScreen />}
      <MainLayout
        theme={theme}
        themeClasses={themeClasses}
        onThemeChange={setTheme}
        currentView={currentView}
        onViewChange={setCurrentView}
      >
        {renderContent()}
      </MainLayout>

      {selectedBook && (
        <BookDetailsView
          book={selectedBook}
          onClose={handleCloseBookDetails}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
}

export default App;