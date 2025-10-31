"use client";

import { useState, useCallback, useEffect, useMemo } from 'react';
import { AdminOrder } from '@/types/admin/orders';
import { adminOrderServiceWithReferences } from '@/mockDatabase/admin/services/orderServiceWithReferences';

/**
 * Hook for managing order history data, filtering, and statistics
 */
export function useOrderHistory() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  // Load orders
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const deliveredOrders =
        adminOrderServiceWithReferences.getAdminOrdersByStatus('delivered');
      setOrders(deliveredOrders);
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

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchableText = [
          order.id,
          order.orderNumber,
          order.customerName,
          order.customerEmail,
          order.cake,
          order.cream,
          order.topping,
        ]
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      // Date range filter
      if (dateFrom) {
        const orderDate = new Date(order.deliveryDate);
        if (orderDate < dateFrom) {
          return false;
        }
      }

      if (dateTo) {
        const orderDate = new Date(order.deliveryDate);
        if (orderDate > dateTo) {
          return false;
        }
      }

      return true;
    });
  }, [orders, searchQuery, dateFrom, dateTo]);

  // Calculate statistics
  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  }, [filteredOrders]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setDateFrom(undefined);
    setDateTo(undefined);
  }, []);

  const hasActiveFilters = !!(searchQuery || dateFrom || dateTo);

  return {
    orders,
    filteredOrders,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    totalRevenue,
    loadOrders,
    handleClearFilters,
    hasActiveFilters,
  };
}

