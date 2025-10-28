// Custom hook for order management

import { useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '@/types/orders/order';
import { orderService } from '@/services/admin/orders';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedOrders = await orderService.getAllOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch orders by status
  const fetchOrdersByStatus = useCallback(async (status: OrderStatus) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedOrders = await orderService.getOrdersByStatus(status);
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update order status
  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus, notes?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, status, notes);
      setOrders(prevOrders => 
        prevOrders.map(order => order.id === orderId ? updatedOrder : order)
      );
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get order by ID
  const getOrderById = useCallback(async (orderId: string) => {
    try {
      return await orderService.getOrderById(orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
      return null;
    }
  }, []);

  // Update payment info
  const updatePaymentInfo = useCallback(async (orderId: string, transactionId: string, status: 'partial' | 'completed') => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderService.updatePaymentInfo(orderId, transactionId, status);
      setOrders(prevOrders => 
        prevOrders.map(order => order.id === orderId ? updatedOrder : order)
      );
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment info');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get orders by status (computed)
  const getOrdersByStatus = useCallback((status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  // Get order statistics
  const getOrderStats = useCallback(() => {
    const stats = {
      total: orders.length,
      received: orders.filter(o => o.status === 'received').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length,
      dispatched: orders.filter(o => o.status === 'dispatched').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };
    return stats;
  }, [orders]);

  // Load orders on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    fetchOrdersByStatus,
    updateOrderStatus,
    getOrderById,
    updatePaymentInfo,
    getOrdersByStatus,
    getOrderStats,
  };
}
