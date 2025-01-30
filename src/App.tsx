import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from './components/layout/MainLayout';
import { BookDetailsView } from './components/BookDetails/BookDetailsView';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { SplashScreen } from './components/SplashScreen';
import { LanguageFilter } from './components/LanguageFilter';
import { GenreSection } from './components/GenreSection';
import { Book, ViewMode } from './types';
import { Search } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';
import { genres } from './data/genres';
import { SettingsView } from './components/Settings/SettingsView';
import { FavoriteBooks } from './components/FavoriteBooks';
import { BookmarksList } from './components/BookmarksList';
import { AudioBookCard } from './components/AudioBookCard';

function App() {
  const { t } = useTranslation();
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewMode>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  const { theme, setTheme, themeClasses } = useTheme();
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
  const {
    isAuthenticated,
    showSignUp,
    showResetPassword,
    setShowSignUp,
    setShowResetPassword,
    handleLogin,
    handleSignUp,
    handleResetPassword
  } = useAuth();

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

  const handleBookmarkClick = (book: Book, page: number) => {
    setSelectedBook(book);
    localStorage.setItem(`last-page-${book.pdfUrl}`, page.toString());
  };

  const handleToggleFavorite = (book: Book) => {
    const updatedBooks = filteredBooks.map(b => 
      b.id === book.id ? { ...b, isFavorite: !book.isFavorite } : b
    );
    const updatedAudioBooks = filteredAudioBooks.map(b => 
      b.id === book.id ? { ...b, isFavorite: !book.isFavorite } : b
    );

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!book.isFavorite) {
      favorites.push(book.id);
    } else {
      const index = favorites.indexOf(book.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));

    setFilteredBooks(updatedBooks);
    setFilteredAudioBooks(updatedAudioBooks);
  };

  const getBooksByGenre = (genre: string) => {
    return [...filteredBooks, ...filteredAudioBooks].filter(book => 
      book.genre?.toLowerCase() === genre.toLowerCase()
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <SettingsView />;
      case 'favorites':
        return (
          <>
            <div className="relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchBooks')}
                className={`w-full h-12 rounded-xl border-2 px-12 font-medium transition-all duration-300
                  ${theme === 'dark' 
                    ? 'bg-gray-800/90 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400'
                    : theme === 'sepia'
                    ? 'bg-[#f8f4ea] border-purple-400/40 text-[#5c4b37] placeholder-[#8b7355] focus:border-purple-500'
                    : 'bg-white border-purple-200 text-gray-800 placeholder-gray-500 focus:border-purple-400'
                  }
                  shadow-[0_4px_12px_rgba(124,58,237,0.05)]
                  hover:shadow-[0_4px_16px_rgba(124,58,237,0.15)]
                  focus:shadow-[0_4px_20px_rgba(124,58,237,0.2)]
                  focus:outline-none`}
              />
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300
                ${theme === 'dark'
                  ? 'text-purple-400'
                  : theme === 'sepia'
                  ? 'text-purple-500'
                  : 'text-purple-500'
                }`} 
              />
            </div>

            <LanguageFilter
              selectedLanguage={selectedLanguage}
              onLanguageSelect={setSelectedLanguage}
              languages={languages}
            />

            <FavoriteBooks
              books={[...filteredBooks, ...filteredAudioBooks].filter(book => book.isFavorite)}
              onBookClick={handleBookClick}
            />
          </>
        );
      case 'bookmarks':
        return (
          <BookmarksList
            books={[...filteredBooks, ...filteredAudioBooks]}
            onBookClick={handleBookmarkClick}
          />
        );
      case 'audiobooks':
        return (
          <>
            <div className="relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchBooks')}
                className={`w-full h-12 rounded-xl border-2 px-12 font-medium transition-all duration-300
                  ${theme === 'dark' 
                    ? 'bg-gray-800/90 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400'
                    : theme === 'sepia'
                    ? 'bg-[#f8f4ea] border-purple-400/40 text-[#5c4b37] placeholder-[#8b7355] focus:border-purple-500'
                    : 'bg-white border-purple-200 text-gray-800 placeholder-gray-500 focus:border-purple-400'
                  }
                  shadow-[0_4px_12px_rgba(124,58,237,0.05)]
                  hover:shadow-[0_4px_16px_rgba(124,58,237,0.15)]
                  focus:shadow-[0_4px_20px_rgba(124,58,237,0.2)]
                  focus:outline-none`}
              />
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300
                ${theme === 'dark'
                  ? 'text-purple-400'
                  : theme === 'sepia'
                  ? 'text-purple-500'
                  : 'text-purple-500'
                }`} 
              />
            </div>

            <LanguageFilter
              selectedLanguage={selectedLanguage}
              onLanguageSelect={setSelectedLanguage}
              languages={languages}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-fr pb-20">
              {filteredAudioBooks.length > 0 ? (
                filteredAudioBooks.map((book) => (
                  <AudioBookCard key={book.id} book={book} onClick={handleBookClick} />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  {t('noBooks')}
                </div>
              )}
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchBooks')}
                className={`w-full h-12 rounded-xl border-2 px-12 font-medium transition-all duration-300
                  ${theme === 'dark' 
                    ? 'bg-gray-800/90 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400'
                    : theme === 'sepia'
                    ? 'bg-[#f8f4ea] border-purple-400/40 text-[#5c4b37] placeholder-[#8b7355] focus:border-purple-500'
                    : 'bg-white border-purple-200 text-gray-800 placeholder-gray-500 focus:border-purple-400'
                  }
                  shadow-[0_4px_12px_rgba(124,58,237,0.05)]
                  hover:shadow-[0_4px_16px_rgba(124,58,237,0.15)]
                  focus:shadow-[0_4px_20px_rgba(124,58,237,0.2)]
                  focus:outline-none`}
              />
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300
                ${theme === 'dark'
                  ? 'text-purple-400'
                  : theme === 'sepia'
                  ? 'text-purple-500'
                  : 'text-purple-500'
                }`} 
              />
            </div>

            <LanguageFilter
              selectedLanguage={selectedLanguage}
              onLanguageSelect={setSelectedLanguage}
              languages={languages}
            />

            <div className="space-y-8 pb-20">
              {genres.map((genre) => (
                <GenreSection
                  key={genre.id}
                  genre={genre.name}
                  books={getBooksByGenre(genre.name)}
                  onBookClick={handleBookClick}
                />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <>
      {showSplash && <SplashScreen />}
      {!isAuthenticated ? (
        showResetPassword ? (
          <ResetPasswordPage 
            onResetPassword={handleResetPassword}
            onBackToLogin={() => setShowResetPassword(false)}
          />
        ) : showSignUp ? (
          <SignUpPage 
            onSignUp={handleSignUp} 
            onBackToLogin={() => setShowSignUp(false)} 
          />
        ) : (
          <LoginPage 
            onLogin={handleLogin} 
            onSignUp={() => setShowSignUp(true)}
            onForgotPassword={() => setShowResetPassword(true)}
          />
        )
      ) : (
        <MainLayout
          theme={theme}
          themeClasses={themeClasses}
          onThemeChange={setTheme}
          currentView={currentView}
          onViewChange={setCurrentView}
        >
          {renderContent()}
          {selectedBook && (
            <BookDetailsView
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </MainLayout>
      )}
    </>
  );
}

export default App;