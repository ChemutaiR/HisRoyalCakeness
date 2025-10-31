"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { AdminOrder } from '@/types/admin';
import { isUrgent, isOverdue } from '@/utils/orders/dateCalculations';

/**
 * Hook for detecting and tracking urgent orders
 */
export function useUrgentOrders(orders: AdminOrder[]) {
  const [urgentOrders, setUrgentOrders] = useState<AdminOrder[]>([]);
  const [showUrgentAlert, setShowUrgentAlert] = useState(false);

  useEffect(() => {
    const urgent = orders.filter(order => 
      order.status !== 'delivered' && 
      (isUrgent(order.dueDate) || isOverdue(order.dueDate))
    );
    
    setUrgentOrders(urgent);
    
    // Show alert if there are urgent orders
    if (urgent.length > 0) {
      setShowUrgentAlert(true);
    }
  }, [orders]);

  const hasUrgentOrders = useMemo(() => urgentOrders.length > 0, [urgentOrders]);

  const dismissAlert = useCallback(() => {
    setShowUrgentAlert(false);
  }, []);

  return {
    urgentOrders,
    showUrgentAlert,
    hasUrgentOrders,
    dismissAlert,
  };
}

