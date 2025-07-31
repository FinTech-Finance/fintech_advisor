import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onStockSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Mock stock suggestions for autocomplete
  const mockStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE', price: 2456.75, change: 1.2 },
    { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', exchange: 'NSE', price: 3678.90, change: -0.8 },
    { symbol: 'INFY', name: 'Infosys Ltd', exchange: 'NSE', price: 1543.25, change: 2.1 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE', price: 1687.50, change: 0.5 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', exchange: 'NSE', price: 1234.80, change: -1.3 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', exchange: 'NSE', price: 876.45, change: 1.8 },
    { symbol: 'ITC', name: 'ITC Ltd', exchange: 'NSE', price: 456.30, change: 0.9 },
    { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE', price: 543.75, change: -0.4 },
    { symbol: 'LT', name: 'Larsen & Toubro Ltd', exchange: 'NSE', price: 2987.60, change: 2.3 },
    { symbol: 'WIPRO', name: 'Wipro Ltd', exchange: 'NSE', price: 432.15, change: 1.5 }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);

    if (value?.trim()?.length > 0) {
      const filtered = mockStocks?.filter(stock =>
        stock?.symbol?.toLowerCase()?.includes(value?.toLowerCase()) ||
        stock?.name?.toLowerCase()?.includes(value?.toLowerCase())
      )?.slice(0, 8);
      setSuggestions(filtered);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions?.length === 0) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions?.length - 1
        );
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleStockSelect(suggestions?.[selectedIndex]);
        } else if (query?.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleStockSelect = (stock) => {
    setQuery(stock?.symbol);
    setIsOpen(false);
    setSelectedIndex(-1);
    onStockSelect(stock);
  };

  const handleSearch = () => {
    if (query?.trim()) {
      onSearch(query?.trim());
      setIsOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    handleSearch();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search stocks by symbol or company name (e.g., RELIANCE, TCS)"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-20 h-12 text-base"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={20} className="text-muted-foreground" />
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Button
              type="submit"
              size="sm"
              className="h-8"
              disabled={!query?.trim()}
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      {/* Autocomplete Suggestions */}
      {isOpen && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-modal z-50 max-h-80 overflow-y-auto scrollbar-thin">
          {suggestions?.map((stock, index) => (
            <button
              key={stock?.symbol}
              onClick={() => handleStockSelect(stock)}
              className={`w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0 ${
                index === selectedIndex ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{stock?.symbol}</span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      {stock?.exchange}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {stock?.name}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="font-data text-foreground">
                    ₹{stock?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm font-medium ${
                    stock?.change >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {stock?.change >= 0 ? '+' : ''}{stock?.change}%
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {/* No Results */}
      {isOpen && query?.trim() && suggestions?.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-modal z-50 p-4 text-center">
          <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No stocks found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try searching with stock symbol or company name
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;