import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-home',
      icon: 'LayoutDashboard',
      tooltip: 'Market overview and portfolio insights'
    },
    {
      label: 'AI Chat',
      path: '/ai-chat-interface',
      icon: 'MessageSquare',
      tooltip: 'Personalized financial guidance'
    },
    {
      label: 'Markets',
      path: '/stock-search-analysis',
      icon: 'TrendingUp',
      tooltip: 'Stock search and analysis tools'
    },
    {
      label: 'News',
      path: '/market-news-analysis-hub',
      icon: 'Newspaper',
      tooltip: 'Market news and analysis hub'
    }
  ];

  const mockNotifications = [
    { id: 1, type: 'market', title: 'NIFTY 50 up 2.3%', time: '5 min ago', read: false },
    { id: 2, type: 'ai', title: 'New AI insight available', time: '15 min ago', read: false },
    { id: 3, type: 'news', title: 'RBI policy update', time: '1 hour ago', read: true }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Context-aware search behavior based on current page
      if (location.pathname === '/stock-search-analysis') {
        // Trigger stock search
        console.log('Stock search:', searchQuery);
      } else if (location.pathname === '/ai-chat-interface') {
        // Add to chat
        console.log('Chat query:', searchQuery);
      } else {
        // Navigate to markets with search
        navigate(`/stock-search-analysis?search=${encodeURIComponent(searchQuery)}`);
      }
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = (id) => {
    setNotifications(prev => Math.max(0, prev - 1));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target?.closest('.notification-dropdown')) {
        setIsNotificationOpen(false);
      }
      if (!event.target?.closest('.search-container')) {
        setIsSearchOpen(false);
      }
      if (!event.target?.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">FinTech Advisor</h1>
            <p className="text-xs text-muted-foreground">by Soham & Vivaan</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = location.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span className="text-sm font-medium">{item?.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="search-container relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search stocks, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 h-9"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                >
                  <Icon name="Search" size={16} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex"
              >
                <Icon name="Search" size={18} />
              </Button>
            )}
          </div>

          {/* Notifications */}
          <div className="notification-dropdown relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleNotifications}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto scrollbar-thin">
                  {mockNotifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth cursor-pointer ${
                        !notification?.read ? 'bg-accent/5' : ''
                      }`}
                      onClick={() => markAsRead(notification?.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification?.type === 'market' ? 'bg-success' :
                          notification?.type === 'ai' ? 'bg-primary' : 'bg-warning'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={18} />
            </Button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal animate-slide-in">
                <div className="p-2">
                  {navigationItems?.map((item) => {
                    const isActive = location.pathname === item?.path;
                    return (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-smooth text-left ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item?.icon} size={18} />
                        <div>
                          <span className="text-sm font-medium">{item?.label}</span>
                          <p className="text-xs opacity-75">{item?.tooltip}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-border p-2">
                  <form onSubmit={handleSearch} className="flex space-x-2">
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="flex-1 h-9"
                    />
                    <Button type="submit" size="sm">
                      <Icon name="Search" size={16} />
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Market Ticker */}
      <div className="bg-muted border-t border-border overflow-hidden">
        <div className="flex items-center h-8 animate-pulse-subtle">
          <div className="flex items-center space-x-8 px-4 whitespace-nowrap animate-marquee">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-foreground">NIFTY 50</span>
              <span className="text-xs font-data text-success">19,674.25</span>
              <span className="text-xs text-success">+2.3%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-foreground">SENSEX</span>
              <span className="text-xs font-data text-success">66,023.69</span>
              <span className="text-xs text-success">+1.8%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-foreground">BANK NIFTY</span>
              <span className="text-xs font-data text-error">44,156.30</span>
              <span className="text-xs text-error">-0.5%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-foreground">USD/INR</span>
              <span className="text-xs font-data text-warning">83.24</span>
              <span className="text-xs text-warning">+0.1%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;