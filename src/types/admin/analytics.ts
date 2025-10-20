// Analytics-related type definitions

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

export interface ProductAnalytics {
  cakeId: number;
  cakeName: string;
  totalSold: number;
  revenue: number;
  averageRating: number;
  reviewCount: number;
}

export interface CustomerAnalytics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrderValue: number;
  customerRetentionRate: number;
}

export interface RevenueAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  revenueGrowth: number;
  averageOrderValue: number;
}

export interface OrderAnalytics {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  orderGrowth: number;
}

export interface CategoryAnalytics {
  category: string;
  totalSold: number;
  revenue: number;
  percentage: number;
}

export interface TimeRange {
  startDate: Date;
  endDate: Date;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface AnalyticsDashboardStats {
  revenue: RevenueAnalytics;
  orders: OrderAnalytics;
  customers: CustomerAnalytics;
  topProducts: ProductAnalytics[];
  categoryBreakdown: CategoryAnalytics[];
}

export interface AnalyticsFilters {
  timeRange: TimeRange;
  category?: string;
  product?: number;
  customerSegment?: string;
}

export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  timeRange: TimeRange;
  includeCharts: boolean;
  dataTypes: ('sales' | 'orders' | 'customers' | 'products')[];
}
