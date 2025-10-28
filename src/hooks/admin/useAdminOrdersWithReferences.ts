/**
 * Enhanced Admin Orders Hook with Reference Resolution
 * 
 * This hook provides admin order management with automatic resolution of ID references
 * to full data objects using the centralized reference service.
 */

import { useMemo, useCallback, useEffect, useState } from 'react';
import { adminOrderServiceWithReferences } from '@/mockDatabase/admin/services/orderServiceWithReferences';
import { AdminOrder } from '@/types/admin/orders';
import { OrderWithReferences, OrderStatus, ResolvedOrder } from '@/types/orders/orderWithReferences';
import { unifiedApiService } from '@/services/api/unifiedApiService';
import { useWebSocket } from '@/hooks/api/useWebSocket';

interface UseAdminOrdersWithReferencesReturn {
  // Raw order data with ID references
  orders: OrderWithReferences[];
  ordersByStatus: Record<OrderStatus, OrderWithReferences[]>;
  
  // Resolved order data with full objects
  resolvedOrders: ResolvedOrder[];
  resolvedOrdersByStatus: Record<OrderStatus, ResolvedOrder[]>;
  
  // Legacy AdminOrder format for compatibility
  adminOrders: AdminOrder[];
  adminOrdersByStatus: Record<OrderStatus, AdminOrder[]>;
  
  // Loading and error states
  isLoading: boolean;
  isRefreshing: boolean;
  isUpdating: boolean;
  error: string | null;
  
  // Actions
  clearError: () => void;
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  getOrderById: (id: string) => OrderWithReferences | undefined;
  getResolvedOrderById: (id: string) => ResolvedOrder | undefined;
  getAdminOrderById: (id: string) => AdminOrder | undefined;
  
  // Filtering and search
  getOrdersByStatus: (status: OrderStatus) => OrderWithReferences[];
  getResolvedOrdersByStatus: (status: OrderStatus) => ResolvedOrder[];
  getAdminOrdersByStatus: (status: OrderStatus) => AdminOrder[];
  searchOrders: (query: string) => OrderWithReferences[];
  
  // Statistics
  orderCounts: Record<OrderStatus, number>;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export const useAdminOrdersWithReferences = (): UseAdminOrdersWithReferencesReturn => {
  const [orders, setOrders] = useState<OrderWithReferences[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await unifiedApiService.getAllOrders();
      if (response.success && response.data) {
        setOrders(response.data.orders);
      } else {
        setError(response.error || 'Failed to load orders');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // WebSocket for real-time updates
  const { isConnected: _isWebSocketConnected } = useWebSocket({
    onMessage: useCallback((message: any) => {
      // console.log('📨 WebSocket message received:', message);
      if (message.type === 'order_updated') {
        // Refresh orders when we receive an update
        loadOrders();
      }
    }, [loadOrders]),
    onError: useCallback((error: any) => {
      // console.error('WebSocket error:', error);
    }, [])
  });

  // Resolved orders with full data from references
  const resolvedOrders = useMemo(() => {
    return adminOrderServiceWithReferences.getResolvedOrders();
  }, []);

  // Legacy AdminOrder format for compatibility
  const adminOrders = useMemo(() => {
    return adminOrderServiceWithReferences.getAdminOrders();
  }, []);

  // Group orders by status
  const ordersByStatus = useMemo(() => {
    return orders.reduce((acc, order) => {
      (acc[order.status] = acc[order.status] || []).push(order);
      return acc;
    }, {} as Record<OrderStatus, OrderWithReferences[]>);
  }, [orders]);

  const resolvedOrdersByStatus = useMemo(() => {
    return resolvedOrders.reduce((acc, order) => {
      (acc[order.status] = acc[order.status] || []).push(order);
      return acc;
    }, {} as Record<OrderStatus, ResolvedOrder[]>);
  }, [resolvedOrders]);

  const adminOrdersByStatus = useMemo(() => {
    return adminOrders.reduce((acc, order) => {
      (acc[order.status as OrderStatus] = acc[order.status as OrderStatus] || []).push(order);
      return acc;
    }, {} as Record<OrderStatus, AdminOrder[]>);
  }, [adminOrders]);

  // Order counts by status
  const orderCounts = useMemo(() => {
    const statuses: OrderStatus[] = ['received', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
    return statuses.reduce((acc, status) => {
      acc[status] = ordersByStatus[status]?.length || 0;
      return acc;
    }, {} as Record<OrderStatus, number>);
  }, [ordersByStatus]);

  // Statistics
  const totalOrders = useMemo(() => orders.length, [orders]);
  const totalRevenue = useMemo(() => 
    orders.reduce((sum, order) => sum + order.total, 0), 
    [orders]
  );
  const averageOrderValue = useMemo(() => 
    totalOrders > 0 ? totalRevenue / totalOrders : 0, 
    [totalOrders, totalRevenue]
  );

  // Actions
  const refreshOrders = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    
    try {
      await loadOrders();
    } catch (err: any) {
      setError(err.message || 'Failed to refresh orders');
    } finally {
      setIsRefreshing(false);
    }
  }, [loadOrders]);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const response = await unifiedApiService.updateOrderStatus(id, status);
      if (response.success) {
        // Update successful - optimistic update already handled in UI
        // No need to refresh all orders to prevent page refresh
      } else {
        setError(response.error || 'Failed to update order status');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Getter functions
  const getOrderById = useCallback((id: string) => {
    return adminOrderServiceWithReferences.getOrderById(id);
  }, []);

  const getResolvedOrderById = useCallback((id: string) => {
    return adminOrderServiceWithReferences.getResolvedOrder(id);
  }, []);

  const getAdminOrderById = useCallback((id: string) => {
    return adminOrderServiceWithReferences.getAdminOrderById(id);
  }, []);

  const getOrdersByStatusFiltered = useCallback((status: OrderStatus) => {
    return ordersByStatus[status] || [];
  }, [ordersByStatus]);

  const getResolvedOrdersByStatusFiltered = useCallback((status: OrderStatus) => {
    return resolvedOrdersByStatus[status] || [];
  }, [resolvedOrdersByStatus]);

  const getAdminOrdersByStatusFiltered = useCallback((status: OrderStatus) => {
    return adminOrdersByStatus[status] || [];
  }, [adminOrdersByStatus]);

  const searchOrders = useCallback((query: string) => {
    return adminOrderServiceWithReferences.searchOrders(query);
  }, []);

  return {
    // Raw order data
    orders,
    ordersByStatus,
    
    // Resolved order data
    resolvedOrders,
    resolvedOrdersByStatus,
    
    // Legacy AdminOrder format
    adminOrders,
    adminOrdersByStatus,
    
    // Loading and error states
    isLoading,
    isRefreshing,
    isUpdating,
    error,
    
    // Actions
    clearError,
    refreshOrders,
    updateOrderStatus,
    getOrderById,
    getResolvedOrderById,
    getAdminOrderById,
    
    // Filtering and search
    getOrdersByStatus: getOrdersByStatusFiltered,
    getResolvedOrdersByStatus: getResolvedOrdersByStatusFiltered,
    getAdminOrdersByStatus: getAdminOrdersByStatusFiltered,
    searchOrders,
    
    // Statistics
    orderCounts,
    totalOrders,
    totalRevenue,
    averageOrderValue,
  };
};
