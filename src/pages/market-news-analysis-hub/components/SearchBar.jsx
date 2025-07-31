import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const mockSuggestions = [
    { type: 'company', value: 'Reliance Industries', category: 'Stock' },
    { type: 'company', value: 'Tata Consultancy Services', category: 'Stock' },
    { type: 'company', value: 'HDFC Bank', category: 'Stock' },
    { type: 'company', value: 'Infosys', category: 'Stock' },
    { type: 'sector', value: 'Banking Sector', category: 'Sector' },
    { type: 'sector', value: 'IT Sector', category: 'Sector' },
    { type: 'sector', value: 'Pharmaceutical', category: 'Sector' },
    { type: 'keyword', value: 'RBI Policy', category: 'Keyword' },
    { type: 'keyword', value: 'Budget 2024', category: 'Keyword' },
    { type: 'keyword', value: 'IPO Launch', category: 'Keyword' },
    { type: 'keyword', value: 'Earnings Report', category: 'Keyword' },
    { type: 'keyword', value: 'Market Volatility', category: 'Keyword' }
  ];

  useEffect(() => {
    if (searchQuery?.length > 1) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.value?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
      setIsExpanded(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.value);
    onSearch(suggestion?.value);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
    if (searchQuery?.length > 1) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setShowSuggestions(false);
      if (!searchQuery) {
        setIsExpanded(false);
      }
    }, 200);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Stock': return 'TrendingUp';
      case 'Sector': return 'PieChart';
      case 'Keyword': return 'Hash';
      default: return 'Search';
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'w-full' : 'w-full md:w-80'
        }`}>
          <div className="relative flex-1">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search news, companies, sectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="pl-10 pr-12 h-11"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
          >
            <Icon name="Search" size={18} />
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal z-50 max-h-80 overflow-y-auto scrollbar-thin">
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
                Search Suggestions
              </div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-muted rounded-lg transition-smooth text-left"
                >
                  <Icon 
                    name={getCategoryIcon(suggestion?.category)} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                  <div className="flex-1">
                    <span className="text-sm text-foreground">{suggestion?.value}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {suggestion?.category}
                    </span>
                  </div>
                  <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
      {/* Recent Searches - Mobile */}
      {isExpanded && !showSuggestions && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal z-40">
          <div className="p-3">
            <div className="text-xs text-muted-foreground mb-2 font-medium">Recent Searches</div>
            <div className="space-y-1">
              {['RBI Policy', 'Banking Stocks', 'IT Sector News']?.map((recent, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick({ value: recent })}
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-muted rounded text-left transition-smooth"
                >
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{recent}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;