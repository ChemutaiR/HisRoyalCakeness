import { type Cake } from '@/types/shop/catalog';

// Product utility functions
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function getCakePriceRange(cake: Cake): { min: number; max: number } {
  const prices = cake.prices.map(p => p.amount);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export function getCakeStartingPrice(cake: Cake): number {
  return Math.min(...cake.prices.map(p => p.amount));
}

export function getCakeMinPrice(cake: Cake): number {
  return Math.min(...cake.prices.map(p => p.amount));
}

export function getCakeMaxPrice(cake: Cake): number {
  return Math.max(...cake.prices.map(p => p.amount));
}

export function getCakePriceForWeight(cake: Cake, weight: string): number | undefined {
  const price = cake.prices.find(p => p.weight === weight);
  return price?.amount;
}

export function getCakeServingsForWeight(cake: Cake, weight: string): number | undefined {
  const price = cake.prices.find(p => p.weight === weight);
  return price?.servings;
}

export function getAvailableWeights(cake: Cake): string[] {
  return cake.prices.map(p => p.weight);
}

export function getDefaultWeight(cake: Cake): string {
  return cake.prices[0]?.weight || '0.5 kg';
}

export function getCakeDisplayPrice(cake: Cake): string {
  const startingPrice = getCakeStartingPrice(cake);
  return formatPrice(startingPrice);
}

export function getCakePriceRangeDisplay(cake: Cake): string {
  const { min, max } = getCakePriceRange(cake);
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

// Filter utilities

export function filterCakesByPriceRange(cakes: Cake[], minPrice: number, maxPrice: number): Cake[] {
  return cakes.filter(cake => {
    const cakeMinPrice = getCakeStartingPrice(cake);
    return cakeMinPrice >= minPrice && cakeMinPrice <= maxPrice;
  });
}

export function filterCakesBySearch(cakes: Cake[], searchTerm: string): Cake[] {
  const searchLower = searchTerm.toLowerCase();
  return cakes.filter(cake => 
    cake.name.toLowerCase().includes(searchLower) ||
    cake.description.toLowerCase().includes(searchLower)
  );
}

export function filterFeaturedCakes(cakes: Cake[]): Cake[] {
  return cakes.filter(cake => cake.featured);
}

// Sort utilities
export function sortCakesByName(cakes: Cake[]): Cake[] {
  return [...cakes].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortCakesByPrice(cakes: Cake[], ascending: boolean = true): Cake[] {
  return [...cakes].sort((a, b) => {
    const priceA = getCakeStartingPrice(a);
    const priceB = getCakeStartingPrice(b);
    return ascending ? priceA - priceB : priceB - priceA;
  });
}

export function sortCakesByFeatured(cakes: Cake[]): Cake[] {
  return [...cakes].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}


// Search utilities
export function getSearchSuggestions(cakes: Cake[], query: string, limit: number = 5): string[] {
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();
  
  cakes.forEach(cake => {
    if (cake.name.toLowerCase().includes(queryLower)) {
      suggestions.add(cake.name);
    }
  });
  
  return Array.from(suggestions).slice(0, limit);
}