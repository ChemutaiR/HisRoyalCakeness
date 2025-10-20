import { useMemo } from 'react';
import { useCatalogStore } from '../../slices/shop/catalog';

// Basic selectors
export const useCatalogCakes = () => useCatalogStore((state: any) => state.cakes);
export const useCatalogLoading = () => useCatalogStore((state: any) => state.loading);
export const useCatalogError = () => useCatalogStore((state: any) => state.error);
export const useCatalogFilters = () => useCatalogStore((state: any) => state.filters);
export const useSelectedCake = () => useCatalogStore((state: any) => state.selectedCake);

// Computed selectors
export const useFeaturedCakes = () => 
  useCatalogStore((state: any) => state.cakes.filter((cake: any) => cake.featured));


export const useCakeById = (id: number) => 
  useCatalogStore((state: any) => state.cakes.find((cake: any) => cake.id === id));

export const useFilteredCakes = () => {
  return useCatalogStore((state: any) => {
    const { cakes, filters } = state;
    let filtered = [...cakes];

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter((cake: any) => 
        cake.name.toLowerCase().includes(searchLower) ||
        cake.description.toLowerCase().includes(searchLower)
      );
    }


    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter((cake: any) => {
        const minPrice = Math.min(...cake.prices.map((p: any) => p.amount));
        return minPrice >= filters.priceRange![0] && minPrice <= filters.priceRange![1];
      });
    }

    // Filter by featured
    if (filters.featured !== undefined) {
      filtered = filtered.filter((cake: any) => cake.featured === filters.featured);
    }

    return filtered;
  });
};

// Action selectors
export const useCatalogActions = () => {
  const store = useCatalogStore();
  
  return useMemo(() => ({
    setCakes: store.setCakes,
    setLoading: store.setLoading,
    setError: store.setError,
    setFilters: store.setFilters,
    setSelectedCake: store.setSelectedCake,
    clearFilters: store.clearFilters,
    loadCakes: store.loadCakes
  }), [store]);
};

// Stats selectors
export const useCatalogStats = () => {
  const cakes = useCatalogStore((state: any) => state.cakes);
  
  return useMemo(() => {
    const featuredCount = cakes.filter((cake: any) => cake.featured).length;
    const totalCakes = cakes.length;
    
    return {
      totalCakes,
      featuredCount
    };
  }, [cakes]);
};

