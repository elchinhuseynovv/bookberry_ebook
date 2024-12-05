import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'Əli və Nino',
    author: 'Qurban Səid',
    cover: 'https://upload.wikimedia.org/wikipedia/az/8/83/Əli_və_Nino.jpg',
    progress: 65,
    description: 'Əli və Nino romanı, Azərbaycan və Gürcüstan arasındakı mədəni və dini fərqləri əks etdirən bir məhəbbət hekayəsidir. Əsər XX əsrin əvvəllərində Bakıda cərəyan edir.',
    publishedYear: 1937,
    language: 'Azərbaycanca',
    pages: 288,
    genre: 'Roman',
    rating: 4.8,
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Aynur Məmmədova',
        rating: 5,
        comment: 'Azərbaycan ədəbiyyatının şah əsərlərindən biri. Mütləq oxunmalı bir kitabdır.',
        date: '2024-02-15'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Elçin Əliyev',
        rating: 4.5,
        comment: 'Tarixi və mədəni konteksti çox gözəl təsvir edilib.',
        date: '2024-01-20'
      }
    ]
  },
  {
    id: '2',
    title: 'Dədə Qorqud',
    author: 'Xalq dastanı',
    cover: 'https://altunkitab.az/storage/347/conversions/dede_qorqud2018-blade.jpg',
    progress: 30,
    description: 'Dədə Qorqud dastanları Oğuz türklərinin həyatını, adət-ənənələrini, qəhrəmanlıq tarixini əks etdirən epik folklor əsəridir.',
    publishedYear: 1815,
    language: 'Azərbaycanca',
    pages: 256,
    genre: 'Dastan',
    rating: 4.9,
    reviews: [
      {
        id: '3',
        userId: 'user3',
        userName: 'Rəşad Hüseynov',
        rating: 5,
        comment: 'Milli kimliyimizi əks etdirən ən dəyərli əsərlərdən biri.',
        date: '2024-03-01'
      }
    ]
  },
  {
    id: '3',
    title: 'Böyük Oyun',
    author: 'Çingiz Abdullayev',
    cover: 'https://www.teaspress.az/storage/1354/conversions/boyuk-oyun-front-book.jpg',
    progress: 0,
    description: 'Beynəlxalq intriqalar və siyasi oyunların mərkəzində cərəyan edən detektiv əsər.',
    publishedYear: 2020,
    language: 'Azərbaycanca',
    pages: 312,
    genre: 'Detektiv',
    rating: 4.5
  },
  {
    id: '4',
    title: 'Yalnız Özümüzünkülər',
    author: 'Çingiz Abdullayev',
    cover: 'https://www.teaspress.az/storage/1831/conversions/yalniz-ozumuzunkuler-front-book.png',
    progress: 45,
    description: 'Müasir cəmiyyətdə baş verən hadisələri və insan münasibətlərini əks etdirən psixoloji roman.',
    publishedYear: 2021,
    language: 'Azərbaycanca',
    pages: 280,
    genre: 'Roman',
    rating: 4.3
  },
  {
    id: '5',
    title: 'Bahadır və Sona',
    author: 'Nəriman Nərimanov',
    cover: 'https://bakubookcenter.az/get-product-image?fileId=85084',
    progress: 15,
    description: 'XIX əsrin sonu XX əsrin əvvəllərində Azərbaycan cəmiyyətində baş verən hadisələri əks etdirən məhəbbət romanı.',
    publishedYear: 1896,
    language: 'Azərbaycanca',
    pages: 184,
    genre: 'Roman',
    rating: 4.6
  }
];