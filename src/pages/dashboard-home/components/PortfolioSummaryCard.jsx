import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioSummaryCard = () => {
  const navigate = useNavigate();

  const portfolioData = {
    totalValue: "₹2,45,680",
    dayChange: "+₹3,240",
    dayChangePercent: "+1.34%",
    isPositive: true,
    topStocks: [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries",
        price: "₹2,456.30",
        change: "+2.1%",
        isPositive: true,
        quantity: 25
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        price: "₹3,789.45",
        change: "+1.8%",
        isPositive: true,
        quantity: 15
      },
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank",
        price: "₹1,634.20",
        change: "-0.5%",
        isPositive: false,
        quantity: 30
      }
    ]
  };

  const handleViewPortfolio = () => {
    navigate('/stock-search-analysis');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="PieChart" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Portfolio Summary</h2>
            <p className="text-sm text-muted-foreground">Your investment overview</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewPortfolio}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Portfolio Value */}
      <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
          <p className="text-3xl font-data font-bold text-foreground mb-2">{portfolioData?.totalValue}</p>
          <div className="flex items-center justify-center space-x-2">
            <Icon 
              name={portfolioData?.isPositive ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              color={portfolioData?.isPositive ? "var(--color-success)" : "var(--color-error)"} 
            />
            <span className={`text-sm font-medium ${
              portfolioData?.isPositive ? 'text-success' : 'text-error'
            }`}>
              {portfolioData?.dayChange} ({portfolioData?.dayChangePercent})
            </span>
            <span className="text-xs text-muted-foreground">today</span>
          </div>
        </div>
      </div>
      {/* Top Holdings */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-4">Top Holdings</h3>
        <div className="space-y-3">
          {portfolioData?.topStocks?.map((stock, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{stock?.symbol?.substring(0, 2)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{stock?.symbol}</p>
                  <p className="text-xs text-muted-foreground">{stock?.quantity} shares</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-data font-medium text-foreground">{stock?.price}</p>
                <p className={`text-xs ${
                  stock?.isPositive ? 'text-success' : 'text-error'
                }`}>
                  {stock?.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Stock
          </Button>
          <Button variant="outline" size="sm" iconName="BarChart3" iconPosition="left">
            Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;