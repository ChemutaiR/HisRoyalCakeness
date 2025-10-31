// Dynamic Analytics Types for Date Range-Based Data

export type DateRangeType = 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface DateRangeParams {
  rangeType: DateRangeType;
  from?: string; // ISO date string
  to?: string; // ISO date string
}

export interface TimeBucket {
  timestamp: string; // ISO date string for bucket start
  revenue: number;
  orders: number;
  visits?: number;
  conversionRate?: number;
}

export interface PeriodAggregates {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  siteVisits?: number;
  conversionRate?: number;
  customerSatisfaction?: number;
}

export interface ComparisonData {
  currentPeriod: PeriodAggregates;
  previousPeriod: PeriodAggregates | null;
  changePercentage: {
    revenue: number | null;
    orders: number | null;
    averageOrderValue: number | null;
    siteVisits: number | null;
    conversionRate: number | null;
    customerSatisfaction: number | null;
  };
}

export interface DynamicAnalyticsResponse {
  rangeType: DateRangeType;
  currentPeriod: {
    from: string;
    to: string;
  };
  previousPeriod: {
    from: string;
    to: string;
  } | null;
  buckets: TimeBucket[];
  aggregates: ComparisonData;
  bucketSize: 'day' | 'week' | 'month';
}

export interface ExportAnalyticsRequest {
  rangeType: DateRangeType;
  from?: string;
  to?: string;
  format: 'csv' | 'excel';
  includeCharts: boolean;
  dataTypes: ('revenue' | 'orders' | 'visits' | 'conversion')[];
}

