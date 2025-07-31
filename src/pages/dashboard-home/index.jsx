import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import MarketOverviewCard from './components/MarketOverviewCard';
import AIChatPreviewCard from './components/AIChatPreviewCard';
import PortfolioSummaryCard from './components/PortfolioSummaryCard';
import MarketNewsCarousel from './components/MarketNewsCarousel';
import QuickActionsPanel from './components/QuickActionsPanel';

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-8">
        <Helmet>
          <title>Dashboard - FinTech Advisor</title>
          <meta name="description" content="Your personalized financial dashboard with AI-powered market insights and portfolio management." />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Loading Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-muted rounded-lg w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-muted rounded-lg w-48 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skeleton Cards */}
            {[...Array(6)]?.map((_, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-6 shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-muted rounded-lg animate-pulse"></div>
                  <div>
                    <div className="h-4 bg-muted rounded w-32 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-8">
      <Helmet>
        <title>Dashboard - FinTech Advisor</title>
        <meta name="description" content="Your personalized financial dashboard with AI-powered market insights and portfolio management." />
        <meta name="keywords" content="financial dashboard, stock market, AI advisor, portfolio management, Indian stocks" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome to Your Financial Dashboard
              </h1>
              <p className="text-muted-foreground">
                Stay updated with real-time market insights and AI-powered investment guidance
              </p>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-foreground">{formatTime(currentTime)} IST</p>
              <p className="text-xs text-muted-foreground">{formatDate(currentTime)}</p>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Home" size={16} />
            <span>/</span>
            <span className="text-foreground font-medium">Dashboard</span>
          </nav>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Overview */}
            <MarketOverviewCard />

            {/* AI Chat Preview */}
            <AIChatPreviewCard />

            {/* Market News Carousel */}
            <MarketNewsCarousel />
          </div>

          {/* Right Column - Secondary Cards */}
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <PortfolioSummaryCard />

            {/* Quick Actions Panel */}
            <QuickActionsPanel />

            {/* Market Status Widget */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                  <Icon name="Clock" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Market Status</h3>
                  <p className="text-sm text-muted-foreground">Indian Stock Exchanges</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">NSE & BSE</p>
                      <p className="text-xs text-muted-foreground">Regular Trading</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-success">OPEN</span>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Pre-market:</span>
                    <span>9:00 AM - 9:15 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Regular:</span>
                    <span>9:15 AM - 3:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Post-market:</span>
                    <span>3:40 PM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-2xl font-bold text-primary">2,500+</p>
              <p className="text-xs text-muted-foreground">Listed Companies</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-2xl font-bold text-success">₹280T</p>
              <p className="text-xs text-muted-foreground">Market Cap</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-2xl font-bold text-warning">24/7</p>
              <p className="text-xs text-muted-foreground">AI Support</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-2xl font-bold text-secondary">Real-time</p>
              <p className="text-xs text-muted-foreground">Data Updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;