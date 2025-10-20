"use client";

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, CreditCard, DollarSign, Shield } from 'lucide-react';

export default function PaymentSettingsPage() {
  const [paymentMethods, setPaymentMethods] = useState({
    mpesa: { enabled: true, account: '254700123456' },
    bankTransfer: { enabled: true, account: '1234567890' },
    cash: { enabled: true },
    card: { enabled: false }
  });

  const [pricing, setPricing] = useState({
    currency: 'KES',
    taxRate: 16,
    deliveryFee: 500,
    minimumOrder: 2000
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handlePaymentMethodChange = (method: string, field: string, value: boolean | string) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: {
        ...prev[method as keyof typeof prev],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handlePricingChange = (field: string, value: string | number) => {
    setPricing(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // console.log('Saving payment settings:', { paymentMethods, pricing });
    setHasChanges(false);
  };

  return (
    <AdminLayout 
      title="Payment Settings" 
      description="Configure payment methods and pricing"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Payment & Billing</h2>
            <p className="text-gray-600">Set up payment methods and configure pricing for your bakery.</p>
          </div>
          {hasChanges && (
            <button
              onClick={handleSave}
              className="bg-[#c7b8ea] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#c7b8ea]/80 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
          </div>
          <div className="space-y-4">
            {/* M-Pesa */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">MP</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">M-Pesa</h4>
                  <p className="text-sm text-gray-500">Mobile money payments</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={paymentMethods.mpesa.account}
                  onChange={(e) => handlePaymentMethodChange('mpesa', 'account', e.target.value)}
                  placeholder="Phone number"
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={paymentMethods.mpesa.enabled}
                    onChange={(e) => handlePaymentMethodChange('mpesa', 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                  />
                  <span className="text-sm text-gray-600">Enabled</span>
                </label>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Bank Transfer</h4>
                  <p className="text-sm text-gray-500">Direct bank transfers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={paymentMethods.bankTransfer.account}
                  onChange={(e) => handlePaymentMethodChange('bankTransfer', 'account', e.target.value)}
                  placeholder="Account number"
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={paymentMethods.bankTransfer.enabled}
                    onChange={(e) => handlePaymentMethodChange('bankTransfer', 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                  />
                  <span className="text-sm text-gray-600">Enabled</span>
                </label>
              </div>
            </div>

            {/* Cash */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Cash on Delivery</h4>
                  <p className="text-sm text-gray-500">Pay when you receive your order</p>
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={paymentMethods.cash.enabled}
                  onChange={(e) => handlePaymentMethodChange('cash', 'enabled', e.target.checked)}
                  className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                />
                <span className="text-sm text-gray-600">Enabled</span>
              </label>
            </div>

            {/* Card Payments */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Card Payments</h4>
                  <p className="text-sm text-gray-500">Credit and debit cards</p>
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={paymentMethods.card.enabled}
                  onChange={(e) => handlePaymentMethodChange('card', 'enabled', e.target.checked)}
                  className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                />
                <span className="text-sm text-gray-600">Enabled</span>
              </label>
            </div>
          </div>
        </div>

        {/* Pricing Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-[#c7b8ea]" />
            <h3 className="text-lg font-semibold text-gray-800">Pricing Configuration</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={pricing.currency}
                onChange={(e) => handlePricingChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
              >
                <option value="KES">Kenyan Shilling (KES)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={pricing.taxRate}
                onChange={(e) => handlePricingChange('taxRate', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Fee ({pricing.currency})</label>
              <input
                type="number"
                value={pricing.deliveryFee}
                onChange={(e) => handlePricingChange('deliveryFee', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order ({pricing.currency})</label>
              <input
                type="number"
                value={pricing.minimumOrder}
                onChange={(e) => handlePricingChange('minimumOrder', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7b8ea]"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}