import { useCatalogStore } from '@/store/slices/shop/catalog';
import { getCakePrice, getCakeServings } from '@/mockDatabase/shop/catalog';
import { type Cake } from '@/types/shop/catalog';

export interface UseProductDetailsReturn {
  cake: Cake | null;
  loading: boolean;
  error: string | null;
  getPrice: (weight: string) => number | undefined;
  getServings: (weight: string) => number | undefined;
  availableWeights: string[];
}

export function useProductDetails(cakeId: number): UseProductDetailsReturn {
  // Use centralized store instead of local state
  const { cakes, loading, error } = useCatalogStore();
  
  // Find the specific cake from the store
  const cake = cakes.find(c => c.id === cakeId) || null;

  const getPrice = (weight: string): number | undefined => {
    return getCakePrice(cakeId, weight);
  };

  const getServings = (weight: string): number | undefined => {
    return getCakeServings(cakeId, weight);
  };

  const availableWeights = cake?.prices.map(p => p.weight) || [];

  return {
    cake,
    loading,
    error,
    getPrice,
    getServings,
    availableWeights
  };
}
