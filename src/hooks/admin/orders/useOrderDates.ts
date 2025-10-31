"use client";

import { useCallback } from 'react';
import { getDaysUntilDue, isUrgent, isOverdue, getDateStatus, DateStatus } from '@/utils/orders/dateCalculations';

/**
 * Hook for order date calculations
 * Provides memoized date calculation functions
 */
export function useOrderDates() {
  const calculateDaysUntilDue = useCallback((dueDate: string): number => {
    return getDaysUntilDue(dueDate);
  }, []);

  const checkIsUrgent = useCallback((dueDate: string): boolean => {
    return isUrgent(dueDate);
  }, []);

  const checkIsOverdue = useCallback((dueDate: string): boolean => {
    return isOverdue(dueDate);
  }, []);

  const calculateDateStatus = useCallback((dueDate: string): DateStatus => {
    return getDateStatus(dueDate);
  }, []);

  return {
    getDaysUntilDue: calculateDaysUntilDue,
    isUrgent: checkIsUrgent,
    isOverdue: checkIsOverdue,
    getDateStatus: calculateDateStatus,
  };
}

