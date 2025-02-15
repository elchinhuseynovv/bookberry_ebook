import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Send, User, Bot, Phone, ArrowLeft, BookOpen, Settings, HelpCircle } from 'lucide-react';
import { SettingHeader } from './SettingHeader';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
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

export const CustomerServiceSection: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotPersonality | null>(null);
  const [showBotSelection, setShowBotSelection] = useState(true);

  const botPersonalities: BotPersonality[] = [
    {
      id: 'friendly',
      name: t('customerService.bots.friendly'),
      icon: <Bot className="text-green-500" />,
      welcomeMessage: t('customerService.bots.friendlyWelcome'),
      style: 'bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800',
      responses: {
        default: [
          "Əlbəttə, sizə kömək edə bilərəm! 😊 Nə ilə maraqlanırsınız?",
          "Bu maraqlı sualdır! 🤔 Birlikdə həll edək.",
          "Başa düşürəm, davam edək! 👍"
        ],
        greetings: [
          "Salam! Necə kömək edə bilərəm? 😊",
          "Xoş gördük! Sizinlə söhbət etməkdən məmnunam! 🌟",
          "Salam! Bugün sizin üçün nə edə bilərəm? ✨"
        ],
        book: [
          "Kitablar haqqında danışmağı çox sevirəm! 📚 Hansı janrla maraqlanırsınız?",
          "Sizə maraqlı kitablar tövsiyə edə bilərəm! 📖 Nə oxumaq istərdiniz?",
          "Kitabxanamızda çoxlu maraqlı əsərlər var! 🎯 Birlikdə baxaq!"
        ],
        help: [
          "Narahat olmayın, birlikdə həll edəcəyik! 🤝",
          "Kömək etmək üçün buradayam! 🌟 Nə çətinlik yaranıb?",
          "Problemi detallı izah edin, sizə kömək edim! 🎯"
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
        book: [
          "Kitabxanamızda geniş seçim mövcuddur. Hansı kateqoriya ilə maraqlanırsınız?",
          "Sizə kitab seçimində kömək edə bilərəm. Hansı mövzular sizin üçün maraqlıdır?",
          "Kitab kataloqumuzda axtarış aparmağınıza kömək edə bilərəm."
        ],
        help: [
          "Probleminizi həll etmək üçün addım-addım irəliləyək.",
          "Çətinliyi dəqiq müəyyənləşdirək və ən effektiv həll yolunu tapaq.",
          "Məsələni detallı araşdırıb, sizə ən uyğun həlli təqdim edəcəyəm."
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
        greetings: [
          "Texniki dəstək xidməti aktivdir. Sistemlə bağlı probleminizi bildirin.",
          "Texniki məsələlərin həlli üçün hazıram. Buyurun.",
          "Sistem diaqnostikası üçün hazıram. Problemi təsvir edin."
        ],
        book: [
          "Kitab oxuma interfeysi ilə bağlı problem yaranıb?",
          "E-kitab yükləməsində çətinlik var?",
          "Kitabxana sistemində hansı texniki problem ilə qarşılaşırsınız?"
        ],
        help: [
          "Sistem loqlarını yoxlayıram. Problemi dəqiqləşdirin.",
          "Texniki parametrləri analiz edirəm. Əlavə məlumat verin.",
          "Diaqnostika başladılır. Xətanın təfərrüatlarını bildirin."
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

  const getRandomResponse = (category: string): string => {
    if (!selectedBot) return '';
    
    const responses = selectedBot.responses[category] || selectedBot.responses.default;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const analyzeMessage = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('salam') || lowerMessage.includes('xoş gördük')) {
      return getRandomResponse('greetings');
    }
    
    if (lowerMessage.includes('kitab') || lowerMessage.includes('oxu')) {
      return getRandomResponse('book');
    }
    
    if (lowerMessage.includes('kömək') || lowerMessage.includes('problem')) {
      return getRandomResponse('help');
    }
    
    return getRandomResponse('default');
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
      const responseText = selectedBot.id === 'human' 
        ? t('customerService.callCenterResponse')
        : analyzeMessage(newMessage);

      const supportMessage: Message = {
        id: crypto.randomUUID(),
        text: responseText,
        sender: 'support',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleReset = () => {
    setSelectedBot(null);
    setShowBotSelection(true);
    setMessages([]);
    setNewMessage('');
    setIsTyping(false);
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