'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/hooks/shop/useCart';
import { areCustomizationsEqual } from '@/utils/cart/comparison';
import { CustomizationOptions, Decoration } from '@/types/shop/catalog';

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
  description: string;
  image: string;
  prices: Array<{
    weight: string;
    amount: number;
    servings: number;
  }>;
  featured: boolean;
  basePrice: number;
}

interface AddToCartButtonProps {
  cake: CakeProduct;
  selectedSize: Size | null;
  selectedCream: CreamOption | null;
  selectedDecorations: Decoration[];
  customNotes: string;
  uploadedImages: string[];
  totalPrice: number;
  isAuthenticated: boolean;
}

export default function AddToCartButton({
  cake,
  selectedSize,
  selectedCream,
  selectedDecorations,
  customNotes,
  uploadedImages,
  totalPrice,
  isAuthenticated
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // Use cart hook for real cart functionality
  const { addItem, updateQuantity, removeItem, items, isLoading, error } = useCart();

  const isDisabled = !selectedSize || !selectedCream || isAdding || isLoading;

  // Find if this customization already exists in cart
  const existing = items.find(it => it.cake.id === cake.id && areCustomizationsEqual(it.customization as any, {
    selectedSize,
    selectedCream,
    selectedContainerType: { name: 'Circle', value: 'circle' },
    selectedDecorations,
    customNotes,
    uploadedImages,
  } as any));

  const handleAddToCart = async () => {
    if (isDisabled) return;

    setIsAdding(true);
    
    try {
      // Create customization object
      const customization: CustomizationOptions = {
        selectedSize,
        selectedCream,
        selectedContainerType: { name: 'Circle', value: 'circle' }, // Default container
        selectedDecorations,
        customNotes,
        uploadedImages,
      };

      // Add to cart using the real cart hook
      await addItem(cake, customization, 1);
      
      setIsAdded(true);
      
      // Reset added state after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      // console.error('Failed to add item to cart:', error);
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
      {existing ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full border border-gray-300">
            <button
              className="px-4 py-2 text-lg"
              onClick={async () => {
                const newQty = existing.quantity - 1;
                if (newQty <= 0) {
                  await removeItem(existing.id);
                } else {
                  await updateQuantity(existing.id, newQty);
                }
              }}
              disabled={isLoading}
            >
              -
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center font-semibold">{existing.quantity}</span>
            <button
              className="px-4 py-2 text-lg"
              onClick={async () => {
                await updateQuantity(existing.id, existing.quantity + 1);
              }}
              disabled={isLoading}
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-700">KES {totalPrice.toLocaleString()} each</span>
        </div>
      ) : (
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
          {(isAdding || isLoading) ? (
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
      )}

      {error && (
        <p className="text-sm text-red-500 text-center mt-2">
          {error}
        </p>
      )}

      {isDisabled && selectedSize && !isLoading && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Please select all options to continue
        </p>
      )}

      {!selectedSize && !isLoading && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Please select a size to continue
        </p>
      )}
    </div>
  );
} 