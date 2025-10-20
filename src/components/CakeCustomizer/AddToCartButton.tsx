'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
// State management imports removed - will be replaced with Redux
import { CustomizationOptions } from '@/types/shop/catalog';

interface Size {
  size: string;
  price: number;
  servings: number;
}

interface CreamOption {
  name: string;
  price: number;
  available: boolean;
}

interface CakeProduct {
  id: number;
  name: string;
  basePrice: number;
}

interface AddToCartButtonProps {
  cake: CakeProduct;
  selectedSize: Size | null;
  selectedCream: CreamOption | null;
  customNotes: string;
  uploadedImages: string[];
  totalPrice: number;
  isAuthenticated: boolean;
}

export default function AddToCartButton({
  cake,
  selectedSize,
  selectedCream,
  customNotes,
  uploadedImages,
  totalPrice,
  isAuthenticated
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // TODO: Replace with Redux state management
  const addItem = (cake: CakeProduct, customization: CustomizationOptions, quantity: number) => {
    // Temporary placeholder - will be replaced with actual cart logic
    // console.log('Add to cart:', { cake, customization, quantity });
  };
  
  const addNotification = (notification: { type: string; title: string; message: string; duration?: number }) => {
    // Temporary placeholder - will be replaced with actual notification system
    // console.log('Notification:', notification);
  };

  const isDisabled = !selectedSize || !selectedCream || isAdding;

  const handleAddToCart = async () => {
    if (isDisabled) return;

    setIsAdding(true);
    
    try {
      // Create customization object
      const customization: CustomizationOptions = {
        selectedSize,
        selectedCream,
        selectedContainerType: { name: 'Circle', value: 'circle' }, // Default container
        customNotes,
        uploadedImages,
      };

      // Add to cart using the store
      addItem(cake, customization, 1);
      
      setIsAdded(true);
      addNotification({
        type: 'success',
        title: 'Added to Cart!',
        message: `${cake.name} has been added to your cart`,
        duration: 3000
      });
      
      // Reset added state after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to add item to cart',
        duration: 5000
      });
    } finally {
      setIsAdding(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Sign in to add this cake to your cart
          </p>
          <button className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-full text-sm font-semibold cursor-not-allowed">
            Sign in to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={`w-full py-4 px-6 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
          isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : isAdded
            ? 'bg-green-500 text-white'
            : 'bg-[#c7b8ea] text-black hover:bg-[#c7b8ea]/80 shadow-lg hover:shadow-xl'
        }`}
      >
        {isAdding ? (
          <>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span>Adding to Cart...</span>
          </>
        ) : isAdded ? (
          <>
            <Check className="w-5 h-5" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart - KES {totalPrice.toLocaleString()}</span>
          </>
        )}
      </button>

      {isDisabled && selectedSize && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Please select all options to continue
        </p>
      )}

      {!selectedSize && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Please select a size to continue
        </p>
      )}
    </div>
  );
} 