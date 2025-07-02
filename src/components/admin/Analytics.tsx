"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Clock, Star, Calendar } from 'lucide-react';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Sample analytics data
  const metrics = {
    totalRevenue: 15420,
    totalOrders: 342,
    averageOrderValue: 45.09,
    customerSatisfaction: 4.8,
    revenueChange: 12.5,
    ordersChange: 8.2,
    avgOrderChange: -2.1,
    satisfactionChange: 0.3
  };

  const topCakes = [
    { name: 'Chocolate Cake', orders: 89, revenue: 4005, growth: 15.2 },
    { name: 'Red Velvet Cake', orders: 67, revenue: 3484, growth: 8.7 },
    { name: 'Vanilla Cake', orders: 54, revenue: 2592, growth: 12.1 },
    { name: 'Carrot Cake', orders: 43, revenue: 2150, growth: -3.2 },
    { name: 'Strawberry Cake', orders: 38, revenue: 1824, growth: 6.8 }
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #12355 - Chocolate Cake for Sarah', time: '2 minutes ago', amount: '$45.00' },
    { type: 'delivery', message: 'Order #12354 delivered to Michael Chen', time: '15 minutes ago', amount: '$52.00' },
    { type: 'order', message: 'New order #12356 - Red Velvet Cake for Emily', time: '1 hour ago', amount: '$52.00' },
    { type: 'review', message: '5-star review received for order #12350', time: '2 hours ago', amount: '' },
    { type: 'delivery', message: 'Order #12353 delivered to Lisa Wang', time: '3 hours ago', amount: '$42.00' }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 12000, orders: 280 },
    { month: 'Feb', revenue: 13500, orders: 310 },
    { month: 'Mar', revenue: 14200, orders: 325 },
    { month: 'Apr', revenue: 13800, orders: 315 },
    { month: 'May', revenue: 15100, orders: 340 },
    { month: 'Jun', revenue: 15420, orders: 342 }
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
      default:
        return <TrendingUp className="w-6 h-6 text-gray-500" />;
    }
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case 'delivery':
        return <Clock className="w-4 h-4 text-green-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
          <p className="text-gray-600 text-base">Track your business performance and insights</p>
        </div>
        <select 
          value={selectedPeriod} 
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.totalRevenue.toLocaleString()}</p>
            </div>
            {getMetricIcon('revenue')}
          </div>
          <div className="flex items-center mt-2">
            {getChangeIcon(metrics.revenueChange)}
            <span className={`text-sm font-medium ml-1 ${metrics.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.revenueChange >= 0 ? '+' : ''}{metrics.revenueChange}%
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
              <p className="text-2xl font-bold text-gray-900">${metrics.averageOrderValue}</p>
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
        {/* Top Performing Cakes */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Top Performing Cakes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCakes.map((cake, index) => (
                <div key={cake.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{cake.name}</p>
                      <p className="text-sm text-gray-500">{cake.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${cake.revenue}</p>
                    <div className="flex items-center">
                      {getChangeIcon(cake.growth)}
                      <span className={`text-sm ml-1 ${cake.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {cake.growth >= 0 ? '+' : ''}{cake.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div className="flex-shrink-0">
                      <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                    </div>
                  )}
                </div>
              ))}
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
            {monthlyData.map((data, index) => {
              const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t" style={{ height: `${height}%` }}>
                    <div className="w-full bg-blue-500 rounded-t transition-all duration-300" style={{ height: `${height}%` }}></div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{data.month}</p>
                    <p className="text-xs text-gray-500">${data.revenue.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 