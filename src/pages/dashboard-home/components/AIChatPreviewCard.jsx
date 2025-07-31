import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIChatPreviewCard = () => {
  const navigate = useNavigate();

  const recentConversation = {
    userMessage: "What\'s your analysis on HDFC Bank\'s recent performance?",
    aiResponse: `Based on recent data, HDFC Bank shows strong fundamentals with a P/E ratio of 18.5. The stock has gained 12% this quarter, outperforming the banking sector average. Key positives include:\n\n• Improved asset quality with NPA reduction\n• Strong deposit growth of 15% YoY\n• Digital banking expansion\n\nConsider it for long-term investment with proper risk management.`,
    timestamp: "2 hours ago"
  };

  const handleContinueChat = () => {
    navigate('/ai-chat-interface');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AI Financial Advisor</h2>
            <p className="text-sm text-muted-foreground">Your recent conversation</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3">
            <p className="text-sm">{recentConversation?.userMessage}</p>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex justify-start">
          <div className="max-w-[85%] bg-muted border border-border rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={12} color="white" />
              </div>
              <span className="text-xs font-medium text-foreground">FinTech AI</span>
            </div>
            <div className="text-sm text-foreground whitespace-pre-line">
              {recentConversation?.aiResponse?.length > 150 
                ? `${recentConversation?.aiResponse?.substring(0, 150)}...` 
                : recentConversation?.aiResponse
              }
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">{recentConversation?.timestamp}</span>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleContinueChat}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue Chat
        </Button>
      </div>
      {/* AI Introduction */}
      <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={16} color="var(--color-accent)" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Meet Your AI Financial Advisor</h4>
            <p className="text-xs text-muted-foreground">
              Created by Soham & Vivaan, I'm here to provide personalized investment guidance, 
              market analysis, and help you make informed financial decisions in the Indian stock market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPreviewCard;