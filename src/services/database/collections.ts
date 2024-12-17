import { DBCollection } from '../../types/database';

class CollectionsDatabase {
  private collections: Map<string, DBCollection>;

  constructor() {
    this.collections = new Map();
    this.loadCollections();
  }

  private loadCollections(): void {
    try {
      const stored = localStorage.getItem('book-collections');
      if (stored) {
        const collections: DBCollection[] = JSON.parse(stored);
        collections.forEach(collection => {
          this.collections.set(collection.id, collection);
        });
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    }
  }

  public getCollection(id: string): DBCollection | undefined {
    return this.collections.get(id);
  }

  public getAllCollections(): DBCollection[] {
    return Array.from(this.collections.values());
  }

  public createCollection(collection: Omit<DBCollection, 'id'>): DBCollection {
    const id = crypto.randomUUID();
    const newCollection: DBCollection = {
      id,
      ...collection,
      bookIds: []
    };
    
    this.collections.set(id, newCollection);
    this.saveCollections();
    return newCollection;
  }

  public updateCollection(id: string, updates: Partial<DBCollection>): void {
    const collection = this.collections.get(id);
    if (collection) {
      this.collections.set(id, { ...collection, ...updates });
      this.saveCollections();
    }
  }

  public deleteCollection(id: string): void {
    this.collections.delete(id);
    this.saveCollections();
  }

  public addBookToCollection(collectionId: string, bookId: string): void {
    const collection = this.collections.get(collectionId);
    if (collection && !collection.bookIds.includes(bookId)) {
      collection.bookIds.push(bookId);
      this.saveCollections();
    }
  }

  public removeBookFromCollection(collectionId: string, bookId: string): void {
    const collection = this.collections.get(collectionId);
    if (collection) {
      collection.bookIds = collection.bookIds.filter(id => id !== bookId);
      this.saveCollections();
    }
  }

  private saveCollections(): void {
    try {
      const collections = Array.from(this.collections.values());
      localStorage.setItem('book-collections', JSON.stringify(collections));
    } catch (error) {
      console.error('Error saving collections:', error);
    }
  }
}

export const collectionsDB = new CollectionsDatabase();