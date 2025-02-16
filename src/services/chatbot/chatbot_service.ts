import { ChatbotResponse } from '../../types/chatbot';

declare const python: {
  import: (module: string) => Promise<any>;
};

class ChatbotService {
  private pythonModule: any;
  private initialized: boolean = false;

  private async initialize() {
    if (!this.initialized) {
      try {
        this.pythonModule = await python.import('./services/chatbot/chatbot.py');
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize chatbot:', error);
        throw error;
      }
    }
  }

  public async getResponse(message: string, language?: string): Promise<ChatbotResponse> {
    await this.initialize();
    
    try {
      const response = await this.pythonModule.chatbot.get_response(message, language);
      return {
        text: response.text,
        confidence: response.confidence
      };
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      throw error;
    }
  }

  public async getConversationHistory(): Promise<Array<{ user?: string; bot?: string }>> {
    await this.initialize();
    
    try {
      return await this.pythonModule.chatbot.get_conversation_history();
    } catch (error) {
      console.error('Error getting conversation history:', error);
      throw error;
    }
  }

  public async clearConversationHistory(): Promise<void> {
    await this.initialize();
    
    try {
      await this.pythonModule.chatbot.clear_conversation_history();
    } catch (error) {
      console.error('Error clearing conversation history:', error);
      throw error;
    }
  }
}

export const chatbotService = new ChatbotService();