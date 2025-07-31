import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHistory = ({ isOpen, onClose, onSelectChat, currentChatId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockChatHistory = [
    {
      id: 'chat-1',
      title: 'Nifty 50 Analysis Discussion',
      lastMessage: 'Based on current market trends, Nifty 50 shows bullish momentum...',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      messageCount: 12
    },
    {
      id: 'chat-2', 
      title: 'SIP Investment Strategy',
      lastMessage: 'For your risk profile, I recommend diversified equity funds...',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      messageCount: 8
    },
    {
      id: 'chat-3',
      title: 'Banking Sector Stocks',
      lastMessage: 'HDFC Bank and ICICI Bank are showing strong fundamentals...',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 15
    },
    {
      id: 'chat-4',
      title: 'Portfolio Review Session',
      lastMessage: 'Your current allocation needs rebalancing in technology sector...',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 23
    },
    {
      id: 'chat-5',
      title: 'Market Outlook 2024',
      lastMessage: 'Considering global economic factors, Indian markets may see...',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 18
    }
  ];

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const filteredChats = mockChatHistory?.filter(chat =>
    chat?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    chat?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleChatSelect = (chatId) => {
    onSelectChat(chatId);
    onClose();
  };

  const handleDeleteChat = (e, chatId) => {
    e?.stopPropagation();
    // Mock delete functionality
    console.log('Delete chat:', chatId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-surface border-r border-border lg:relative lg:w-full animate-slide-in lg:animate-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Chat History</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={() => onSelectChat('new')}
          >
            New Chat
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filteredChats?.length === 0 ? (
            <div className="p-4 text-center">
              <Icon name="MessageSquare" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No chats found' : 'No chat history yet'}
              </p>
            </div>
          ) : (
            <div className="p-2">
              {filteredChats?.map((chat) => (
                <div
                  key={chat?.id}
                  onClick={() => handleChatSelect(chat?.id)}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
                    currentChatId === chat?.id ? 'bg-muted border border-border' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {chat?.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {chat?.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(chat?.timestamp)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {chat?.messageCount} messages
                        </span>
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDeleteChat(e, chat?.id)}
                      className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-muted-foreground hover:text-error transition-smooth"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <p>Powered by DeepSeek R1</p>
            <p className="mt-1">Created by Soham & Vivaan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;