import { useAdminOrdersWithReferences } from './useAdminOrdersWithReferences';
import { AdminOrder } from '@/types/admin/orders';
import { OrderStatus } from '@/types/orders/orderWithReferences';

interface UseAdminOrdersReturn {
  // Data
  orders: AdminOrder[];
  ordersByStatus: Record<OrderStatus, AdminOrder[]>;
  
  // Loading States
  isLoading: boolean;
  isRefreshing: boolean;
  isUpdating: boolean;
  
  // Error Handling
  error: string | null;
  clearError: () => void;
  
  // Actions
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  getOrdersByStatus: (status: OrderStatus) => AdminOrder[];
  
  // Statistics
  orderCounts: Record<OrderStatus, number>;
  totalOrders: number;
}

/**
 * Custom hook for managing admin orders data
 * Now uses the reference-based service for single source of truth
 */
export function useAdminOrders(): UseAdminOrdersReturn {
  // Use the new reference-based hook
  const {
    adminOrders: orders,
    adminOrdersByStatus: ordersByStatus,
    isLoading,
    isRefreshing,
    isUpdating,
    error,
    clearError,
    refreshOrders,
    updateOrderStatus,
    getAdminOrdersByStatus: getOrdersByStatus,
    orderCounts,
    totalOrders,
  } = useAdminOrdersWithReferences();

  return {
    orders,
    ordersByStatus,
    isLoading,
    isRefreshing,
    isUpdating,
    error,
    clearError,
    refreshOrders,
    updateOrderStatus,
    getOrdersByStatus,
    orderCounts,
    totalOrders,
  };
}