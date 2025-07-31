import React from 'react';
import Icon from '../../../components/AppIcon';

const AIInsightsPanel = ({ insights }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'bullish': return 'text-success bg-success/10 border-success/20';
      case 'bearish': return 'text-error bg-error/10 border-error/20';
      case 'neutral': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'High': return 'TrendingUp';
      case 'Medium': return 'Minus';
      case 'Low': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Brain" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Market Insights</h2>
          <p className="text-sm text-muted-foreground">Real-time analysis powered by AI</p>
        </div>
      </div>
      {/* Market Sentiment */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Overall Market Sentiment</h3>
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-2 rounded-lg border ${getSentimentColor(insights?.overallSentiment)}`}>
            <span className="font-medium">{insights?.overallSentiment}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Confidence: {insights?.confidence}%
          </div>
        </div>
      </div>
      {/* Key Trends */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Key Market Trends</h3>
        <div className="space-y-3">
          {insights?.keyTrends?.map((trend, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon 
                name={getImpactIcon(trend?.impact)} 
                size={16} 
                className={`mt-0.5 ${
                  trend?.impact === 'High' ? 'text-success' :
                  trend?.impact === 'Medium' ? 'text-warning' : 'text-error'
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{trend?.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{trend?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Index Impact */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Index Impact Analysis</h3>
        <div className="grid grid-cols-2 gap-3">
          {insights?.indexImpact?.map((index, idx) => (
            <div key={idx} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{index?.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  index?.impact === 'Positive' ? 'bg-success/20 text-success' :
                  index?.impact === 'Negative'? 'bg-error/20 text-error' : 'bg-muted text-muted-foreground'
                }`}>
                  {index?.impact}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{index?.reason}</p>
            </div>
          ))}
        </div>
      </div>
      {/* AI Recommendations */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">AI Recommendations</h3>
        <div className="space-y-2">
          {insights?.recommendations?.map((rec, index) => (
            <div key={index} className="flex items-start space-x-2 p-2 hover:bg-muted/30 rounded-lg transition-smooth">
              <Icon name="Lightbulb" size={14} className="text-warning mt-0.5" />
              <p className="text-sm text-foreground">{rec}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Last Updated */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth">
            <Icon name="RefreshCw" size={12} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;