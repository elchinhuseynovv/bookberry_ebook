import { User, LoginCredentials, RegisterData } from '../../types/auth';
import { storage } from '../storage';
import { az } from '../../constants/translations';

class AuthDatabase {
  private users: Map<string, User>;
  private readonly STORAGE_KEY = 'bookberry_users';

  constructor() {
    this.users = new Map();
    this.loadUsers();
  }

  private loadUsers(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const users: User[] = JSON.parse(stored);
        users.forEach(user => {
          this.users.set(user.email, user);
        });
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  private saveUsers(): void {
    try {
      const users = Array.from(this.users.values());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  public async register(data: RegisterData): Promise<User> {
    if (this.users.has(data.email)) {
      throw new Error(az.auth.userExists);
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString()
    };

    this.users.set(data.email, newUser);
    this.saveUsers();
    storage.setCurrentUserEmail(data.email);
    
    return newUser;
  }

  public async login(credentials: LoginCredentials): Promise<User> {
    const user = this.users.get(credentials.email);
    
    if (!user || user.password !== credentials.password) {
      throw new Error(az.auth.invalidCredentials);
    }

    storage.setCurrentUserEmail(credentials.email);
    return user;
  }

  public async getCurrentUser(): Promise<User | null> {
    const currentUserEmail = storage.getCurrentUserEmail();
    return currentUserEmail ? this.users.get(currentUserEmail) || null : null;
  }

  public async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = this.users.get(email);
    return user?.password === password;
  }

  public async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = this.users.get(email);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    this.users.set(email, user);
    this.saveUsers();
  }

  public async sendPasswordResetEmail(email: string): Promise<void> {
    const user = this.users.get(email);
    if (!user) {
      throw new Error('User not found');
    }
    // In a real app, this would send an email
    // For now, we'll just simulate success
    return Promise.resolve();
  }
}

export const authDB = new AuthDatabase();