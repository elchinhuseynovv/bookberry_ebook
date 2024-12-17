import { useState, useEffect } from 'react';
import { DBCollection } from '../types/database';
import { collectionsDB } from '../services/database/collections';

export const useCollections = () => {
  const [collections, setCollections] = useState<DBCollection[]>([]);

  useEffect(() => {
    setCollections(collectionsDB.getAllCollections());
  }, []);

  const createCollection = (name: string, description: string) => {
    const newCollection = collectionsDB.createCollection({ name, description, bookIds: [] });
    setCollections(collectionsDB.getAllCollections());
    return newCollection;
  };

  const updateCollection = (id: string, updates: Partial<DBCollection>) => {
    collectionsDB.updateCollection(id, updates);
    setCollections(collectionsDB.getAllCollections());
  };

  const deleteCollection = (id: string) => {
    collectionsDB.deleteCollection(id);
    setCollections(collectionsDB.getAllCollections());
  };

  const addBookToCollection = (collectionId: string, bookId: string) => {
    collectionsDB.addBookToCollection(collectionId, bookId);
    setCollections(collectionsDB.getAllCollections());
  };

  const removeBookFromCollection = (collectionId: string, bookId: string) => {
    collectionsDB.removeBookFromCollection(collectionId, bookId);
    setCollections(collectionsDB.getAllCollections());
  };

  return {
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
    addBookToCollection,
    removeBookFromCollection
  };
};