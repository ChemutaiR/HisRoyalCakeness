"use client";

import { Package, DollarSign } from 'lucide-react';

interface OrderHistoryStatsProps {
  totalOrders: number;
  totalRevenue: number;
}

export default function OrderHistoryStats({
  totalOrders,
  totalRevenue,
}: OrderHistoryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">
              KES {totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

