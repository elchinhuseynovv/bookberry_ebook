export interface ChatbotResponse {
  text: string;
  confidence: number;
}

export interface ChatMessage {
  user?: string;
  bot?: string;
  timestamp?: Date;
}