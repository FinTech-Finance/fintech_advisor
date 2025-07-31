import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NewsCard from './components/NewsCard';
import CategoryTabs from './components/CategoryTabs';
import AIInsightsPanel from './components/AIInsightsPanel';
import NewsFilters from './components/NewsFilters';
import SearchBar from './components/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MarketNewsAnalysisHub = () => {
  const [activeCategory, setActiveCategory] = useState('breaking');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sources: [],
    sectors: [],
    timeRange: 'all',
    impact: []
  });

  // Mock data for categories
  const categories = [
    { id: 'breaking', name: 'Breaking News', count: 12 },
    { id: 'market', name: 'Market Updates', count: 28 },
    { id: 'sector', name: 'Sector Analysis', count: 15 },
    { id: 'ai', name: 'AI Insights', count: 8 },
    { id: 'company', name: 'Company News', count: 34 },
    { id: 'global', name: 'Global Markets', count: 19 }
  ];

  // Mock news articles data
  const mockArticles = [
    {
      id: 1,
      headline: "RBI Keeps Repo Rate Unchanged at 6.5%, Maintains Accommodative Stance",
      summary: `The Reserve Bank of India has decided to keep the repo rate unchanged at 6.5% in its latest monetary policy review. The central bank cited inflation concerns and global economic uncertainties as key factors in this decision.\n\nGovernor Shaktikanta Das emphasized the need for continued vigilance on price stability while supporting economic growth.`,
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      source: "Economic Times",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      readTime: 4,
      impact: "High",
      tags: ["RBI Policy", "Interest Rates", "Monetary Policy"],
      category: "breaking"
    },
    {
      id: 2,
      headline: "Nifty 50 Surges 2.3% as Banking Stocks Lead Rally Amid Rate Decision",
      summary: `Indian equity markets witnessed a strong rally today with the Nifty 50 index gaining 2.3% to close at 19,674 points. Banking stocks were the primary drivers of this upward momentum.\n\nHDFC Bank, ICICI Bank, and SBI were among the top gainers, rising between 3-5% during the trading session.`,
      imageUrl: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?w=400&h=250&fit=crop",
      source: "Moneycontrol",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      readTime: 3,
      impact: "High",
      tags: ["Nifty 50", "Banking Stocks", "Market Rally"],
      category: "market"
    },
    {
      id: 3,
      headline: "IT Sector Shows Resilience with Strong Q3 Earnings from TCS and Infosys",
      summary: `The Indian IT sector continues to demonstrate strong fundamentals with both TCS and Infosys reporting better-than-expected Q3 earnings.\n\nTCS reported a 12% YoY growth in revenue while Infosys maintained its revenue guidance for the full year, boosting investor confidence in the sector.`,
      imageUrl: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=250&fit=crop",
      source: "Business Standard",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      readTime: 5,
      impact: "Medium",
      tags: ["IT Sector", "TCS", "Infosys", "Q3 Earnings"],
      category: "sector"
    },
    {
      id: 4,
      headline: "Reliance Industries Announces ₹75,000 Crore Investment in Green Energy",
      summary: `Reliance Industries Limited has announced a massive ₹75,000 crore investment plan for green energy projects over the next five years.\n\nThe investment will focus on solar manufacturing, battery storage, and hydrogen production facilities, positioning RIL as a major player in India's renewable energy transition.`,
      imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
      source: "Mint",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      readTime: 6,
      impact: "High",
      tags: ["Reliance", "Green Energy", "Investment", "Renewable"],
      category: "company"
    },
    {
      id: 5,
      headline: "Pharmaceutical Stocks Rally on Strong Export Demand and FDA Approvals",
      summary: `Indian pharmaceutical companies are witnessing increased investor interest following strong export performance and multiple FDA approvals.\n\nDr. Reddy's, Cipla, and Sun Pharma have all reported robust growth in their international operations, particularly in the US and European markets.`,
      imageUrl: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?w=400&h=250&fit=crop",
      source: "Financial Express",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      readTime: 4,
      impact: "Medium",
      tags: ["Pharma Stocks", "FDA Approval", "Export Growth"],
      category: "sector"
    },
    {
      id: 6,
      headline: "Global Markets Mixed as US Fed Signals Cautious Approach to Rate Cuts",
      summary: `International markets showed mixed performance overnight as the US Federal Reserve indicated a more cautious approach to interest rate cuts in 2024.\n\nAsian markets are expected to open with volatility as investors digest the Fed's latest commentary on monetary policy direction.`,
      imageUrl: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=250&fit=crop",
      source: "Bloomberg Quint",
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      readTime: 3,
      impact: "Medium",
      tags: ["Global Markets", "US Fed", "Rate Cuts"],
      category: "global"
    }
  ];

  // Mock AI insights data
  const aiInsights = {
    overallSentiment: "Bullish",
    confidence: 78,
    keyTrends: [
      {
        title: "Banking Sector Momentum",
        description: "Strong institutional buying in banking stocks following RBI policy decision",
        impact: "High"
      },
      {
        title: "IT Sector Resilience",
        description: "Consistent earnings growth despite global headwinds",
        impact: "Medium"
      },
      {
        title: "Green Energy Focus",
        description: "Increased corporate investments in renewable energy projects",
        impact: "High"
      }
    ],
    indexImpact: [
      { name: "Nifty 50", impact: "Positive", reason: "Banking rally support" },
      { name: "Bank Nifty", impact: "Positive", reason: "Rate decision clarity" },
      { name: "IT Index", impact: "Positive", reason: "Strong earnings" },
      { name: "Pharma Index", impact: "Positive", reason: "Export growth" }
    ],
    recommendations: [
      "Consider banking stocks for short-term gains following policy clarity",
      "IT sector remains attractive for long-term investors",
      "Green energy theme gaining momentum - watch for opportunities",
      "Monitor global cues for market direction in coming sessions"
    ]
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real app, this would trigger API call with search parameters
    console.log('Searching for:', query);
  };

  const handleBookmark = (articleId) => {
    const newBookmarks = new Set(bookmarkedArticles);
    if (newBookmarks?.has(articleId)) {
      newBookmarks?.delete(articleId);
    } else {
      newBookmarks?.add(articleId);
    }
    setBookmarkedArticles(newBookmarks);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleClearFilters = () => {
    setFilters({
      sources: [],
      sectors: [],
      timeRange: 'all',
      impact: []
    });
  };

  const getFilteredArticles = () => {
    let filtered = mockArticles;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(article => article?.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(article =>
        article?.headline?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        article?.summary?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        article?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Filter by sources
    if (filters?.sources?.length > 0) {
      filtered = filtered?.filter(article => filters?.sources?.includes(article?.source));
    }

    // Filter by impact
    if (filters?.impact?.length > 0) {
      filtered = filtered?.filter(article => filters?.impact?.includes(article?.impact));
    }

    return filtered;
  };

  const filteredArticles = getFilteredArticles();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Market News & Analysis Hub</h1>
                <p className="text-muted-foreground">
                  Stay informed with AI-powered insights and real-time Indian market news
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  iconName={isRefreshing ? "Loader2" : "RefreshCw"}
                  iconPosition="left"
                  className={isRefreshing ? "animate-spin" : ""}
                >
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  iconName="Filter"
                  iconPosition="left"
                  className="md:hidden"
                >
                  Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Category Navigation */}
          <div className="mb-8">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <NewsFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
                <div className="absolute right-0 top-0 h-full w-80 bg-background overflow-y-auto" onClick={e => e?.stopPropagation()}>
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Filters</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(false)}
                        iconName="X"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <NewsFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* News Articles */}
            <div className="lg:col-span-2">
              {filteredArticles?.length > 0 ? (
                <div className="space-y-6">
                  {filteredArticles?.map((article) => (
                    <NewsCard
                      key={article?.id}
                      article={article}
                      onBookmark={handleBookmark}
                      isBookmarked={bookmarkedArticles?.has(article?.id)}
                    />
                  ))}
                  
                  {/* Load More Button */}
                  <div className="text-center pt-6">
                    <Button variant="outline" size="lg">
                      Load More Articles
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters to find more articles.
                  </p>
                </div>
              )}
            </div>

            {/* AI Insights Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <AIInsightsPanel insights={aiInsights} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketNewsAnalysisHub;