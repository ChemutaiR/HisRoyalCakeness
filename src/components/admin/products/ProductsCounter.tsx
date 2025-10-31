"use client";

interface ProductsCounterProps {
  loading: boolean;
  error: string | null;
  totalProducts: number;
  filteredCount: number;
  isSearching: boolean;
  searchTerm: string;
}

export default function ProductsCounter({
  loading,
  error,
  totalProducts,
  filteredCount,
  isSearching,
  searchTerm,
}: ProductsCounterProps) {
  if (loading) {
    return (
      <p className="text-xs text-gray-500" role="status" aria-live="polite">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-xs text-red-500" role="alert" aria-live="polite">
        Error loading products. Please try again.
      </p>
    );
  }

  if (totalProducts === 0) {
    return (
      <p className="text-xs text-gray-500" role="status" aria-live="polite">
        No products available. Add your first product to get started.
      </p>
    );
  }

  return (
    <p className="text-xs text-gray-500" aria-live="polite" role="status">
      {isSearching ? (
        filteredCount === 0 ? (
          `No products found matching "${searchTerm}"`
        ) : (
          `Showing ${filteredCount} of ${totalProducts} product${totalProducts !== 1 ? 's' : ''}`
        )
      ) : (
        `${totalProducts} product${totalProducts !== 1 ? 's' : ''} total`
      )}
    </p>
  );
}

