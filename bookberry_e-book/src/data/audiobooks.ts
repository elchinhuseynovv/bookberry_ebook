import { Book } from '../types';

export const audiobooks: Book[] = [
  {
    id: 'audio-1',
    title: 'Əli və Nino',
    author: 'Qurban Səid',
    cover: 'https://upload.wikimedia.org/wikipedia/az/8/83/Əli_və_Nino.jpg',
    progress: 45,
    isAudio: true,
    duration: 420,
    narrator: 'Rasim Balayev'
  },
  {
    id: 'audio-2',
    title: 'Dədə Qorqud',
    author: 'Xalq dastanı',
    cover: 'https://altunkitab.az/storage/347/conversions/dede_qorqud2018-blade.jpg',
    progress: 30,
    isAudio: true,
    duration: 380,
    narrator: 'Həsən Məmmədov'
  },
  {
    id: 'audio-3',
    title: 'Sevil',
    author: 'Cəfər Cabbarlı',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675550751i/13640058.jpg',
    progress: 60,
    isAudio: true,
    duration: 290,
    narrator: 'Məlahət Abbasova'
  },
  {
    id: 'audio-4',
    title: 'Qaraca Qız',
    author: 'Süleyman Sani Axundov',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1572986942i/48714609.jpg',
    progress: 15,
    isAudio: true,
    duration: 180,
    narrator: 'Şəfiqə Məmmədova'
  }
];