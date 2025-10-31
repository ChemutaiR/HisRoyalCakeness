"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: { name: string; description: string; image: string }) => Promise<void>;
  onSuccess?: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  onSuccess,
}: AddProductModalProps) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleSubmit = async () => {
    setSubmitAttempted(true);
    if (!newProduct.name || !newProduct.description || !newProduct.image) {
      return;
    }

    try {
      await onSubmit(newProduct);
      handleSuccess();
      onSuccess?.();
    } catch (error) {
      // Error handling is done in parent
    }
  };

  const handleClose = () => {
    setNewProduct({ name: '', description: '', image: '' });
    setImagePreview('');
    setSubmitAttempted(false);
    onClose();
  };

  // Reset form when modal closes successfully
  const handleSuccess = () => {
    setNewProduct({ name: '', description: '', image: '' });
    setImagePreview('');
    setSubmitAttempted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Add New Product</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
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
              onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${
                submitAttempted && !newProduct.name ? 'border-red-300' : 'border-gray-300'
              }`}
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
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, description: e.target.value }))
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${
                submitAttempted && !newProduct.description ? 'border-red-300' : 'border-gray-300'
              }`}
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
            <div
              className={`border-2 ${
                submitAttempted && !newProduct.image
                  ? 'border-red-300'
                  : 'border-dashed border-gray-300'
              } rounded-md p-4 hover:border-[#c7b8ea] transition-colors`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setNewProduct((prev) => ({ ...prev, image: url }));
                    setImagePreview(url);
                  } else {
                    setNewProduct((prev) => ({ ...prev, image: '' }));
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
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              submitAttempted &&
              (!newProduct.name || !newProduct.description || !newProduct.image)
            }
            className="px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

