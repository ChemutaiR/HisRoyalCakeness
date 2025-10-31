"use client";

import { X } from 'lucide-react';
import { getStatusColor } from '@/utils/orders/statusColors';

interface OrderHeaderSectionProps {
  orderNumber: string;
  status: string;
  onClose: () => void;
}

export default function OrderHeaderSection({
  orderNumber,
  status,
  onClose,
}: OrderHeaderSectionProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Order Details - {orderNumber}
        </h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}

