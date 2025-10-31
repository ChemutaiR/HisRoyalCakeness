'use client';

import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/shop/useCart';
// import { CartItem, CustomLoafItem } from '@/types/shop/cart';

export default function CartPage() {
  // Use real cart hook for cart functionality
  const {
    items,
    customLoafItems,
    totalItems,
    totalPrice: _totalPrice,
    subtotal,
    deliveryFee: _deliveryFee,
    total,
    isLoading,
    error,
    updateQuantity,
    removeItem,
    clearCart,
    cartSummary
  } = useCart();

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    await updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeItem(itemId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 leading-relaxed">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 tracking-wide mb-4">Error Loading Cart</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-medium text-gray-800 tracking-wide mb-0.5 text-left w-full">Your Cart is Empty</h1>
          <p className="mb-8 text-sm text-gray-500 leading-relaxed w-full">Add some delicious cakes to get started!</p>
          <Link 
            href="/shop/catalog"
            className="w-full bg-[#c7b8ea] text-black text-sm font-semibold py-2 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow text-center"
          >
            Browse Cakes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-gray-800 tracking-wide">Your Cart <span className="text-sm text-gray-500 leading-relaxed">({totalItems} items)</span></h1>
          {totalItems > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Regular Cake Items */}
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={item.cake.image}
                    alt={item.cake.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 tracking-wide">{item.cake.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Size: {item.customization.selectedSize?.size}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Cream: {item.customization.selectedCream?.name}
                    </p>
                           {item.customization.selectedDecorations && item.customization.selectedDecorations.length > 0 && (
                             <p className="text-xs text-gray-500 leading-relaxed">
                               Decorations: {item.customization.selectedDecorations.map(d => d.name).join(', ')}
                             </p>
                           )}
                    {item.customization.customNotes && (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Notes: {item.customization.customNotes}
                      </p>
                    )}
                           {item.customization.uploadedImages && item.customization.uploadedImages.length > 0 && (
                             <div className="mt-3">
                               <p className="text-xs font-medium text-gray-700 mb-2">Design References:</p>
                               <div className="grid grid-cols-3 gap-2">
                                 {item.customization.uploadedImages.map((image, index) => (
                                   <div key={index} className="relative">
                                     {/* eslint-disable-next-line @next/next/no-img-element */}
                                     <img
                                       src={image}
                                       alt={`Design reference ${index + 1}`}
                                       className="w-full h-16 object-cover rounded-md border border-gray-200"
                                     />
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-gray-900 tracking-tight">
                          KSH {(item.totalPrice * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Custom Loaf Items */}
            {customLoafItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Custom</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 tracking-wide">Custom Loaf Set</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.cakeSelection.flavor.name}
                    </p>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.cakeSelection.whippingCream && (
                        <span className="text-xs text-gray-500 leading-relaxed">Whipping Cream: {item.cakeSelection.whippingCream.name}</span>
                      )}
                      {item.cakeSelection.topping && (
                        <span className="ml-2 text-xs text-gray-500 leading-relaxed">Topping: {item.cakeSelection.topping.name}</span>
                      )}
                    </div>
                    {item.customNotes && (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Notes: {item.customNotes}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-gray-900 tracking-tight">
                          KSH {(item.totalPrice * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-medium text-gray-800 tracking-wide mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 leading-relaxed">Subtotal ({totalItems} items)</span>
                  <span className="text-sm font-semibold text-gray-900 tracking-tight">KSH {subtotal.toLocaleString()}</span>
                </div>
                {(() => {
                  const discount = cartSummary?.discountAmount || 0;
                  const finalTotal = subtotal - discount + (subtotal >= 2000 ? 0 : 200);
                  return discount > 0 ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Promotion Discount</span>
                        <span className="text-green-600 font-semibold">-KSH {discount.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold text-lg tracking-tight text-gray-900">
                          <span>Total</span>
                          <span>KSH {finalTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg tracking-tight text-gray-900">
                        <span>Total</span>
                        <span>KSH {total.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <Link 
                href="/shop/checkout"
                className="w-full bg-[#c7b8ea] text-black text-sm font-semibold py-3 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow text-center block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 