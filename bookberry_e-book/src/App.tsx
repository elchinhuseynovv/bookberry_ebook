import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { BookCard } from './components/BookCard';
import { AudioBookCard } from './components/AudioBookCard';
import { Sidebar } from './components/Sidebar';
import { Logo } from './components/Logo';
import { SettingsView } from './components/Settings/SettingsView';
import { Book, ThemeMode, ViewMode } from './types';
import { az } from './constants/translations';
import { Search } from 'lucide-react';
import { books } from './data/books';
import { audiobooks } from './data/audiobooks';

function App() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [currentView, setCurrentView] = useState<ViewMode>('library');
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <SettingsView />;
      case 'bookmarks':
        return <div>Bookmarks view coming soon</div>;
      case 'audiobooks':
        return (
          <>
            <div className="relative mb-8 group">
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
              <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none
                ${theme === 'dark'
                  ? 'bg-purple-500/5'
                  : theme === 'sepia'
                  ? 'bg-purple-400/5'
                  : 'bg-purple-50/50'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredAudioBooks.length > 0 ? (
                filteredAudioBooks.map((book) => (
                  <AudioBookCard key={book.id} book={book} onClick={() => console.log('Audio book clicked:', book.title)} />
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
            <div className="relative mb-8 group">
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
              <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none
                ${theme === 'dark'
                  ? 'bg-purple-500/5'
                  : theme === 'sepia'
                  ? 'bg-purple-400/5'
                  : 'bg-purple-50/50'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} onClick={() => console.log('Book clicked:', book.title)} />
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

  return (
    <div className={`min-h-screen ${themeClasses[theme]} transition-colors duration-300`}>
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="ml-16 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-3xl font-bold text-purple-600 tracking-tight">{az.appName}</h1>
          </div>
          <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
}

export default App;