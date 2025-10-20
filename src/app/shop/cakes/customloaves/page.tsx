'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// State management imports removed - will be replaced with Redux
import { CakeFlavor, WhippingCream, Topping, CakeSelection } from '@/types/shop/catalog';

export default function CustomLoavesPage() {
  const [selectedCakes, setSelectedCakes] = useState<CakeSelection[]>([]);
  const [customNotes, setCustomNotes] = useState('');
  const [cakeFlavors, setCakeFlavors] = useState<CakeFlavor[]>([]);
  const [whippingCreams, setWhippingCreams] = useState<WhippingCream[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // TODO: Replace with Redux state management
  const addCustomLoaf = (cakes: CakeSelection[], notes: string) => {
    // Temporary placeholder - will be replaced with actual cart logic
    // console.log('Add custom loaf:', { cakes, notes });
  };
  
  const addNotification = (notification: { type: string; title: string; message: string; duration?: number }) => {
    // Temporary placeholder - will be replaced with actual notification system
    // console.log('Notification:', notification);
  };

  // TODO: Replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const [flavorsResponse, creamsResponse, toppingsResponse] = await Promise.all([
        //   fetch('/api/cake-flavors'),
        //   fetch('/api/whipping-creams'),
        //   fetch('/api/toppings')
        // ]);
        // const flavors = await flavorsResponse.json();
        // const creams = await creamsResponse.json();
        // const toppingsData = await toppingsResponse.json();
        
        // For now, set empty arrays
        setCakeFlavors([]);
        setWhippingCreams([]);
        setToppings([]);
        setError('Custom loaf data not available. Please implement API integration.');
      } catch (err) {
        setError('Failed to load custom loaf options');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const basePrice = 1800;
  const totalPrice = basePrice + selectedCakes.reduce((sum, cake) => {
    return sum + cake.flavor.price + (cake.whippingCream?.price || 0) + (cake.topping?.price || 0);
  }, 0);

  const addCake = () => {
    if (cakeFlavors.length === 0) {
      addNotification({
        type: 'warning',
        title: 'No Flavors Available',
        message: 'Please implement API integration to load cake flavors',
        duration: 3000
      });
      return;
    }

    const newCake: CakeSelection = {
      id: Date.now(), // Generate unique ID
      name: cakeFlavors[0].name,
      description: cakeFlavors[0].description,
      imageUrl: cakeFlavors[0].imageUrl,
      price: cakeFlavors[0].price,
      flavor: cakeFlavors[0], // Default to first available flavor
      whippingCream: whippingCreams.length > 0 ? whippingCreams[0] : null,
      topping: null
    };
    setSelectedCakes([...selectedCakes, newCake]);
  };

  const removeCake = (index: number) => {
    setSelectedCakes(selectedCakes.filter((_, i) => i !== index));
  };

  const updateCake = (index: number, field: keyof CakeSelection, value: any) => {
    const updatedCakes = [...selectedCakes];
    updatedCakes[index] = { ...updatedCakes[index], [field]: value };
    setSelectedCakes(updatedCakes);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading custom loaf options...</p>
        </div>
      </div>
    );
  }

  if (error) {
  return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Custom Loaves Unavailable</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/catalog"
            className="inline-flex items-center px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/catalog"
            className="inline-flex items-center text-[#c7b8ea] hover:text-[#b3a4d6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cake Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Loaf Set</h1>
              <p className="text-gray-600">
                Create your perfect custom loaf set by selecting up to 4 different cake flavors, 
                each with your choice of whipping cream and toppings.
              </p>
              </div>

            {/* Selected Cakes */}
            <div className="space-y-4">
                    {selectedCakes.map((cake, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Cake {index + 1}</h3>
                          <button
                            onClick={() => removeCake(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Flavor Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Flavor
                      </label>
                      <select
                        value={cake.flavor.id}
                        onChange={(e) => {
                          const flavor = cakeFlavors.find(f => f.id === parseInt(e.target.value));
                          if (flavor) updateCake(index, 'flavor', flavor);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                      >
                        {cakeFlavors.map((flavor) => (
                          <option key={flavor.id} value={flavor.id}>
                            {flavor.name} (+KSH {flavor.price})
                          </option>
                        ))}
                      </select>
                          </div>

                    {/* Whipping Cream Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Whipping Cream
                      </label>
                      <select
                        value={cake.whippingCream?.id || ''}
                        onChange={(e) => {
                          const cream = whippingCreams.find(c => c.id === parseInt(e.target.value));
                          updateCake(index, 'whippingCream', cream || null);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                      >
                        <option value="">No cream</option>
                        {whippingCreams.map((cream) => (
                          <option key={cream.id} value={cream.id}>
                            {cream.name} (+KSH {cream.price})
                          </option>
                        ))}
                      </select>
                        </div>

                    {/* Topping Selection */}
                        <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Topping
                      </label>
                      <select
                        value={cake.topping?.id || ''}
                        onChange={(e) => {
                          const topping = toppings.find(t => t.id === parseInt(e.target.value));
                          updateCake(index, 'topping', topping || null);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                      >
                        <option value="">No topping</option>
                            {toppings.map((topping) => (
                          <option key={topping.id} value={topping.id}>
                            {topping.name} (+KSH {topping.price})
                          </option>
                        ))}
                      </select>
                      </div>
                  </div>
                </div>
              ))}

              {/* Add Cake Button */}
              {selectedCakes.length < 4 && (
                <button
                  onClick={addCake}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#c7b8ea] hover:text-[#c7b8ea] transition-colors"
                >
                  + Add Another Cake
                </button>
              )}
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Any special instructions or requests..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c7b8ea] focus:border-transparent"
                rows={4}
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Base Price (4 loaves):</span>
                  <span>KSH {basePrice}</span>
                </div>
                
                      {selectedCakes.map((cake, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <div className="font-medium">Cake {index + 1}:</div>
                    <div className="ml-2">
                      <div>{cake.flavor.name} (+KSH {cake.flavor.price})</div>
                          {cake.whippingCream && (
                        <div>{cake.whippingCream.name} (+KSH {cake.whippingCream.price})</div>
                          )}
                          {cake.topping && (
                        <div>{cake.topping.name} (+KSH {cake.topping.price})</div>
                          )}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Price:</span>
                    <span>KSH {totalPrice}</span>
                  </div>
                  </div>
                </div>

                <button
                  className="w-full bg-[#c7b8ea] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b3a4d6] transition-colors"
                onClick={() => {
                  if (selectedCakes.length === 0) {
                    addNotification({
                      type: 'warning',
                      title: 'No Cakes Selected',
                      message: 'Please select at least one cake flavor',
                      duration: 3000
                    });
                    return;
                  }
                  
                  addCustomLoaf(selectedCakes, customNotes);
                  addNotification({
                    type: 'success',
                    title: 'Added to Cart!',
                    message: 'Custom loaf set has been added to your cart',
                    duration: 3000
                  });
                }}
                >
                  Add to Cart
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 