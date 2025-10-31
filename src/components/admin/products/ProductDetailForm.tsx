"use client";

import { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/admin/useProducts';
import { type AdminProduct } from '@/store/slices/admin/products';
import ProductFormHeader from './ProductFormHeader';
import ProductBasicInfo from './ProductBasicInfo';
import ProductImages from './ProductImages';
import ProductPricing from './ProductPricing';
import ProductCreamOptions from './ProductCreamOptions';
import AddCreamDialog from './AddCreamDialog';
import { useProductForm } from '@/hooks/admin/products/useProductForm';
import { useProductImages } from '@/hooks/admin/products/useProductImages';
import { useProductPricing } from '@/hooks/admin/products/useProductPricing';
import { useProductCreamOptions } from '@/hooks/admin/products/useProductCreamOptions';

interface ProductDetailFormProps {
  productId: string;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function ProductDetailForm({ productId, onSave, onCancel }: ProductDetailFormProps) {
  const { products, updateProduct, loading } = useProducts();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load product data
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, productId]);

  // Form management hook
  const {
    formData,
    errors,
    setFormData,
    handleInputChange,
    validateForm,
    resetForm,
  } = useProductForm({ initialData: product || undefined });

  // Update formData when product loads (only if not editing to avoid overwriting user changes)
  useEffect(() => {
    if (product && !isEditing) {
      setFormData(product);
    }
  }, [product, isEditing, setFormData]);

  // Image management hook
  const {
    handleAddImage: handleAddImageHook,
    handleRemoveImage,
  } = useProductImages({
    images: formData.images || [],
    onUpdate: (images) => handleInputChange('images', images),
  });

  // Handle image add with prompt
  const handleAddImage = () => {
    const newImage = prompt('Enter image URL:');
    if (newImage && newImage.trim()) {
      handleAddImageHook(newImage);
    }
  };

  // Pricing management hook
  const {
    handleAddPrice,
    handleUpdatePrice,
    handleRemovePrice,
  } = useProductPricing({
    prices: formData.prices || [],
    onUpdate: (prices) => handleInputChange('prices', prices),
  });

  // Cream options management hook
  const {
    showCreamDialog,
    newCreamName,
    newCreamCost,
    setNewCreamName,
    setNewCreamCost,
    openAddCreamDialog,
    closeAddCreamDialog,
    saveCreamFromDialog,
    handleUpdateCreamField,
    handleRemoveCream,
  } = useProductCreamOptions({
    creamOptions: formData.whippingCreamOptions || [],
    defaultCreamIndex: formData.defaultCreamIndex,
    onUpdate: (options) => handleInputChange('whippingCreamOptions', options),
    onDefaultChange: (index) => handleInputChange('defaultCreamIndex', index),
  });

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await updateProduct(productId, formData as AdminProduct);
      setIsEditing(false);
      onSave?.();
    } catch (error) {
      alert('Failed to update product. Please try again.');
    }
  };

  const handleCancel = () => {
    resetForm(product || undefined);
    setIsEditing(false);
    onCancel?.();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProductFormHeader
        isEditing={isEditing}
        isLoading={loading}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <ProductBasicInfo
        name={formData.name || ''}
        description={formData.description || ''}
        isActive={formData.isActive ?? true}
        isEditing={isEditing}
        errors={{
          name: errors.name,
          description: errors.description,
        }}
        onNameChange={(value) => handleInputChange('name', value)}
        onDescriptionChange={(value) => handleInputChange('description', value)}
        onActiveChange={(value) => handleInputChange('isActive', value)}
      />

      <ProductImages
        images={formData.images || []}
        isEditing={isEditing}
        error={errors.images}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      />

      <ProductPricing
        prices={formData.prices || []}
        isEditing={isEditing}
        error={errors.prices}
        onAddPrice={handleAddPrice}
        onUpdatePrice={handleUpdatePrice}
        onRemovePrice={handleRemovePrice}
      />

      <ProductCreamOptions
        creamOptions={formData.whippingCreamOptions || []}
        defaultCreamIndex={formData.defaultCreamIndex}
        isEditing={isEditing}
        onUpdateCreamField={handleUpdateCreamField}
        onRemoveCream={handleRemoveCream}
        onDefaultCreamChange={(index) => handleInputChange('defaultCreamIndex', index)}
        onAddCream={openAddCreamDialog}
      />

      <AddCreamDialog
        isOpen={showCreamDialog}
        creamName={newCreamName}
        creamCost={newCreamCost}
        onCreamNameChange={setNewCreamName}
        onCreamCostChange={setNewCreamCost}
        onSave={saveCreamFromDialog}
        onCancel={closeAddCreamDialog}
      />
    </div>
  );
}
