export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  age?: number;
  avatar?: string;
  preferredLanguage: string;
  readingGoal?: number;
}

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
  pdfUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type ViewMode = 'library' | 'audiobooks' | 'bookmarks' | 'settings';
export type ThemeMode = 'light' | 'dark' | 'sepia';

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  password: string;
}

export interface ReadingPreferences {
  fontSize: number;
  textAlignment: 'left' | 'center' | 'justify';
  autoPlayAudio: boolean;
  showPageNumber: boolean;
  highlightLinks: boolean;
}

export interface NotificationSettings {
  dailyReminder: boolean;
  weeklyProgress: boolean;
  newBookAlerts: boolean;
  systemNotifications: boolean;
  reminderTime: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  reduceAnimations: boolean;
  screenReader: boolean;
  dyslexicFont: boolean;
  textToSpeech: boolean;
}