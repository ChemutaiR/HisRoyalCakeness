'use client';

import { CheckCircle, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useOrdersStore } from '@/store/slices/orders/orders';
import { CheckoutFormData } from '@/types/orders/order';
import { calculateItemPriceBreakdown, calculateOrderTotals } from '@/utils/orders/priceBreakdown';

interface ConfirmationStepProps {
  formData: CheckoutFormData;
  currentOrder: any;
}

export default function ConfirmationStep({
  formData,
  currentOrder,
}: ConfirmationStepProps) {
  // Try to get current order or find it by order number
  let orderToDisplay: any = currentOrder;
  if (!orderToDisplay && formData.orderNumber) {
    // Find order by order number from the orders list
    const { orders } = useOrdersStore.getState();
    orderToDisplay = orders.find(order => order.orderNumber === formData.orderNumber) || null;
  }
  
  if (!orderToDisplay || !orderToDisplay.items) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      {/* Order Confirmed Header */}
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
        
        {/* Order Details Card */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">Order ID</p>
              <p className="text-lg font-semibold text-green-900">{orderToDisplay.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">Payment Status</p>
              <p className="text-lg font-semibold text-green-900">50% paid via M-Pesa</p>
              <p className="text-xs text-green-700">Transaction: {orderToDisplay.paymentInfo.transactionId || 'Processing...'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border-t pt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <ShoppingBag className="w-5 h-5 text-[#c7b8ea] mr-2" />
          Order Summary
        </h3>
        
        {/* Items List */}
        <div className="space-y-4 mb-6">
          {(orderToDisplay.items || []).map((item: any) => {
            const breakdown = calculateItemPriceBreakdown(item);
            
            return (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                {/* Item Header */}
                <div className="flex items-start space-x-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.cakeImage || item.cake?.images?.[0] || '/placeholder-cake.jpg'}
                      alt={item.cakeName || item.cake?.name || 'Cake'}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.cakeName || item.cake?.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      Qty: {breakdown.quantity} • Size: {item.customization?.selectedSize?.size || item.size?.weight}
                    </p>
                    {item.customization?.uploadedImages && item.customization.uploadedImages.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Design References:</p>
                        <div className="flex space-x-1">
                          {item.customization.uploadedImages.slice(0, 3).map((image: any, index: number) => (
                            <div key={index} className="relative">
                              <Image
                                src={image}
                                alt={`Design reference ${index + 1}`}
                                width={32}
                                height={32}
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
                </div>
                
                {/* Price Breakdown */}
                <div className="pl-20 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price ({item.customization?.selectedSize?.size || item.size?.weight})</span>
                    <span className="text-gray-900">KES {breakdown.basePrice.toLocaleString()}</span>
                  </div>
                  {breakdown.breakdown.cream && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cream ({breakdown.breakdown.cream.name})</span>
                      <span className="text-gray-900">+KES {breakdown.breakdown.cream.price.toLocaleString()}</span>
                    </div>
                  )}
                  {breakdown.breakdown.decorations.length > 0 && breakdown.breakdown.decorations.map((dec, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-600">Decoration ({dec.name})</span>
                      <span className="text-gray-900">+KES {dec.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Unit Price</span>
                    <span className="text-gray-900 font-medium">KES {breakdown.unitSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">× {breakdown.quantity}</span>
                    <span className="text-gray-900 font-semibold">KES {breakdown.itemTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Summary (Detailed) */}
        <div className="bg-gray-50 rounded-lg p-6">
          {(() => {
            const totals = calculateOrderTotals(
              orderToDisplay.items || [],
              orderToDisplay.customLoafItems || []
            );
            const deliveryFee = orderToDisplay.deliveryFee || 0;
            const total = orderToDisplay.total ?? (totals.subtotal + deliveryFee);

            return (
              <div className="space-y-3">
                {totals.customLoafCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Custom Loaves ({totals.customLoafCount} item{totals.customLoafCount !== 1 ? 's' : ''})
                    </span>
                    <span className="font-medium">KES {totals.customLoafSubtotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-700 font-medium">
                    Total ({totals.itemsCount + totals.customLoafCount} item{(totals.itemsCount + totals.customLoafCount) !== 1 ? 's' : ''})
                  </span>
                  <span className="font-semibold">KES {totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">KES {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <span>Grand Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 border-t pt-2">
                  <span>Paid Now (50%)</span>
                  <span>KES {Math.round((totals.subtotal + deliveryFee) * 0.5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Remaining (50%)</span>
                  <span>KES {Math.round((totals.subtotal + deliveryFee) * 0.5).toLocaleString()}</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link 
          href="/shop/catalog"
          className="inline-flex items-center px-6 py-3 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

