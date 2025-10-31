"use client";

import { useState, useEffect } from 'react';
import { ImageCarouselModal } from '@/components/ui';
import { useProducts } from '@/hooks/admin/useProducts';
import { useProductsList } from '@/hooks/admin/products/useProductsList';
import { useKeyboardShortcuts } from '@/hooks/products/useKeyboardShortcuts';
import { type AdminProduct } from '@/store/slices/admin/products';
import ProductsHeader from './ProductsHeader';
import ProductsSearchBar from './ProductsSearchBar';
import ProductsCounter from './ProductsCounter';
import ProductsTable from './ProductsTable';
import AddProductButton from './AddProductButton';
import AddProductModal from './AddProductModal';

export default function ProductsWithState() {
  // Use centralized state management
  const {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    deleteProduct,
    clearError,
  } = useProducts();

  // Local UI state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProductImages, setSelectedProductImages] = useState<string[]>([]);
  const [selectedProductName, setSelectedProductName] = useState<string>('');

  // Product list management with search/filter
  const {
    searchTerm,
    setSearchTerm,
    clearSearch,
    filteredProducts,
    totalProducts,
    filteredCount,
    isSearching,
  } = useProductsList({ products });

  // Keyboard shortcuts
  useKeyboardShortcuts({
    searchTerm,
    onClearSearch: clearSearch,
  });

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle product creation
  const handleAddProduct = async (productData: {
    name: string;
    description: string;
    image: string;
  }) => {
    try {
      // Create product with default values
      await createProduct({
        name: productData.name,
        description: productData.description,
        images: [productData.image],
        prices: [{ weight: '1 kg', amount: 2000, servings: 20 }], // Default pricing
        whippingCreamOptions: ['Vanilla Cream'], // Default cream option
        bakingTinOptions: ['Round Tin'], // Default tin option
        defaultCreamIndex: 0,
        isActive: true,
      });
    } catch (err) {
      alert('Failed to create product');
      throw err; // Re-throw so modal can handle it
    }
  };

  const handleAddProductSuccess = () => {
    setShowAddProductModal(false);
  };

  // Handle product deletion
  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setOpenDropdownId(null);
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  // Handle view images
  const handleViewImages = (product: AdminProduct) => {
    setSelectedProductImages(product.images);
    setSelectedProductName(product.name);
    setShowImageModal(true);
    setOpenDropdownId(null);
  };

  // Handle edit (placeholder)
  const handleEdit = (product: AdminProduct) => {
    setOpenDropdownId(null);
    // TODO: Implement edit functionality
    // Could navigate to product detail page or open edit modal
  };

  if (loading) {
    return (
      <div className="py-8 px-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6">
      <ProductsHeader error={error || undefined} onClearError={clearError} />

      {/* Search and Add Product */}
      <div className="mb-6 flex justify-between items-center">
        <ProductsSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={clearSearch}
        />
        <AddProductButton onClick={() => setShowAddProductModal(true)} />
      </div>

      {/* Product Counter */}
      <div className="mb-4">
        <ProductsCounter
          loading={loading}
          error={error}
          totalProducts={totalProducts}
          filteredCount={filteredCount}
          isSearching={isSearching}
          searchTerm={searchTerm}
        />
      </div>

      {/* Products Table */}
      <ProductsTable
        products={filteredProducts}
        searchTerm={searchTerm}
        openDropdownId={openDropdownId}
        onToggleDropdown={(productId) =>
          setOpenDropdownId(openDropdownId === productId ? null : productId)
        }
        onViewImages={handleViewImages}
        onEdit={handleEdit}
        onDelete={handleDeleteProduct}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSubmit={handleAddProduct}
        onSuccess={handleAddProductSuccess}
      />

      {/* Image Carousel Modal */}
      <ImageCarouselModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={selectedProductImages}
        productName={selectedProductName}
        showThumbnails={true}
      />
    </div>
  );
}
