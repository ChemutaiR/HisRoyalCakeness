// Order management utility functions

import { AdminOrder } from '@/types/admin';
import { OrderStatus, PaymentStatus } from '@/types/shared';

/**
 * Filter orders by status
 */
export function filterOrdersByStatus(orders: AdminOrder[], status: OrderStatus): AdminOrder[] {
  return orders.filter(order => order.status === status);
}

/**
 * Filter orders by payment status
 */
export function filterOrdersByPaymentStatus(orders: AdminOrder[], paymentStatus: PaymentStatus): AdminOrder[] {
  return orders.filter(order => order.paymentStatus === paymentStatus);
}

/**
 * Filter orders by date range
 */
export function filterOrdersByDateRange(
  orders: AdminOrder[],
  startDate: string,
  endDate: string
): AdminOrder[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= start && orderDate <= end;
  });
}

/**
 * Search orders by customer name or order number
 */
export function searchOrders(orders: AdminOrder[], query: string): AdminOrder[] {
  const lowercaseQuery = query.toLowerCase();
  return orders.filter(order => 
    order.customerName.toLowerCase().includes(lowercaseQuery) ||
    order.orderNumber.toLowerCase().includes(lowercaseQuery) ||
    order.customerEmail.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Sort orders by date
 */
export function sortOrdersByDate(orders: AdminOrder[], order: 'asc' | 'desc' = 'desc'): AdminOrder[] {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
}

/**
 * Sort orders by total amount
 */
export function sortOrdersByAmount(orders: AdminOrder[], order: 'asc' | 'desc' = 'desc'): AdminOrder[] {
  return [...orders].sort((a, b) => {
    return order === 'asc' ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount;
  });
}

/**
 * Get orders due today
 */
export function getOrdersDueToday(orders: AdminOrder[]): AdminOrder[] {
  const today = new Date().toISOString().split('T')[0];
  return orders.filter(order => order.dueDate === today);
}

/**
 * Get overdue orders
 */
export function getOverdueOrders(orders: AdminOrder[]): AdminOrder[] {
  const today = new Date().toISOString().split('T')[0];
  return orders.filter(order => 
    order.dueDate < today && 
    !['delivered', 'cancelled'].includes(order.status)
  );
}

/**
 * Get pending orders
 */
export function getPendingOrders(orders: AdminOrder[]): AdminOrder[] {
  return orders.filter(order => 
    ['pending', 'confirmed', 'preparing'].includes(order.status)
  );
}

/**
 * Calculate order statistics
 */
export function calculateOrderStats(orders: AdminOrder[]) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatus, number>);
  
  const paymentStatusCounts = orders.reduce((acc, order) => {
    acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1;
    return acc;
  }, {} as Record<PaymentStatus, number>);
  
  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    statusCounts,
    paymentStatusCounts
  };
}

/**
 * Get order timeline
 */
export function getOrderTimeline(order: AdminOrder) {
  const timeline = [
    {
      status: 'pending',
      label: 'Order Placed',
      timestamp: order.createdAt,
      completed: true
    }
  ];
  
  if (order.status !== 'pending') {
    timeline.push({
      status: 'confirmed',
      label: 'Order Confirmed',
      timestamp: order.updatedAt,
      completed: true
    });
  }
  
  if (['preparing', 'ready', 'delivered'].includes(order.status)) {
    timeline.push({
      status: 'preparing',
      label: 'Preparing',
      timestamp: order.updatedAt,
      completed: true
    });
  }
  
  if (['ready', 'delivered'].includes(order.status)) {
    timeline.push({
      status: 'ready',
      label: 'Ready for Delivery',
      timestamp: order.updatedAt,
      completed: true
    });
  }
  
  if (order.status === 'delivered') {
    timeline.push({
      status: 'delivered',
      label: 'Delivered',
      timestamp: order.deliveryDate,
      completed: true
    });
  }
  
  return timeline;
}

/**
 * Validate order data
 */
export function validateOrderData(order: Partial<AdminOrder>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!order.customerName || order.customerName.trim().length === 0) {
    errors.push('Customer name is required');
  }
  
  if (!order.customerEmail || !order.customerEmail.includes('@')) {
    errors.push('Valid customer email is required');
  }
  
  if (!order.customerPhone || order.customerPhone.trim().length === 0) {
    errors.push('Customer phone is required');
  }
  
  if (!order.cake || order.cake.trim().length === 0) {
    errors.push('Cake selection is required');
  }
  
  if (!order.dueDate) {
    errors.push('Due date is required');
  }
  
  if (order.totalAmount && order.totalAmount <= 0) {
    errors.push('Total amount must be greater than 0');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generate order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
}

/**
 * Calculate order priority
 */
export function calculateOrderPriority(order: AdminOrder): 'high' | 'medium' | 'low' {
  const dueDate = new Date(order.dueDate);
  const today = new Date();
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDue <= 1) return 'high';
  if (daysUntilDue <= 3) return 'medium';
  return 'low';
}
