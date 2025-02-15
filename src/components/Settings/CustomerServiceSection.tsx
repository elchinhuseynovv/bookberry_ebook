import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import { SettingHeader } from './SettingHeader';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export const CustomerServiceSection: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('customerService.welcomeMessage'),
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: crypto.randomUUID(),
        text: t('customerService.autoResponse'),
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <SettingHeader
        icon={<MessageSquare size={24} />}
        title={t('customerService.title')}
        className="text-cyan-700 dark:text-cyan-400"
      />

      <div className="space-y-6 rounded-2xl bg-white/50 p-6 dark:bg-gray-800/50">
        {/* Chat Messages */}
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
                  <Bot size={16} />
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
                <Bot size={16} />
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

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('customerService.messagePlaceholder')}
            className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-2 
                     focus:border-cyan-400 focus:outline-none dark:border-gray-700 
                     dark:bg-gray-900 dark:focus:border-cyan-500"
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
      </div>
    </div>
  );
};