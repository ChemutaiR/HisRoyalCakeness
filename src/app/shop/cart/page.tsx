'use client';

// State management imports removed - will be replaced with Redux
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem, CustomLoafItem } from '@/types/shop/cart';

export default function CartPage() {
  // TODO: Replace with Redux state management
  const items: CartItem[] = []; // Temporary placeholder
  const customLoafItems: CustomLoafItem[] = []; // Temporary placeholder
  const totalItems = 0; // Temporary placeholder
  const totalPrice = 0; // Temporary placeholder
  const updateQuantity = (itemId: string, quantity: number) => {}; // Temporary placeholder
  const removeItem = (itemId: string) => {}; // Temporary placeholder
  const clearCart = () => {}; // Temporary placeholder
  const addNotification = (notification: { type: string; title: string; message: string; duration?: number }) => {}; // Temporary placeholder

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    addNotification({
      type: 'info',
      title: 'Removed from Cart',
      message: 'Item has been removed from your cart',
      duration: 2000
    });
  };

  const handleClearCart = () => {
    clearCart();
    addNotification({
      type: 'info',
      title: 'Cart Cleared',
      message: 'All items have been removed from your cart',
      duration: 2000
    });
  };

  

  if (totalItems === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-medium text-gray-800 tracking-wide mb-0.5 text-left w-full">Your Cart is Empty</h1>
          <p className="mb-8 text-sm text-gray-500 leading-relaxed w-full">Add some delicious cakes to get started!</p>
          <Link 
            href="/catalog"
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
                    {item.customization.customNotes && (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Notes: {item.customization.customNotes}
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
                  <span className="text-sm font-semibold text-gray-900 tracking-tight">KSH {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 leading-relaxed">Delivery</span>
                  <span className="text-sm font-semibold text-gray-900 tracking-tight">KSH 500</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg tracking-tight text-gray-900">
                    <span>Total</span>
                    <span>KSH {(totalPrice + 500).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#c7b8ea] text-black text-sm font-semibold py-3 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 