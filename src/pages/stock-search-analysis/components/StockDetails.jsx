import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockDetails = ({ stock, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'financials', label: 'Financials', icon: 'Calculator' },
    { id: 'news', label: 'News', icon: 'Newspaper' },
    { id: 'analysis', label: 'AI Analysis', icon: 'Brain' }
  ];

  const mockFinancials = {
    revenue: 2456789,
    profit: 456789,
    eps: 45.67,
    roe: 18.5,
    debt: 123456,
    cash: 234567,
    bookValue: 567.89,
    dividendYield: 2.3
  };

  const mockNews = [
    {
      id: 1,
      title: `${stock?.name} reports strong Q3 results, beats estimates`,
      summary: `The company posted revenue growth of 15% YoY with improved margins across all business segments.`,
      source: 'Economic Times',
      time: '2 hours ago',
      sentiment: 'positive'
    },
    {
      id: 2,
      title: `Analysts upgrade ${stock?.symbol} target price to ₹${(stock?.price * 1.2)?.toFixed(0)}`,
      summary: `Leading brokerage firms raise target price citing strong fundamentals and market position.`,
      source: 'Business Standard',
      time: '5 hours ago',
      sentiment: 'positive'
    },
    {
      id: 3,
      title: `${stock?.sector} sector outlook remains positive for 2024`,
      summary: `Industry experts predict continued growth in the sector driven by digital transformation.`,
      source: 'Mint',
      time: '1 day ago',
      sentiment: 'neutral'
    }
  ];

  const mockAnalysis = {
    recommendation: 'BUY',
    targetPrice: stock?.price * 1.15,
    riskLevel: 'Medium',
    timeHorizon: '6-12 months',
    strengths: [
      'Strong financial performance with consistent revenue growth',
      'Market leader in the sector with competitive advantages',
      'Healthy balance sheet with low debt-to-equity ratio',
      'Experienced management team with proven track record'
    ],
    risks: [
      'Market volatility may impact short-term performance',
      'Regulatory changes in the sector could affect operations',
      'Competition from new market entrants',
      'Economic slowdown may reduce demand'
    ],
    keyMetrics: {
      fairValue: stock?.price * 1.1,
      upside: 15.2,
      confidence: 78
    }
  };

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000)?.toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000)?.toFixed(1)} L`;
    }
    return `₹${value?.toLocaleString('en-IN')}`;
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'BUY': return 'text-success bg-success/10';
      case 'SELL': return 'text-error bg-error/10';
      case 'HOLD': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{stock?.symbol}</h2>
              <p className="text-sm text-muted-foreground">{stock?.name}</p>
            </div>
            <div className="text-right">
              <div className="font-data text-xl font-semibold text-foreground">
                ₹{stock?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-sm font-medium ${
                stock?.change >= 0 ? 'text-success' : 'text-error'
              }`}>
                {stock?.change >= 0 ? '+' : ''}{stock?.change}%
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto scrollbar-thin">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh] scrollbar-thin">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">Market Cap</span>
                    <div className="font-medium text-foreground">
                      {formatCurrency(stock?.marketCap * 10000000)}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">P/E Ratio</span>
                    <div className="font-medium text-foreground">{stock?.pe || 'N/A'}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">52W High</span>
                    <div className="font-medium text-foreground">
                      ₹{stock?.high52w?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <span className="text-sm text-muted-foreground">52W Low</span>
                    <div className="font-medium text-foreground">
                      ₹{(stock?.high52w * 0.7)?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Company Information</h3>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sector</span>
                    <span className="text-foreground">{stock?.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exchange</span>
                    <span className="text-foreground">{stock?.exchange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="text-foreground">{stock?.volume?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Volume</span>
                    <span className="text-foreground">{(stock?.volume * 1.2)?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6">
              <h3 className="font-medium text-foreground">Financial Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3">Revenue & Profitability</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="text-foreground">{formatCurrency(mockFinancials?.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Profit</span>
                      <span className="text-foreground">{formatCurrency(mockFinancials?.profit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">EPS</span>
                      <span className="text-foreground">₹{mockFinancials?.eps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROE</span>
                      <span className="text-foreground">{mockFinancials?.roe}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3">Balance Sheet</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Debt</span>
                      <span className="text-foreground">{formatCurrency(mockFinancials?.debt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cash & Equivalents</span>
                      <span className="text-foreground">{formatCurrency(mockFinancials?.cash)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Book Value</span>
                      <span className="text-foreground">₹{mockFinancials?.bookValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dividend Yield</span>
                      <span className="text-foreground">{mockFinancials?.dividendYield}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Latest News</h3>
              {mockNews?.map((news) => (
                <div key={news?.id} className="bg-muted rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground line-clamp-2">{news?.title}</h4>
                    <div className={`w-2 h-2 rounded-full mt-2 ml-2 ${
                      news?.sentiment === 'positive' ? 'bg-success' :
                      news?.sentiment === 'negative' ? 'bg-error' : 'bg-warning'
                    }`} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{news?.summary}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{news?.source}</span>
                    <span className="text-muted-foreground">{news?.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">AI Analysis</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(mockAnalysis?.recommendation)}`}>
                  {mockAnalysis?.recommendation}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    ₹{mockAnalysis?.targetPrice?.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Target Price</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-success">
                    +{mockAnalysis?.keyMetrics?.upside}%
                  </div>
                  <div className="text-sm text-muted-foreground">Upside Potential</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {mockAnalysis?.keyMetrics?.confidence}%
                  </div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <Icon name="TrendingUp" size={16} className="mr-2 text-success" />
                  Strengths
                </h4>
                <div className="space-y-2">
                  {mockAnalysis?.strengths?.map((strength, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5" />
                      <span className="text-sm text-foreground">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                  Risks
                </h4>
                <div className="space-y-2">
                  {mockAnalysis?.risks?.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
                      <span className="text-sm text-foreground">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetails;