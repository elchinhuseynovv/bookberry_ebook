import { SubscriptionPlan } from './subscription';

export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  age?: number;
  avatar?: string;
  preferredLanguage: string;
  readingGoal?: number;
  favoriteBooks?: string[];
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
  audioUrl?: string;
  isFavorite?: boolean;
  categoryId?: string;
  fileSize?: string;
  format?: string;
  quality?: string;
}

export interface BookCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type ViewMode = 'library' | 'audiobooks' | 'favorites' | 'bookmarks' | 'settings';
export type ThemeMode = 'light' | 'dark' | 'sepia';