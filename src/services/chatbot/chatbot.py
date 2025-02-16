import random
import re
from typing import Dict, List, Optional
from datetime import datetime

class ChatbotResponse:
    def __init__(self, text: str, confidence: float = 1.0):
        self.text = text
        self.confidence = confidence

class Chatbot:
    def __init__(self):
        self.conversation_history: List[Dict[str, str]] = []
        self.context: Dict[str, any] = {}
        
        # Expanded patterns for better intent recognition
        self.patterns = {
            'greeting': r'\b(hi|hello|hey|salam|привет|good\s*(morning|evening|afternoon))\b',
            'book_search': r'\b(find|search|looking for|book|kitab|книга|recommend|suggest)\b',
            'help': r'\b(help|support|kömək|помощь|assist|guide)\b',
            'download': r'\b(download|yüklə|скачать|get|obtain)\b',
            'reading': r'\b(read|oxu|читать|start reading|open|view)\b',
            'account': r'\b(account|hesab|аккаунт|profile|login|signup|register)\b',
            'subscription': r'\b(subscribe|premium|plan|abunə|подписка|payment|upgrade)\b',
            'technical': r'\b(error|problem|issue|bug|not working|failed|crash)\b',
            'feedback': r'\b(feedback|review|rate|comment|suggest|improve)\b',
            'features': r'\b(feature|function|capability|option|setting|preference)\b',
            'format': r'\b(format|pdf|epub|audio|mp3|file type)\b',
            'language': r'\b(language|dil|язык|translate|azerbaijani|english|russian)\b'
        }
        
        # Enhanced responses with more natural language and context awareness
        self.responses = {
            'az': {
                'greeting': [
                    'Salam! BookBerry-yə xoş gəlmisiniz! Sizə necə kömək edə bilərəm? 😊',
                    'Xoş gördük! Rəqəmsal kitabxanamıza xoş gəlmisiniz! Sizə necə yardımçı ola bilərəm?',
                    'Salam! Bu gün hansı kitabı axtarırsınız? Sizə kömək etməkdən məmnun olaram!'
                ],
                'book_search': [
                    'Hansı janrda kitab axtarırsınız? Bizim kitabxanamızda müxtəlif janrlarda geniş seçim var.',
                    'Size konkret bir kitab tövsiyə edə bilərəm. Hansı mövzular sizi maraqlandırır?',
                    'Kitabxanamızda {genre} janrında populyar kitablarımız var. Sizə tövsiyə edə bilərəm.'
                ],
                'help': [
                    'Əlbəttə, sizə kömək edə bilərəm. Hansı məsələ ilə bağlı sualınız var?',
                    'Texniki dəstək üçün buradayam. Probleminizi detallı şəkildə izah edin.',
                    'Sizə necə yardımçı ola bilərəm? Hər hansı bir çətinliklə qarşılaşırsınız?'
                ],
                'download': [
                    'Kitabı yükləmək üçün əvvəlcə hesabınıza daxil olmalısınız. Daha sonra kitabın səhifəsindəki yükləmə düyməsini sıxa bilərsiniz.',
                    'Premium hesab sahibləri bütün kitabları yükləyə bilər. Yükləmə başlamaq üçün kitabın səhifəsindəki yükləmə düyməsini sıxın.',
                    'Kitabı yükləmək istəyirsiniz? Sizə kömək edim: 1) Hesabınıza daxil olun, 2) Kitabı seçin, 3) Yükləmə düyməsini sıxın.'
                ],
                'reading': [
                    'Oxumağa başlamaq üçün kitabı seçin və "Oxu" düyməsini sıxın. Oxuma təcrübənizi fərdiləşdirmək üçün tənzimləmələri dəyişə bilərsiniz.',
                    'Kitabı oxumağa başladıqdan sonra səhifələri yaddaşda saxlaya və qeydlər əlavə edə bilərsiniz.',
                    'Oxuma zamanı şrift ölçüsünü, arxa fon rəngini və digər parametrləri öz zövqünüzə görə tənzimləyə bilərsiniz.'
                ],
                'account': [
                    'Hesab yaratmaq üçün "Qeydiyyat" düyməsini sıxın və tələb olunan məlumatları doldurun.',
                    'Hesabınıza daxil olmaq üçün email və şifrənizi daxil edin. Şifrənizi unutmusunuzsa, onu bərpa edə bilərsiniz.',
                    'Premium hesab üstünlükləri: limitsiz kitab oxuma, oflayn rejim, reklamsız istifadə və s.'
                ],
                'subscription': [
                    'Premium abunəlik sizə limitsiz kitab oxuma, audiokitablar və reklamsız istifadə imkanı verir.',
                    'Hal-hazırda iki abunəlik planımız var: aylıq (7 AZN) və illik (70 AZN). İllik plan 2 ay pulsuz istifadə deməkdir!',
                    'Premium abunəlik üstünlükləri: bütün kitablara giriş, oflayn oxuma, audiokitablar, sinxronizasiya və s.'
                ],
                'technical': [
                    'Texniki problemi həll etməyə çalışaq. Xahiş edirəm, qarşılaşdığınız problemi təsvir edin.',
                    'Tətbiqi yeniləməyi və ya brauzerinizin keşini təmizləməyi sınamısınız?',
                    'Bu problemi həll etmək üçün addım-addım kömək edə bilərəm. Əvvəlcə...'
                ],
                'feedback': [
                    'Rəyiniz bizim üçün çox dəyərlidir. Təkliflərinizi bildirə bilərsiniz.',
                    'Xidmətimizi daha da yaxşılaşdırmaq üçün fikirlərinizi bizimlə bölüşün.',
                    'Rəy bildirmək üçün kitabın səhifəsindəki ulduz işarəsini istifadə edə bilərsiniz.'
                ],
                'features': [
                    'BookBerry-də bir çox faydalı funksiyalar var: səhifələri yaddaşda saxlama, qeydlər əlavə etmə, oxuma statistikası və s.',
                    'Yeni funksiyalarımız: audio kitablar, oflayn rejim, cihazlar arası sinxronizasiya.',
                    'Tənzimləmələr bölməsində oxuma təcrübənizi fərdiləşdirə bilərsiniz.'
                ],
                'format': [
                    'Kitablarımız PDF və EPUB formatlarında mövcuddur. Audiokitablar MP3 formatındadır.',
                    'PDF faylları bütün cihazlarda oxuna bilər. EPUB formatı daha rahat oxuma təcrübəsi təqdim edir.',
                    'Audiokitablarımız yüksək keyfiyyətli MP3 formatındadır və oflayn dinləmə imkanı var.'
                ],
                'language': [
                    'Kitabxanamızda Azərbaycan, İngilis və Rus dillərində kitablar var.',
                    'İnterfeys dilini tənzimləmələr bölməsindən dəyişə bilərsiniz.',
                    'Tərcümə edilmiş əsərlərimiz orijinal dildə də mövcuddur.'
                ],
                'default': [
                    'Bağışlayın, sizi tam başa düşmədim. Sualınızı başqa cür izah edə bilərsinizmi?',
                    'Bu barədə daha ətraflı məlumat verə bilərsinizmi?',
                    'Sizə daha yaxşı kömək etmək üçün sualınızı dəqiqləşdirə bilərsinizmi?'
                ]
            },
            'en': {
                'greeting': [
                    'Hello! Welcome to BookBerry! How can I assist you today? 😊',
                    'Welcome to our digital library! How may I help you?',
                    'Hi there! Looking for any particular book today? I\'d be happy to help!'
                ],
                'book_search': [
                    'What genre of book are you looking for? We have a wide selection in our library.',
                    'I can recommend a specific book. What topics interest you?',
                    'We have popular books in the {genre} genre. Would you like some recommendations?'
                ],
                'help': [
                    'Of course, I can help you. What questions do you have?',
                    'I\'m here for technical support. Please explain your issue in detail.',
                    'How can I assist you? Are you experiencing any difficulties?'
                ],
                'download': [
                    'To download a book, you\'ll need to log in first. Then you can use the download button on the book\'s page.',
                    'Premium account holders can download all books. Click the download button on the book\'s page to start.',
                    'Want to download a book? Let me help: 1) Log in, 2) Select the book, 3) Click the download button.'
                ],
                'reading': [
                    'To start reading, select a book and click the "Read" button. You can customize your reading experience in settings.',
                    'After starting a book, you can bookmark pages and add notes.',
                    'While reading, you can adjust font size, background color, and other parameters to your preference.'
                ],
                'account': [
                    'To create an account, click the "Sign Up" button and fill in the required information.',
                    'To log in, enter your email and password. If you\'ve forgotten your password, you can recover it.',
                    'Premium account benefits include unlimited reading, offline mode, ad-free experience, and more.'
                ],
                'subscription': [
                    'Premium subscription gives you unlimited book access, audiobooks, and ad-free experience.',
                    'We currently offer two subscription plans: monthly ($7) and yearly ($70). The yearly plan gives you 2 months free!',
                    'Premium subscription benefits: full library access, offline reading, audiobooks, sync across devices, and more.'
                ],
                'technical': [
                    'Let\'s solve your technical issue. Please describe the problem you\'re experiencing.',
                    'Have you tried updating the app or clearing your browser cache?',
                    'I can help you resolve this step by step. First...'
                ],
                'feedback': [
                    'Your feedback is valuable to us. Please share your suggestions.',
                    'Help us improve our service by sharing your thoughts.',
                    'You can use the star rating on the book\'s page to leave a review.'
                ],
                'features': [
                    'BookBerry has many useful features: bookmarking, note-taking, reading statistics, and more.',
                    'New features include: audiobooks, offline mode, cross-device synchronization.',
                    'You can personalize your reading experience in the settings section.'
                ],
                'format': [
                    'Our books are available in PDF and EPUB formats. Audiobooks are in MP3 format.',
                    'PDF files can be read on all devices. EPUB format provides a more comfortable reading experience.',
                    'Our audiobooks are in high-quality MP3 format with offline listening capability.'
                ],
                'language': [
                    'Our library includes books in Azerbaijani, English, and Russian.',
                    'You can change the interface language in the settings section.',
                    'Translated works are also available in their original language.'
                ],
                'default': [
                    'I\'m sorry, I didn\'t quite understand. Could you rephrase your question?',
                    'Could you provide more details about that?',
                    'To help you better, could you clarify your question?'
                ]
            },
            'ru': {
                'greeting': [
                    'Здравствуйте! Добро пожаловать в BookBerry! Как я могу вам помочь сегодня? 😊',
                    'Добро пожаловать в нашу цифровую библиотеку! Чем могу помочь?',
                    'Привет! Ищете какую-то конкретную книгу сегодня? Буду рад помочь!'
                ],
                'book_search': [
                    'Какой жанр книги вы ищете? У нас большой выбор в библиотеке.',
                    'Я могу порекомендовать конкретную книгу. Какие темы вас интересуют?',
                    'У нас есть популярные книги в жанре {genre}. Хотите рекомендации?'
                ],
                'help': [
                    'Конечно, я могу помочь. Какие у вас вопросы?',
                    'Я здесь для технической поддержки. Пожалуйста, объясните вашу проблему подробно.',
                    'Как я могу вам помочь? Возникли какие-то трудности?'
                ],
                'download': [
                    'Для скачивания книги необходимо сначала войти в систему. Затем вы можете использовать кнопку скачивания на странице книги.',
                    'Владельцы премиум-аккаунта могут скачивать все книги. Нажмите кнопку скачивания на странице книги.',
                    'Хотите скачать книгу? Давайте я помогу: 1) Войдите в систему, 2) Выберите книгу, 3) Нажмите кнопку скачивания.'
                ],
                'reading': [
                    'Чтобы начать чтение, выберите книгу и нажмите кнопку "Читать". Вы можете настроить параметры чтения в настройках.',
                    'После начала чтения книги вы можете добавлять закладки и делать заметки.',
                    'Во время чтения вы можете настроить размер шрифта, цвет фона и другие параметры по вашему вкусу.'
                ],
                'account': [
                    'Для создания аккаунта нажмите кнопку "Регистрация" и заполните необходимую информацию.',
                    'Для входа введите email и пароль. Если вы забыли пароль, его можно восстановить.',
                    'Преимущества премиум-аккаунта: неограниченное чтение, офлайн-режим, отсутствие рекламы и многое другое.'
                ],
                'subscription': [
                    'Премиум-подписка дает доступ к неограниченному количеству книг, аудиокнигам и отсутствию рекламы.',
                    'У нас есть два плана подписки: месячный (7$) и годовой (70$). Годовой план дает 2 месяца бесплатно!',
                    'Преимущества премиум-подписки: полный доступ к библиотеке, офлайн-чтение, аудиокниги, синхронизация между устройствами и многое другое.'
                ],
                'technical': [
                    'Давайте решим вашу техническую проблему. Пожалуйста, опишите проблему, с которой вы столкнулись.',
                    'Пробовали обновить приложение или очистить кэш браузера?',
                    'Я могу помочь вам решить это пошагово. Сначала...'
                ],
                'feedback': [
                    'Ваш отзыв очень важен для нас. Пожалуйста, поделитесь своими предложениями.',
                    'Помогите нам улучшить наш сервис, поделившись своими мыслями.',
                    'Вы можете использовать звездный рейтинг на странице книги, чтобы оставить отзыв.'
                ],
                'features': [
                    'В BookBerry есть много полезных функций: закладки, заметки, статистика чтения и многое другое.',
                    'Новые функции включают: аудиокниги, офлайн-режим, синхронизацию между устройствами.',
                    'Вы можете персонализировать параметры чтения в разделе настроек.'
                ],
                'format': [
                    'Наши книги доступны в форматах PDF и EPUB. Аудиокниги в формате MP3.',
                    'PDF файлы можно читать на всех устройствах. Формат EPUB обеспечивает более комфортное чтение.',
                    'Наши аудиокниги в высококачественном формате MP3 с возможностью офлайн-прослушивания.'
                ],
                'language': [
                    'В нашей библиотеке есть книги на азербайджанском, английском и русском языках.',
                    'Вы можете изменить язык интерфейса в разделе настроек.',
                    'Переведенные произведения также доступны на языке оригинала.'
                ],
                'default': [
                    'Извините, я не совсем понял. Не могли бы вы переформулировать ваш вопрос?',
                    'Не могли бы вы предоставить больше деталей?',
                    'Чтобы помочь вам лучше, не могли бы вы уточнить ваш вопрос?'
                ]
            }
        }

    def detect_intent(self, message: str) -> str:
        message = message.lower()
        
        # Store message context for better responses
        self.context['last_message'] = message
        self.context['timestamp'] = datetime.now()
        
        # Check for compound intents
        detected_intents = []
        for intent, pattern in self.patterns.items():
            if re.search(pattern, message):
                detected_intents.append(intent)
        
        if len(detected_intents) > 0:
            # Return the most specific intent
            if 'technical' in detected_intents:
                return 'technical'
            if 'subscription' in detected_intents and ('help' in detected_intents or 'account' in detected_intents):
                return 'subscription'
            return detected_intents[0]
        
        return 'default'

    def detect_language(self, message: str) -> str:
        # Enhanced language detection with more patterns
        az_patterns = r'\b(salam|necə|kömək|kitab|xahiş|təşəkkür|bəli|xeyr)\b'
        ru_patterns = r'\b(привет|как|помощь|книга|пожалуйста|спасибо|да|нет)\b'
        en_patterns = r'\b(hello|how|help|book|please|thank|yes|no)\b'
        
        message = message.lower()
        
        # Count matches for each language
        az_count = len(re.findall(az_patterns, message))
        ru_count = len(re.findall(ru_patterns, message))
        en_count = len(re.findall(en_patterns, message))
        
        # Return the language with the most matches
        if az_count > ru_count and az_count > en_count:
            return 'az'
        elif ru_count > az_count and ru_count > en_count:
            return 'ru'
        return 'en'  # Default to English

    def get_response(self, message: str, language: Optional[str] = None) -> ChatbotResponse:
        # Add message to conversation history
        self.conversation_history.append({
            'user': message,
            'timestamp': datetime.now().isoformat()
        })
        
        # Detect language if not provided
        detected_language = language or self.detect_language(message)
        
        # Detect intent
        intent = self.detect_intent(message)
        
        # Get appropriate responses for the language and intent
        responses = self.responses[detected_language][intent]
        
        # Select response based on context
        response_text = self.select_contextual_response(responses, intent, detected_language)
        
        # Add response to conversation history
        self.conversation_history.append({
            'bot': response_text,
            'timestamp': datetime.now().isoformat()
        })
        
        # Calculate confidence based on intent and context
        confidence = self.calculate_confidence(intent, message)
        
        return ChatbotResponse(response_text, confidence)

    def select_contextual_response(self, responses: List[str], intent: str, language: str) -> str:
        # Select response based on context and conversation history
        if len(self.conversation_history) > 0:
            last_user_message = self.conversation_history[-1].get('user', '').lower()
            
            # Check for follow-up questions
            if 'why' in last_user_message or 'how' in last_user_message:
                # Return more detailed response
                return responses[-1]
            
            # Check for gratitude
            if any(word in last_user_message for word in ['thanks', 'thank you', 'təşəkkür', 'спасибо']):
                gratitude_responses = {
                    'az': 'Dəyməz! Başqa sualınız varsa, soruşa bilərsiniz. 😊',
                    'en': 'You\'re welcome! Feel free to ask if you have any other questions. 😊',
                    'ru': 'Пожалуйста! Не стесняйтесь спрашивать, если у вас есть другие вопросы. 😊'
                }
                return gratitude_responses[language]
        
        # Default to random response if no special context
        return random.choice(responses)

    def calculate_confidence(self, intent: str, message: str) -> float:
        # Base confidence
        confidence = 0.6
        
        # Adjust based on intent
        if intent != 'default':
            confidence += 0.2
        
        # Adjust based on message length and complexity
        words = message.split()
        if len(words) > 3:
            confidence += 0.1
        
        # Adjust based on conversation history
        if len(self.conversation_history) > 2:
            confidence += 0.1
        
        return min(confidence, 1.0)  # Cap at 1.0

    def get_conversation_history(self) -> List[Dict[str, str]]:
        return self.conversation_history

    def clear_conversation_history(self) -> None:
        self.conversation_history = []
        self.context = {}

# Create a singleton instance
chatbot = Chatbot()