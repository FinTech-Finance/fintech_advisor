import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'Breaking News': 'Zap',
    'Market Updates': 'TrendingUp',
    'Sector Analysis': 'PieChart',
    'AI Insights': 'Brain',
    'Company News': 'Building2',
    'Global Markets': 'Globe'
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Desktop Tabs */}
      <div className="hidden md:flex items-center space-x-1 px-6 py-4">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={categoryIcons?.[category?.name] || 'FileText'} size={18} />
            <span className="font-medium">{category?.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeCategory === category?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Mobile Tabs - Scrollable */}
      <div className="md:hidden overflow-x-auto scrollbar-thin">
        <div className="flex items-center space-x-2 px-4 py-3 min-w-max">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-smooth ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground bg-muted/50'
              }`}
            >
              <Icon name={categoryIcons?.[category?.name] || 'FileText'} size={16} />
              <span className="text-sm font-medium">{category?.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeCategory === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-background text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;