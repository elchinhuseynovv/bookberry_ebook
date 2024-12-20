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

  public async register(data: RegisterData): Promise<User | null> {
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
    
    return newUser;
  }

  public async login(credentials: LoginCredentials): Promise<User | null> {
    const user = this.users.get(credentials.email);
    
    if (!user || user.password !== credentials.password) {
      throw new Error(az.auth.invalidCredentials);
    }

    return user;
  }

  public async getCurrentUser(): Promise<User | null> {
    const currentUserEmail = storage.getCurrentUserEmail();
    return currentUserEmail ? this.users.get(currentUserEmail) || null : null;
  }
}

export const authDB = new AuthDatabase();