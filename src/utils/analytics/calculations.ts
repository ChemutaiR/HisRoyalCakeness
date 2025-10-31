/**
 * Analytics Calculation Utilities
 * 
 * Utility functions for analytics data calculations and mock data generation
 */

import { DateRangeType, DynamicAnalyticsResponse } from '@/types/admin/analytics-dynamic';
import { toISODateString, calculateChangePercentage } from '@/utils/admin/dateRange';

/**
 * Generate mock analytics data for development
 * Remove when backend is ready
 */
export function generateMockData(
  rangeType: DateRangeType,
  from: Date,
  to: Date
): DynamicAnalyticsResponse {
  const buckets: any[] = [];
  const current = new Date(from);
  const bucketSize = rangeType === 'year' ? 'month' : rangeType === 'quarter' ? 'week' : 'day';
  
  let bucketCount = 0;
  while (current <= to && bucketCount < 60) {
    const revenue = Math.random() * 50000 + 10000;
    const orders = Math.floor(Math.random() * 20 + 5);
    buckets.push({
      timestamp: toISODateString(new Date(current)),
      revenue: Math.round(revenue),
      orders,
      visits: Math.floor(Math.random() * 100 + 50),
      conversionRate: Math.random() * 5 + 8,
    });
    
    if (bucketSize === 'day') {
      current.setDate(current.getDate() + 1);
    } else if (bucketSize === 'week') {
      current.setDate(current.getDate() + 7);
    } else {
      current.setMonth(current.getMonth() + 1);
    }
    bucketCount++;
  }

  const totalRevenue = buckets.reduce((sum, b) => sum + b.revenue, 0);
  const totalOrders = buckets.reduce((sum, b) => sum + b.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Mock previous period data
  const prevRevenue = totalRevenue * 0.88; // ~12% increase
  const prevOrders = Math.floor(totalOrders * 0.92); // ~8% increase
  const prevAvgOrderValue = prevOrders > 0 ? prevRevenue / prevOrders : 0;

  return {
    rangeType,
    currentPeriod: {
      from: toISODateString(from),
      to: toISODateString(to),
    },
    previousPeriod: {
      from: toISODateString(from),
      to: toISODateString(to),
    },
    buckets,
    aggregates: {
      currentPeriod: {
        totalRevenue: Math.round(totalRevenue),
        totalOrders,
        averageOrderValue: Math.round(avgOrderValue),
        siteVisits: buckets.reduce((sum, b) => sum + (b.visits || 0), 0),
        conversionRate: buckets.length > 0 
          ? buckets.reduce((sum, b) => sum + (b.conversionRate || 0), 0) / buckets.length 
          : 0,
        customerSatisfaction: 4.8,
      },
      previousPeriod: {
        totalRevenue: Math.round(prevRevenue),
        totalOrders: prevOrders,
        averageOrderValue: Math.round(prevAvgOrderValue),
        siteVisits: Math.floor(buckets.reduce((sum, b) => sum + (b.visits || 0), 0) * 0.85),
        conversionRate: buckets.length > 0 
          ? buckets.reduce((sum, b) => sum + (b.conversionRate || 0), 0) / buckets.length * 0.98
          : 0,
        customerSatisfaction: 4.5,
      },
      changePercentage: {
        revenue: calculateChangePercentage(totalRevenue, prevRevenue),
        orders: calculateChangePercentage(totalOrders, prevOrders),
        averageOrderValue: calculateChangePercentage(avgOrderValue, prevAvgOrderValue),
        siteVisits: calculateChangePercentage(
          buckets.reduce((sum, b) => sum + (b.visits || 0), 0),
          buckets.reduce((sum, b) => sum + (b.visits || 0), 0) * 0.85
        ),
        conversionRate: calculateChangePercentage(
          buckets.reduce((sum, b) => sum + (b.conversionRate || 0), 0) / buckets.length,
          buckets.reduce((sum, b) => sum + (b.conversionRate || 0), 0) / buckets.length * 0.98
        ),
        customerSatisfaction: calculateChangePercentage(4.8, 4.5),
      },
    },
    bucketSize: bucketSize as 'day' | 'week' | 'month',
  };
} 


