"use client";

import { useState } from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Star, Eye, Target, BarChart3, Loader2 } from 'lucide-react';
import { format } from "date-fns";
import { calculateDateRange, formatBucketLabel, toISODateString, parseISODateString } from '@/utils/admin/dateRange';
import AnalyticsHeader from './AnalyticsHeader';
import StatCards from './StatCards';
import { useDateRange } from '@/hooks/admin/analytics/useDateRange';
import { useAnalyticsData } from '@/hooks/admin/analytics/useAnalyticsData';
import { useAnalyticsCalculations } from '@/hooks/admin/analytics/useAnalyticsCalculations';

export default function Analytics() {
  const {
    selectedPeriod,
    customDateRange,
    showDatePicker,
    setShowDatePicker,
    datePickerStep,
    displayValue,
    comparisonLabel,
    handlePeriodChange,
    handleDateSelect,
    applyCustomDateRange,
    clearCustomDateRange,
  } = useDateRange();
  
  // Data state
  const { analyticsData, loading, error } = useAnalyticsData(selectedPeriod, customDateRange.from, customDateRange.to);
  
  // UI state
  const [_showComparison, setShowComparison] = useState(false);
  const [_exporting, setExporting] = useState(false);

  // Comprehensive cake performance data (static for now - could be made dynamic later)
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

  // All data fetching, date range logic, and calculations are handled by hooks

  // Export CSV
  const _handleExportCSV = async () => {
    if (!analyticsData) return;

    setExporting(true);
    try {
      const { from, to } = calculateDateRange(
        selectedPeriod,
        customDateRange.from,
        customDateRange.to
      );

      const csvRows: string[] = [];
      
      // Header
      csvRows.push('Date,Revenue,Orders,Visits,Conversion Rate');
      
      // Data rows
      analyticsData.buckets.forEach(bucket => {
        const date = parseISODateString(bucket.timestamp);
        const label = formatBucketLabel(date, analyticsData.bucketSize);
        csvRows.push(
          `${label},${bucket.revenue},${bucket.orders},${bucket.visits || ''},${bucket.conversionRate?.toFixed(2) || ''}`
        );
      });
      
      // Summary
      csvRows.push('');
      csvRows.push('Summary');
      csvRows.push(`Period,${format(from, 'MMM dd, yyyy')} - ${format(to, 'MMM dd, yyyy')}`);
      csvRows.push(`Total Revenue,${analyticsData.aggregates.currentPeriod.totalRevenue}`);
      csvRows.push(`Total Orders,${analyticsData.aggregates.currentPeriod.totalOrders}`);
      csvRows.push(`Average Order Value,${analyticsData.aggregates.currentPeriod.averageOrderValue}`);
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `analytics-${toISODateString(from)}-${toISODateString(to)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Export failed:', err);
      alert('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

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

  const getChangeIcon = (change: number | null) => {
    if (change === null) return null;
    return change >= 0 ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  // Computed values from analytics data
  const { currentMetrics, changeMetrics, chartData: _chartData, isEmpty: _isEmpty } = useAnalyticsCalculations(analyticsData);

  return (
    <div className="py-8">
      <AnalyticsHeader
        selectedPeriod={selectedPeriod}
        displayValue={displayValue}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        datePickerStep={datePickerStep}
        customDateRange={customDateRange}
        onPeriodChange={(value) => {
          handlePeriodChange(value);
          // Disable comparison for custom ranges
          if (value === 'custom') {
            setShowComparison(false);
          }
        }}
        onDateSelect={(date) => {
          handleDateSelect(date);
          // Auto-apply when both dates are selected
          if (date && customDateRange.from && datePickerStep === 'to') {
            setTimeout(() => {
              applyCustomDateRange();
            }, 100);
          }
        }}
        onApplyCustom={applyCustomDateRange}
        onClearCustom={clearCustomDateRange}
      />

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#c7b8ea]" />
          <span className="ml-3 text-gray-600">Loading analytics data...</span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800 text-sm">
            {error} (Using mock data for display)
          </p>
        </div>
      )}

      {!loading && analyticsData && (
        <>
          <StatCards
            selectedPeriod={selectedPeriod}
            comparisonLabel={comparisonLabel}
            currentMetrics={currentMetrics}
            changeMetrics={changeMetrics}
            getMetricIcon={getMetricIcon}
            getChangeIcon={getChangeIcon}
          />

          {/* Sales Revenue Tracking */}
          <div className="mt-8 bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Sales Revenue Tracking</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentMetrics && (
                  <>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Total Sales Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">
                        KES {currentMetrics.totalRevenue.toLocaleString()}
                      </p>
                      {selectedPeriod !== 'custom' && changeMetrics?.revenue !== null && changeMetrics?.revenue !== undefined && (
                        <div className="flex items-center justify-center mt-2">
                          {getChangeIcon(changeMetrics.revenue)}
                          <span className={`text-sm font-medium ml-1 ${changeMetrics.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {changeMetrics.revenue >= 0 ? '+' : ''}{changeMetrics.revenue?.toFixed(1)}%
                          </span>
                          <span className="text-sm text-gray-500 ml-1">{comparisonLabel}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {currentMetrics.conversionRate?.toFixed(1) || '0'}%
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {currentMetrics.siteVisits?.toLocaleString() || 'N/A'} visits → {currentMetrics.totalOrders} orders
                      </p>
                    </div>
                  </>
                )}
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
        </>
      )}
    </div>
  );
}
