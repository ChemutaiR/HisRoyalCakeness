'use client';

import { useCheckout } from '@/hooks/checkout/useCheckout';
import { useCartStore } from '@/store/slices/shop/cart';
import Image from 'next/image';
import { Clock, MapPin, CreditCard } from 'lucide-react';
import { DeliveryZone } from '@/types/shop/delivery';

interface CheckoutSummaryProps {
  subtotal: number;
  deliveryFee: number | null;
  total: number;
  selectedZone?: DeliveryZone | null;
}

export function CheckoutSummary({ subtotal, deliveryFee, total, selectedZone }: CheckoutSummaryProps) {
  const { formData, step } = useCheckout();
  const { items, customLoafItems } = useCartStore();

  const isConfirmationStep = step === 'confirmation';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        
        {/* Items List */}
        <div className="space-y-4 mb-6">
          {items.length === 0 && customLoafItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No items in cart</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.cake.image}
                  alt={item.cake.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.cake.name}
                </h4>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
                <div className="text-xs text-gray-600 mt-1">
                  <p>Size: {item.customization.selectedSize?.size}</p>
                  <p>Cream: {item.customization.selectedCream?.name}</p>
                  {item.customization.selectedDecorations && item.customization.selectedDecorations.length > 0 && (
                    <p>Decorations: {item.customization.selectedDecorations.map(d => d.name).join(', ')}</p>
                  )}
                  {item.customization.uploadedImages && item.customization.uploadedImages.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-700 mb-1">Design References:</p>
                      <div className="flex space-x-1">
                        {item.customization.uploadedImages.slice(0, 3).map((image, index) => (
                          <div key={index} className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image}
                              alt={`Design reference ${index + 1}`}
                              className="w-8 h-8 object-cover rounded border border-gray-200"
                            />
                          </div>
                        ))}
                        {item.customization.uploadedImages.length > 3 && (
                          <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{item.customization.uploadedImages.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  KES {(item.totalPrice).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {customLoafItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Custom</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  Custom Loaf - {item.cakeSelection.flavor.name}
                </h4>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
                <div className="text-xs text-gray-600 mt-1">
                  <p>Flavor: {item.cakeSelection.flavor.name}</p>
                  {item.cakeSelection.whippingCream && (
                    <p>Cream: {item.cakeSelection.whippingCream.name}</p>
                  )}
                  {item.cakeSelection.topping && (
                    <p>Topping: {item.cakeSelection.topping.name}</p>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  KES {((item.cakeSelection.price + (item.cakeSelection.whippingCream?.price || 0) + (item.cakeSelection.topping?.price || 0)) * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
            </>
          )}
        </div>

        {/* Order Details - Only show after completing delivery step */}
        {formData.deliveryAddress && step !== 'delivery' && (
          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">Delivery Address</p>
                <p className="text-gray-600">
                  {formData.deliveryAddress.street}
                </p>
                <p className="text-gray-600">
                  {formData.deliveryAddress.country}
                </p>
                {formData.deliveryAddress.directions && (
                  <p className="text-gray-500 text-xs mt-1">
                    <span className="font-medium">Directions:</span> {formData.deliveryAddress.directions}
                  </p>
                )}
              </div>
            </div>

            {formData.deliveryDate && formData.deliveryTime && (
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Delivery Time</p>
                  <div>
                    <p className="text-gray-600">
                      {new Date(formData.deliveryDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-600">{formData.deliveryTime}</p>
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod && step !== 'payment' && (
              <div className="flex items-start space-x-2">
                <CreditCard className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Payment Method</p>
                  <p className="text-gray-600 capitalize">
                    {formData.paymentMethod.replace('_', ' ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pricing Summary */}
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({items.reduce((sum: number, item) => sum + item.quantity, 0) + customLoafItems.reduce((sum: number, item) => sum + item.quantity, 0)} items)</span>
              <span className="text-gray-900">KES {(subtotal || 0).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Delivery Fee {selectedZone && `(${selectedZone.name})`}
              </span>
              <span className="text-gray-900">
                {deliveryFee === null ? '-' : (deliveryFee === 0 ? 'Free' : `KES ${deliveryFee.toLocaleString()}`)}
              </span>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">KES {(total || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions - Only show after completing delivery step */}
        {formData.specialInstructions && step !== 'delivery' && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900 mb-1">Special Instructions</p>
            <p className="text-sm text-gray-600">{formData.specialInstructions}</p>
          </div>
        )}

        {/* Confirmation Message */}
        {isConfirmationStep && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Order Placed Successfully!</h3>
                <p className="text-sm text-green-700 mt-1">
                  We&apos;ll send you a confirmation email shortly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
