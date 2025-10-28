/**
 * Order History Modal Component
 * 
 * Read-only modal for viewing order details in history
 */

import React from 'react';
import { X, Calendar, User, Mail, Phone, MapPin, Clock, CreditCard, Package, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { OrderHistoryModalProps } from '@/types/admin/orderHistory';
import { formatCurrency } from '@/utils/shared/format';

export default function OrderHistoryModal({ 
  isOpen, 
  onClose, 
  order, 
  isReadOnly = true 
}: OrderHistoryModalProps) {
  if (!isOpen || !order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysAgo = (dateString: string) => {
    const now = new Date();
    const orderDate = new Date(dateString);
    const diffTime = now.getTime() - orderDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details - {order.id}
                </h3>
                <p className="text-sm text-gray-500">#{order.orderNumber}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">{order.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Cake</p>
                    <p className="text-sm text-gray-600">{order.cake}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Size</p>
                    <p className="text-sm text-gray-600">{order.size}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Cream</p>
                    <p className="text-sm text-gray-600">{order.cream}</p>
                  </div>
                  {order.topping && (
                    <div>
                      <p className="text-sm font-medium text-gray-900">Topping</p>
                      <p className="text-sm text-gray-600">{order.topping}</p>
                    </div>
                  )}
                  {order.allergies && order.allergies !== 'None' && (
                    <div>
                      <p className="text-sm font-medium text-gray-900">Allergies</p>
                      <p className="text-sm text-red-600">{order.allergies}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Delivery Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivery Date</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.deliveryDate)} ({getDaysAgo(order.deliveryDate)})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Created</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  {order.specialInstructions && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Special Instructions</p>
                        <p className="text-sm text-gray-600">{order.specialInstructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment Method</p>
                    <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.paymentStatus === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus === 'completed' ? 'Completed' : 'Incomplete'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Total Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Notes */}
            {order.customNotes && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Custom Notes</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{order.customNotes}</p>
              </div>
            )}

            {/* Design References */}
            {order.images && order.images.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Design References ({order.images.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {order.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Design reference ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
