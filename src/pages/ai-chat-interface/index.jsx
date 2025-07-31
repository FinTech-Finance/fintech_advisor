import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatHistory from './components/ChatHistory';
import SuggestedTopics from './components/SuggestedTopics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { generateFinTechStreamingResponse } from '../../services/openaiService';

const AIChatInterface = () => {
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('new');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, streamingMessage]);

  // Handle URL search params for direct queries
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams?.get('query');
    if (query && messages?.length === 0) {
      handleSendMessage(query);
    }
  }, [location.search]);

  const handleSendMessage = async (messageText, attachment = null) => {
    if (!messageText?.trim() && !attachment) return;

    const userMessage = {
      id: Date.now(),
      type: 'text',
      content: messageText,
      attachment,
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      // Convert messages to conversation history format for OpenAI
      const conversationHistory = messages?.map(msg => ({
        role: msg?.isUser ? 'user' : 'assistant',
        content: typeof msg?.content === 'string' ? msg?.content : JSON.stringify(msg?.content)
      }));

      // Use streaming response for better UX
      let fullResponse = '';
      await generateFinTechStreamingResponse(
        messageText,
        conversationHistory,
        (chunk) => {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        }
      );

      // Create final AI message
      const aiMessage = {
        id: Date.now() + 1,
        type: 'text',
        content: fullResponse,
        timestamp: new Date(),
        isUser: false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback AI message for errors
      const errorMessage = {
        id: Date.now() + 1,
        type: 'text',
        content: "I apologize, but I'm experiencing technical difficulties. As FinTech, your AI financial advisor created by Soham and Vivaan, I'm here to help with your financial queries. Please try again in a moment.",
        timestamp: new Date(),
        isUser: false
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setIsStreaming(false);
      setStreamingMessage('');
    }
  };

  const handleTopicSelect = (query) => {
    handleSendMessage(query);
  };

  const handleVoiceInput = (transcript) => {
    console.log('Voice transcript:', transcript);
  };

  const handleChatSelect = (chatId) => {
    if (chatId === 'new') {
      setMessages([]);
      setCurrentChatId('new');
    } else {
      // In real app, would load chat history from API
      setCurrentChatId(chatId);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentChatId('new');
    setStreamingMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <Header />
      </div>
      <div className="flex h-screen pt-24">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r border-border">
          <ChatHistory
            isOpen={true}
            onClose={() => {}}
            onSelectChat={handleChatSelect}
            currentChatId={currentChatId}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatHistoryOpen(true)}
                className="lg:hidden"
              >
                <Icon name="Menu" size={18} />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h1 className="font-medium text-foreground">FinTech AI Advisor</h1>
                  <p className="text-xs text-success">Online • Ready to help with finance</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                disabled={messages?.length === 0}
              >
                <Icon name="RotateCcw" size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
              >
                <Icon name="MoreVertical" size={18} />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin bg-background">
            {messages?.length === 0 && !isStreaming ? (
              <SuggestedTopics onTopicSelect={handleTopicSelect} />
            ) : (
              <div className="p-4 space-y-4">
                {messages?.map((message) => (
                  <ChatMessage
                    key={message?.id}
                    message={message}
                    isUser={message?.isUser}
                    timestamp={message?.timestamp}
                  />
                ))}
                
                {isStreaming && streamingMessage && (
                  <ChatMessage
                    message={{
                      type: 'text',
                      content: streamingMessage,
                      timestamp: new Date()
                    }}
                    isUser={false}
                    timestamp={new Date()}
                  />
                )}
                
                {isTyping && !streamingMessage && (
                  <ChatMessage isTyping={true} />
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading || isStreaming}
            onVoiceInput={handleVoiceInput}
          />
        </div>

        {/* Mobile Chat History */}
        <ChatHistory
          isOpen={isChatHistoryOpen}
          onClose={() => setIsChatHistoryOpen(false)}
          onSelectChat={handleChatSelect}
          currentChatId={currentChatId}
        />
      </div>
      
      {/* Market Status Indicator */}
      <div className="fixed bottom-20 right-4 lg:bottom-4">
        <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium shadow-elevated">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse"></div>
            <span>FinTech AI Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;