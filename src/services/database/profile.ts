import { UserProfile } from '../../types';

class ProfileDatabase {
  private readonly STORAGE_KEY = 'bookberry_user_profiles';
  private profiles: Map<string, UserProfile>;

  constructor() {
    this.profiles = new Map();
    this.loadProfiles();
  }

  private loadProfiles(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const profiles = JSON.parse(stored);
        Object.entries(profiles).forEach(([email, profile]) => {
          this.profiles.set(email, profile as UserProfile);
        });
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }

  private saveProfiles(): void {
    try {
      const profiles = Object.fromEntries(this.profiles.entries());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
    } catch (error) {
      console.error('Error saving profiles:', error);
    }
  }

  public getProfile(email: string): UserProfile | null {
    return this.profiles.get(email) || null;
  }

  public updateProfile(email: string, profile: UserProfile): void {
    this.profiles.set(email, { ...profile, email }); // Ensure email is always set
    this.saveProfiles();
  }

  public deleteProfile(email: string): void {
    this.profiles.delete(email);
    this.saveProfiles();
  }
}

// Export the singleton instance
export const profileDB = new ProfileDatabase();