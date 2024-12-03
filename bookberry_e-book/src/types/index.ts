export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  isAudio?: boolean;
  duration?: number;
  narrator?: string;
  description?: string;
  publishedYear?: number;
  language?: string;
  pages?: number;
  genre?: string;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type ThemeMode = 'light' | 'dark' | 'sepia';

export type ViewMode = 'library' | 'audiobooks' | 'bookmarks' | 'settings' | 'book-details';

export interface Bookmark {
  id: string;
  bookId: string;
  page: number;
  note?: string;
  createdAt: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  preferredLanguage: string;
  readingGoal?: number;
}

export interface ReadingPreferences {
  fontSize: number;
  lineSpacing: number;
  fontFamily: string;
  textAlignment: 'left' | 'justify' | 'center';
  autoPlayAudio: boolean;
  showPageNumber: boolean;
  highlightLinks: boolean;
}

export interface NotificationSettings {
  dailyReminder: boolean;
  reminderTime: string;
  weeklyProgress: boolean;
  newBookAlerts: boolean;
  systemNotifications: boolean;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  reduceAnimations: boolean;
  screenReader: boolean;
  dyslexicFont: boolean;
  textToSpeech: boolean;
}