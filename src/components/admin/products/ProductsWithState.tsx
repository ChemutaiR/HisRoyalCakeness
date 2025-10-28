"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Trash2, X, Package, MoreVertical, Eye, AlertCircle, Search } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageCarouselModal } from '@/components/ui';
import { useProducts } from '@/hooks/admin/useProducts';
// ShopSyncService is not directly used in this component
import { type AdminProduct } from '@/store/slices/admin/products';

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
    // validateProduct
  } = useProducts();

  // Local UI state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProductImages, setSelectedProductImages] = useState<string[]>([]);
  const [selectedProductName, setSelectedProductName] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Simple form state for popup dialog
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');


  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Clear search with Escape key
      if (event.key === 'Escape' && searchTerm) {
        setSearchTerm('');
      }
      // Focus search with Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[aria-label="Search products"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm]);

  // Memoized filtering and counter calculations for performance
  const { filteredProducts, totalProducts, filteredCount, isSearching } = useMemo(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      filteredProducts: filtered,
      totalProducts: products.length,
      filteredCount: filtered.length,
      isSearching: searchTerm.trim().length > 0
    };
  }, [products, searchTerm]);

  // Handle product creation
  const handleAddProduct = async () => {
    try {
      setSubmitAttempted(true);
      if (!newProduct.name || !newProduct.description || !newProduct.image) {
        return;
      }
      // Create product with default values
      await createProduct({
        name: newProduct.name,
        description: newProduct.description,
        images: [newProduct.image],
        prices: [{ weight: '1 kg', amount: 2000, servings: 20 }], // Default pricing
        whippingCreamOptions: ['Vanilla Cream'], // Default cream option
        bakingTinOptions: ['Round Tin'], // Default tin option
        defaultCreamIndex: 0,
        isActive: true
      });
      
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        image: ''
      });
      setImagePreview('');
      setSubmitAttempted(false);
      setShowAddProductModal(false);
      
    } catch (err) {
      alert('Failed to create product');
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
            <p className="text-gray-600">Manage your bakery products</p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={clearError}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        
      </div>

      {/* Search and Add Product */}
      <div className="mb-6 flex justify-between items-center">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products... (Ctrl+K)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
            aria-label="Search products"
            title="Search products by name or description. Press Ctrl+K to focus, Escape to clear."
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
      </div>

      {/* Add Product Button */}
        <button
          onClick={() => setShowAddProductModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
        >
          <Package className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Product Counter */}
      <div className="mb-4">
        {loading ? (
          <p className="text-xs text-gray-500" role="status" aria-live="polite">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-xs text-red-500" role="alert" aria-live="polite">
            Error loading products. Please try again.
          </p>
        ) : totalProducts === 0 ? (
          <p className="text-xs text-gray-500" role="status" aria-live="polite">
            No products available. Add your first product to get started.
          </p>
        ) : (
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
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800 tracking-wide">Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'No products found matching your search.' : 'No products available.'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <Image 
                          className="h-12 w-12 rounded-lg object-cover" 
                          src={product.images[0] || '/placeholder-image.jpg'} 
                          alt={product.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 max-w-md">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => setOpenDropdownId(openDropdownId === product.id ? null : product.id)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="More actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {openDropdownId === product.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setOpenDropdownId(null)}
                            >
                              <Package className="w-4 h-4 mr-3" />
                              View Product
                            </Link>
                            <button
                              onClick={() => handleViewImages(product)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4 mr-3" />
                              View Images
                            </button>
                            <button 
                              onClick={() => {
                                setOpenDropdownId(null);
                                // TODO: Implement edit functionality
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Pencil className="w-4 h-4 mr-3" />
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                setOpenDropdownId(null);
                                handleDeleteProduct(product.id);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Add New Product</h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${submitAttempted && !newProduct.name ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter product name"
                  aria-invalid={submitAttempted && !newProduct.name}
                />
                {submitAttempted && !newProduct.name && (
                  <p className="mt-1 text-xs text-red-500">Name is required.</p>
                )}
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${submitAttempted && !newProduct.description ? 'border-red-300' : 'border-gray-300'}`}
                  rows={3}
                  placeholder="Enter product description"
                  aria-invalid={submitAttempted && !newProduct.description}
                />
                {submitAttempted && !newProduct.description && (
                  <p className="mt-1 text-xs text-red-500">Description is required.</p>
                )}
              </div>

              {/* Product Image */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Image Upload</label>
                <div className={`border-2 ${submitAttempted && !newProduct.image ? 'border-red-300' : 'border-dashed border-gray-300'} rounded-md p-4 hover:border-[#c7b8ea] transition-colors`}>
                      <input
                    type="file"
                    accept="image/*"
                        onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setNewProduct(prev => ({ ...prev, image: url }));
                        setImagePreview(url);
                        } else {
                        setNewProduct(prev => ({ ...prev, image: '' }));
                        setImagePreview('');
                      }
                    }}
                    className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#c7b8ea]/20 file:text-gray-800 hover:file:bg-[#c7b8ea]/30 cursor-pointer"
                    aria-invalid={submitAttempted && !newProduct.image}
                  />
                  {submitAttempted && !newProduct.image && (
                    <p className="mt-1 text-xs text-red-500">Image is required.</p>
                  )}

                  {/* Live Preview */}
                  {imagePreview && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-2">Preview</div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt={newProduct.name || 'Product image preview'}
                        className="w-full h-40 object-cover rounded-md border border-gray-200 shadow-sm"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
                        }}
                      />
                    </div>
                  )}
                </div>
                  </div>
                </div>
                
            <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                disabled={submitAttempted && (!newProduct.name || !newProduct.description || !newProduct.image)}
                  className="px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Product
                </button>
            </div>
          </div>
        </div>
      )}

      

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
