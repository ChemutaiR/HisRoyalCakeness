/**
 * Order Status Styling Utilities
 * 
 * Utilities for status colors and column configuration
 */

import { OrderStatus } from '@/types/orders/order';

export type StatusColumn = {
  key: OrderStatus;
  title: string;
  color: string;
  textColor: string;
};

/**
 * Get status badge color class
 */
export function getStatusColor(status: string): string {
  const statusMap: { [key: string]: string } = {
    'received': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'preparing': 'bg-blue-100 text-blue-800',
    'ready': 'bg-green-100 text-green-800',
    'dispatched': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return statusMap[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Get status column configuration for kanban board
 */
export function getStatusColumnConfig(): StatusColumn[] {
  return [
    {
      key: 'received' as OrderStatus,
      title: 'Received',
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800'
    },
    {
      key: 'ready' as OrderStatus,
      title: 'Ready',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800'
    },
    {
      key: 'delivered' as OrderStatus,
      title: 'Delivered',
      color: 'bg-gray-50 border-gray-200',
      textColor: 'text-gray-800'
    }
  ];
}

