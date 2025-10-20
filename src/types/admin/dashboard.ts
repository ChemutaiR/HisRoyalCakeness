// Admin dashboard-specific type definitions

// Analytics Types
export interface CakePerformance {
  name: string;
  orders: number;
  revenue: number;
  rating: number;
  image: string;
}

export interface SalesMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

export interface RevenueData {
  period: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

export interface TopCustomer {
  name: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  avatar: string;
}

export interface ActivityItem {
  type: 'order' | 'delivery' | 'review' | 'payment';
  message: string;
  time: string;
  amount: string;
}

// Dashboard Types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  averageOrderValue: number;
  pendingOrders: number;
  completedOrders: number;
  topSellingCakes: CakePerformance[];
  recentActivity: ActivityItem[];
}
