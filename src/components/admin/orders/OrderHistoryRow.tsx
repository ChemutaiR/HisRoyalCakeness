"use client";

import { AdminOrder } from '@/types/admin/orders';

interface OrderHistoryRowProps {
  order: AdminOrder;
  onOrderClick: (order: AdminOrder) => void;
}

export default function OrderHistoryRow({
  order,
  onOrderClick,
}: OrderHistoryRowProps) {
  return (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{order.id}</div>
          <div className="text-sm text-gray-500">#{order.orderNumber}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
          <div className="text-sm text-gray-500">{order.customerEmail}</div>
          <div className="text-sm text-gray-500">{order.customerPhone}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">
          <div className="font-medium">{order.cake}</div>
          <div className="text-gray-500">{order.size}</div>
          <div className="text-gray-500">{order.cream}</div>
          {order.topping && <div className="text-gray-500 text-xs">{order.topping}</div>}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Date(order.deliveryDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(order.deliveryDate).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          KES {order.totalAmount.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">{order.paymentMethod}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            order.paymentStatus === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {order.paymentStatus === 'completed' ? 'Completed' : 'Incomplete'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onOrderClick(order)}
          className="text-purple-600 hover:text-purple-900 transition-colors"
        >
          View Details
        </button>
      </td>
    </tr>
  );
}

