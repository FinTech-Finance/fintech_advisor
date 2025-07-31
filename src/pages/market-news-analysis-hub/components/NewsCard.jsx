import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NewsCard = ({ article, onBookmark, isBookmarked }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const articleTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - articleTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-error bg-error/10 border-error/20';
      case 'Medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'Low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth">
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article?.imageUrl}
          alt={article?.headline}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getImpactColor(article?.impact)}`}>
            {article?.impact} Impact
          </span>
        </div>
        <button
          onClick={() => onBookmark(article?.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-smooth ${
            isBookmarked 
              ? 'bg-warning text-warning-foreground' 
              : 'bg-black/20 text-white hover:bg-black/40'
          }`}
        >
          <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
        </button>
      </div>
      {/* Article Content */}
      <div className="p-4">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {article?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
          {article?.headline}
        </h3>

        {/* Summary */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {article?.summary}
        </p>

        {/* Article Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Building2" size={14} />
              <span>{article?.source}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{formatTimeAgo(article?.timestamp)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={14} />
              <span>{article?.readTime} min read</span>
            </div>
          </div>
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth">
            <span>Read more</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;