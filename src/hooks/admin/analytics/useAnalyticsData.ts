"use client";

import { useCallback, useEffect, useState } from 'react';
import { analyticsApiService } from '@/services/api/analyticsApi';
import { DateRangeType, DynamicAnalyticsResponse } from '@/types/admin/analytics-dynamic';
import { calculateDateRange, toISODateString } from '@/utils/admin/dateRange';

export function useAnalyticsData(
  selectedPeriod: DateRangeType,
  customFrom?: Date,
  customTo?: Date
) {
  const [analyticsData, setAnalyticsData] = useState<DynamicAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { from, to } = calculateDateRange(
        selectedPeriod,
        customFrom,
        customTo
      );

      const response = await analyticsApiService.getAnalytics({
        rangeType: selectedPeriod,
        from: toISODateString(from),
        to: toISODateString(to),
      });

      if (response.success && response.data) {
        setAnalyticsData(response.data);
      } else {
        setError(response.error || 'Failed to load analytics data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod, customFrom, customTo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAnalytics();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchAnalytics]);

  return { analyticsData, loading, error };
}


