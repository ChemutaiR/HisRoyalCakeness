/**
 * Delivered Orders Hook
 * 
 * Manages state and actions for delivered orders history
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { AdminOrder } from '@/types/admin/orders';
import { OrderHistoryFilters, OrderHistoryPagination } from '@/types/admin/orderHistory';
import { unifiedHistoryApiService } from '@/services/api/unifiedHistoryApiService';

interface UseDeliveredOrdersOptions {
  initialFilters?: Partial<OrderHistoryFilters>;
  initialPagination?: Partial<OrderHistoryPagination>;
  autoLoad?: boolean;
}

export function useDeliveredOrders(options: UseDeliveredOrdersOptions = {}) {
  const {
    initialFilters = {},
    initialPagination = { page: 1, limit: 20, hasMore: false, total: 0 },
    autoLoad = true
  } = options;

  // State
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<OrderHistoryFilters>({
    dateFrom: '',
    dateTo: '',
    customerName: '',
    customerEmail: '',
    minTotal: undefined,
    maxTotal: undefined,
    searchQuery: '',
    ...initialFilters
  });
  const [pagination, setPagination] = useState<OrderHistoryPagination>({
    page: 1,
    limit: 20,
    hasMore: false,
    total: 0,
    ...initialPagination
  });

  // Load orders
  const loadOrders = useCallback(async (resetPagination = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const currentPage = resetPagination ? 1 : pagination.page;
      
      const response = await unifiedHistoryApiService.getDeliveredOrders({
        status: 'delivered',
        filters,
        pagination: {
          page: currentPage,
          limit: pagination.limit
        },
        sort: {
          field: 'deliveryDate',
          direction: 'desc'
        }
      });

      if (response.success && response.data) {
        if (resetPagination) {
          setOrders(response.data.orders);
        } else {
          setOrders(prev => [...prev, ...response.data!.orders]);
        }
        
        setPagination({
          page: response.data.pagination.page,
          limit: response.data.pagination.limit,
          hasMore: response.data.pagination.hasMore,
          total: response.data.pagination.total
        });
      } else {
        setError(response.error || 'Failed to load orders');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, isLoading]);

  // Refresh orders
  const refreshOrders = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setError(null);

    try {
      const response = await unifiedHistoryApiService.getDeliveredOrders({
        status: 'delivered',
        filters,
        pagination: {
          page: 1,
          limit: pagination.limit
        },
        sort: {
          field: 'deliveryDate',
          direction: 'desc'
        }
      });

      if (response.success && response.data) {
        setOrders(response.data.orders);
        setPagination({
          page: 1,
          limit: response.data.pagination.limit,
          hasMore: response.data.pagination.hasMore,
          total: response.data.pagination.total
        });
      } else {
        setError(response.error || 'Failed to refresh orders');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to refresh orders');
    } finally {
      setIsRefreshing(false);
    }
  }, [filters, pagination.limit, isRefreshing]);

  // Load more orders
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !pagination.hasMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const nextPage = pagination.page + 1;
      
      const response = await unifiedHistoryApiService.getDeliveredOrders({
        status: 'delivered',
        filters,
        pagination: {
          page: nextPage,
          limit: pagination.limit
        },
        sort: {
          field: 'deliveryDate',
          direction: 'desc'
        }
      });

      if (response.success && response.data) {
        setOrders(prev => [...prev, ...response.data!.orders]);
        setPagination(prev => ({
          ...prev,
          page: response.data!.pagination.page,
          hasMore: response.data!.pagination.hasMore,
          total: response.data!.pagination.total
        }));
      } else {
        setError(response.error || 'Failed to load more orders');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load more orders');
    } finally {
      setIsLoadingMore(false);
    }
  }, [filters, pagination, isLoadingMore]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<OrderHistoryFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1, hasMore: false }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      customerName: '',
      customerEmail: '',
      minTotal: undefined,
      maxTotal: undefined,
      searchQuery: ''
    });
    setPagination(prev => ({ ...prev, page: 1, hasMore: false }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get order by ID
  const getOrderById = useCallback((id: string): AdminOrder | undefined => {
    return orders.find(order => order.id === id);
  }, [orders]);

  // Export orders
  const exportOrders = useCallback(async (format: 'csv' | 'json') => {
    try {
      const response = await unifiedHistoryApiService.exportOrders({
        format,
        filters
      });

      if (response.success && response.data) {
        // Create download link
        const link = document.createElement('a');
        link.href = response.data.downloadUrl;
        link.download = response.data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(response.error || 'Failed to export orders');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to export orders');
    }
  }, [filters]);

  // Computed values
  const filteredOrders = useMemo(() => {
    return orders; // Orders are already filtered by the API
  }, [orders]);

  const orderCounts = useMemo(() => {
    return {
      delivered: orders.length,
      received: 0,
      ready: 0,
      confirmed: 0,
      preparing: 0,
      dispatched: 0,
      cancelled: 0
    };
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }, [orders]);

  const averageOrderValue = useMemo(() => {
    return orders.length > 0 ? totalRevenue / orders.length : 0;
  }, [orders, totalRevenue]);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad) {
      loadOrders(true);
    }
  }, [autoLoad, loadOrders]);

  // Reload when filters change
  useEffect(() => {
    if (autoLoad) {
      loadOrders(true);
    }
  }, [filters, autoLoad, loadOrders]);

  return {
    // Data
    orders: filteredOrders,
    orderCounts,
    totalRevenue,
    averageOrderValue,
    
    // Loading states
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    
    // Filters and pagination
    filters,
    pagination,
    
    // Actions
    loadOrders,
    refreshOrders,
    loadMore,
    updateFilters,
    clearFilters,
    clearError,
    getOrderById,
    exportOrders
  };
}
