"use client";

import { useState, useCallback } from 'react';
import { OrderStatus } from '@/types/orders/order';

interface UseOrderStatusProps {
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  isUpdating: boolean;
}

/**
 * Hook for managing order status updates with optimistic UI
 */
export function useOrderStatus({ updateOrderStatus, isUpdating }: UseOrderStatusProps) {
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [optimisticUpdates, setOptimisticUpdates] = useState<Map<string, OrderStatus>>(new Map());

  const moveOrder = useCallback(async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    
    // Optimistic update - immediately show the change in UI
    setOptimisticUpdates(prev => new Map(prev.set(orderId, newStatus)));
    
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(orderId);
        return newMap;
      });
      // Error feedback
      alert(`Failed to update order status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUpdatingOrderId(null);
    }
  }, [updateOrderStatus]);

  const getEffectiveStatus = useCallback((orderId: string, actualStatus: OrderStatus): OrderStatus => {
    return optimisticUpdates.get(orderId) || actualStatus;
  }, [optimisticUpdates]);

  const clearOptimisticUpdates = useCallback(() => {
    setOptimisticUpdates(new Map());
  }, []);

  const isOrderUpdating = useCallback((orderId: string): boolean => {
    return updatingOrderId === orderId || isUpdating;
  }, [updatingOrderId, isUpdating]);

  return {
    moveOrder,
    getEffectiveStatus,
    clearOptimisticUpdates,
    isOrderUpdating,
    optimisticUpdates,
  };
}

