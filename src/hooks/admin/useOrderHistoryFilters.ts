/**
 * Order History Filters Hook
 * 
 * Manages filter state and validation for order history
 */

import { useState, useCallback, useMemo } from 'react';
import { OrderHistoryFilters } from '@/types/admin/orderHistory';

interface UseOrderHistoryFiltersOptions {
  initialFilters?: Partial<OrderHistoryFilters>;
  onFiltersChange?: (filters: OrderHistoryFilters) => void;
}

export function useOrderHistoryFilters(options: UseOrderHistoryFiltersOptions = {}) {
  const { initialFilters = {}, onFiltersChange } = options;

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

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<OrderHistoryFilters>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      onFiltersChange?.(updated);
      return updated;
    });
  }, [onFiltersChange]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    const cleared = {
      dateFrom: '',
      dateTo: '',
      customerName: '',
      customerEmail: '',
      minTotal: undefined,
      maxTotal: undefined,
      searchQuery: ''
    };
    setFilters(cleared);
    onFiltersChange?.(cleared);
  }, [onFiltersChange]);

  // Clear specific filter
  const clearFilter = useCallback((filterKey: keyof OrderHistoryFilters) => {
    updateFilters({ [filterKey]: filterKey.includes('Total') ? undefined : '' });
  }, [updateFilters]);

  // Validate filters
  const validation = useMemo(() => {
    const errors: Partial<Record<keyof OrderHistoryFilters, string>> = {};

    // Date range validation
    if (filters.dateFrom && filters.dateTo) {
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);
      
      if (fromDate > toDate) {
        errors.dateTo = 'End date must be after start date';
      }
    }

    // Total amount validation
    if (filters.minTotal !== undefined && filters.maxTotal !== undefined) {
      if (filters.minTotal > filters.maxTotal) {
        errors.maxTotal = 'Maximum total must be greater than minimum total';
      }
    }

    // Email validation
    if (filters.customerEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(filters.customerEmail)) {
        errors.customerEmail = 'Please enter a valid email address';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [filters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => 
      value !== undefined && value !== '' && value !== null
    );
  }, [filters]);

  // Get filter summary
  const filterSummary = useMemo(() => {
    const activeFilters: string[] = [];

    if (filters.dateFrom) activeFilters.push(`From: ${filters.dateFrom}`);
    if (filters.dateTo) activeFilters.push(`To: ${filters.dateTo}`);
    if (filters.customerName) activeFilters.push(`Customer: ${filters.customerName}`);
    if (filters.customerEmail) activeFilters.push(`Email: ${filters.customerEmail}`);
    if (filters.minTotal) activeFilters.push(`Min: KES ${filters.minTotal}`);
    if (filters.maxTotal) activeFilters.push(`Max: KES ${filters.maxTotal}`);
    if (filters.searchQuery) activeFilters.push(`Search: ${filters.searchQuery}`);

    return activeFilters;
  }, [filters]);

  // Reset to initial filters
  const resetFilters = useCallback(() => {
    const reset = {
      dateFrom: '',
      dateTo: '',
      customerName: '',
      customerEmail: '',
      minTotal: undefined,
      maxTotal: undefined,
      searchQuery: '',
      ...initialFilters
    };
    setFilters(reset);
    onFiltersChange?.(reset);
  }, [initialFilters, onFiltersChange]);

  return {
    filters,
    updateFilters,
    clearFilters,
    clearFilter,
    resetFilters,
    validation,
    hasActiveFilters,
    filterSummary
  };
}
