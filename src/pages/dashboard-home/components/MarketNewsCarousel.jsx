import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketNewsCarousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const newsData = [
    {
      id: 1,
      headline: "RBI Keeps Repo Rate Unchanged at 6.5%, Maintains Accommodative Stance",
      summary: "The Reserve Bank of India maintains its key lending rate for the fourth consecutive meeting, citing inflation concerns and global economic uncertainty.",
      category: "Policy",
      timestamp: "2 hours ago",
      source: "Economic Times",
      impact: "neutral"
    },
    {
      id: 2,
      headline: "Nifty 50 Hits New All-Time High as IT Stocks Rally on Strong Q3 Results",
      summary: "Indian benchmark indices surge to record levels driven by robust earnings from major IT companies including TCS, Infosys, and Wipro.",
      category: "Markets",
      timestamp: "4 hours ago",
      source: "Business Standard",
      impact: "positive"
    },
    {
      id: 3,
      headline: "Foreign Institutional Investors Turn Net Buyers After 3 Months",
      summary: "FIIs invested ₹8,500 crores in Indian equities this week, marking a significant shift from their selling spree in previous quarters.",
      category: "Investment",
      timestamp: "6 hours ago",
      source: "Mint",
      impact: "positive"
    },
    {
      id: 4,
      headline: "Adani Group Stocks Recover 15% as Debt Concerns Ease",
      summary: "Adani portfolio companies witness strong recovery as the group announces debt reduction plans and secures new credit facilities.",
      category: "Corporate",
      timestamp: "8 hours ago",
      source: "CNBC TV18",
      impact: "positive"
    },
    {
      id: 5,
      headline: "Crude Oil Prices Impact Indian Energy Sector Outlook",
      summary: "Rising crude oil prices pose challenges for Indian refiners while benefiting upstream oil exploration companies in the domestic market.",
      category: "Commodities",
      timestamp: "10 hours ago",
      source: "Reuters",
      impact: "negative"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newsData?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + newsData?.length) % newsData?.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleViewAllNews = () => {
    navigate('/market-news-analysis-hub');
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success bg-success/10 border-success/20';
      case 'negative': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Newspaper" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Market News</h2>
            <p className="text-sm text-muted-foreground">Latest financial updates</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewAllNews}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Carousel Container */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {newsData?.map((news, idx) => (
              <div key={news?.id} className="w-full flex-shrink-0">
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-smooth cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getImpactColor(news?.impact)}`}>
                        {news?.category}
                      </span>
                      <Icon 
                        name={getImpactIcon(news?.impact)} 
                        size={12} 
                        color={
                          news?.impact === 'positive' ? 'var(--color-success)' :
                          news?.impact === 'negative' ? 'var(--color-error)' :
                          'var(--color-muted-foreground)'
                        }
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{news?.timestamp}</span>
                  </div>
                  
                  <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                    {news?.headline}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {news?.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{news?.source}</span>
                    <button className="text-xs text-primary hover:text-primary/80 transition-smooth">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth shadow-card"
        >
          <Icon name="ChevronLeft" size={16} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth shadow-card"
        >
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
      {/* Dots Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        {newsData?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              idx === currentIndex ? 'bg-primary' : 'bg-border hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
      {/* Breaking News Ticker */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="font-medium text-error">BREAKING:</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap text-muted-foreground">
              Sensex crosses 66,000 mark for the first time • IT sector leads gains with 3.2% surge • FII inflows continue for third consecutive day
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNewsCarousel;