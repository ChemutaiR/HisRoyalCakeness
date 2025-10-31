"use client";

import { useMemo, useState } from 'react';
import { AdminProduct } from '@/store/slices/admin/products';
import { filterProducts, calculateProductStats } from '@/utils/products/search';

interface UseProductsListProps {
  products: AdminProduct[];
  initialSearchTerm?: string;
}

/**
 * Hook for managing product list data fetching, filtering, and search
 */
export function useProductsList({
  products,
  initialSearchTerm = '',
}: UseProductsListProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Memoized filtering and statistics
  const { filteredProducts, totalProducts, filteredCount, isSearching } = useMemo(() => {
    const filtered = filterProducts(products, searchTerm);
    const stats = calculateProductStats(products, filtered, searchTerm);
    
    return {
      filteredProducts: filtered,
      ...stats,
    };
  }, [products, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    clearSearch,
    filteredProducts,
    totalProducts,
    filteredCount,
    isSearching,
  };
}

