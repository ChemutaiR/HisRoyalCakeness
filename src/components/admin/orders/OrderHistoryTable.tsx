"use client";

import { AdminOrder } from '@/types/admin/orders';
import OrderHistoryRow from './OrderHistoryRow';

interface OrderHistoryTableProps {
  orders: AdminOrder[];
  hasActiveFilters: boolean;
  onOrderClick: (order: AdminOrder) => void;
}

export default function OrderHistoryTable({
  orders,
  hasActiveFilters,
  onOrderClick,
}: OrderHistoryTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
          Delivered Orders
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cake Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  {hasActiveFilters
                    ? 'No orders match your current filters. Try adjusting your search criteria.'
                    : 'No delivered orders found in the system.'}
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <OrderHistoryRow key={order.id} order={order} onOrderClick={onOrderClick} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

