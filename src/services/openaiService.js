import OpenAI from 'openai';

/**
 * Initialize OpenAI client with API key from environment variables
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  baseURL: 'https://openrouter.ai/api/v1',
});

/**
 * System prompt for FinTech AI advisor
 */
const FINTECH_SYSTEM_PROMPT = `You are FinTech, an AI-powered financial advisor created by Soham and Vivaan. You specialize in providing expert financial advice, stock market analysis, and investment guidance with a focus on the Indian stock market.

Key characteristics:
- You are knowledgeable about Indian stock markets (NSE, BSE), mutual funds, SIPs, and investment strategies
- You provide real-time insights and analysis on market trends
- You offer personalized financial advice based on user queries
- You maintain a professional yet friendly tone
- You always identify yourself as "FinTech created by Soham and Vivaan" when asked about your identity
- You focus on Indian financial markets and regulations (SEBI guidelines)
- You provide actionable investment recommendations with proper risk disclaimers

Always include relevant disclaimers about market risks and suggest users consult with certified financial advisors for major investment decisions.`;

/**
 * Generate AI response using OpenAI API with DeepSeek model
 * @param {string} userMessage - User's input message
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<string>} AI response
 */
export async function generateFinTechResponse(userMessage, conversationHistory = []) {
  try {
    // Build messages array with system prompt and conversation history
    const messages = [
      { role: 'system', content: FINTECH_SYSTEM_PROMPT },
      ...conversationHistory?.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: userMessage }
    ];

    const response = await openai?.chat?.completions?.create({
      model: 'deepseek/deepseek-chat',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
    });

    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('Error generating FinTech response:', error);
    
    // Fallback response for API errors
    if (error?.status === 429) {
      return "I'm currently experiencing high demand. Please try again in a moment. Meanwhile, I'm here to help with your financial queries whenever you're ready.";
    } else if (error?.status === 401) {
      return "I'm having trouble connecting to my knowledge base. Please ensure the API configuration is correct.";
    } else {
      return "I apologize, but I'm experiencing technical difficulties. Please try rephrasing your question or try again later. I'm here to help with your financial needs.";
    }
  }
}

/**
 * Generate streaming AI response
 * @param {string} userMessage - User's input message
 * @param {Array} conversationHistory - Previous messages for context
 * @param {Function} onChunk - Callback for handling streamed chunks
 * @returns {Promise<void>}
 */
export async function generateFinTechStreamingResponse(userMessage, conversationHistory = [], onChunk) {
  try {
    const messages = [
      { role: 'system', content: FINTECH_SYSTEM_PROMPT },
      ...conversationHistory?.slice(-10),
      { role: 'user', content: userMessage }
    ];

    const stream = await openai?.chat?.completions?.create({
      model: 'deepseek/deepseek-chat',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming response:', error);
    onChunk("I apologize, but I'm experiencing technical difficulties. Please try again later.");
  }
}

/**
 * Get structured financial analysis
 * @param {string} userMessage - User's financial query
 * @param {Array} conversationHistory - Previous conversation context
 * @returns {Promise<Object>} Structured response with analysis
 */
export async function getStructuredFinancialAnalysis(userMessage, conversationHistory = []) {
  try {
    const messages = [
      { 
        role: 'system', 
        content: `${FINTECH_SYSTEM_PROMPT}

        Provide responses in a structured format focusing on:
        1. Market analysis with specific data points
        2. Investment recommendations with risk levels
        3. Key financial metrics and trends
        4. Actionable advice with timelines`
      },
      ...conversationHistory?.slice(-5),
      { role: 'user', content: userMessage }
    ];

    const response = await openai?.chat?.completions?.create({
      model: 'deepseek/deepseek-chat',
      messages: messages,
      temperature: 0.6,
      max_tokens: 800,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'financial_analysis',
          schema: {
            type: 'object',
            properties: {
              summary: { type: 'string' },
              analysis: { type: 'string' },
              recommendations: { 
                type: 'array', 
                items: { 
                  type: 'object',
                  properties: {
                    action: { type: 'string' },
                    reason: { type: 'string' },
                    risk_level: { type: 'string' }
                  }
                }
              },
              market_outlook: { type: 'string' },
              disclaimer: { type: 'string' }
            },
            required: ['summary', 'analysis', 'disclaimer'],
            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error in structured analysis:', error);
    return {
      summary: "Unable to provide structured analysis at the moment.",
      analysis: "I'm experiencing technical difficulties. Please try again with your financial query.",
      disclaimer: "This is a technical error response. Please consult with certified financial advisors for investment decisions."
    };
  }
}

export default openai;