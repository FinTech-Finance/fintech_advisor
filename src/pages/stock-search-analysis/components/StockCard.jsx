import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockCard = ({ stock, onAddToWatchlist, onGetAnalysis, onViewDetails }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(stock?.inWatchlist || false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    onAddToWatchlist(stock?.symbol, !isInWatchlist);
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    await onGetAnalysis(stock);
    setIsAnalyzing(false);
  };

  const formatMarketCap = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000)?.toFixed(1)}L Cr`;
    } else if (value >= 1000) {
      return `₹${(value / 1000)?.toFixed(1)}K Cr`;
    }
    return `₹${value} Cr`;
  };

  const getPriceChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getPriceChangeBg = (change) => {
    if (change > 0) return 'bg-success/10';
    if (change < 0) return 'bg-error/10';
    return 'bg-muted';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-foreground">{stock?.symbol}</h3>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
              {stock?.exchange}
            </span>
            {stock?.isNew && (
              <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                New
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {stock?.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stock?.sector}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWatchlistToggle}
          className={isInWatchlist ? 'text-warning' : 'text-muted-foreground'}
        >
          <Icon 
            name={isInWatchlist ? "Star" : "Star"} 
            size={16}
            className={isInWatchlist ? 'fill-current' : ''}
          />
        </Button>
      </div>
      {/* Price Information */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-data text-xl font-semibold text-foreground">
            ₹{stock?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded ${getPriceChangeBg(stock?.change)}`}>
            <Icon 
              name={stock?.change >= 0 ? "TrendingUp" : "TrendingDown"} 
              size={14}
              className={getPriceChangeColor(stock?.change)}
            />
            <span className={`text-sm font-medium ${getPriceChangeColor(stock?.change)}`}>
              {stock?.change >= 0 ? '+' : ''}{stock?.change}%
            </span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          ₹{stock?.changeValue >= 0 ? '+' : ''}{stock?.changeValue?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">Market Cap</span>
          <div className="font-medium text-foreground">
            {formatMarketCap(stock?.marketCap)}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Volume</span>
          <div className="font-medium text-foreground">
            {stock?.volume?.toLocaleString('en-IN')}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">P/E Ratio</span>
          <div className="font-medium text-foreground">
            {stock?.pe || 'N/A'}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">52W High</span>
          <div className="font-medium text-foreground">
            ₹{stock?.high52w?.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAnalysis}
          loading={isAnalyzing}
          iconName="Brain"
          iconPosition="left"
          className="flex-1"
        >
          AI Analysis
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails(stock)}
          iconName="BarChart3"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
      </div>
      {/* Live Update Indicator */}
      {stock?.isLive && (
        <div className="flex items-center justify-center mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-success">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockCard;