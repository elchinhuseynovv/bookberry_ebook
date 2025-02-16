import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Send, User, Bot, Phone, ArrowLeft, BookOpen, Settings, HelpCircle, Globe } from 'lucide-react';
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
    [key: string]: {
      az: string[];
      en: string[];
      ru: string[];
    };
  };
}

export const CustomerServiceSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotPersonality | null>(null);
  const [showBotSelection, setShowBotSelection] = useState(true);
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    { code: 'az', name: 'Azərbaycanca' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' }
  ];

  const botPersonalities: BotPersonality[] = [
    {
      id: 'friendly',
      name: t('customerService.bots.friendly'),
      icon: <Bot className="text-green-500" />,
      welcomeMessage: t('customerService.bots.friendlyWelcome'),
      style: 'bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800',
      responses: {
        default: {
          az: [
            "Sizə necə kömək edə bilərəm? 😊",
            "Maraqlı sualdır! 🤔 Birlikdə həll edək.",
            "Başa düşürəm, davam edək! 👍"
          ],
          en: [
            "How can I help you? 😊",
            "Interesting question! 🤔 Let's solve it together.",
            "I understand, let's continue! 👍"
          ],
          ru: [
            "Как я могу вам помочь? 😊",
            "Интересный вопрос! 🤔 Давайте решим вместе.",
            "Я понимаю, давайте продолжим! 👍"
          ]
        },
        greetings: {
          az: [
            "Salam! Necə kömək edə bilərəm? 😊",
            "Xoş gördük! Sizinlə söhbət etməkdən məmnunam! 🌟",
            "Salam! Bugün sizin üçün nə edə bilərəm? ✨"
          ],
          en: [
            "Hello! How can I help you? 😊",
            "Welcome! I'm happy to chat with you! 🌟",
            "Hi! What can I do for you today? ✨"
          ],
          ru: [
            "Здравствуйте! Как я могу вам помочь? 😊",
            "Добро пожаловать! Рад общению с вами! 🌟",
            "Привет! Что я могу для вас сделать? ✨"
          ]
        }
      }
    },
    {
      id: 'professional',
      name: t('customerService.bots.professional'),
      icon: <Bot className="text-blue-500" />,
      welcomeMessage: t('customerService.bots.professionalWelcome'),
      style: 'bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800',
      responses: {
        default: {
          az: [
            "Sizə necə yardımçı ola bilərəm? Xahiş edirəm, sualınızı təqdim edin.",
            "Məsələni anlayıram. İcazə verin sizə kömək edim.",
            "Buyurun, sizi dinləyirəm. Probleminizi həll etməyə hazıram."
          ],
          en: [
            "How may I assist you? Please present your question.",
            "I understand the matter. Let me help you.",
            "Go ahead, I'm listening. Ready to solve your problem."
          ],
          ru: [
            "Как я могу вам помочь? Пожалуйста, изложите ваш вопрос.",
            "Я понимаю суть вопроса. Позвольте мне помочь вам.",
            "Слушаю вас. Готов решить вашу проблему."
          ]
        },
        greetings: {
          az: [
            "Xoş gəlmisiniz. Sizə necə kömək edə bilərəm?",
            "Salam, BookBerry dəstək xidmətinə xoş gəlmisiniz.",
            "Xoş gördük. Sizə professional dəstək göstərməyə hazıram."
          ],
          en: [
            "Welcome. How may I assist you?",
            "Hello, welcome to BookBerry support service.",
            "Greetings. I'm ready to provide professional assistance."
          ],
          ru: [
            "Добро пожаловать. Как я могу вам помочь?",
            "Здравствуйте, добро пожаловать в службу поддержки BookBerry.",
            "Приветствую. Готов оказать профессиональную поддержку."
          ]
        }
      }
    },
    {
      id: 'technical',
      name: t('customerService.bots.technical'),
      icon: <Bot className="text-purple-500" />,
      welcomeMessage: t('customerService.bots.technicalWelcome'),
      style: 'bg-purple-100 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800',
      responses: {
        default: {
          az: [
            "Sistemdə yaranmış texniki problemi təsvir edin.",
            "Xətanın təfərrüatlarını bildirin, diaqnostika aparaq.",
            "Texniki dəstək protokollarını başladıram. Problemi izah edin."
          ],
          en: [
            "Please describe the technical issue you're experiencing.",
            "Provide details about the error, let's run diagnostics.",
            "Initiating technical support protocols. Explain the problem."
          ],
          ru: [
            "Опишите техническую проблему, возникшую в системе.",
            "Сообщите детали ошибки, проведем диагностику.",
            "Запускаю протоколы технической поддержки. Объясните проблему."
          ]
        },
        greetings: {
          az: [
            "Texniki dəstək xidmətinə xoş gəlmisiniz.",
            "Salam, texniki problemləri həll etməyə hazıram.",
            "Sistemlə bağlı hər hansı çətinliyiniz var?"
          ],
          en: [
            "Welcome to technical support.",
            "Hello, I'm ready to solve technical issues.",
            "Having any system-related difficulties?"
          ],
          ru: [
            "Добро пожаловать в службу технической поддержки.",
            "Здравствуйте, готов решать технические проблемы.",
            "Есть какие-либо трудности с системой?"
          ]
        }
      }
    },
    {
      id: 'human',
      name: t('customerService.realAgent'),
      icon: <Phone className="text-red-500" />,
      welcomeMessage: t('customerService.callCenter'),
      style: 'bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800',
      responses: {
        default: {
          az: [t('customerService.callCenterResponse')],
          en: ["Our operators are currently busy with other customers. Please wait in queue or try calling back later."],
          ru: ["Наши операторы в данный момент заняты с другими клиентами. Пожалуйста, подождите в очереди или перезвоните позже."]
        }
      }
    }
  ];

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
    setShowLanguageSelection(false);
  };

  const getRandomResponse = (category: string): string => {
    if (!selectedBot || !selectedLanguage) return '';
    
    const responses = selectedBot.responses[category] || selectedBot.responses.default;
    const languageResponses = responses[selectedLanguage as keyof typeof responses] || responses.en;
    const randomIndex = Math.floor(Math.random() * languageResponses.length);
    return languageResponses[randomIndex];
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
    if (!newMessage.trim() || !selectedBot || !selectedLanguage) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response: Message = {
        id: crypto.randomUUID(),
        text: selectedBot.id === 'human' 
          ? getRandomResponse('default')
          : getRandomResponse(
              newMessage.toLowerCase().match(/^(salam|hello|hi|hey|привет)/i)
                ? 'greetings'
                : 'default'
            ),
        sender: 'support',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, Math.min(1000 + newMessage.length * 50, 3000));
  };

  const handleReset = () => {
    setSelectedBot(null);
    setShowBotSelection(true);
    setShowLanguageSelection(true);
    setSelectedLanguage(null);
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
        {showLanguageSelection ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <Globe className="h-6 w-6" />
              <span>Select Language / Dil seçin / Выберите язык</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-cyan-200 dark:border-cyan-800
                           hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-all
                           hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Globe className="h-5 w-5 text-cyan-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : showBotSelection ? (
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
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
              >
                <ArrowLeft size={20} />
                {t('customerService.backToSelection')}
              </button>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {languages.find(lang => lang.code === selectedLanguage)?.name}
                </span>
              </div>
            </div>

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