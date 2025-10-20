'use client';

import { useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';
import { useCatalog } from '@/hooks/shop';
import { applyProductFilters, type ProductFilters } from '@/utils/catalog';
import { getCakeMinPrice, getCakeMaxPrice } from '@/utils/catalog/products';
import { Input } from '@/components/ui/input';

export default function CatalogPage() {
  const { cakes, loading, error, filters, setFilters, clearFilters } = useCatalog();

  // Load cakes on component mount
  useEffect(() => {
    // The useCatalog hook handles loading automatically
  }, []);

  // Get filter options - removed unused variable

  // Apply filters
  const filteredProducts = useMemo(() => {
    const productFilters: ProductFilters = {
      ...filters
    };
    
    return applyProductFilters(cakes, productFilters);
  }, [cakes, filters]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  if (loading) {
  return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
            </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Products Unavailable</h1>
          <p className="text-gray-600 mb-6">{error}</p>
            <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
            >
            Retry
            </button>
            </div>
          </div>
    );
  }

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-800 mb-0.5 tracking-wide">Our Cake Collection</h1>
          <p className="text-sm text-gray-500 leading-relaxed">Discover our delicious selection of handcrafted cakes</p>
        </div>

        {/* Search Bar */}
              <div className="mb-6">
          <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
                    type="text"
              value={filters.searchTerm || ''}
              onChange={(e) => {
                e.preventDefault();
                handleFilterChange({ searchTerm: e.target.value });
              }}
                    placeholder="Search cakes..."
              className="pl-10"
                  />
                </div>
              </div>

        {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
            {filteredProducts.length} cake{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cakes found matching your criteria.</p>
                <button
              onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((cake) => (
                  <ProductCard 
                key={cake.id} 
                id={cake.id}
                name={cake.name}
                description={cake.description}
                imageUrl={cake.image}
                minPrice={getCakeMinPrice(cake)}
                maxPrice={getCakeMaxPrice(cake)}
                  />
                ))}
              </div>
            )}
      </div>
    </div>
  );
} 