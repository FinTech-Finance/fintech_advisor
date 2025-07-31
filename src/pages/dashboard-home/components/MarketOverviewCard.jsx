import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketOverviewCard = () => {
  const marketData = [
    {
      name: "NIFTY 50",
      value: "19,674.25",
      change: "+456.30",
      changePercent: "+2.37%",
      isPositive: true
    },
    {
      name: "SENSEX",
      value: "66,023.69",
      change: "+1,187.45",
      changePercent: "+1.83%",
      isPositive: true
    },
    {
      name: "BANK NIFTY",
      value: "44,156.30",
      change: "-234.75",
      changePercent: "-0.53%",
      isPositive: false
    },
    {
      name: "NIFTY IT",
      value: "28,945.80",
      change: "+892.15",
      changePercent: "+3.18%",
      isPositive: true
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Market Overview</h2>
            <p className="text-sm text-muted-foreground">Live Indian Stock Indices</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {marketData?.map((index, idx) => (
          <div key={idx} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">{index?.name}</h3>
              <Icon 
                name={index?.isPositive ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                color={index?.isPositive ? "var(--color-success)" : "var(--color-error)"} 
              />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-data font-semibold text-foreground">₹{index?.value}</p>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  index?.isPositive ? 'text-success' : 'text-error'
                }`}>
                  {index?.change}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  index?.isPositive 
                    ? 'bg-success/10 text-success border border-success/20' :'bg-error/10 text-error border border-error/20'
                }`}>
                  {index?.changePercent}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: 31 Jul 2025, 11:25 AM IST</span>
          <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
            <Icon name="RefreshCw" size={12} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketOverviewCard;