import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StockSearchAnalysis from './pages/stock-search-analysis';
import MarketNewsAnalysisHub from './pages/market-news-analysis-hub';
import AIChatInterface from './pages/ai-chat-interface';
import DashboardHome from './pages/dashboard-home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChatInterface />} />
        <Route path="/stock-search-analysis" element={<StockSearchAnalysis />} />
        <Route path="/market-news-analysis-hub" element={<MarketNewsAnalysisHub />} />
        <Route path="/ai-chat-interface" element={<AIChatInterface />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
