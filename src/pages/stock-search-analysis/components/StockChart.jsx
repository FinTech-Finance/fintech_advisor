import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockChart = ({ stock, timeframe, onTimeframeChange }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const timeframes = [
    { value: '1D', label: '1D', points: 24 },
    { value: '1W', label: '1W', points: 7 },
    { value: '1M', label: '1M', points: 30 },
    { value: '3M', label: '3M', points: 90 },
    { value: '1Y', label: '1Y', points: 365 }
  ];

  // Generate mock chart data
  const generateChartData = (timeframe, basePrice) => {
    const config = timeframes?.find(t => t?.value === timeframe);
    const points = config?.points || 30;
    const data = [];
    
    let currentPrice = basePrice;
    const volatility = 0.02; // 2% volatility
    
    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.5) * volatility;
      currentPrice = currentPrice * (1 + change);
      
      let timestamp;
      const now = new Date();
      
      switch (timeframe) {
        case '1D':
          timestamp = new Date(now.getTime() - (points - i) * 60 * 60 * 1000);
          break;
        case '1W':
          timestamp = new Date(now.getTime() - (points - i) * 24 * 60 * 60 * 1000);
          break;
        case '1M':
          timestamp = new Date(now.getTime() - (points - i) * 24 * 60 * 60 * 1000);
          break;
        case '3M':
          timestamp = new Date(now.getTime() - (points - i) * 24 * 60 * 60 * 1000);
          break;
        case '1Y':
          timestamp = new Date(now.getTime() - (points - i) * 24 * 60 * 60 * 1000);
          break;
        default:
          timestamp = new Date(now.getTime() - (points - i) * 24 * 60 * 60 * 1000);
      }
      
      data?.push({
        timestamp: timestamp?.getTime(),
        price: parseFloat(currentPrice?.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000,
        date: timestamp?.toLocaleDateString('en-IN'),
        time: timestamp?.toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    }
    
    return data;
  };

  useEffect(() => {
    if (stock) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const data = generateChartData(timeframe, stock?.price);
        setChartData(data);
        setIsLoading(false);
      }, 500);
    }
  }, [stock, timeframe]);

  const formatTooltipValue = (value, name) => {
    if (name === 'price') {
      return [`₹${value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 'Price'];
    }
    return [value, name];
  };

  const formatXAxisLabel = (timestamp) => {
    const date = new Date(timestamp);
    switch (timeframe) {
      case '1D':
        return date?.toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      case '1W':
        return date?.toLocaleDateString('en-IN', { 
          weekday: 'short' 
        });
      case '1M': case'3M':
        return date?.toLocaleDateString('en-IN', { 
          day: '2-digit',
          month: 'short' 
        });
      case '1Y':
        return date?.toLocaleDateString('en-IN', { 
          month: 'short',
          year: '2-digit' 
        });
      default:
        return date?.toLocaleDateString('en-IN');
    }
  };

  const getLineColor = () => {
    if (chartData?.length < 2) return '#10B981';
    const firstPrice = chartData?.[0]?.price;
    const lastPrice = chartData?.[chartData?.length - 1]?.price;
    return lastPrice >= firstPrice ? '#10B981' : '#EF4444';
  };

  const getPriceChange = () => {
    if (chartData?.length < 2) return { change: 0, percentage: 0 };
    const firstPrice = chartData?.[0]?.price;
    const lastPrice = chartData?.[chartData?.length - 1]?.price;
    const change = lastPrice - firstPrice;
    const percentage = (change / firstPrice) * 100;
    return { change, percentage };
  };

  const priceChange = getPriceChange();

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{stock?.symbol} Price Chart</h3>
          <div className="flex items-center space-x-4 mt-1">
            <span className="font-data text-lg text-foreground">
              ₹{stock?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className={`text-sm font-medium ${
              priceChange?.percentage >= 0 ? 'text-success' : 'text-error'
            }`}>
              {priceChange?.percentage >= 0 ? '+' : ''}
              {priceChange?.percentage?.toFixed(2)}% ({timeframe})
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {stock?.isLive && (
            <div className="flex items-center space-x-1 text-xs text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          )}
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
      {/* Timeframe Selector */}
      <div className="flex space-x-1 mb-4 overflow-x-auto scrollbar-thin">
        {timeframes?.map((tf) => (
          <Button
            key={tf?.value}
            variant={timeframe === tf?.value ? "default" : "ghost"}
            size="sm"
            onClick={() => onTimeframeChange(tf?.value)}
            className="whitespace-nowrap"
          >
            {tf?.label}
          </Button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-64 sm:h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="BarChart3" size={24} className="animate-pulse" />
              <span>Loading chart data...</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={formatXAxisLabel}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={['dataMin - 10', 'dataMax + 10']}
                tickFormatter={(value) => `₹${value?.toFixed(0)}`}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={formatTooltipValue}
                labelFormatter={(timestamp) => {
                  const date = new Date(timestamp);
                  return `${date?.toLocaleDateString('en-IN')} ${date?.toLocaleTimeString('en-IN')}`;
                }}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={getLineColor()}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: getLineColor(), strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Chart Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border text-sm">
        <div>
          <span className="text-muted-foreground">High</span>
          <div className="font-medium text-foreground">
            ₹{Math.max(...chartData?.map(d => d?.price))?.toLocaleString('en-IN')}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Low</span>
          <div className="font-medium text-foreground">
            ₹{Math.min(...chartData?.map(d => d?.price))?.toLocaleString('en-IN')}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Avg Volume</span>
          <div className="font-medium text-foreground">
            {Math.round(chartData?.reduce((sum, d) => sum + d?.volume, 0) / chartData?.length)?.toLocaleString('en-IN')}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Volatility</span>
          <div className="font-medium text-foreground">
            {(Math.abs(priceChange?.percentage) * 0.5)?.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;