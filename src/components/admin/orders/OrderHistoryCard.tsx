/**
 * Order History Card Component
 * 
 * Displays individual order information in history view
 */

import React from 'react';
import { Calendar, User, Mail, Phone, MapPin, Clock, Eye } from 'lucide-react';
import { OrderHistoryCardProps } from '@/types/admin/orderHistory';
import { formatCurrency } from '@/utils/shared/format';

export default function OrderHistoryCard({ 
  order, 
  onViewDetails, 
  isReadOnly = true 
}: OrderHistoryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{order.id}</h3>
          <p className="text-xs text-gray-500">#{order.orderNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            {order.status}
          </span>
          <button
            onClick={() => onViewDetails(order)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">{order.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{order.customerEmail}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{order.customerPhone}</span>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Cake:</span>
          <span className="text-gray-900 font-medium">{order.cake}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Size:</span>
          <span className="text-gray-900">{order.size}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Cream:</span>
          <span className="text-gray-900">{order.cream}</span>
        </div>
        {order.topping && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Topping:</span>
            <span className="text-gray-900">{order.topping}</span>
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">Delivered:</span>
          <span className="text-gray-900">{formatDate(order.deliveryDate)}</span>
          <span className="text-gray-500 text-xs">({getDaysAgo(order.deliveryDate)})</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">Created:</span>
          <span className="text-gray-900">{formatDate(order.createdAt)}</span>
          <span className="text-gray-500 text-xs">({formatTime(order.createdAt)})</span>
        </div>
      </div>

      {/* Special Instructions */}
      {order.specialInstructions && (
        <div className="mb-3">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <span className="text-gray-500">Instructions:</span>
              <p className="text-gray-900 text-xs mt-1">{order.specialInstructions}</p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notes */}
      {order.customNotes && (
        <div className="mb-3">
          <div className="text-sm">
            <span className="text-gray-500">Notes:</span>
            <p className="text-gray-900 text-xs mt-1">{order.customNotes}</p>
          </div>
        </div>
      )}

      {/* Payment Info */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-sm">
          <span className="text-gray-500">Payment:</span>
          <span className="text-gray-900 ml-1">{order.paymentMethod}</span>
          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
            order.paymentStatus === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {order.paymentStatus}
          </span>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">
            {formatCurrency(order.totalAmount)}
          </div>
        </div>
      </div>

      {/* Images Preview */}
      {order.images && order.images.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Design References:</span>
            <span className="text-gray-900">{order.images.length} image{order.images.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
}
