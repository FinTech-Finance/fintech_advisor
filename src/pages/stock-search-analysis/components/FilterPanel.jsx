import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'it', label: 'Information Technology' },
    { value: 'banking', label: 'Banking & Financial Services' },
    { value: 'pharma', label: 'Pharmaceuticals' },
    { value: 'auto', label: 'Automobile' },
    { value: 'fmcg', label: 'FMCG' },
    { value: 'energy', label: 'Energy & Oil' },
    { value: 'metals', label: 'Metals & Mining' },
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'realty', label: 'Real Estate' },
    { value: 'cement', label: 'Cement' }
  ];

  const marketCapOptions = [
    { value: 'all', label: 'All Market Cap' },
    { value: 'large', label: 'Large Cap (₹20,000+ Cr)' },
    { value: 'mid', label: 'Mid Cap (₹5,000-20,000 Cr)' },
    { value: 'small', label: 'Small Cap (₹500-5,000 Cr)' },
    { value: 'micro', label: 'Micro Cap (<₹500 Cr)' }
  ];

  const performanceOptions = [
    { value: 'all', label: 'All Performance' },
    { value: 'gainers', label: 'Top Gainers' },
    { value: 'losers', label: 'Top Losers' },
    { value: 'volume', label: 'High Volume' },
    { value: 'volatile', label: 'Most Volatile' }
  ];

  const timeframeOptions = [
    { value: '1D', label: 'Today' },
    { value: '1W', label: 'This Week' },
    { value: '1M', label: 'This Month' },
    { value: '3M', label: '3 Months' },
    { value: '1Y', label: 'This Year' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.sector !== 'all') count++;
    if (filters?.marketCap !== 'all') count++;
    if (filters?.performance !== 'all') count++;
    if (filters?.timeframe !== '1D') count++;
    return count;
  };

  const activeCount = getActiveFiltersCount();

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-4"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={18} 
          />
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-4">
          {/* Header - Desktop Only */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={18} />
              <h3 className="font-medium text-foreground">Filters</h3>
              {activeCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {activeCount}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={activeCount === 0}
            >
              Reset
            </Button>
          </div>

          {/* Filter Options */}
          <div className="space-y-4">
            <Select
              label="Sector"
              options={sectorOptions}
              value={filters?.sector}
              onChange={(value) => handleFilterChange('sector', value)}
            />

            <Select
              label="Market Cap"
              options={marketCapOptions}
              value={filters?.marketCap}
              onChange={(value) => handleFilterChange('marketCap', value)}
            />

            <Select
              label="Performance"
              options={performanceOptions}
              value={filters?.performance}
              onChange={(value) => handleFilterChange('performance', value)}
            />

            <Select
              label="Timeframe"
              options={timeframeOptions}
              value={filters?.timeframe}
              onChange={(value) => handleFilterChange('timeframe', value)}
            />
          </div>

          {/* Mobile Reset Button */}
          <div className="lg:hidden pt-2">
            <Button
              variant="outline"
              onClick={onReset}
              disabled={activeCount === 0}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;