"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { useProducts } from '@/hooks/admin/useProducts';
import { type AdminProduct } from '@/store/slices/admin/products';
import { Input } from '@/components/ui';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui';

interface ProductDetailFormProps {
  productId: string;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function ProductDetailForm({ productId, onSave, onCancel }: ProductDetailFormProps) {
  const { products, updateProduct, loading } = useProducts();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<AdminProduct>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCreamDialog, setShowCreamDialog] = useState(false);
  const [newCreamName, setNewCreamName] = useState('');
  const [newCreamCost, setNewCreamCost] = useState<number | ''>('');

  // Load product data
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setFormData(foundProduct);
      }
    }
  }, [products, productId]);

  const handleInputChange = (field: string, value: any) => {
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
        images: [...(prev.images || []), newImage.trim()]
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddPrice = () => {
    setFormData(prev => ({
      ...prev,
      prices: [...(prev.prices || []), { weight: '', amount: 0, servings: 0 }]
    }));
  };

  const handleUpdatePrice = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      prices: prev.prices?.map((price, i) => 
        i === index ? { ...price, [field]: value } : price
      ) || []
    }));
  };

  const handleRemovePrice = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prices: prev.prices?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddCreamOption = () => {
    setShowCreamDialog(true);
  };

  const handleSaveCreamOption = () => {
    if (newCreamName.trim()) {
      const cost = newCreamCost === '' ? 0 : newCreamCost;
      const creamOption = cost > 0 ? `${newCreamName.trim()} (+${cost})` : newCreamName.trim();
      
      setFormData(prev => ({
        ...prev,
        whippingCreamOptions: [...(prev.whippingCreamOptions || []), creamOption]
      }));
      setNewCreamName('');
      setNewCreamCost('');
      setShowCreamDialog(false);
    }
  };

  const handleCancelCreamOption = () => {
    setNewCreamName('');
    setNewCreamCost('');
    setShowCreamDialog(false);
  };

  const handleRemoveWhippingCream = (index: number) => {
    setFormData(prev => ({
      ...prev,
      whippingCreamOptions: prev.whippingCreamOptions?.filter((_, i) => i !== index) || []
    }));
  };

  // Helpers for editing cream options in-place
  const parseCreamOption = (option: string) => {
    const costMatch = option.match(/\(\+(\d+)\)/);
    const cost = costMatch ? parseInt(costMatch[1]) : 0;
    const name = option.replace(/\s*\(\+\d+\)/, '').trim();
    return { name, cost };
  };

  const serializeCreamOption = (name: string, cost: number) => {
    const cleanName = name.trim();
    const cleanCost = Number.isFinite(cost) && cost > 0 ? ` (+${Math.floor(cost)})` : '';
    return `${cleanName}${cleanCost}`;
  };

  const handleUpdateCreamField = (index: number, field: 'name' | 'cost', value: any) => {
    setFormData(prev => {
      const options = [...(prev.whippingCreamOptions || [])];
      const current = parseCreamOption(options[index] || '');
      const next = field === 'name' ? { ...current, name: String(value) } : { ...current, cost: Number(value) };
      options[index] = serializeCreamOption(next.name, next.cost);
      return { ...prev, whippingCreamOptions: options };
    });
  };

  // Baking tin handlers removed; baking tin options are not edited here

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    if (!formData.prices || formData.prices.length === 0) {
      newErrors.prices = 'At least one price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setFormData(product || {});
    setIsEditing(false);
    setErrors({});
    onCancel?.();
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Configuration</h2>
          <p className="text-gray-600">Configure all product details and options</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8] transition-colors"
            >
              Edit Product
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8] transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <Input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', (e.target as HTMLInputElement).value)}
              disabled={!isEditing}
              className={`${errors.name ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Select
              value={formData.isActive ? 'active' : 'inactive'}
              onValueChange={(val) => handleInputChange('isActive', val === 'active')}
              disabled={!isEditing}
            >
              <SelectTrigger className={`rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${!isEditing ? 'bg-gray-50' : ''}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={!isEditing}
            rows={3}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent ${
              errors.description ? 'border-red-500' : ''
            } ${!isEditing ? 'bg-gray-50' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {formData.images?.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-32 object-cover rounded-lg"
              />
              {isEditing && (
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={handleAddImage}
            className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </button>
        )}
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
      </div>

      {/* Pricing Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Configuration</h3>
        
        <div className="space-y-4">
          {formData.prices?.map((price, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <Input
                  type="text"
                  value={price.weight}
                  onChange={(e) => handleUpdatePrice(index, 'weight', (e.target as HTMLInputElement).value)}
                  disabled={!isEditing}
                  placeholder="e.g., 0.5 kg"
                  className={`${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                <Input
                  type="number"
                  value={price.amount}
                  onChange={(e) => handleUpdatePrice(index, 'amount', Number((e.target as HTMLInputElement).value))}
                  disabled={!isEditing}
                  placeholder="1500"
                  className={`${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                <Input
                  type="number"
                  value={price.servings}
                  onChange={(e) => handleUpdatePrice(index, 'servings', Number((e.target as HTMLInputElement).value))}
                  disabled={!isEditing}
                  placeholder="10"
                  className={`${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              {isEditing && (
                <button
                  onClick={() => handleRemovePrice(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={handleAddPrice}
            className="mt-4 flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Price Point
          </button>
        )}
        {errors.prices && <p className="text-red-500 text-sm mt-1">{errors.prices}</p>}
      </div>

      {/* Cake Creams */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cake Creams</h3>
        
        {!isEditing ? (
          // View mode - display like shop interface
          <div className="space-y-3">
            {formData.whippingCreamOptions?.map((option, index) => {
              // Parse the option to extract name and cost
              const costMatch = option.match(/\+(\d+)/);
              const additionalCost = costMatch ? parseInt(costMatch[1]) : 0;
              const creamName = option.replace(/\s*\(\+\d+\)/, '').trim();
              const isDefault = formData.defaultCreamIndex === index;
              
              return (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{creamName}</div>
                    <div className="text-sm text-gray-500">
                      {isDefault ? 'Included' : (additionalCost > 0 ? `+KES ${additionalCost}` : '')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Edit mode - show management interface
          <div className="space-y-2">
            {formData.whippingCreamOptions?.map((option, index) => {
              const { name, cost } = parseCreamOption(option);
              return (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mr-2">
                    <input
                      type="radio"
                      name="defaultCream"
                      checked={formData.defaultCreamIndex === index}
                      onChange={() => handleInputChange('defaultCreamIndex', index)}
                      className="w-4 h-4 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cream Name</label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => handleUpdateCreamField(index, 'name', (e.target as HTMLInputElement).value)}
                      className=""
                      placeholder="e.g., Vanilla Cream"
                    />
                    {formData.defaultCreamIndex === index && (
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Included
                        </span>
                      </div>
                    )}
                  </div>

                  {formData.defaultCreamIndex !== index && (
                    <div className="w-40">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Cost (KES)</label>
                      <Input
                        type="number"
                        value={cost}
                        onChange={(e) => handleUpdateCreamField(index, 'cost', Number((e.target as HTMLInputElement).value))}
                        className=""
                        placeholder="0"
                        min={0}
                      />
                    </div>
                  )}

                  <button
                    onClick={() => handleRemoveWhippingCream(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
            
            <button
              onClick={handleAddCreamOption}
              className="mt-4 flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Cake Cream Option
            </button>
          </div>
        )}
      </div>

      {/* Baking Tin Options card removed as requested */}

      {/* Add Cream Option Dialog */}
      {showCreamDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Cake Cream Option</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cream Name</label>
                <Input
                  type="text"
                  value={newCreamName}
                  onChange={(e) => setNewCreamName((e.target as HTMLInputElement).value)}
                  className=""
                  placeholder="Enter cream name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Cost (KES)</label>
                <Input
                  type="number"
                  value={newCreamCost}
                  onChange={(e) => setNewCreamCost((e.target as HTMLInputElement).value === '' ? '' : Number((e.target as HTMLInputElement).value))}
                  className=""
                  placeholder="0"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Additional cost for this cream option</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelCreamOption}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCreamOption}
                disabled={!newCreamName.trim()}
                className="px-4 py-2 bg-[#c7b8ea] text-white rounded-lg hover:bg-[#b5a3e8] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Cream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
