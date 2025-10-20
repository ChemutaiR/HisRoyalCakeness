import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  prices: Array<{
    weight: string;
    amount: number;
    servings: number;
  }>;
  whippingCreamOptions: string[];
  bakingTinOptions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProductsState {
  // State
  products: AdminProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: AdminProduct | null;
  
  // Actions
  setProducts: (products: AdminProduct[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedProduct: (product: AdminProduct | null) => void;
  
  // CRUD Operations
  addProduct: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  
  // Utility Actions
  loadProducts: () => Promise<void>;
  clearError: () => void;
}

export const useAdminProductsStore = create<AdminProductsState>()(
  devtools(
    (set, get) => ({
      // Initial state
      products: [],
      loading: false,
      error: null,
      selectedProduct: null,

      // Actions
      setProducts: (products: AdminProduct[]) => set({ products }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      setSelectedProduct: (product: AdminProduct | null) => set({ selectedProduct: product }),

      // CRUD Operations
      addProduct: (productData: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newProduct: AdminProduct = {
          ...productData,
          id: `prod${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state: any) => ({
          products: [...state.products, newProduct]
        }));

        // Auto-sync to shop catalog with error handling
        import('@/services/admin/shopSync').then(({ ShopSyncService }) => {
          ShopSyncService.syncAllProducts().then((result) => {
            if (!result.success) {
              set({ error: 'Auto-sync failed' });
            }
          }).catch(() => {
            set({ error: 'Auto-sync error' });
          });
        });
      },

      updateProduct: (id: string, updates: Partial<AdminProduct>) => {
        set((state: any) => ({
          products: state.products.map((product: AdminProduct) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date().toISOString() }
              : product
          )
        }));

        // Auto-sync to shop catalog with error handling
        import('@/services/admin/shopSync').then(({ ShopSyncService }) => {
          ShopSyncService.syncAllProducts().then((result) => {
            if (!result.success) {
              set({ error: 'Auto-sync failed' });
            }
          }).catch(() => {
            set({ error: 'Auto-sync error' });
          });
        });
      },

      deleteProduct: (id: string) => {
        set((state: any) => ({
          products: state.products.filter((product: AdminProduct) => product.id !== id)
        }));

        // Auto-sync to shop catalog with error handling
        import('@/services/admin/shopSync').then(({ ShopSyncService }) => {
          ShopSyncService.syncAllProducts().then((result) => {
            if (!result.success) {
              set({ error: 'Auto-sync failed' });
            }
          }).catch(() => {
            set({ error: 'Auto-sync error' });
          });
        });
      },

      // Utility Actions
      loadProducts: async () => {
        set({ loading: true, error: null });
        try {
          // Simulate API call - in real app, this would fetch from backend
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // For now, we'll use empty array - will be populated by mock database
          set({ products: [], loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to load products',
            loading: false 
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    { name: 'admin-products-store' }
  ));
