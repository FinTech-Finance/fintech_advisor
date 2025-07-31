import React from 'react';
import Icon from '../../../components/AppIcon';

const SuggestedTopics = ({ onTopicSelect }) => {
  const suggestedTopics = [
    {
      id: 1,
      icon: 'TrendingUp',
      title: 'Market Analysis',
      description: 'Get insights on current market trends and NIFTY performance',
      query: 'Can you analyze the current Indian stock market trends and NIFTY performance?'
    },
    {
      id: 2,
      icon: 'PiggyBank',
      title: 'SIP Investment',
      description: 'Learn about SIP strategies and mutual fund recommendations',
      query: 'What are the best SIP investment strategies for long-term wealth creation?'
    },
    {
      id: 3,
      icon: 'Target',
      title: 'Portfolio Review',
      description: 'Get personalized portfolio analysis and optimization tips',
      query: 'How can I optimize my investment portfolio for better returns?'
    },
    {
      id: 4,
      icon: 'Shield',
      title: 'Risk Management',
      description: 'Understand risk assessment and investment protection strategies',
      query: 'What are effective risk management strategies for stock investments?'
    },
    {
      id: 5,
      icon: 'IndianRupee',
      title: 'Tax Planning',
      description: 'Learn about tax-saving investments and ELSS funds',
      query: 'What are the best tax-saving investment options under Section 80C?'
    },
    {
      id: 6,
      icon: 'Banknote',
      title: 'Stock Picks',
      description: 'Get recommendations for promising Indian stocks',
      query: 'Can you recommend some promising Indian stocks for investment?'
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Bot" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome to FinTech AI Advisor
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          Your intelligent financial companion created by Soham and Vivaan. Get expert advice on investments, 
          market analysis, and financial planning tailored for Indian markets.
        </p>
      </div>

      {/* Suggested Topics Grid */}
      <div className="w-full max-w-3xl">
        <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
          What can I help you with today?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedTopics?.map((topic) => (
            <button
              key={topic?.id}
              onClick={() => onTopicSelect?.(topic?.query)}
              className="group p-4 bg-surface border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name={topic?.icon} size={20} color="hsl(var(--primary))" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {topic?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {topic?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowUpRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" 
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
            <Icon name="TrendingUp" size={16} color="hsl(var(--success))" />
          </div>
          <span className="text-sm font-medium text-foreground">Real-time</span>
          <span className="text-xs text-muted-foreground">Market Data</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Icon name="Brain" size={16} color="hsl(var(--primary))" />
          </div>
          <span className="text-sm font-medium text-foreground">AI-Powered</span>
          <span className="text-xs text-muted-foreground">Analysis</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center mb-2">
            <Icon name="Shield" size={16} color="hsl(var(--warning))" />
          </div>
          <span className="text-sm font-medium text-foreground">Risk-Aware</span>
          <span className="text-xs text-muted-foreground">Advice</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground max-w-md">
          <Icon name="AlertTriangle" size={12} className="inline mr-1" />
          Investment advice is for educational purposes. Please consult with certified financial advisors for major investment decisions.
        </p>
      </div>
    </div>
  );
};

export default SuggestedTopics;