import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Send, User, Bot, Phone, ArrowLeft, BookOpen, Settings, HelpCircle } from 'lucide-react';
import { SettingHeader } from './SettingHeader';
import { books } from '../../data/books';
import { audiobooks } from '../../data/audiobooks';
import { Book } from '../../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  suggestions?: Book[];
}

interface BotPersonality {
  id: string;
  name: string;
  icon: React.ReactNode;
  welcomeMessage: string;
  style: string;
  responses: {
    [key: string]: string[];
  };
}

interface ConversationState {
  askingGenre: boolean;
  lastGenre?: string;
  suggestedBooks?: Book[];
}

export const CustomerServiceSection: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotPersonality | null>(null);
  const [showBotSelection, setShowBotSelection] = useState(true);
  const [conversationState, setConversationState] = useState<ConversationState>({
    askingGenre: false
  });

  const botPersonalities: BotPersonality[] = [
    {
      id: 'friendly',
      name: t('customerService.bots.friendly'),
      icon: <Bot className="text-green-500" />,
      welcomeMessage: t('customerService.bots.friendlyWelcome'),
      style: 'bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800',
      responses: {
        default: [
          "Sizə necə kömək edə bilərəm? 😊",
          "Maraqlı sualdır! 🤔 Birlikdə həll edək.",
          "Başa düşürəm, davam edək! 👍"
        ],
        ask_genre: [
          "Hansı janrda kitablar xoşunuza gəlir? Məsələn: Roman, Detektiv, Tarixi Roman? 📚",
          "Sizə kömək etmək üçün, hansı janrı üstün tutduğunuzu bilmək istərdim? 🤔",
          "Kitab zövqünüz barədə daha çox məlumat verə bilərsiniz? Hansı janrları sevirsiniz? 📖"
        ],
        suggest_books: [
          "Bu janrda maraqlı kitablarımız var! Baxın: ",
          "Sizin üçün seçdiyim kitablar: ",
          "Bu kitablar sizin xoşunuza gələ bilər: "
        ],
        no_books_found: [
          "Təəssüf ki, bu janrda hal-hazırda kitabımız yoxdur. Başqa janr seçmək istərdiniz? 😊",
          "Bu kateqoriyada kitab tapa bilmədim. Bəlkə başqa janrı yoxlayaq? 🤔",
          "Hal-hazırda bu janrda kitabımız mövcud deyil. Sizə başqa janrlar təklif edə bilərəm! 📚"
        ],
        greetings: [
          "Salam! Necə kömək edə bilərəm? 😊",
          "Xoş gördük! Sizinlə söhbət etməkdən məmnunam! 🌟",
          "Salam! Bugün sizin üçün nə edə bilərəm? ✨"
        ]
      }
    },
    {
      id: 'professional',
      name: t('customerService.bots.professional'),
      icon: <Bot className="text-blue-500" />,
      welcomeMessage: t('customerService.bots.professionalWelcome'),
      style: 'bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800',
      responses: {
        default: [
          "Sizə necə yardımçı ola bilərəm? Xahiş edirəm, sualınızı təqdim edin.",
          "Məsələni anlayıram. İcazə verin sizə kömək edim.",
          "Buyurun, sizi dinləyirəm. Probleminizi həll etməyə hazıram."
        ],
        greetings: [
          "Xoş gəlmisiniz. Sizə necə kömək edə bilərəm?",
          "Salam, BookBerry dəstək xidmətinə xoş gəlmisiniz.",
          "Xoş gördük. Sizə professional dəstək göstərməyə hazıram."
        ],
        book_related: [
          "Kitabxanamızda geniş seçim mövcuddur. Hansı kateqoriya ilə maraqlanırsınız?",
          "Sizə kitab seçimində kömək edə bilərəm. Hansı mövzular sizin üçün maraqlıdır?",
          "Kitab kataloqumuzda axtarış aparmağınıza kömək edə bilərəm."
        ],
        help: [
          "Probleminizi həll etmək üçün addım-addım irəliləyək.",
          "Çətinliyi dəqiq müəyyənləşdirək və ən effektiv həll yolunu tapaq.",
          "Məsələni detallı araşdırıb, sizə ən uyğun həlli təqdim edəcəyəm."
        ],
        subscription: [
          "Abunəlik planları haqqında ətraflı məlumat verə bilərəm.",
          "Premium üzvülük üstünlükləri ilə bağlı suallarınızı cavablandıra bilərəm.",
          "Sizin üçün ən uyğun abunəlik planını seçməyə kömək edə bilərəm."
        ],
        payment: [
          "Ödəniş üsulları və təhlükəsizlik haqqında məlumat verə bilərəm.",
          "Ödəniş prosesində qarşılaşdığınız problemi həll etməyə hazıram.",
          "Faktura və ödəniş tarixçəsi ilə bağlı köməyə ehtiyacınız var?"
        ]
      }
    },
    {
      id: 'technical',
      name: t('customerService.bots.technical'),
      icon: <Bot className="text-purple-500" />,
      welcomeMessage: t('customerService.bots.technicalWelcome'),
      style: 'bg-purple-100 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800',
      responses: {
        default: [
          "Sistemdə yaranmış texniki problemi təsvir edin.",
          "Xətanın təfərrüatlarını bildirin, diaqnostika aparaq.",
          "Texniki dəstək protokollarını başladıram. Problemi izah edin."
        ],
        app_issues: [
          "Tətbiqin hansı versiyasını istifadə edirsiniz? Xətanı dəqiqləşdirək.",
          "Problemi yenidən yaratmağa çalışın və addımları mənə bildirin.",
          "Sistem loqlarını yoxlamaq üçün əlavə məlumat lazımdır."
        ],
        reading_problems: [
          "Kitab oxuma interfeysi ilə bağlı problemi təsvir edin.",
          "Səhifələrin yüklənməsində gecikmə var? Birlikdə yoxlayaq.",
          "PDF/EPUB fayllarının açılmasında problem yaranır?"
        ],
        audio_issues: [
          "Səs faylının keyfiyyəti ilə bağlı problem var?",
          "Audiokitabın hansı hissəsində problem yaranır?",
          "Səs oxuyucusunun tənzimləmələrini yoxlayaq."
        ],
        sync_problems: [
          "Cihazlar arası sinxronizasiya problemi yaşayırsınız?",
          "Oxuma progressinin yadda saxlanmasında problem var?",
          "Əlfəcinlərin sinxronizasiyası ilə bağlı çətinlik yaranıb?"
        ]
      }
    },
    {
      id: 'human',
      name: t('customerService.realAgent'),
      icon: <Phone className="text-red-500" />,
      welcomeMessage: t('customerService.callCenter'),
      style: 'bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800',
      responses: {
        default: [t('customerService.callCenterResponse')]
      }
    }
  ];

  const getBooksByGenre = (genre: string): Book[] => {
    const allBooks = [...books, ...audiobooks];
    return allBooks.filter(book => 
      book.genre?.toLowerCase() === genre.toLowerCase()
    );
  };

  const formatBookSuggestions = (books: Book[]): string => {
    return books.slice(0, 3).map(book => 
      `"${book.title}" (${book.author})`
    ).join(', ');
  };

  const analyzeMessage = (message: string): Message => {
    if (!selectedBot) return { 
      id: crypto.randomUUID(),
      text: '',
      sender: 'support',
      timestamp: new Date()
    };
    
    const lowerMessage = message.toLowerCase();
    
    // Handle book recommendation flow
    if (conversationState.askingGenre) {
      // User is responding to genre question
      const genreResponse = lowerMessage;
      const suggestedBooks = getBooksByGenre(genreResponse);
      
      setConversationState({
        askingGenre: false,
        lastGenre: genreResponse,
        suggestedBooks
      });

      if (suggestedBooks.length > 0) {
        return {
          id: crypto.randomUUID(),
          text: getRandomResponse('suggest_books') + formatBookSuggestions(suggestedBooks),
          sender: 'support',
          timestamp: new Date(),
          suggestions: suggestedBooks
        };
      } else {
        return {
          id: crypto.randomUUID(),
          text: getRandomResponse('no_books_found'),
          sender: 'support',
          timestamp: new Date()
        };
      }
    }

    // Check if user is asking for book recommendations
    if (lowerMessage.includes('kitab') && 
        (lowerMessage.includes('tövsiyə') || 
         lowerMessage.includes('məsləhət') || 
         lowerMessage.includes('təklif'))) {
      setConversationState({
        askingGenre: true
      });
      return {
        id: crypto.randomUUID(),
        text: getRandomResponse('ask_genre'),
        sender: 'support',
        timestamp: new Date()
      };
    }

    // Handle greetings
    if (lowerMessage.match(/^(salam|hello|hi|hey|xoş gördük)/i)) {
      return {
        id: crypto.randomUUID(),
        text: getRandomResponse('greetings'),
        sender: 'support',
        timestamp: new Date()
      };
    }

    // Default response
    return {
      id: crypto.randomUUID(),
      text: getRandomResponse('default'),
      sender: 'support',
      timestamp: new Date()
    };
  };

  const getRandomResponse = (category: string): string => {
    if (!selectedBot) return '';
    
    const responses = selectedBot.responses[category] || selectedBot.responses.default;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const handleBotSelect = (bot: BotPersonality) => {
    setSelectedBot(bot);
    setShowBotSelection(false);
    setMessages([
      {
        id: crypto.randomUUID(),
        text: bot.welcomeMessage,
        sender: 'support',
        timestamp: new Date()
      }
    ]);

    if (bot.id === 'human') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          text: t('customerService.callCenterHours'),
          sender: 'support',
          timestamp: new Date()
        }]);
      }, 1000);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedBot) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate thinking time based on message length
    const thinkingTime = Math.min(1000 + newMessage.length * 50, 3000);

    setTimeout(() => {
      const response = selectedBot.id === 'human' 
        ? {
            id: crypto.randomUUID(),
            text: t('customerService.callCenterResponse'),
            sender: 'support' as const,
            timestamp: new Date()
          }
        : analyzeMessage(newMessage);
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleReset = () => {
    setSelectedBot(null);
    setShowBotSelection(true);
    setMessages([]);
    setNewMessage('');
    setIsTyping(false);
    setConversationState({ askingGenre: false });
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<MessageSquare size={24} />}
        title={t('customerService.title')}
        className="text-cyan-700 dark:text-cyan-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        {showBotSelection ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('customerService.selectAssistant')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {botPersonalities.map((bot) => (
                <button
                  key={bot.id}
                  onClick={() => handleBotSelect(bot)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                    hover:scale-[1.02] active:scale-[0.98] ${bot.style}`}
                >
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    {bot.icon}
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-gray-900 dark:text-white block">
                      {bot.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {bot.id === 'friendly' && "Dostcanlı və empatik yanaşma"}
                      {bot.id === 'professional' && "Professional və effektiv həllər"}
                      {bot.id === 'technical' && "Texniki problemlərin həlli"}
                      {bot.id === 'human' && "Canlı operator dəstəyi"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 mb-4"
            >
              <ArrowLeft size={20} />
              {t('customerService.backToSelection')}
            </button>

            <div className="h-[400px] space-y-4 overflow-y-auto rounded-xl bg-white p-4 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      message.sender === 'user'
                        ? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User size={16} />
                    ) : (
                      selectedBot?.icon || <Bot size={16} />
                    )}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white dark:bg-cyan-600'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="mt-1 block text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {selectedBot?.icon || <Bot size={16} />}
                  </div>
                  <div className="flex space-x-1 rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800">
                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                      •
                    </span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                      •
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('customerService.messagePlaceholder')}
                className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-2 
                         text-gray-900 placeholder-gray-500
                         focus:border-cyan-400 focus:outline-none dark:border-gray-700 
                         dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-white transition-colors 
                         hover:bg-cyan-600 disabled:bg-gray-300 dark:disabled:bg-gray-700"
              >
                <Send size={20} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};