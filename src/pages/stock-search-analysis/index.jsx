import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import StockCard from './components/StockCard';
import StockChart from './components/StockChart';
import StockDetails from './components/StockDetails';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StockSearchAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState('1D');
  const [filters, setFilters] = useState({
    sector: 'all',
    marketCap: 'all',
    performance: 'all',
    timeframe: '1D'
  });
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock stock data
  const mockStocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      sector: 'Energy & Oil',
      exchange: 'NSE',
      price: 2456.75,
      change: 1.2,
      changeValue: 29.15,
      marketCap: 16500,
      volume: 2456789,
      pe: 24.5,
      high52w: 2856.50,
      isLive: true,
      inWatchlist: false
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Ltd',
      sector: 'Information Technology',
      exchange: 'NSE',
      price: 3678.90,
      change: -0.8,
      changeValue: -29.65,
      marketCap: 13400,
      volume: 1234567,
      pe: 28.3,
      high52w: 4150.00,
      isLive: true,
      inWatchlist: true
    },
    {
      symbol: 'INFY',
      name: 'Infosys Ltd',
      sector: 'Information Technology',
      exchange: 'NSE',
      price: 1543.25,
      change: 2.1,
      changeValue: 31.75,
      marketCap: 6500,
      volume: 3456789,
      pe: 22.8,
      high52w: 1735.00,
      isLive: true,
      inWatchlist: false,
      isNew: true
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd',
      sector: 'Banking & Financial Services',
      exchange: 'NSE',
      price: 1687.50,
      change: 0.5,
      changeValue: 8.40,
      marketCap: 12800,
      volume: 1876543,
      pe: 19.2,
      high52w: 1785.00,
      isLive: true,
      inWatchlist: false
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Ltd',
      sector: 'Banking & Financial Services',
      exchange: 'NSE',
      price: 1234.80,
      change: -1.3,
      changeValue: -16.25,
      marketCap: 8600,
      volume: 2987654,
      pe: 16.8,
      high52w: 1456.00,
      isLive: true,
      inWatchlist: true
    },
    {
      symbol: 'BHARTIARTL',
      name: 'Bharti Airtel Ltd',
      sector: 'Telecommunications',
      exchange: 'NSE',
      price: 876.45,
      change: 1.8,
      changeValue: 15.50,
      marketCap: 4800,
      volume: 4567890,
      pe: 32.1,
      high52w: 965.00,
      isLive: true,
      inWatchlist: false
    },
    {
      symbol: 'ITC',
      name: 'ITC Ltd',
      sector: 'FMCG',
      exchange: 'NSE',
      price: 456.30,
      change: 0.9,
      changeValue: 4.05,
      marketCap: 5700,
      volume: 6789012,
      pe: 26.4,
      high52w: 485.00,
      isLive: true,
      inWatchlist: false
    },
    {
      symbol: 'SBIN',
      name: 'State Bank of India',
      sector: 'Banking & Financial Services',
      exchange: 'NSE',
      price: 543.75,
      change: -0.4,
      changeValue: -2.20,
      marketCap: 4850,
      volume: 8901234,
      pe: 12.5,
      high52w: 625.00,
      isLive: true,
      inWatchlist: false
    },
    {
      symbol: 'LT',
      name: 'Larsen & Toubro Ltd',
      sector: 'Construction',
      exchange: 'NSE',
      price: 2987.60,
      change: 2.3,
      changeValue: 67.15,
      marketCap: 4200,
      volume: 1567890,
      pe: 31.2,
      high52w: 3245.00,
      isLive: true,
      inWatchlist: true
    },
    {
      symbol: 'WIPRO',
      name: 'Wipro Ltd',
      sector: 'Information Technology',
      exchange: 'NSE',
      price: 432.15,
      change: 1.5,
      changeValue: 6.40,
      marketCap: 2350,
      volume: 5432109,
      pe: 24.7,
      high52w: 485.00,
      isLive: true,
      inWatchlist: false
    }
  ];

  useEffect(() => {
    setStocks(mockStocks);
    setFilteredStocks(mockStocks);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, stocks, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = [...stocks];

    // Search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(stock =>
        stock?.symbol?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        stock?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Sector filter
    if (filters?.sector !== 'all') {
      filtered = filtered?.filter(stock => 
        stock?.sector?.toLowerCase()?.includes(filters?.sector?.toLowerCase())
      );
    }

    // Market cap filter
    if (filters?.marketCap !== 'all') {
      filtered = filtered?.filter(stock => {
        const marketCap = stock?.marketCap;
        switch (filters?.marketCap) {
          case 'large': return marketCap >= 20000;
          case 'mid': return marketCap >= 5000 && marketCap < 20000;
          case 'small': return marketCap >= 500 && marketCap < 5000;
          case 'micro': return marketCap < 500;
          default: return true;
        }
      });
    }

    // Performance filter
    if (filters?.performance !== 'all') {
      switch (filters?.performance) {
        case 'gainers':
          filtered = filtered?.filter(stock => stock?.change > 0);
          break;
        case 'losers':
          filtered = filtered?.filter(stock => stock?.change < 0);
          break;
        case 'volume':
          filtered = filtered?.sort((a, b) => b?.volume - a?.volume);
          break;
        case 'volatile':
          filtered = filtered?.sort((a, b) => Math.abs(b?.change) - Math.abs(a?.change));
          break;
      }
    }

    // Sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredStocks(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setSearchQuery(stock?.symbol);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFiltersReset = () => {
    setFilters({
      sector: 'all',
      marketCap: 'all',
      performance: 'all',
      timeframe: '1D'
    });
    setSearchQuery('');
  };

  const handleAddToWatchlist = (symbol, add) => {
    setStocks(prev => prev?.map(stock => 
      stock?.symbol === symbol 
        ? { ...stock, inWatchlist: add }
        : stock
    ));
  };

  const handleGetAnalysis = async (stock) => {
    // Simulate AI analysis
    console.log('Getting AI analysis for:', stock?.symbol);
    setSelectedStock(stock);
    setShowDetails(true);
  };

  const handleViewDetails = (stock) => {
    setSelectedStock(stock);
    setShowDetails(true);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Stock Search & Analysis
            </h1>
            <p className="text-muted-foreground">
              Discover and analyze Indian stocks with AI-powered insights and real-time data
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar 
              onSearch={handleSearch}
              onStockSelect={handleStockSelect}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleFiltersReset}
              />
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Selected Stock Chart */}
              {selectedStock && (
                <StockChart
                  stock={selectedStock}
                  timeframe={chartTimeframe}
                  onTimeframeChange={setChartTimeframe}
                />
              )}

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {searchQuery ? `Results for "${searchQuery}"` : 'All Stocks'}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredStocks?.length} stocks found
                  </span>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSortChange('marketCap')}
                    iconName={getSortIcon('marketCap')}
                    iconPosition="right"
                  >
                    Market Cap
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSortChange('change')}
                    iconName={getSortIcon('change')}
                    iconPosition="right"
                  >
                    Change
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSortChange('volume')}
                    iconName={getSortIcon('volume')}
                    iconPosition="right"
                  >
                    Volume
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Search" size={24} className="animate-pulse" />
                    <span>Searching stocks...</span>
                  </div>
                </div>
              )}

              {/* Stock Cards Grid */}
              {!isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredStocks?.map((stock) => (
                    <StockCard
                      key={stock?.symbol}
                      stock={stock}
                      onAddToWatchlist={handleAddToWatchlist}
                      onGetAnalysis={handleGetAnalysis}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && filteredStocks?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No stocks found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button variant="outline" onClick={handleFiltersReset}>
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* Market Status */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Market Open</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date()?.toLocaleTimeString('en-IN')}
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  NSE: 9:15 AM - 3:30 PM IST | BSE: 9:15 AM - 3:30 PM IST
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Stock Details Modal */}
      {showDetails && selectedStock && (
        <StockDetails
          stock={selectedStock}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default StockSearchAnalysis;