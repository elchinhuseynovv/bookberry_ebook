import { BookCategory } from '../types';

export const categories: Record<string, BookCategory[]> = {
  az: [
    {
      id: 'detective',
      name: 'Detektiv',
      description: 'Cinayət və araşdırma mövzusunda əsərlər',
      icon: '🔍'
    },
    {
      id: 'novel',
      name: 'Roman',
      description: 'Bədii ədəbiyyat və romanlar',
      icon: '📚'
    },
    {
      id: 'historical',
      name: 'Tarixi',
      description: 'Tarixi hadisələr və şəxsiyyətlər haqqında əsərlər',
      icon: '⌛'
    },
    {
      id: 'poetry',
      name: 'Poeziya',
      description: 'Şeir və poema topluları',
      icon: '📝'
    },
    {
      id: 'science',
      name: 'Elm',
      description: 'Elmi və tədqiqat əsərləri',
      icon: '🔬'
    },
    {
      id: 'children',
      name: 'Uşaq Ədəbiyyatı',
      description: 'Uşaqlar üçün kitablar və nağıllar',
      icon: '🎈'
    }
  ],
  en: [
    {
      id: 'detective',
      name: 'Detective',
      description: 'Crime and investigation stories',
      icon: '🔍'
    },
    {
      id: 'novel',
      name: 'Novel',
      description: 'Fiction and novels',
      icon: '📚'
    },
    {
      id: 'historical',
      name: 'Historical',
      description: 'Books about historical events and figures',
      icon: '⌛'
    },
    {
      id: 'poetry',
      name: 'Poetry',
      description: 'Poetry collections and poems',
      icon: '📝'
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Scientific and research works',
      icon: '🔬'
    },
    {
      id: 'children',
      name: 'Children\'s Literature',
      description: 'Books and fairy tales for children',
      icon: '🎈'
    }
  ],
  ru: [
    {
      id: 'detective',
      name: 'Детектив',
      description: 'Криминальные и детективные истории',
      icon: '🔍'
    },
    {
      id: 'novel',
      name: 'Роман',
      description: 'Художественная литература и романы',
      icon: '📚'
    },
    {
      id: 'historical',
      name: 'Историческая',
      description: 'Книги об исторических событиях и личностях',
      icon: '⌛'
    },
    {
      id: 'poetry',
      name: 'Поэзия',
      description: 'Сборники стихов и поэмы',
      icon: '📝'
    },
    {
      id: 'science',
      name: 'Наука',
      description: 'Научные и исследовательские работы',
      icon: '🔬'
    },
    {
      id: 'children',
      name: 'Детская Литература',
      description: 'Книги и сказки для детей',
      icon: '🎈'
    }
  ]
};