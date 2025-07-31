import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
        </div>
        <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
          <div className="bg-surface border border-border rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-muted-foreground">FinTech AI is analyzing</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
        </div>
      )}
      <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`px-4 py-3 ${
          isUser 
            ? 'chat-bubble-user' :'chat-bubble-ai'
        }`}>
          {message?.type === 'text' && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message?.content}</p>
          )}
          
          {message?.type === 'stock_data' && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{message?.content}</p>
              <div className="bg-muted rounded-lg p-3 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{message?.stockData?.symbol}</h4>
                  <span className={`text-sm font-data ${
                    message?.stockData?.change >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {message?.stockData?.change >= 0 ? '+' : ''}{message?.stockData?.change}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Price</span>
                  <span className="font-data text-foreground">₹{message?.stockData?.price?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
          
          {message?.type === 'recommendation' && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{message?.content}</p>
              <div className="space-y-2">
                {message?.recommendations?.map((rec, index) => (
                  <div key={index} className="bg-muted rounded-lg p-3 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{rec?.symbol}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec?.action === 'BUY' ? 'bg-success/10 text-success' :
                        rec?.action === 'SELL'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                      }`}>
                        {rec?.action}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: ₹{rec?.target?.toLocaleString('en-IN')} | Stop Loss: ₹{rec?.stopLoss?.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {message?.attachment && (
            <div className="mt-2">
              {message?.attachment?.type === 'image' && (
                <Image 
                  src={message?.attachment?.url} 
                  alt="Portfolio screenshot" 
                  className="rounded-lg max-w-full h-auto"
                />
              )}
              {message?.attachment?.type === 'chart' && (
                <div className="bg-muted rounded-lg p-3 border border-border">
                  <div className="text-center text-sm text-muted-foreground">
                    <Icon name="BarChart3" size={24} className="mx-auto mb-2" />
                    Chart: {message?.attachment?.title}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {formatTime(timestamp)}
            </span>
            {!isUser && (
              <div className="flex items-center space-x-1">
                <button className="text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="Copy" size={12} />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="ThumbsUp" size={12} />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="ThumbsDown" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;