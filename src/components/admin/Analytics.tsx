"use client";

import { useState } from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Star, Eye, Target, BarChart3, Calendar, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [customDateRange, setCustomDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerStep, setDatePickerStep] = useState<'from' | 'to'>('from');
  const [displayValue, setDisplayValue] = useState('This Month');

  // Comprehensive cake performance data
  const cakePerformanceData = [
    { 
      name: 'Chocolate Cake', 
      orders: 89, 
      revenue: 400500, 
      rating: 4.9, 
      image: '/product-images/chcocolate fudge.jpg'
    },
    { 
      name: 'Red Velvet Cake', 
      orders: 67, 
      revenue: 348400, 
      rating: 4.8, 
      image: '/product-images/red velvet.jpg'
    },
    { 
      name: 'Vanilla Cake', 
      orders: 54, 
      revenue: 259200, 
      rating: 4.7, 
      image: '/product-images/vanilla cake.jpg'
    },
    { 
      name: 'Carrot Cake', 
      orders: 43, 
      revenue: 215000, 
      rating: 4.6, 
      image: '/product-images/carrot cake.jpg'
    },
    { 
      name: 'Strawberry Cake', 
      orders: 38, 
      revenue: 182400, 
      rating: 4.8, 
      image: '/product-images/strawberry cake.jpg'
    },
    { 
      name: 'Black Forest Cake', 
      orders: 35, 
      revenue: 175000, 
      rating: 4.9, 
      image: '/product-images/black forest.jpg'
    },
    { 
      name: 'Lemon Cake', 
      orders: 32, 
      revenue: 153600, 
      rating: 4.5, 
      image: '/product-images/lemon cake.jpg'
    },
    { 
      name: 'Coconut Cake', 
      orders: 28, 
      revenue: 134400, 
      rating: 4.4, 
      image: '/product-images/coconut cake.jpg'
    },
    { 
      name: 'Banana Cake', 
      orders: 25, 
      revenue: 120000, 
      rating: 4.6, 
      image: '/product-images/banana cake.jpg'
    },
    { 
      name: 'Mocha Cake', 
      orders: 22, 
      revenue: 110000, 
      rating: 4.7, 
      image: '/product-images/mocha cake.jpg'
    },
    { 
      name: 'Rainbow Cake', 
      orders: 20, 
      revenue: 100000, 
      rating: 4.8, 
      image: '/product-images/rainbow cake.jpg'
    },
    { 
      name: 'White Forest Cake', 
      orders: 18, 
      revenue: 90000, 
      rating: 4.5, 
      image: '/product-images/white forest.jpg'
    }
  ];

  // Date range helper functions
  const handlePeriodChange = (value: string) => {
    if (value === 'custom') {
      setSelectedPeriod('custom');
      setShowDatePicker(false);
      setDatePickerStep('from');
    } else {
      setSelectedPeriod(value);
      setCustomDateRange({ from: undefined, to: undefined });
      setShowDatePicker(false);
      setDisplayValue(
        value === 'week' ? 'This Week' :
        value === 'month' ? 'This Month' :
        value === 'quarter' ? 'This Quarter' :
        value === 'year' ? 'This Year' : 'This Month'
      );
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (datePickerStep === 'from') {
      setCustomDateRange(prev => ({ ...prev, from: date }));
      setDatePickerStep('to');
    } else {
      setCustomDateRange(prev => ({ ...prev, to: date }));
      // Auto-apply when both dates are selected
      if (date && customDateRange.from) {
        setTimeout(() => {
          applyCustomDateRange();
        }, 100);
      }
    }
  };

  const applyCustomDateRange = () => {
    if (customDateRange.from && customDateRange.to) {
      setSelectedPeriod('custom');
      setDisplayValue('Custom Date Range');
      setShowDatePicker(false);
      setDatePickerStep('from');
      // Here you would typically fetch data for the custom date range
      // console.log('Custom date range applied:', customDateRange);
    }
  };

  const clearCustomDateRange = () => {
    setCustomDateRange({ from: undefined, to: undefined });
    setSelectedPeriod('month');
    setDisplayValue('This Month');
    setShowDatePicker(false);
    setDatePickerStep('from');
  };


  // Enhanced analytics data
  const metrics = {
    totalRevenue: 1542000,
    totalOrders: 342,
    averageOrderValue: 4509,
    customerSatisfaction: 4.8,
    revenueChange: 12.5,
    ordersChange: 8.2,
    avgOrderChange: -2.1,
    satisfactionChange: 0.3,
    // New metrics
    siteVisits: 2847,
    visitsChange: 15.3,
    conversionRate: 12.0,
    conversionChange: 2.1,
    monthlyRevenue: 1542000,
    monthlyRevenueChange: 8.7
  };

  // Popular products by category
  const popularProductsByCategory = {
    'Classic Cakes': { name: 'Vanilla Cake', orders: 54, revenue: 259200, growth: 12.1 },
    'Chocolate Cakes': { name: 'Chocolate Fudge', orders: 89, revenue: 400500, growth: 15.2 },
    'Fruit Cakes': { name: 'Strawberry Cake', orders: 38, revenue: 182400, growth: 6.8 },
    'Specialty Cakes': { name: 'Red Velvet Cake', orders: 67, revenue: 348400, growth: 8.7 },
    'Meal Prep': { name: 'Weekly Family Pack', orders: 23, revenue: 184000, growth: 18.5 },
    'Salad Dressings': { name: 'Balsamic Vinaigrette', orders: 31, revenue: 62000, growth: 22.3 },
    'Baking Classes': { name: '4-Week Course', orders: 12, revenue: 240000, growth: 35.7 },
    'Beverages': { name: 'Green Smoothie', orders: 45, revenue: 67500, growth: 14.2 },
    'Snacks': { name: 'Protein Bars', orders: 28, revenue: 42000, growth: 9.8 }
  };

  const topCakes = [
    { name: 'Chocolate Cake', orders: 89, revenue: 400500, growth: 15.2 },
    { name: 'Red Velvet Cake', orders: 67, revenue: 348400, growth: 8.7 },
    { name: 'Vanilla Cake', orders: 54, revenue: 259200, growth: 12.1 },
    { name: 'Carrot Cake', orders: 43, revenue: 215000, growth: -3.2 },
    { name: 'Strawberry Cake', orders: 38, revenue: 182400, growth: 6.8 }
  ];

  // const recentActivity = [
  //   { type: 'order', message: 'New order #12355 - Chocolate Cake for Sarah', time: '2 minutes ago', amount: '$45.00' },
  //   { type: 'delivery', message: 'Order #12354 delivered to Michael Chen', time: '15 minutes ago', amount: '$52.00' },
  //   { type: 'order', message: 'New order #12356 - Red Velvet Cake for Emily', time: '1 hour ago', amount: '$52.00' },
  //   { type: 'review', message: '5-star review received for order #12350', time: '2 hours ago', amount: '' },
  //   { type: 'delivery', message: 'Order #12353 delivered to Lisa Wang', time: '3 hours ago', amount: '$42.00' }
  // ];

  const monthlyData = [
    { month: 'Jan', revenue: 1200000, orders: 280 },
    { month: 'Feb', revenue: 1350000, orders: 310 },
    { month: 'Mar', revenue: 1420000, orders: 325 },
    { month: 'Apr', revenue: 1380000, orders: 315 },
    { month: 'May', revenue: 1510000, orders: 340 },
    { month: 'Jun', revenue: 1542000, orders: 342 }
  ];

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'revenue':
        return <DollarSign className="w-6 h-6 text-green-500" />;
      case 'orders':
        return <ShoppingCart className="w-6 h-6 text-blue-500" />;
      case 'customers':
        return <Users className="w-6 h-6 text-purple-500" />;
      case 'satisfaction':
        return <Star className="w-6 h-6 text-yellow-500" />;
      case 'visits':
        return <Eye className="w-6 h-6 text-indigo-500" />;
      case 'conversion':
        return <Target className="w-6 h-6 text-orange-500" />;
      case 'monthlyRevenue':
        return <BarChart3 className="w-6 h-6 text-teal-500" />;
      default:
        return <TrendingUp className="w-6 h-6 text-gray-500" />;
    }
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  // const getActivityIcon = (type: string) => {
  //   switch (type) {
  //     case 'order':
  //       return <ShoppingCart className="w-4 h-4 text-blue-500" />;
  //     case 'delivery':
  //       return <Clock className="w-4 h-4 text-green-500" />;
  //     case 'review':
  //       return <Star className="w-4 h-4 text-yellow-500" />;
  //     default:
  //       return <Calendar className="w-4 h-4 text-gray-500" />;
  //   }
  // };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
          <p className="text-gray-600 text-base">Track your business performance and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <span className="truncate">
                {selectedPeriod === 'custom' ? 'Custom Date Range' : displayValue}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Date Range</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom Date Range Picker - Only show when custom is selected */}
          {selectedPeriod === 'custom' && (
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-[200px] justify-start text-left font-normal"
                  onClick={() => setShowDatePicker(true)}
                >
                  <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {customDateRange.from ? (
                      customDateRange.to ? (
                        `${format(customDateRange.from, 'MMM dd')} - ${format(customDateRange.to, 'MMM dd')}`
                      ) : (
                        format(customDateRange.from, 'MMM dd, yyyy')
                      )
                    ) : (
                      'Pick a date range'
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      {datePickerStep === 'from' ? 'Select Start Date' : 'Select End Date'}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDatePicker(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CalendarComponent
                    mode="single"
                    selected={datePickerStep === 'from' ? customDateRange.from : customDateRange.to}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      if (datePickerStep === 'to' && customDateRange.from) {
                        return date < customDateRange.from;
                      }
                      return date > new Date();
                    }}
                    initialFocus
                  />
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      {customDateRange.from && (
                        <div>From: {format(customDateRange.from, 'MMM dd, yyyy')}</div>
                      )}
                      {customDateRange.to && (
                        <div>To: {format(customDateRange.to, 'MMM dd, yyyy')}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCustomDateRange}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={applyCustomDateRange}
                        disabled={!customDateRange.from || !customDateRange.to}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Site Visits</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.siteVisits.toLocaleString()}</p>
            </div>
            {getMetricIcon('visits')}
          </div>
          <div className="flex items-center mt-2">
            {getChangeIcon(metrics.visitsChange)}
            <span className={`text-sm font-medium ml-1 ${metrics.visitsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.visitsChange >= 0 ? '+' : ''}{metrics.visitsChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate}%</p>
            </div>
            {getMetricIcon('conversion')}
          </div>
          <div className="flex items-center mt-2">
            {getChangeIcon(metrics.conversionChange)}
            <span className={`text-sm font-medium ml-1 ${metrics.conversionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.conversionChange >= 0 ? '+' : ''}{metrics.conversionChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">KES {metrics.monthlyRevenue.toLocaleString()}</p>
            </div>
            {getMetricIcon('monthlyRevenue')}
          </div>
          <div className="flex items-center mt-2">
            {getChangeIcon(metrics.monthlyRevenueChange)}
            <span className={`text-sm font-medium ml-1 ${metrics.monthlyRevenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.monthlyRevenueChange >= 0 ? '+' : ''}{metrics.monthlyRevenueChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalOrders}</p>
            </div>
            {getMetricIcon('orders')}
          </div>
          <div className="flex items-center mt-2">
            {getChangeIcon(metrics.ordersChange)}
            <span className={`text-sm font-medium ml-1 ${metrics.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.ordersChange >= 0 ? '+' : ''}{metrics.ordersChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">KES {metrics.averageOrderValue.toLocaleString()}</p>
            </div>
            {getMetricIcon('revenue')}
          </div>
          <div className="flex items-center mt-2">
            {getChangeIcon(metrics.avgOrderChange)}
            <span className={`text-sm font-medium ml-1 ${metrics.avgOrderChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.avgOrderChange >= 0 ? '+' : ''}{metrics.avgOrderChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.customerSatisfaction}/5.0</p>
            </div>
            {getMetricIcon('satisfaction')}
          </div>
          <div className="flex items-center mt-2">
            {getChangeIcon(metrics.satisfactionChange)}
            <span className={`text-sm font-medium ml-1 ${metrics.satisfactionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.satisfactionChange >= 0 ? '+' : ''}{metrics.satisfactionChange}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Popular Products by Category */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Most Popular by Category</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(popularProductsByCategory).map(([category, product], index) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{category} • {product.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">KES {product.revenue.toLocaleString()}</p>
                    <div className="flex items-center">
                      {getChangeIcon(product.growth)}
                      <span className={`text-sm ml-1 ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overall Top Products */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Overall Top Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCakes.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">KES {product.revenue.toLocaleString()}</p>
                    <div className="flex items-center">
                      {getChangeIcon(product.growth)}
                      <span className={`text-sm ml-1 ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth >= 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Revenue Tracking */}
      <div className="mt-8 bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Sales Revenue Tracking</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Sales Revenue</p>
              <p className="text-3xl font-bold text-gray-900">KES {metrics.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center justify-center mt-2">
                {getChangeIcon(metrics.revenueChange)}
                <span className={`text-sm font-medium ml-1 ${metrics.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.revenueChange >= 0 ? '+' : ''}{metrics.revenueChange}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{metrics.conversionRate}%</p>
              <p className="text-sm text-gray-500 mt-1">{metrics.siteVisits.toLocaleString()} visits → {metrics.totalOrders} orders</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Average Order Value</p>
              <p className="text-3xl font-bold text-gray-900">KES {metrics.averageOrderValue.toLocaleString()}</p>
              <div className="flex items-center justify-center mt-2">
                {getChangeIcon(metrics.avgOrderChange)}
                <span className={`text-sm font-medium ml-1 ${metrics.avgOrderChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.avgOrderChange >= 0 ? '+' : ''}{metrics.avgOrderChange}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="mt-8 bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue Trend</h3>
        </div>
        <div className="p-6">
          <div className="flex items-end justify-between h-64 space-x-2">
            {monthlyData.map((data) => {
              const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t" style={{ height: `${height}%` }}>
                    <div className="w-full bg-blue-500 rounded-t transition-all duration-300" style={{ height: `${height}%` }}></div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{data.month}</p>
                    <p className="text-xs text-gray-500">KES {data.revenue.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cake Performance Table */}
      <div className="mt-8 bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Cake Performance Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">Detailed breakdown of each cake&apos;s performance metrics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cakePerformanceData.map((cake, index) => (
                <tr key={cake.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <Image 
                          className="h-12 w-12 rounded-lg object-cover" 
                          src={cake.image} 
                          alt={cake.name}
                          width={48}
                          height={48}
                          onError={(e) => {
                            e.currentTarget.src = '/product-images/vanilla cake.jpg';
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{cake.name}</div>
                        <div className="text-sm text-gray-500">#{index + 1} Best Seller</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cake.orders}</div>
                    <div className="text-sm text-gray-500">orders</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">KES {cake.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">KES {(cake.revenue / cake.orders).toLocaleString()} avg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(cake.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-900">{cake.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {cakePerformanceData.length} cakes • Total Revenue: KES {cakePerformanceData.reduce((sum, cake) => sum + cake.revenue, 0).toLocaleString()}
            </div>
            <div>
              Average Rating: {(cakePerformanceData.reduce((sum, cake) => sum + cake.rating, 0) / cakePerformanceData.length).toFixed(1)}/5.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 