import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sources = [
    'Economic Times', 'Mint', 'Business Standard', 'Moneycontrol',
    'CNBC TV18', 'Bloomberg Quint', 'Financial Express', 'The Hindu BusinessLine'
  ];

  const timeRanges = [
    { label: 'Last Hour', value: '1h' },
    { label: 'Last 4 Hours', value: '4h' },
    { label: 'Today', value: '1d' },
    { label: 'This Week', value: '7d' },
    { label: 'This Month', value: '30d' }
  ];

  const sectors = [
    'Banking', 'IT', 'Pharma', 'Auto', 'FMCG', 'Energy', 'Metals',
    'Realty', 'Telecom', 'Infrastructure', 'Consumer Goods', 'Healthcare'
  ];

  const handleSourceToggle = (source) => {
    const newSources = filters?.sources?.includes(source)
      ? filters?.sources?.filter(s => s !== source)
      : [...filters?.sources, source];
    onFiltersChange({ ...filters, sources: newSources });
  };

  const handleSectorToggle = (sector) => {
    const newSectors = filters?.sectors?.includes(sector)
      ? filters?.sectors?.filter(s => s !== sector)
      : [...filters?.sectors, sector];
    onFiltersChange({ ...filters, sectors: newSectors });
  };

  const handleTimeRangeChange = (timeRange) => {
    onFiltersChange({ ...filters, timeRange });
  };

  const getActiveFiltersCount = () => {
    return filters?.sources?.length + filters?.sectors?.length + (filters?.timeRange !== 'all' ? 1 : 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 space-y-6">
          {/* Time Range */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Time Range</h4>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {timeRanges?.map((range) => (
                <button
                  key={range?.value}
                  onClick={() => handleTimeRangeChange(range?.value)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-smooth ${
                    filters?.timeRange === range?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {range?.label}
                </button>
              ))}
            </div>
          </div>

          {/* News Sources */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">News Sources</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
              {sources?.map((source) => (
                <label
                  key={source}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-smooth"
                >
                  <input
                    type="checkbox"
                    checked={filters?.sources?.includes(source)}
                    onChange={() => handleSourceToggle(source)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-foreground">{source}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Market Sectors */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Market Sectors</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
              {sectors?.map((sector) => (
                <label
                  key={sector}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-smooth"
                >
                  <input
                    type="checkbox"
                    checked={filters?.sectors?.includes(sector)}
                    onChange={() => handleSectorToggle(sector)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-foreground">{sector}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Impact Level */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Impact Level</h4>
            <div className="space-y-2">
              {['High', 'Medium', 'Low']?.map((impact) => (
                <label
                  key={impact}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-smooth"
                >
                  <input
                    type="checkbox"
                    checked={filters?.impact?.includes(impact)}
                    onChange={() => {
                      const newImpact = filters?.impact?.includes(impact)
                        ? filters?.impact?.filter(i => i !== impact)
                        : [...filters?.impact, impact];
                      onFiltersChange({ ...filters, impact: newImpact });
                    }}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-foreground">{impact} Impact</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFilters;