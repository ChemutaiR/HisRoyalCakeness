/**
 * Order History Types
 * 
 * Types specific to the order history functionality
 */

import { AdminOrder } from './orders';
import { OrderStatus } from '@/types/orders/order';

export interface OrderHistoryFilters {
  dateFrom?: string;
  dateTo?: string;
  customerName?: string;
  customerEmail?: string;
  minTotal?: number;
  maxTotal?: number;
  searchQuery?: string;
}

export interface OrderHistoryPagination {
  page: number;
  limit: number;
  hasMore: boolean;
  total: number;
}

export interface OrderHistoryState {
  orders: AdminOrder[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  filters: OrderHistoryFilters;
  pagination: OrderHistoryPagination;
}

export interface OrderHistoryActions {
  setFilters: (filters: Partial<OrderHistoryFilters>) => void;
  clearFilters: () => void;
  loadOrders: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  loadMore: () => Promise<void>;
  clearError: () => void;
}

export interface OrderHistoryHookReturn extends OrderHistoryState, OrderHistoryActions {
  // Computed values
  filteredOrders: AdminOrder[];
  orderCounts: Record<OrderStatus, number>;
  totalRevenue: number;
  averageOrderValue: number;
  
  // Utility functions
  exportOrders: (format: 'csv' | 'json') => Promise<void>;
  getOrderById: (id: string) => AdminOrder | undefined;
}

export interface OrderHistoryCardProps {
  order: AdminOrder;
  onViewDetails: (order: AdminOrder) => void;
  isReadOnly?: boolean;
}

export interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: AdminOrder | null;
  isReadOnly?: boolean;
}

export interface OrderHistoryFiltersProps {
  filters: OrderHistoryFilters;
  onFiltersChange: (filters: Partial<OrderHistoryFilters>) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}
