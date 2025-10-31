"use client";

import { formatOrderDate } from '@/utils/orders/dateFormatters';

interface OrderInfoSectionProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
}

export default function OrderInfoSection({
  customerName,
  customerEmail,
  customerPhone,
  createdAt,
}: OrderInfoSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 text-sm">👤</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 text-sm w-16">Name:</span>
          <span className="font-medium text-gray-900">{customerName}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 text-sm w-16">Email:</span>
          <span className="font-medium text-gray-900 text-sm">{customerEmail}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 text-sm w-16">Phone:</span>
          <span className="font-medium text-gray-900">{customerPhone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 text-sm w-16">Created:</span>
          <span className="font-medium text-gray-900 text-sm">{formatOrderDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

