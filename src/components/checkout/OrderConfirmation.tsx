'use client';

import React from 'react';
import { useCheckout } from '@/hooks/checkout/useCheckout';
import { useCartStore } from '@/store/slices/shop/cart';
import { CheckCircle, Calendar, Clock, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function OrderConfirmation() {
  const { formData, orderSummary } = useCheckout();
  const { clearCart } = useCartStore();

  // Clear cart when confirmation is shown
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600">
          Thank you for your order. We&apos;ll send you a confirmation email shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Total</span>
            <span className="font-semibold text-gray-900">
              KES {orderSummary.total.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Items</span>
            <span className="text-gray-900">{orderSummary.itemCount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="text-gray-900">
              {orderSummary.deliveryFee === 0 ? 'Free' : `KES ${orderSummary.deliveryFee.toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      {formData.deliveryAddress && (
        <div className="bg-blue-50 rounded-lg p-6 text-left max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Delivery Address</p>
                <p className="text-sm text-gray-600">
                  {formData.deliveryAddress.street}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.deliveryAddress.country}
                </p>
                {formData.deliveryAddress.directions && (
                  <p className="text-sm text-gray-500">
                    {formData.deliveryAddress.directions}
                  </p>
                )}
              </div>
            </div>

            {formData.deliveryDate && formData.deliveryTime && (
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Time</p>
                  <p className="text-sm text-gray-600">
                    {new Date(formData.deliveryDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">{formData.deliveryTime}</p>
                </div>
              </div>
            )}

            {(formData as any).cakeScheduleDate && (formData as any).cakeScheduleTime && (
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Cake Preparation</p>
                  <p className="text-sm text-gray-600">
                    {new Date((formData as any).cakeScheduleDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">{(formData as any).cakeScheduleTime}</p>
                  {(formData as any).isRushOrder && (
                    <p className="text-sm text-orange-600 font-medium">Rush Order</p>
                  )}
                </div>
              </div>
            )}

            {formData.paymentMethod && (
              <div className="flex items-start space-x-2">
                <CreditCard className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Payment Method</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {formData.paymentMethod.replace('_', ' ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-yellow-50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">What&apos;s Next?</h3>
        <ul className="text-sm text-gray-600 space-y-1 text-left">
          <li>• You&apos;ll receive an order confirmation email</li>
          <li>• We&apos;ll start preparing your cake on the scheduled date</li>
          <li>• You&apos;ll get delivery updates via SMS</li>
          <li>• Our team will contact you if needed</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/shop/catalog"
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/shop/orders"
          className="inline-flex items-center px-6 py-3 bg-[#c7b8ea] text-white rounded-md shadow-sm text-sm font-medium hover:bg-[#c7b8ea]/90 transition-colors"
        >
          View Order Status
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
