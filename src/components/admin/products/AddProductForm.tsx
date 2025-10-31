"use client";

import { X, Plus, Trash2 } from 'lucide-react';
import { useProducts } from '@/hooks/admin/useProducts';
import { type AdminProduct } from '@/store/slices/admin/products';
import ProductFormStepper from './ProductFormStepper';
import ProductFormModalHeader from './ProductFormModalHeader';
import ProductFormModalFooter from './ProductFormModalFooter';
import ProductBakingTinOptions from './ProductBakingTinOptions';
import ProductSummary from './ProductSummary';
import { useProductSteps } from '@/hooks/admin/products/useProductSteps';
import { useProductForm } from '@/hooks/admin/products/useProductForm';
import { useProductImages } from '@/hooks/admin/products/useProductImages';
import { useProductPricing } from '@/hooks/admin/products/useProductPricing';
import { useProductCreamOptions } from '@/hooks/admin/products/useProductCreamOptions';

interface AddProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const steps = [
  { id: 1, title: 'Basic Info', description: 'Product name and description' },
  { id: 2, title: 'Images', description: 'Product images' },
  { id: 3, title: 'Pricing', description: 'Price points and servings' },
  { id: 4, title: 'Options', description: 'Whipping cream and baking tin options' },
  { id: 5, title: 'Status', description: 'Activate product' }
];

export default function AddProductForm({ onClose, onSuccess }: AddProductFormProps) {
  const { createProduct, loading } = useProducts();

  // Initialize form data
  const initialFormData = {
    name: '',
    description: '',
    images: [],
    prices: [],
    whippingCreamOptions: [],
    bakingTinOptions: [],
    isActive: true,
    defaultCreamIndex: 0,
  };

  // Form management hook
  const {
    formData,
    errors,
    handleInputChange,
    validateForm: _validateForm,
    setErrors,
  } = useProductForm({ initialData: initialFormData });

  // Step validation function
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name?.trim()) {
          newErrors.name = 'Product name is required';
        }
        if (!formData.description?.trim()) {
          newErrors.description = 'Product description is required';
        }
        break;
      case 2:
        if (!formData.images || formData.images.length === 0) {
          newErrors.images = 'At least one image is required';
        }
        break;
      case 3:
        if (!formData.prices || formData.prices.length === 0) {
          newErrors.prices = 'At least one price is required';
        }
        break;
    }

    // Update errors using the hook's setErrors
    if (Object.keys(newErrors).length > 0) {
      // Merge new errors with existing ones
      setErrors(prev => ({ ...prev, ...newErrors }));
    } else {
      // Clear step-specific errors when valid
      setErrors(prev => {
        const updated = { ...prev };
        ['name', 'description', 'images', 'prices'].forEach(key => {
          if (newErrors[key] === undefined && updated[key]) {
            delete updated[key];
          }
        });
        return updated;
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  // Step navigation hook
  const {
    currentStep,
    handleNext,
    handlePrevious,
    isLastStep: _isLastStep,
  } = useProductSteps({
    steps,
    validateStep,
  });

  // Image management hook
  const {
    handleAddImage: handleAddImageHook,
    handleRemoveImage,
  } = useProductImages({
    images: formData.images || [],
    onUpdate: (images) => handleInputChange('images', images),
  });

  // Handle image add with prompt (preserving original behavior)
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
    showCreamDialog: _showCreamDialog,
    newCreamName: _newCreamName,
    newCreamCost: _newCreamCost,
    setNewCreamName: _setNewCreamName,
    setNewCreamCost: _setNewCreamCost,
    openAddCreamDialog: _openAddCreamDialog,
    closeAddCreamDialog: _closeAddCreamDialog,
    saveCreamFromDialog: _saveCreamFromDialog,
    handleUpdateCreamField: _handleUpdateCreamField,
    handleRemoveCream,
  } = useProductCreamOptions({
    creamOptions: formData.whippingCreamOptions || [],
    defaultCreamIndex: formData.defaultCreamIndex,
    onUpdate: (options) => handleInputChange('whippingCreamOptions', options),
    onDefaultChange: (index) => handleInputChange('defaultCreamIndex', index),
  });

  // Handle baking tin addition with prompt (preserving original behavior)
  const handleAddBakingTin = () => {
    const newOption = prompt('Enter baking tin option:');
    if (newOption && newOption.trim()) {
      handleInputChange('bakingTinOptions', [...(formData.bakingTinOptions || []), newOption.trim()]);
    }
  };

  const handleRemoveBakingTin = (index: number) => {
    handleInputChange('bakingTinOptions', (formData.bakingTinOptions || []).filter((_, i) => i !== index));
  };

  // Handle whipping cream addition with prompt for step 4 (preserving original behavior)
  const handleAddWhippingCreamPrompt = () => {
    const newOption = prompt('Enter whipping cream option:');
    if (newOption && newOption.trim()) {
      handleInputChange('whippingCreamOptions', [...(formData.whippingCreamOptions || []), newOption.trim()]);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      const productData: AdminProduct = {
        id: `prod_${Date.now()}`,
        name: formData.name || '',
        description: formData.description || '',
        images: formData.images || [],
        prices: formData.prices || [],
        whippingCreamOptions: formData.whippingCreamOptions || [],
        bakingTinOptions: formData.bakingTinOptions || [],
        defaultCreamIndex: formData.defaultCreamIndex || 0,
        isActive: formData.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await createProduct(productData);
      onSuccess?.();
      onClose();
    } catch (error) {
      alert('Error adding product. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(formData.images || []).map((image, index) => (
                <div key={index} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddImage}
              className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </button>
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {(formData.prices || []).map((price, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={price.weight}
                    onChange={(e) => handleUpdatePrice(index, 'weight', e.target.value)}
                    placeholder="e.g., 0.5 kg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                  <input
                    type="number"
                    value={price.amount}
                    onChange={(e) => handleUpdatePrice(index, 'amount', Number(e.target.value))}
                    placeholder="1500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                  <input
                    type="number"
                    value={price.servings}
                    onChange={(e) => handleUpdatePrice(index, 'servings', Number(e.target.value))}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => handleRemovePrice(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddPrice}
              className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Price Point
            </button>
            {errors.prices && <p className="text-red-500 text-sm mt-1">{errors.prices}</p>}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Whipping Cream Options</h4>
              <div className="space-y-2 mb-4">
                {(formData.whippingCreamOptions || []).map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{option}</span>
                    <button
                      onClick={() => handleRemoveCream(index)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddWhippingCreamPrompt}
                className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Whipping Cream Option
              </button>
            </div>

            <ProductBakingTinOptions
              bakingTinOptions={formData.bakingTinOptions || []}
              onAdd={handleAddBakingTin}
              onRemove={handleRemoveBakingTin}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Status</label>
              <select
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) => handleInputChange('isActive', e.target.value === 'active')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
              >
                <option value="active">Active - Product will appear in shop</option>
                <option value="inactive">Inactive - Product will be hidden from shop</option>
              </select>
            </div>

            <ProductSummary
              name={formData.name || ''}
              imagesCount={(formData.images || []).length}
              pricesCount={(formData.prices || []).length}
              whippingCreamOptionsCount={(formData.whippingCreamOptions || []).length}
              bakingTinOptionsCount={(formData.bakingTinOptions || []).length}
              isActive={formData.isActive ?? true}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <ProductFormModalHeader
          title="Add New Product"
          currentStep={currentStep}
          steps={steps}
          onClose={onClose}
        />

        <ProductFormStepper steps={steps} currentStep={currentStep} />

        <div className="p-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>

        <ProductFormModalFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          isLoading={loading}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
