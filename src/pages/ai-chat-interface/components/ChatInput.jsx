import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading, onVoiceInput }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Mock file upload - in real app would upload to server
      const mockAttachment = {
        type: file?.type?.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size
      };
      
      onSendMessage(`Uploaded ${file?.name}`, mockAttachment);
      e.target.value = '';
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // Mock voice input result
      const mockVoiceResult = "Nifty fifty ka analysis chahiye";
      setMessage(mockVoiceResult);
      onVoiceInput?.(mockVoiceResult);
    } else {
      setIsRecording(true);
      // In real app, would start voice recognition
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  }, [message]);

  const quickSuggestions = [
    "Nifty analysis",
    "SIP recommendations", 
    "Best stocks today",
    "Portfolio review",
    "Market outlook",
    "Sector analysis"
  ];

  return (
    <div className="border-t border-border bg-surface">
      {/* Quick Suggestions */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {quickSuggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-smooth"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          <div className="flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef?.current?.click()}
              disabled={isLoading}
            >
              <Icon name="Paperclip" size={18} />
            </Button>
          </div>

          {/* Voice Input Button */}
          <div className="flex-shrink-0">
            <Button
              type="button"
              variant={isRecording ? "destructive" : "ghost"}
              size="sm"
              onClick={handleVoiceToggle}
              disabled={isLoading}
              className={isRecording ? "animate-pulse" : ""}
            >
              <Icon name={isRecording ? "MicOff" : "Mic"} size={18} />
            </Button>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={isRecording ? "Listening... (Hindi/English supported)" : "Ask about stocks, market trends, investment advice..."}
              className="w-full px-4 py-3 bg-input border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm placeholder:text-muted-foreground"
              rows={1}
              disabled={isLoading || isRecording}
              maxLength={1000}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {message?.length}/1000
            </div>
          </div>

          {/* Send Button */}
          <div className="flex-shrink-0">
            <Button
              type="submit"
              disabled={!message?.trim() || isLoading}
              loading={isLoading}
              className="rounded-full w-10 h-10 p-0"
            >
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span>Recording... Speak in Hindi or English</span>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-3 text-xs text-muted-foreground text-center">
          <p>
            Investment advice is for educational purposes only. Please consult SEBI registered advisors. 
            <span className="font-medium"> Markets are subject to risks.</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;