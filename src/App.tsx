import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { BookCard } from './components/BookCard';
import { AudioBookCard } from './components/AudioBookCard';
import { Sidebar } from './components/Sidebar';
import { Logo } from './components/Logo';
import { SettingsView } from './components/Settings/SettingsView';
import { BookDetailsView } from './components/BookDetails/BookDetailsView';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { SplashScreen } from './components/SplashScreen';
import { Book, ThemeMode, ViewMode } from './types';
import { az } from './constants/translations';
import { Search } from 'lucide-react';
import { books } from './data/books';
import { audiobooks } from './data/audiobooks';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [currentView, setCurrentView] = useState<ViewMode>('library');
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login attempt:', data);
    setIsAuthenticated(true);
  };

  const handleSignUp = (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    console.log('Sign up attempt:', data);
    setIsAuthenticated(true);
  };

  const handleResetPassword = (email: string) => {
    console.log('Reset password attempt for:', email);
  };

  const themeClasses = {
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
    sepia: 'bg-[#f4ecd8] text-[#5c4b37]'
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAudioBooks = audiobooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.narrator && book.narrator.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                placeholder={az.searchBooks}
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
                  {az.noBooks}
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
                placeholder={az.searchBooks}
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
                  {az.noBooks}
                </div>
              )}
            </div>
          </>
        );
    }
  };

  const mainContent = (
    <div className={`min-h-screen ${themeClasses[theme]} transition-colors duration-300`}>
      <main className="p-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-3xl font-bold text-purple-600 tracking-tight hidden sm:block">
              {az.appName}
            </h1>
          </div>
          <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
        </div>
        
        {renderContent()}
      </main>

      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      {selectedBook && (
        <BookDetailsView
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );

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
        mainContent
      )}
    </>
  );
}

export default App;