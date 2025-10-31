"use client";

import { formatOrderDate } from '@/utils/orders/dateFormatters';

interface OrderHeroSectionProps {
  cakeName: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  dueDate: string;
}

export default function OrderHeroSection({
  cakeName,
  customerName,
  orderNumber,
  totalAmount,
  dueDate,
}: OrderHeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-2xl">🎂</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{cakeName}</h3>
            <p className="text-sm text-gray-600">{customerName} • {orderNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">KES {totalAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Due: {formatOrderDate(dueDate)}</div>
        </div>
      </div>
    </div>
  );
}

