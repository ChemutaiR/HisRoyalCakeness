import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { cakeCatalog } from '@/mockDatabase/shop/catalog';
import { type Cake } from '@/types/shop/catalog';

export interface CatalogState {
  // State
  cakes: Cake[];
  loading: boolean;
  error: string | null;
  filters: {
    priceRange?: [number, number];
    searchTerm?: string;
    featured?: boolean;
  };
  selectedCake: Cake | null;
  
  // Caching and pagination
  cache: {
    lastUpdated: number;
    data: Cake[];
  };
  page: number;
  pageSize: number;
  totalPages: number;
  
  // Actions
  setCakes: (cakes: Cake[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<CatalogState['filters']>) => void;
  setSelectedCake: (cake: Cake | null) => void;
  clearFilters: () => void;
  loadCakes: () => Promise<void>;
  setPage: (page: number) => void;
  clearCache: () => void;
}

export const useCatalogStore = create<CatalogState>()(
  devtools(
    (set, get) => ({
      // Initial state
      cakes: [],
      loading: false,
      error: null,
      filters: {},
      selectedCake: null,
      
      // Caching and pagination
      cache: {
        lastUpdated: 0,
        data: []
      },
      page: 1,
      pageSize: 50,
      totalPages: 0,

      // Actions
      setCakes: (cakes) => set({ cakes }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      setSelectedCake: (cake) => set({ selectedCake: cake }),
      clearFilters: () => set({ filters: {} }),
      
      // Load cakes from admin products (auto-sync)
      loadCakes: async () => {
        const state = get();
        const now = Date.now();
        const cacheExpiry = 5 * 60 * 1000; // 5 minutes
        
        // Check if we have fresh cached data
        if (state.cache.data.length > 0 && 
            (now - state.cache.lastUpdated) < cacheExpiry) {
          // Use cached data with pagination
          const startIndex = (state.page - 1) * state.pageSize;
          const endIndex = startIndex + state.pageSize;
          const paginatedCakes = state.cache.data.slice(startIndex, endIndex);
          
          set({ 
            cakes: paginatedCakes, 
            loading: false,
            totalPages: Math.ceil(state.cache.data.length / state.pageSize)
          });
          return;
        }
        
        set({ loading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Try to get data from admin products first
          try {
            const { useAdminProductsStore } = await import('@/store/slices/admin/products');
            const { adminProductsToShop } = await import('@/utils/admin/dataTransform');
            const { AdminProductsService } = await import('@/services/admin/products');
            
            // Load admin products if not already loaded
            const adminStore = useAdminProductsStore.getState();
            let adminProducts = adminStore.products;
            
            if (adminProducts.length === 0) {
              // Load admin products from service
              adminProducts = await AdminProductsService.getAllProducts();
              adminStore.setProducts(adminProducts);
            }
            
            let shopCakes: Cake[];
            if (adminProducts.length > 0) {
              // Use admin products data
              shopCakes = adminProductsToShop(adminProducts);
            } else {
              // Fallback to mock data
              shopCakes = cakeCatalog;
            }
            
            // Cache the data and apply pagination
            const startIndex = (state.page - 1) * state.pageSize;
            const endIndex = startIndex + state.pageSize;
            const paginatedCakes = shopCakes.slice(startIndex, endIndex);
            
            set({ 
              cakes: paginatedCakes, 
              loading: false,
              cache: {
                lastUpdated: now,
                data: shopCakes
              },
              totalPages: Math.ceil(shopCakes.length / state.pageSize)
            });
          } catch (syncError) {
            // Fallback to mock data if sync fails
            const startIndex = (state.page - 1) * state.pageSize;
            const endIndex = startIndex + state.pageSize;
            const paginatedCakes = cakeCatalog.slice(startIndex, endIndex);
            
            set({ 
              cakes: paginatedCakes, 
              loading: false,
              cache: {
                lastUpdated: now,
                data: cakeCatalog
              },
              totalPages: Math.ceil(cakeCatalog.length / state.pageSize)
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to load cakes',
            loading: false 
          });
        }
      },
      
      // Pagination
      setPage: (page: number) => {
        const state = get();
        const startIndex = (page - 1) * state.pageSize;
        const endIndex = startIndex + state.pageSize;
        const paginatedCakes = state.cache.data.slice(startIndex, endIndex);
        
        set({ 
          page, 
          cakes: paginatedCakes 
        });
      },
      
      // Clear cache
      clearCache: () => {
        set({
          cache: {
            lastUpdated: 0,
            data: []
          }
        });
      }
    }),
    { name: 'catalog-store' }
  )
);
