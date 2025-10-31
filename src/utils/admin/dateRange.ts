/**
 * Date Range Utility Functions
 * 
 * Helper functions for calculating date ranges, buckets, and comparisons
 */

import { DateRangeType } from '@/types/admin/analytics-dynamic';

/**
 * Calculate date range based on range type
 */
export function calculateDateRange(rangeType: DateRangeType, customFrom?: Date, customTo?: Date): { from: Date; to: Date } {
  const now = new Date();
  const to = customTo || now;
  let from: Date;

  switch (rangeType) {
    case 'week': {
      from = new Date(to);
      from.setDate(to.getDate() - 7);
      break;
    }
    case 'month': {
      from = new Date(to);
      from.setMonth(to.getMonth() - 1);
      break;
    }
    case 'quarter': {
      from = new Date(to);
      from.setMonth(to.getMonth() - 3);
      break;
    }
    case 'year': {
      from = new Date(to);
      from.setFullYear(to.getFullYear() - 1);
      break;
    }
    case 'custom': {
      if (!customFrom) {
        // Default to month if custom range not set
        from = new Date(to);
        from.setMonth(to.getMonth() - 1);
      } else {
        from = customFrom;
      }
      break;
    }
    default: {
      from = new Date(to);
      from.setMonth(to.getMonth() - 1);
    }
  }

  return { from, to };
}

/**
 * Calculate previous period for comparison
 */
export function calculatePreviousPeriod(from: Date, to: Date): { from: Date; to: Date } {
  const duration = to.getTime() - from.getTime();
  const previousTo = new Date(from);
  previousTo.setTime(previousTo.getTime() - 1);
  const previousFrom = new Date(previousTo);
  previousFrom.setTime(previousFrom.getTime() - duration);

  return { from: previousFrom, to: previousTo };
}

/**
 * Determine bucket size based on date range
 */
export function determineBucketSize(from: Date, to: Date): 'day' | 'week' | 'month' {
  const daysDiff = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff <= 31) {
    return 'day';
  } else if (daysDiff <= 90) {
    return 'week';
  } else {
    return 'month';
  }
}

/**
 * Format bucket label based on bucket size and date
 */
export function formatBucketLabel(date: Date, bucketSize: 'day' | 'week' | 'month'): string {
  switch (bucketSize) {
    case 'day':
      return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(date);
    case 'week':
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekNum = Math.ceil((weekStart.getDate()) / 7);
      return `Wk ${weekNum} ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(weekStart)}`;
    case 'month':
      return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    default:
      return date.toLocaleDateString();
  }
}

/**
 * Calculate percentage change
 */
export function calculateChangePercentage(current: number, previous: number | null): number | null {
  if (previous === null || previous === 0) {
    return null;
  }
  return ((current - previous) / previous) * 100;
}

/**
 * Convert date to ISO string (local timezone, date only)
 */
export function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse ISO date string to Date object
 */
export function parseISODateString(isoString: string): Date {
  return new Date(isoString + 'T00:00:00');
}

