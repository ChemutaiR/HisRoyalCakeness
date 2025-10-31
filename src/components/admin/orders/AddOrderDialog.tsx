"use client";

import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { OrderStatus } from '@/types/orders/order';

interface NewOrderData {
  dueDate: string;
  cake: string;
  cream: string;
  topping: string;
  allergies: string;
  specialInstructions: string;
  status: OrderStatus;
}

interface AddOrderDialogProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
  onSubmit: (orderData: NewOrderData) => void;
}

const initialOrderState: NewOrderData = {
  dueDate: '',
  cake: '',
  cream: '',
  topping: '',
  allergies: 'None',
  specialInstructions: '',
  status: 'received' as OrderStatus
};

export default function AddOrderDialog({ isOpen, orderId, onClose, onSubmit }: AddOrderDialogProps) {
  const [orderData, setOrderData] = useState<NewOrderData>(initialOrderState);

  const handleInputChange = useCallback((field: keyof NewOrderData, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(orderData);
    setOrderData(initialOrderState);
  }, [onSubmit, orderData]);

  const handleClose = useCallback(() => {
    setOrderData(initialOrderState);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const isFormValid = orderData.dueDate && orderData.cake && orderData.cream;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add New Order</h3>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Auto-generated Order ID */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Order ID (Auto-generated)</label>
            <input
              type="text"
              value={orderId}
              disabled
              className="w-full px-3 py-2 border-b border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">This order ID is automatically generated and cannot be changed.</p>
          </div>

          {/* Order Details Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
              <input
                type="date"
                value={orderData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#c7b8ea]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cake Type *</label>
              <select
                value={orderData.cake}
                onChange={(e) => handleInputChange('cake', e.target.value)}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#c7b8ea]"
                required
              >
                <option value="">Select Cake Type</option>
                <option value="Chocolate Cake">Chocolate Cake</option>
                <option value="Vanilla Cake">Vanilla Cake</option>
                <option value="Red Velvet Cake">Red Velvet Cake</option>
                <option value="Carrot Cake">Carrot Cake</option>
                <option value="Lemon Cake">Lemon Cake</option>
                <option value="Black Forest Cake">Black Forest Cake</option>
                <option value="Strawberry Cake">Strawberry Cake</option>
                <option value="Coconut Cake">Coconut Cake</option>
                <option value="Banana Cake">Banana Cake</option>
                <option value="Mocha Cake">Mocha Cake</option>
                <option value="Custom Cake">Custom Cake</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Whipping Cream *</label>
              <select
                value={orderData.cream}
                onChange={(e) => handleInputChange('cream', e.target.value)}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#c7b8ea]"
                required
              >
                <option value="">Select Cream Type</option>
                <option value="Vanilla">Vanilla</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Strawberry">Strawberry</option>
                <option value="Cream Cheese">Cream Cheese</option>
                <option value="Coffee">Coffee</option>
                <option value="Buttercream">Buttercream</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topping</label>
              <input
                type="text"
                value={orderData.topping}
                onChange={(e) => handleInputChange('topping', e.target.value)}
                placeholder="e.g., Chocolate Chips, Fresh Berries"
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#c7b8ea]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <select
                value={orderData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#c7b8ea]"
              >
                <option value="None">None</option>
                <option value="Nuts">Nuts</option>
                <option value="Dairy">Dairy</option>
                <option value="Gluten">Gluten</option>
                <option value="Eggs">Eggs</option>
                <option value="Soy">Soy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={orderData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#c7b8ea]"
              >
                <option value="received">Received</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
            <textarea
              value={orderData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Any special instructions or requirements for this order..."
              rows={4}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#c7b8ea]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="px-4 py-1.5 bg-[#c7b8ea] text-black rounded-md font-semibold hover:bg-[#c7b8ea]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Add Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

