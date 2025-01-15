import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from './components/layout/MainLayout';
import { BookCard } from './components/BookCard';
import { AudioBookCard } from './components/AudioBookCard';
import { SettingsView } from './components/Settings/SettingsView';
import { BookDetailsView } from './components/BookDetails/BookDetailsView';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { SplashScreen } from './components/SplashScreen';
import { Book, ViewMode } from './types';
import { Search } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';

function App() {
  const { t } = useTranslation();
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewMode>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  const { theme, setTheme, themeClasses } = useTheme();
  const { searchQuery, setSearchQuery, filteredBooks, filteredAudioBooks } = useSearch();
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

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <SettingsView />;
      case 'bookmarks':
        return <div>Bookmarks view coming soon</div>;
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-fr pb-20">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} onClick={handleBookClick} />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  {t('noBooks')}
                </div>
              )}
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
            />
          )}
        </MainLayout>
      )}
    </>
  );
}

export default App;