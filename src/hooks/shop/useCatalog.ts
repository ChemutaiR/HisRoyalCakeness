import { useEffect } from 'react';
import { useCatalogStore } from '@/store/slices/shop/catalog';
import { getCakeById, getFeaturedCakes } from '@/mockDatabase/shop/catalog';
import { type Cake } from '@/types/shop/catalog';

export interface CatalogFilters {
  priceRange?: [number, number];
  searchTerm?: string;
  featured?: boolean;
}

export interface UseCatalogReturn {
  cakes: Cake[];
  loading: boolean;
  error: string | null;
  filters: CatalogFilters;
  setFilters: (filters: CatalogFilters) => void;
  clearFilters: () => void;
  getCakeById: (id: number) => Cake | undefined;
  getFeaturedCakes: () => Cake[];
}

export function useCatalog(): UseCatalogReturn {
  // Use centralized store instead of local state
  const { cakes, loading, error, filters, setFilters, clearFilters, loadCakes } = useCatalogStore();

  // Load cakes on mount
  useEffect(() => {
    loadCakes();
  }, [loadCakes]);

  return {
    cakes,
    loading,
    error,
    filters,
    setFilters,
    clearFilters,
    getCakeById: (id: number) => getCakeById(id),
    getFeaturedCakes: () => getFeaturedCakes()
  };
}
