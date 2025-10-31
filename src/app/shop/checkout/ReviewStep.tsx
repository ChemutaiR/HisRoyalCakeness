'use client';

import { MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary';
import { CheckoutFormData } from '@/types/orders/order';
import { DeliveryZone } from '@/types/shop/delivery';

interface ReviewStepProps {
  formData: CheckoutFormData;
  subtotal: number;
  deliveryFee: number | null;
  cartSummary: {
    subtotal: number;
    deliveryFee: number;
    total: number;
    discountAmount: number;
  };
  selectedZone: DeliveryZone | null;
  discountAmount: number;
}

// Helper function to format time from HH:MM to readable format (e.g., "09:00" -> "9:00 AM")
function formatTime(time: string): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export default function ReviewStep({
  formData,
  subtotal,
  deliveryFee,
  cartSummary,
  selectedZone,
  discountAmount,
}: ReviewStepProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-6">
        {/* Delivery Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <MapPin className="w-5 h-5 text-[#c7b8ea] mr-2" />
            Delivery Information
          </h3>
          <div className="space-y-2 pl-7">
            {selectedZone && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Delivery Zone:</span> {selectedZone.name}
              </p>
            )}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Street Address:</span> {formData.deliveryAddress?.street || 'Not provided'}
            </p>
            {formData.deliveryAddress?.phone && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone Number:</span> {formData.deliveryAddress.phone}
              </p>
            )}
            {formData.deliveryAddress?.directions && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Directions/Landmarks:</span> {formData.deliveryAddress.directions}
              </p>
            )}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery Date:</span> {formData.deliveryDate ? new Date(formData.deliveryDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Not selected'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery Time:</span> {formData.deliveryTime ? formatTime(formData.deliveryTime) : 'Not selected'}
            </p>
            {formData.specialInstructions && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Special Instructions:</span> {formData.specialInstructions}
              </p>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <CreditCard className="w-5 h-5 text-[#c7b8ea] mr-2" />
            Payment Information
          </h3>
          <div className="space-y-2 pl-7">
            <p className="text-sm text-gray-600"><span className="font-medium">Method:</span> M-Pesa</p>
            {formData.mpesaPhoneNumber && <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {formData.mpesaPhoneNumber}</p>}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <ShoppingBag className="w-5 h-5 text-[#c7b8ea] mr-2" />
            Order Summary
          </h3>
          <div className="pl-7">
            <CheckoutSummary 
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={cartSummary.total}
              discountAmount={discountAmount}
              selectedZone={selectedZone}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

