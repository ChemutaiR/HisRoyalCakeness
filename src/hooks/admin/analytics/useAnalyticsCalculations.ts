"use client";

import { useMemo } from 'react';
import { DynamicAnalyticsResponse } from '@/types/admin/analytics-dynamic';
import { formatBucketLabel, parseISODateString } from '@/utils/admin/dateRange';

export function useAnalyticsCalculations(analyticsData: DynamicAnalyticsResponse | null) {
  const currentMetrics = useMemo(() => {
    if (!analyticsData) return null;
    return analyticsData.aggregates.currentPeriod;
  }, [analyticsData]);

  const changeMetrics = useMemo(() => {
    if (!analyticsData) return null;
    return analyticsData.aggregates.changePercentage;
  }, [analyticsData]);

  const chartData = useMemo(() => {
    if (!analyticsData) return null;
    return analyticsData.buckets.map(bucket => ({
      timestamp: bucket.timestamp,
      revenue: bucket.revenue,
      orders: bucket.orders,
      label: formatBucketLabel(parseISODateString(bucket.timestamp), analyticsData.bucketSize),
    }));
  }, [analyticsData]);

  const isEmpty = useMemo(() => {
    return !!(analyticsData && analyticsData.buckets.length === 0);
  }, [analyticsData]);

  return { currentMetrics, changeMetrics, chartData, isEmpty };
}


