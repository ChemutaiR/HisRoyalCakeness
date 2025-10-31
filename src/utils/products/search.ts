/**
 * Product Search and Filter Utilities
 * 
 * Utility functions for searching and filtering products
 */

import { AdminProduct } from '@/store/slices/admin/products';

/**
 * Normalize search term for consistent matching
 */
export function normalizeSearchTerm(term: string): string {
  return term.toLowerCase().trim();
}

/**
 * Filter products based on search term
 * Searches in product name and description
 */
export function filterProducts(
  products: AdminProduct[],
  searchTerm: string
): AdminProduct[] {
  if (!searchTerm.trim()) {
    return products;
  }

  const normalizedTerm = normalizeSearchTerm(searchTerm);
  
  return products.filter(product =>
    normalizeSearchTerm(product.name).includes(normalizedTerm) ||
    normalizeSearchTerm(product.description || '').includes(normalizedTerm)
  );
}

/**
 * Calculate filtered product statistics
 */
export function calculateProductStats(
  products: AdminProduct[],
  filteredProducts: AdminProduct[],
  searchTerm: string
) {
  return {
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    isSearching: searchTerm.trim().length > 0,
  };
}

