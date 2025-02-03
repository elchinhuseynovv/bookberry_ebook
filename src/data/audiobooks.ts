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
    narrator: 'Rasim Balayev',
    description: 'Əli və Nino romanı, Azərbaycan və Gürcüstan arasındakı mədəni və dini fərqləri əks etdirən bir məhəbbət hekayəsidir. Əsər XX əsrin əvvəllərində Bakıda cərəyan edir.',
    publishedYear: 1937,
    language: 'Azərbaycanca',
    genre: 'Roman',
    rating: 4.8,
    categoryId: 'novel',
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Aynur Məmmədova',
        rating: 5,
        comment: 'Rasim Balayevin səsləndirməsi əsəri daha da canlandırır.',
        date: '2024-02-15'
      }
    ]
  },
  {
    id: 'audio-2',
    title: 'Dədə Qorqud',
    author: 'Xalq dastanı',
    cover: 'https://altunkitab.az/storage/347/conversions/dede_qorqud2018-blade.jpg',
    progress: 30,
    isAudio: true,
    duration: 380,
    narrator: 'Həsən Məmmədov',
    description: 'Dədə Qorqud dastanları Oğuz türklərinin həyatını, adət-ənənələrini, qəhrəmanlıq tarixini əks etdirən epik folklor əsəridir.',
    publishedYear: 1815,
    language: 'Azərbaycanca',
    genre: 'Dastan',
    categoryId: 'historical',
    rating: 4.9
  },
  {
    id: 'audio-3',
    title: 'Sevil',
    author: 'Cəfər Cabbarlı',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675550751i/13640058.jpg',
    progress: 60,
    isAudio: true,
    duration: 290,
    narrator: 'Məlahət Abbasova',
    description: 'Azərbaycan qadınının azadlıq mübarizəsini əks etdirən dram əsəri.',
    publishedYear: 1928,
    language: 'Azərbaycanca',
    genre: 'Dram',
    categoryId: 'drama',
    rating: 4.7
  },
  {
    id: 'audio-4',
    title: 'Qaraca Qız',
    author: 'Süleyman Sani Axundov',
    cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1572986942i/48714609.jpg',
    progress: 15,
    isAudio: true,
    duration: 180,
    narrator: 'Şəfiqə Məmmədova',
    description: 'Kimsəsiz bir qızın həyat hekayəsini əks etdirən təsirli əsər.',
    publishedYear: 1926,
    language: 'Azərbaycanca',
    genre: 'Hekayə',
    categoryId: 'novel',
    rating: 4.6
  }
];