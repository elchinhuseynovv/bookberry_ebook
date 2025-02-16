import random
import re
from typing import Dict, List, Optional

class ChatbotResponse:
    def __init__(self, text: str, confidence: float = 1.0):
        self.text = text
        self.confidence = confidence

class Chatbot:
    def __init__(self):
        self.conversation_history: List[Dict[str, str]] = []
        self.patterns = {
            'greeting': r'\b(hi|hello|hey|salam|привет)\b',
            'book_search': r'\b(find|search|looking for|book|kitab|книга)\b',
            'help': r'\b(help|support|kömək|помощь)\b',
            'download': r'\b(download|yüklə|скачать)\b',
            'reading': r'\b(read|oxu|читать)\b'
        }
        
        self.responses = {
            'az': {
                'greeting': [
                    'Salam! BookBerry-yə xoş gəlmisiniz! Sizə necə kömək edə bilərəm?',
                    'Xoş gördük! Kitabxanamıza xoş gəlmisiniz!',
                    'Salam! Bu gün hansı kitabı axtarırsınız?'
                ],
                'book_search': [
                    'Hansı janrda kitab axtarırsınız?',
                    'Size konkret bir kitab tövsiyə edə bilərəm. Nə ilə maraqlanırsınız?',
                    'Kitabxanamızda müxtəlif janrlarda kitablar var. Sizə kömək edə bilərəm.'
                ],
                'help': [
                    'Əlbəttə, sizə kömək edə bilərəm. Nə ilə bağlı sualınız var?',
                    'Texniki dəstək üçün buradayam. Probleminizi izah edin.',
                    'Size necə yardımçı ola bilərəm?'
                ],
                'download': [
                    'Kitabı yükləmək üçün əvvəlcə hesabınıza daxil olmalısınız.',
                    'Yükləmə başlamaq üçün kitabın səhifəsindəki yükləmə düyməsini sıxın.',
                    'Premium hesab sahibləri bütün kitabları yükləyə bilər.'
                ],
                'reading': [
                    'Oxumağa başlamaq üçün kitabı seçin və "Oxu" düyməsini sıxın.',
                    'Oxuma təcrübənizi fərdiləşdirmək üçün tənzimləmələri dəyişə bilərsiniz.',
                    'Kitabı oxumağa başladıqdan sonra səhifələri yaddaşda saxlaya bilərsiniz.'
                ],
                'default': [
                    'Bağışlayın, sizi başa düşmədim. Sualınızı başqa cür izah edə bilərsinizmi?',
                    'Bu barədə daha ətraflı məlumat verə bilərsinizmi?',
                    'Sizə daha yaxşı kömək etmək üçün sualınızı dəqiqləşdirə bilərsinizmi?'
                ]
            },
            'en': {
                'greeting': [
                    'Hello! Welcome to BookBerry! How can I help you?',
                    'Welcome! Glad to see you in our library!',
                    'Hi! What book are you looking for today?'
                ],
                'book_search': [
                    'What genre of book are you looking for?',
                    'I can recommend a specific book. What are you interested in?',
                    'Our library has books in various genres. I can help you find what you need.'
                ],
                'help': [
                    'Of course, I can help you. What questions do you have?',
                    'I\'m here for technical support. Please explain your problem.',
                    'How can I assist you?'
                ],
                'download': [
                    'You need to be logged in to download books.',
                    'Click the download button on the book\'s page to start downloading.',
                    'Premium account holders can download all books.'
                ],
                'reading': [
                    'Select a book and click "Read" to start reading.',
                    'You can customize your reading experience in settings.',
                    'After starting a book, you can bookmark pages.'
                ],
                'default': [
                    'I\'m sorry, I didn\'t understand. Could you rephrase your question?',
                    'Could you provide more details about that?',
                    'Could you clarify your question so I can help you better?'
                ]
            },
            'ru': {
                'greeting': [
                    'Здравствуйте! Добро пожаловать в BookBerry! Как я могу вам помочь?',
                    'Добро пожаловать! Рады видеть вас в нашей библиотеке!',
                    'Привет! Какую книгу вы ищете сегодня?'
                ],
                'book_search': [
                    'Какой жанр книги вы ищете?',
                    'Я могу порекомендовать конкретную книгу. Чем вы интересуетесь?',
                    'В нашей библиотеке есть книги разных жанров. Я могу помочь вам найти то, что нужно.'
                ],
                'help': [
                    'Конечно, я могу помочь. Какие у вас вопросы?',
                    'Я здесь для технической поддержки. Объясните вашу проблему.',
                    'Как я могу вам помочь?'
                ],
                'download': [
                    'Для скачивания книг необходимо войти в систему.',
                    'Нажмите кнопку скачивания на странице книги, чтобы начать загрузку.',
                    'Владельцы премиум-аккаунта могут скачивать все книги.'
                ],
                'reading': [
                    'Выберите книгу и нажмите "Читать", чтобы начать чтение.',
                    'Вы можете настроить параметры чтения в настройках.',
                    'После начала чтения книги вы можете добавлять закладки.'
                ],
                'default': [
                    'Извините, я не понял. Не могли бы вы переформулировать вопрос?',
                    'Не могли бы вы предоставить больше деталей?',
                    'Не могли бы вы уточнить ваш вопрос, чтобы я мог помочь лучше?'
                ]
            }
        }

    def detect_intent(self, message: str) -> str:
        message = message.lower()
        for intent, pattern in self.patterns.items():
            if re.search(pattern, message):
                return intent
        return 'default'

    def detect_language(self, message: str) -> str:
        # Simple language detection based on common words
        az_patterns = r'\b(salam|necə|kömək|kitab)\b'
        ru_patterns = r'\b(привет|как|помощь|книга)\b'
        
        if re.search(az_patterns, message.lower()):
            return 'az'
        elif re.search(ru_patterns, message.lower()):
            return 'ru'
        return 'en'  # Default to English

    def get_response(self, message: str, language: Optional[str] = None) -> ChatbotResponse:
        # Add message to conversation history
        self.conversation_history.append({'user': message})
        
        # Detect language if not provided
        detected_language = language or self.detect_language(message)
        
        # Detect intent
        intent = self.detect_intent(message)
        
        # Get appropriate responses for the language and intent
        responses = self.responses[detected_language][intent]
        
        # Select a random response
        response_text = random.choice(responses)
        
        # Add response to conversation history
        self.conversation_history.append({'bot': response_text})
        
        # Calculate confidence (simplified)
        confidence = 0.8 if intent != 'default' else 0.5
        
        return ChatbotResponse(response_text, confidence)

    def get_conversation_history(self) -> List[Dict[str, str]]:
        return self.conversation_history

    def clear_conversation_history(self) -> None:
        self.conversation_history = []

# Create a singleton instance
chatbot = Chatbot()