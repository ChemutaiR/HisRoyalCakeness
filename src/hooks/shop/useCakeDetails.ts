import { useState, useEffect, useMemo } from 'react';
import { useProductDetails } from './useProductDetails';
import { CakeDetailsService, type CustomizationState } from '@/services/shop/cakeDetails';
import { type Size, type CreamOption, type ContainerType } from '@/types/shop/catalog';

export interface UseCakeDetailsReturn {
  // Basic cake data
  cake: any | null;
  loading: boolean;
  error: string | null;
  
  // Customization state
  selectedSize: Size | null;
  selectedCream: CreamOption | null;
  selectedContainerType: ContainerType | null;
  customNotes: string;
  uploadedImages: string[];
  
  // Available options
  availableSizes: Size[];
  availableCreamOptions: CreamOption[];
  availableContainerTypes: ContainerType[];
  
  // Actions
  setSelectedSize: (size: Size | null) => void;
  setSelectedCream: (cream: CreamOption | null) => void;
  setSelectedContainerType: (container: ContainerType | null) => void;
  setCustomNotes: (notes: string) => void;
  setUploadedImages: (images: string[]) => void;
  addUploadedImage: (image: string) => void;
  removeUploadedImage: (index: number) => void;
  clearCustomization: () => void;
  
  // Computed values
  totalPrice: number;
  priceBreakdown: {
    basePrice: number;
    creamPrice: number;
    containerPrice: number;
    total: number;
  };
  isCustomizationValid: boolean;
  validationErrors: string[];
  
  // Cart preparation
  prepareForCart: () => any;
}

export function useCakeDetails(cakeId: number): UseCakeDetailsReturn {
  // Get basic cake data from existing hook
  const { cake, loading, error } = useProductDetails(cakeId);
  
  // Customization state
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedCream, setSelectedCream] = useState<CreamOption | null>(null);
  const [selectedContainerType, setSelectedContainerType] = useState<ContainerType | null>(null);
  const [customNotes, setCustomNotes] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Get available options
  const availableSizes = useMemo(() => {
    if (!cake) return [];
    // Only size, pricing, and servings come from catalog (centralized state)
    return CakeDetailsService.getAvailableSizes(cake);
  }, [cake]);

  const availableCreamOptions = useMemo(() => {
    if (!cake?.creams) return [];
    // Use cream data from centralized state
    return cake.creams.map((cream, index) => ({
      name: cream.name,
      price: cream.extraCost,
      available: true
    }));
  }, [cake]);

  const _availableContainerTypes = useMemo(() => {
    // Hardcoded - not from catalog
    return CakeDetailsService.getAvailableContainerTypes();
  }, []);

  // Computed values
  const totalPrice = useMemo(() => {
    if (!cake) return 0;
    
    const customization: CustomizationState = {
      selectedSize,
      selectedCream,
      selectedContainerType,
      customNotes,
      uploadedImages
    };
    
    return CakeDetailsService.calculateTotalPrice(cake, customization);
  }, [cake, selectedSize, selectedCream, selectedContainerType, customNotes, uploadedImages]);

  const _priceBreakdown = useMemo(() => {
    if (!cake) {
      return { basePrice: 0, creamPrice: 0, containerPrice: 0, total: 0 };
    }
    
    const customization: CustomizationState = {
      selectedSize,
      selectedCream,
      selectedContainerType,
      customNotes,
      uploadedImages
    };
    
    return CakeDetailsService.getPriceBreakdown(cake, customization);
  }, [cake, selectedSize, selectedCream, selectedContainerType, customNotes, uploadedImages]);

  const { isValid: _isCustomizationValid, errors: _validationErrors } = useMemo(() => {
    const customization: CustomizationState = {
      selectedSize,
      selectedCream,
      selectedContainerType,
      customNotes,
      uploadedImages
    };
    
    return CakeDetailsService.validateCustomization(customization);
  }, [selectedSize, selectedCream, selectedContainerType, customNotes, uploadedImages]);

  // Actions
  const _addUploadedImage = (image: string) => {
    setUploadedImages(prev => [...prev, image]);
  };

  const _removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const _clearCustomization = () => {
    setSelectedSize(null);
    setSelectedCream(null);
    setSelectedContainerType(null);
    setCustomNotes('');
    setUploadedImages([]);
  };

  const _prepareForCart = () => {
    if (!cake) return null;
    
    const customization: CustomizationState = {
      selectedSize,
      selectedCream,
      selectedContainerType,
      customNotes,
      uploadedImages
    };
    
    return CakeDetailsService.prepareForCart(cake, customization);
  };

  // Auto-select first size when cake loads
  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes, selectedSize]);

  return {
    // Basic cake data
    cake,
    loading,
    error,
    
    // Customization state
    selectedSize,
    selectedCream,
    selectedContainerType,
    customNotes,
    uploadedImages,
    
    // Available options
    availableSizes,
    availableCreamOptions,
    availableContainerTypes: _availableContainerTypes,
    
    // Actions
    setSelectedSize,
    setSelectedCream,
    setSelectedContainerType,
    setCustomNotes,
    setUploadedImages,
    addUploadedImage: _addUploadedImage,
    removeUploadedImage: _removeUploadedImage,
    clearCustomization: _clearCustomization,
    
    // Computed values
    totalPrice,
    priceBreakdown: _priceBreakdown,
    isCustomizationValid: _isCustomizationValid,
    validationErrors: _validationErrors,
    prepareForCart: _prepareForCart
  };
}
