"use client";

import { useState } from 'react';
import { X, Plus, Trash2, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useProducts } from '@/hooks/admin/useProducts';
import { type AdminProduct } from '@/store/slices/admin/products';

interface AddProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  description: string;
  images: string[];
  prices: Array<{ weight: string; amount: number; servings: number }>;
  whippingCreamOptions: string[];
  bakingTinOptions: string[];
  isActive: boolean;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  images: [],
  prices: [],
  whippingCreamOptions: [],
  bakingTinOptions: [],
  isActive: true
};

export default function AddProductForm({ onClose, onSuccess }: AddProductFormProps) {
  const { createProduct, loading } = useProducts();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Product name and description' },
    { id: 2, title: 'Images', description: 'Product images' },
    { id: 3, title: 'Pricing', description: 'Price points and servings' },
    { id: 4, title: 'Options', description: 'Whipping cream and baking tin options' },
    { id: 5, title: 'Status', description: 'Activate product' }
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddImage = () => {
    const newImage = prompt('Enter image URL:');
    if (newImage && newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddPrice = () => {
    setFormData(prev => ({
      ...prev,
      prices: [...prev.prices, { weight: '', amount: 0, servings: 0 }]
    }));
  };

  const handleUpdatePrice = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      prices: prev.prices.map((price, i) => 
        i === index ? { ...price, [field]: value } : price
      )
    }));
  };

  const handleRemovePrice = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prices: prev.prices.filter((_, i) => i !== index)
    }));
  };

  const handleAddWhippingCream = () => {
    const newOption = prompt('Enter whipping cream option:');
    if (newOption && newOption.trim()) {
      setFormData(prev => ({
        ...prev,
        whippingCreamOptions: [...prev.whippingCreamOptions, newOption.trim()]
      }));
    }
  };

  const handleRemoveWhippingCream = (index: number) => {
    setFormData(prev => ({
      ...prev,
      whippingCreamOptions: prev.whippingCreamOptions.filter((_, i) => i !== index)
    }));
  };

  const handleAddBakingTin = () => {
    const newOption = prompt('Enter baking tin option:');
    if (newOption && newOption.trim()) {
      setFormData(prev => ({
        ...prev,
        bakingTinOptions: [...prev.bakingTinOptions, newOption.trim()]
      }));
    }
  };

  const handleRemoveBakingTin = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bakingTinOptions: prev.bakingTinOptions.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Product name is required';
        }
        if (!formData.description.trim()) {
          newErrors.description = 'Product description is required';
        }
        break;
      case 2:
        if (formData.images.length === 0) {
          newErrors.images = 'At least one image is required';
        }
        break;
      case 3:
        if (formData.prices.length === 0) {
          newErrors.prices = 'At least one price is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

  try {
      const productData: AdminProduct = {
        id: `prod_${Date.now()}`,
        name: formData.name,
        description: formData.description,
        images: formData.images,
        prices: formData.prices,
        whippingCreamOptions: formData.whippingCreamOptions,
        bakingTinOptions: formData.bakingTinOptions,
        isActive: formData.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await createProduct(productData);
      onSuccess?.();
      onClose();
  } catch (error) {
      // Surface failure to UI minimally without console noise
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
                value={formData.name}
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
                value={formData.description}
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
              {formData.images.map((image, index) => (
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
            {formData.prices.map((price, index) => (
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
                {formData.whippingCreamOptions.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{option}</span>
                    <button
                      onClick={() => handleRemoveWhippingCream(index)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddWhippingCream}
                className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Whipping Cream Option
              </button>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Baking Tin Options</h4>
              <div className="space-y-2 mb-4">
                {formData.bakingTinOptions.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{option}</span>
                    <button
                      onClick={() => handleRemoveBakingTin(index)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddBakingTin}
                className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Baking Tin Option
              </button>
            </div>
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Product Summary</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Images:</strong> {formData.images.length} image(s)</p>
                <p><strong>Price Points:</strong> {formData.prices.length}</p>
                <p><strong>Whipping Cream Options:</strong> {formData.whippingCreamOptions.length}</p>
                <p><strong>Baking Tin Options:</strong> {formData.bakingTinOptions.length}</p>
                <p><strong>Status:</strong> {formData.isActive ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
            <p className="text-gray-600">Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > step.id 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                    ? 'bg-[#c7b8ea] text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8]"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
