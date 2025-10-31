'use client';

import { CreditCard } from 'lucide-react';
import { PaymentMethod } from '@/types/shared/order';
import { CheckoutFormData } from '@/types/orders/order';

interface PaymentStepProps {
  formData: CheckoutFormData;
  cartSummary: {
    subtotal: number;
    deliveryFee: number;
    total: number;
    discountAmount: number;
  };
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  getFieldError: (fieldName: string) => string;
}

export default function PaymentStep({
  formData,
  cartSummary,
  updateFormData,
  getFieldError,
}: PaymentStepProps) {
  return (
    <div className="space-y-6">
      {/* Payment Terms Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-2">Payment Terms</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Pay <strong>50% of total (KES {Math.round((cartSummary.subtotal + (cartSummary.deliveryFee || 0)) * 0.5).toLocaleString()})</strong> now to secure your order</p>
              <p>• Pay the remaining <strong>50% (KES {Math.round((cartSummary.subtotal + (cartSummary.deliveryFee || 0)) * 0.5).toLocaleString()})</strong> when your cake is ready for dispatch</p>
              <p>• Your cake will <strong>not be dispatched</strong> until full payment is completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* M-Pesa Payment Option */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
        <div className="space-y-4">
          {/* M-Pesa Option */}
          <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={formData.paymentMethod === 'mpesa'}
                onChange={(e) => updateFormData({ paymentMethod: e.target.value as PaymentMethod })}
                className="text-[#c7b8ea] focus:ring-[#c7b8ea]"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 flex items-center space-x-2">
                  <span>M-Pesa</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Pay securely with M-Pesa mobile money
                </div>
              </div>
            </div>
          </div>

          {/* M-Pesa Phone Number */}
          {formData.paymentMethod === 'mpesa' && (
            <div className="ml-6">
              <div>
                <label htmlFor="mpesaPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  id="mpesaPhoneNumber"
                  placeholder="Enter your M-Pesa registered phone number"
                  value={formData.mpesaPhoneNumber || ''}
                  onChange={(e) => updateFormData({ mpesaPhoneNumber: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    getFieldError('mpesaPhoneNumber') 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-[#c7b8ea]'
                  }`}
                />
                {getFieldError('mpesaPhoneNumber') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('mpesaPhoneNumber')}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Enter the phone number registered with your M-Pesa account
                </p>
              </div>
            </div>
          )}
        </div>
        {getFieldError('paymentMethod') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('paymentMethod')}</p>
        )}
      </div>

    </div>
  );
}

