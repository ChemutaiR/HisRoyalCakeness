'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CakeFlavor {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface WhippingCream {
  id: number;
  name: string;
  price: number;
}

interface Topping {
  id: number;
  name: string;
  type: 'fruit' | 'jam';
  price: number;
}

interface CakeSelection {
  flavor: CakeFlavor;
  whippingCream: WhippingCream | null;
  topping: Topping | null;
}

const cakeFlavors: CakeFlavor[] = [
  { id: 1, name: 'Vanilla', description: 'Classic vanilla cake', imageUrl: '/product-images/vanilla cake.jpg', price: 0 },
  { id: 2, name: 'Chocolate', description: 'Rich chocolate cake', imageUrl: '/product-images/chcocolate fudge.jpg', price: 100 },
  { id: 3, name: 'Red Velvet', description: 'Classic red velvet', imageUrl: '/product-images/red velvet.jpg', price: 150 },
  { id: 4, name: 'Lemon', description: 'Tangy lemon cake', imageUrl: '/product-images/lemon cake.jpg', price: 100 },
  { id: 5, name: 'Strawberry', description: 'Fresh strawberry cake', imageUrl: '/product-images/strawberry cake.jpg', price: 120 },
  { id: 6, name: 'Carrot', description: 'Moist carrot cake', imageUrl: '/product-images/carrot cake.jpg', price: 100 },
  { id: 7, name: 'Banana', description: 'Moist banana cake', imageUrl: '/product-images/banana cake.jpg', price: 80 },
  { id: 8, name: 'Coconut', description: 'Coconut cake', imageUrl: '/product-images/coconut cake.jpg', price: 120 },
  { id: 9, name: 'Coffee', description: 'Coffee flavored cake', imageUrl: '/product-images/mocha cake.jpg', price: 100 },
  { id: 10, name: 'Orange', description: 'Zesty orange cake', imageUrl: '/product-images/vanilla orange.jpg', price: 100 },
];

const whippingCreams: WhippingCream[] = [
  { id: 1, name: 'Vanilla Whipping Cream', price: 0 },
  { id: 2, name: 'Chocolate Whipping Cream', price: 50 },
  { id: 3, name: 'Strawberry Whipping Cream', price: 60 },
  { id: 4, name: 'Coffee Whipping Cream', price: 50 },
  { id: 5, name: 'Lemon Whipping Cream', price: 50 },
  { id: 6, name: 'Orange Whipping Cream', price: 50 },
  { id: 7, name: 'Coconut Whipping Cream', price: 60 },
  { id: 8, name: 'Caramel Whipping Cream', price: 70 },
];

const toppings: Topping[] = [
  { id: 1, name: 'Fresh Strawberries', type: 'fruit', price: 80 },
  { id: 2, name: 'Fresh Blueberries', type: 'fruit', price: 100 },
  { id: 3, name: 'Fresh Raspberries', type: 'fruit', price: 120 },
  { id: 4, name: 'Fresh Kiwi', type: 'fruit', price: 60 },
  { id: 5, name: 'Fresh Mango', type: 'fruit', price: 80 },
  { id: 6, name: 'Fresh Pineapple', type: 'fruit', price: 70 },
  { id: 7, name: 'Fresh Orange Slices', type: 'fruit', price: 50 },
  { id: 8, name: 'Fresh Lemon Slices', type: 'fruit', price: 40 },
  { id: 9, name: 'Strawberry Jam', type: 'jam', price: 40 },
  { id: 10, name: 'Blueberry Jam', type: 'jam', price: 50 },
  { id: 11, name: 'Raspberry Jam', type: 'jam', price: 60 },
  { id: 12, name: 'Orange Marmalade', type: 'jam', price: 40 },
  { id: 13, name: 'Lemon Curd', type: 'jam', price: 50 },
  { id: 14, name: 'Caramel Sauce', type: 'jam', price: 60 },
  { id: 15, name: 'Chocolate Sauce', type: 'jam', price: 50 },
];

export default function CustomLoavesPage() {
  const [selectedCakes, setSelectedCakes] = useState<CakeSelection[]>([]);
  const [customNotes, setCustomNotes] = useState('');

  const basePrice = 1800;
  const totalPrice = basePrice + selectedCakes.reduce((sum, cake) => {
    return sum + cake.flavor.price + (cake.whippingCream?.price || 0) + (cake.topping?.price || 0);
  }, 0);

  const handleFlavorSelect = (flavor: CakeFlavor) => {
    if (selectedCakes.length >= 3) {
      // Remove the first cake and add the new one
      setSelectedCakes([...selectedCakes.slice(1), { flavor, whippingCream: null, topping: null }]);
    } else {
      setSelectedCakes([...selectedCakes, { flavor, whippingCream: null, topping: null }]);
    }
  };

  const handleWhippingCreamSelect = (cakeIndex: number, whippingCream: WhippingCream) => {
    const updatedCakes = [...selectedCakes];
    updatedCakes[cakeIndex].whippingCream = whippingCream;
    setSelectedCakes(updatedCakes);
  };

  const handleToppingSelect = (cakeIndex: number, topping: Topping) => {
    const updatedCakes = [...selectedCakes];
    updatedCakes[cakeIndex].topping = topping;
    setSelectedCakes(updatedCakes);
  };

  const removeCake = (cakeIndex: number) => {
    setSelectedCakes(selectedCakes.filter((_, index) => index !== cakeIndex));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/catalog" className="hover:text-[#c7b8ea] flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Catalog
            </Link>
            <span>/</span>
            <span className="text-gray-900">Custom Loaves</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image 
              src="/product-images/custom loaves.jpg" 
              alt="Custom Loaves" 
              width={400} 
              height={300} 
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Loaves - Solo Slice Set</h1>
          <p className="text-lg text-gray-600">Create your perfect trio of cake slices with custom flavors, cream, and toppings</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Selections */}
          <div className="space-y-6">
            {/* Cake Flavors */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select 3 Cake Flavors</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {cakeFlavors.map((flavor) => (
                  <button
                    key={flavor.id}
                    onClick={() => handleFlavorSelect(flavor)}
                    className={`p-3 text-sm font-medium rounded-lg border transition-colors text-left ${
                      selectedCakes.find(cake => cake.flavor.id === flavor.id)
                        ? 'border-[#c7b8ea] bg-[#c7b8ea] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-[#c7b8ea] hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold">{flavor.name}</div>
                    <div className="text-xs opacity-80">{flavor.description}</div>
                    {flavor.price > 0 && (
                      <div className="text-xs mt-1">+KSH {flavor.price}</div>
                    )}
                  </button>
                ))}
              </div>
              {selectedCakes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Cakes:</h3>
                  <div className="space-y-3">
                    {selectedCakes.map((cake, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm">{cake.flavor.name}</span>
                          <button
                            onClick={() => removeCake(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        
                        {/* Whipping Cream for this cake */}
                        <div className="mb-2">
                          <label className="text-xs text-gray-600 mb-1 block">Whipping Cream:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {whippingCreams.map((cream) => (
                              <button
                                key={cream.id}
                                onClick={() => handleWhippingCreamSelect(index, cream)}
                                className={`p-2 text-xs font-medium rounded border transition-colors ${
                                  cake.whippingCream?.id === cream.id
                                    ? 'border-[#c7b8ea] bg-[#c7b8ea] text-white'
                                    : 'border-gray-300 text-gray-700 hover:border-[#c7b8ea] hover:bg-gray-50'
                                }`}
                              >
                                {cream.name}
                                {cream.price > 0 && <span className="ml-1">+KSH {cream.price}</span>}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Topping for this cake */}
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">Topping:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {toppings.map((topping) => (
                              <button
                                key={topping.id}
                                onClick={() => handleToppingSelect(index, topping)}
                                className={`p-2 text-xs font-medium rounded border transition-colors ${
                                  cake.topping?.id === topping.id
                                    ? 'border-[#c7b8ea] bg-[#c7b8ea] text-white'
                                    : 'border-gray-300 text-gray-700 hover:border-[#c7b8ea] hover:bg-gray-50'
                                }`}
                              >
                                <div className="font-semibold">{topping.name}</div>
                                <div className="text-xs opacity-80 capitalize">{topping.type}</div>
                                <div className="text-xs">+KSH {topping.price}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Special Instructions</h2>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Any special requests or instructions for your custom loaves..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-[#c7b8ea] resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Selected Cakes:</h3>
                  {selectedCakes.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCakes.map((cake, index) => (
                        <div key={index} className="border-l-4 border-[#c7b8ea] pl-3">
                          <div className="flex justify-between text-sm font-semibold">
                            <span>{cake.flavor.name}</span>
                            <span>KSH {cake.flavor.price}</span>
                          </div>
                          {cake.whippingCream && (
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>└ {cake.whippingCream.name}</span>
                              <span>KSH {cake.whippingCream.price}</span>
                            </div>
                          )}
                          {cake.topping && (
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>└ {cake.topping.name}</span>
                              <span>KSH {cake.topping.price}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No cakes selected</p>
                  )}
                </div>

                {customNotes && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Special Instructions:</h3>
                    <p className="text-sm text-gray-600">{customNotes}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Price:</span>
                    <span>KSH {totalPrice}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-[#c7b8ea] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b3a4d6] transition-colors"
                  onClick={() => alert('Add to cart functionality would be implemented here')}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 