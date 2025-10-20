import { type Cake } from '@/types/shop/catalog';

export interface ProductFilters {
  priceRange?: [number, number];
  searchTerm?: string;
  featured?: boolean;
  sortBy?: 'name' | 'price' | 'featured';
  sortOrder?: 'asc' | 'desc';
}

export function applyProductFilters(products: Cake[], filters: ProductFilters): Cake[] {
  let filteredProducts = [...products];


  // Apply featured filter
  if (filters.featured) {
    filteredProducts = filteredProducts.filter(product => product.featured);
  }

  // Apply search filter
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply price range filter
  if (filters.priceRange) {
    const [minPrice, maxPrice] = filters.priceRange;
    filteredProducts = filteredProducts.filter(product => {
      const minProductPrice = Math.min(...product.prices.map(p => p.amount));
      return minProductPrice >= minPrice && minProductPrice <= maxPrice;
    });
  }

  // Apply sorting
  if (filters.sortBy) {
    filteredProducts = sortProducts(filteredProducts, filters.sortBy, filters.sortOrder || 'asc');
  }

  return filteredProducts;
}

export function sortProducts(products: Cake[], sortBy: string, order: 'asc' | 'desc' = 'asc'): Cake[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'name':
      sorted.sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return order === 'asc' ? result : -result;
      });
      break;

    case 'price':
      sorted.sort((a, b) => {
        const priceA = Math.min(...a.prices.map(p => p.amount));
        const priceB = Math.min(...b.prices.map(p => p.amount));
        const result = priceA - priceB;
        return order === 'asc' ? result : -result;
      });
      break;

    case 'featured':
      sorted.sort((a, b) => {
        if (a.featured && !b.featured) return order === 'asc' ? -1 : 1;
        if (!a.featured && b.featured) return order === 'asc' ? 1 : -1;
        return 0;
      });
      break;

    default:
      break;
  }

  return sorted;
}

export function getFilterOptions(products: Cake[]) {
  const allPrices = products.flatMap(p => p.prices.map(price => price.amount));
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  
  const featuredCount = products.filter(p => p.featured).length;
  
  return {
    priceRange: { min: minPrice, max: maxPrice },
    featuredCount,
    totalProducts: products.length
  };
}

export function clearFilters(): ProductFilters {
  return {};
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return !!(
    filters.searchTerm ||
    filters.featured ||
    (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity))
  );
}