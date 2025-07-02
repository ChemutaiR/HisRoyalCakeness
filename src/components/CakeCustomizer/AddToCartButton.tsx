'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

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

interface Cake {
  id: number;
  name: string;
  basePrice: number;
}

interface AddToCartButtonProps {
  cake: Cake;
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

  const isDisabled = !selectedSize || !selectedCream || isAdding;

  const handleAddToCart = async () => {
    if (isDisabled) return;

    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cartItem = {
      id: Date.now(), // Generate unique ID
      cakeId: cake.id,
      cakeName: cake.name,
      size: selectedSize.size,
      creamType: selectedCream.name,
      customNotes,
      referenceImages: uploadedImages,
      price: totalPrice,
      servings: selectedSize.servings,
      quantity: 1
    };

    // TODO: Add to cart context/state management
    console.log('Adding to cart:', cartItem);
    
    setIsAdding(false);
    setIsAdded(true);
    
    // Reset added state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Sign in to add this cake to your cart
          </p>
          <button className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-full font-semibold cursor-not-allowed">
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
        className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
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