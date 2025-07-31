import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Stock Search",
      description: "Find and analyze stocks",
      icon: "Search",
      color: "primary",
      path: "/stock-search-analysis",
      bgColor: "bg-primary/10",
      iconColor: "var(--color-primary)"
    },
    {
      title: "AI Chat",
      description: "Get investment advice",
      icon: "MessageSquare",
      color: "success",
      path: "/ai-chat-interface",
      bgColor: "bg-success/10",
      iconColor: "var(--color-success)"
    },
    {
      title: "Market News",
      description: "Latest financial updates",
      icon: "Newspaper",
      color: "warning",
      path: "/market-news-analysis-hub",
      bgColor: "bg-warning/10",
      iconColor: "var(--color-warning)"
    },
    {
      title: "Portfolio Analysis",
      description: "Track your investments",
      icon: "BarChart3",
      color: "secondary",
      path: "/stock-search-analysis",
      bgColor: "bg-secondary/10",
      iconColor: "var(--color-secondary)"
    }
  ];

  const marketAlerts = [
    {
      type: "price",
      message: "RELIANCE crossed ₹2,500",
      time: "5 min ago",
      isPositive: true
    },
    {
      type: "volume",
      message: "High volume in TCS",
      time: "12 min ago",
      isPositive: true
    },
    {
      type: "news",
      message: "RBI policy announcement",
      time: "1 hour ago",
      isPositive: false
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Zap" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Fast access to key features</p>
          </div>
        </div>
      </div>
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {quickActions?.map((action, idx) => (
          <button
            key={idx}
            onClick={() => handleActionClick(action?.path)}
            className="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth text-left group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon name={action?.icon} size={20} color={action?.iconColor} />
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">{action?.title}</h3>
            <p className="text-xs text-muted-foreground">{action?.description}</p>
          </button>
        ))}
      </div>
      {/* Market Alerts */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">Recent Alerts</h3>
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="right">
            Manage
          </Button>
        </div>

        <div className="space-y-3">
          {marketAlerts?.map((alert, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-smooth">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                alert.type === 'price' ? 'bg-primary/10' :
                alert.type === 'volume' ? 'bg-success/10' : 'bg-warning/10'
              }`}>
                <Icon 
                  name={
                    alert.type === 'price' ? 'DollarSign' :
                    alert.type === 'volume' ? 'BarChart3' : 'Bell'
                  } 
                  size={14} 
                  color={
                    alert.type === 'price' ? 'var(--color-primary)' :
                    alert.type === 'volume' ? 'var(--color-success)' : 'var(--color-warning)'
                  }
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
              <Icon 
                name={alert.isPositive ? "TrendingUp" : "TrendingDown"} 
                size={14} 
                color={alert.isPositive ? "var(--color-success)" : "var(--color-error)"} 
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="outline" size="sm" fullWidth iconName="Plus" iconPosition="left">
            Create New Alert
          </Button>
        </div>
      </div>
      {/* Market Hours */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Market Open</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-data text-foreground">9:15 AM - 3:30 PM IST</p>
            <p className="text-xs text-muted-foreground">Next: Pre-market at 9:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;