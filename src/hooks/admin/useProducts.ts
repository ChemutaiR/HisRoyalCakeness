// Admin products hooks - React hooks for product management

import { useState, useEffect, useCallback } from 'react';
// import { useAdminProductsStore } from '@/store/slices/admin/products';
import { 
  useAdminProducts,
  useAdminProductsLoading,
  useAdminProductsError,
  useSelectedAdminProduct,
  useActiveAdminProducts,
  useAdminProductsBySearch,
  useAdminProductsStats,
  useAdminProductsActions,
  // useAdminProductById
} from '@/store/selectors/admin/products';
import { AdminProductsService, type ProductFilters, type ProductStats } from '@/services/admin/products';
import { ShopSyncService } from '@/services/admin/shopSync';
import { type AdminProduct } from '@/store/slices/admin/products';

export interface UseProductsReturn {
  // Data
  products: AdminProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: AdminProduct | null;
  stats: ProductStats | null;
  
  // Actions
  loadProducts: () => Promise<void>;
  createProduct: (productData: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  selectProduct: (product: AdminProduct | null) => void;
  clearError: () => void;
  
  // Search and filters
  searchProducts: (filters: ProductFilters) => Promise<void>;
  getProductById: (id: string) => AdminProduct | undefined;
  
  // Utility
  validateProduct: (productData: Partial<AdminProduct>) => { isValid: boolean; errors: string[] };
  getAvailableCreamOptions: () => Promise<string[]>;
  getAvailableTinOptions: () => Promise<string[]>;
}

export function useProducts(): UseProductsReturn {
  // Store state
  const products = useAdminProducts();
  const loading = useAdminProductsLoading();
  const error = useAdminProductsError();
  const selectedProduct = useSelectedAdminProduct();
  const stats = useAdminProductsStats();
  
  // Store actions
  const {
    setProducts,
    setLoading,
    setError,
    setSelectedProduct,
    addProduct,
    updateProduct: updateProductStore,
    deleteProduct: deleteProductStore,
    loadProducts: _loadProductsStore,
    clearError
  } = useAdminProductsActions();

  // Local state
  const [_searchFilters, _setSearchFilters] = useState<ProductFilters>({});

  // Load products from service
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productsData = await AdminProductsService.getAllProducts();
      setProducts(productsData);
      // Initial sync to shop catalog after load
      await ShopSyncService.syncAllProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [setProducts, setLoading, setError]);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Create new product
  const createProduct = useCallback(async (productData: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate product data
      const validation = AdminProductsService.validateProduct(productData);
      if (!validation.isValid) {
        setError(`Validation failed: ${validation.errors.join(', ')}`);
        return;
      }
      
      // Create product via service
      const created = await AdminProductsService.createProduct(productData);
      
      // Add created product (with id) to store
      addProduct(created);
      
      // Sync to shop catalog
      await ShopSyncService.syncProduct(created);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setLoading(false);
    }
  }, [addProduct, setLoading, setError]);

  // Update existing product
  const updateProduct = useCallback(async (id: string, updates: Partial<AdminProduct>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Update via service
      const updatedProduct = await AdminProductsService.updateProduct(id, updates);
      
      if (!updatedProduct) {
        setError('Product not found');
        return;
      }
      
      // Update in store
      updateProductStore(id, updates);
      
      // Sync the updated product to shop catalog
      await ShopSyncService.syncProduct(updatedProduct);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setLoading(false);
    }
  }, [updateProductStore, setLoading, setError]);

  // Delete product
  const deleteProduct = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Delete via service
      const success = await AdminProductsService.deleteProduct(id);
      
      if (!success) {
        setError('Failed to delete product');
        return;
      }
      
      // Remove from store
      deleteProductStore(id);
      
      // Remove from shop catalog
      await ShopSyncService.removeFromShop(id);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  }, [deleteProductStore, setLoading, setError]);

  // Search products with filters
  const searchProducts = useCallback(async (filters: ProductFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const searchResults = await AdminProductsService.searchProducts(filters);
      setProducts(searchResults);
      _setSearchFilters(filters);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search products');
    } finally {
      setLoading(false);
    }
  }, [setProducts, setLoading, setError]);

  // Get product by ID
  const getProductById = useCallback((id: string) => {
    return products.find((p: AdminProduct) => p.id === id) || null;
  }, [products]);

  // Select product
  const selectProduct = useCallback((product: AdminProduct | null) => {
    setSelectedProduct(product);
  }, [setSelectedProduct]);

  // Validate product data
  const validateProduct = useCallback((productData: Partial<AdminProduct>) => {
    return AdminProductsService.validateProduct(productData);
  }, []);

  // Get available cream options
  const getAvailableCreamOptions = useCallback(async () => {
    return await AdminProductsService.getAvailableCreamOptions();
  }, []);

  // Get available tin options
  const getAvailableTinOptions = useCallback(async () => {
    return await AdminProductsService.getAvailableTinOptions();
  }, []);

  return {
    // Data
    products,
    loading,
    error,
    selectedProduct,
    stats,
    
    // Actions
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    selectProduct,
    clearError,
    
    // Search and filters
    searchProducts,
    getProductById,
    
    // Utility
    validateProduct,
    getAvailableCreamOptions,
    getAvailableTinOptions
  };
}

// Specialized hooks for specific use cases
export function useActiveProducts() {
  return useActiveAdminProducts();
}

export function useProductSearch(searchTerm: string) {
  return useAdminProductsBySearch(searchTerm);
}

export function useProductStats() {
  return useAdminProductsStats();
}
