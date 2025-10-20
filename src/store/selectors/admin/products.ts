import { useMemo } from 'react';
import { useAdminProductsStore } from '../../slices/admin/products';

// Basic selectors
export const useAdminProducts = () => useAdminProductsStore((state: any) => state.products);
export const useAdminProductsLoading = () => useAdminProductsStore((state: any) => state.loading);
export const useAdminProductsError = () => useAdminProductsStore((state: any) => state.error);
export const useSelectedAdminProduct = () => useAdminProductsStore((state: any) => state.selectedProduct);

// Filtered selectors
export const useActiveAdminProducts = () => 
  useAdminProductsStore((state: any) => state.products.filter((product: any) => product.isActive));

export const useInactiveAdminProducts = () => 
  useAdminProductsStore((state: any) => state.products.filter((product: any) => !product.isActive));

// Search and filter selectors
export const useAdminProductsBySearch = (searchTerm: string) =>
  useAdminProductsStore((state: any) => {
    if (!searchTerm.trim()) return state.products;
    
    const term = searchTerm.toLowerCase();
    return state.products.filter((product: any) =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  });

export const useAdminProductsByCreamOption = (creamOption: string) =>
  useAdminProductsStore((state: any) => 
    state.products.filter((product: any) => 
      product.whippingCreamOptions.includes(creamOption)
    )
  );

export const useAdminProductsByTinOption = (tinOption: string) =>
  useAdminProductsStore((state: any) => 
    state.products.filter((product: any) => 
      product.bakingTinOptions.includes(tinOption)
    )
  );

// Stats selectors
export const useAdminProductsStats = () => {
  const products = useAdminProductsStore((state: any) => state.products);
  
  return useMemo(() => {
    const activeCount = products.filter((p: any) => p.isActive).length;
    const inactiveCount = products.filter((p: any) => !p.isActive).length;
    const totalProducts = products.length;
    
    // Get unique cream options
    const allCreamOptions = products.flatMap((p: any) => p.whippingCreamOptions);
    const uniqueCreamOptions = Array.from(new Set(allCreamOptions)) as string[];
    
    // Get unique tin options
    const allTinOptions = products.flatMap((p: any) => p.bakingTinOptions);
    const uniqueTinOptions = Array.from(new Set(allTinOptions)) as string[];
    
    return {
      totalProducts,
      activeCount,
      inactiveCount,
      uniqueCreamOptions,
      uniqueTinOptions,
      creamOptionsCount: uniqueCreamOptions.length,
      tinOptionsCount: uniqueTinOptions.length
    };
  }, [products]);
};

// Action selectors
export const useAdminProductsActions = () => {
  const store = useAdminProductsStore();
  
  return useMemo(() => ({
    setProducts: store.setProducts,
    setLoading: store.setLoading,
    setError: store.setError,
    setSelectedProduct: store.setSelectedProduct,
    addProduct: store.addProduct,
    updateProduct: store.updateProduct,
    deleteProduct: store.deleteProduct,
    loadProducts: store.loadProducts,
    clearError: store.clearError
  }), [store]);
};

// Product by ID selector
export const useAdminProductById = (id: string) =>
  useAdminProductsStore((state: any) => 
    state.products.find((product: any) => product.id === id)
  );
