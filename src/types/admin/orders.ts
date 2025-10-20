// Admin orders management types

import { OrderStatus, PaymentStatus, PaymentMethod, OrderFilters, OrderStats } from '../shared/order';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  cake: string;
  size: string;
  cream: string;
  topping: string;
  allergies: string;
  status: OrderStatus;
  dueDate: string;
  deliveryDate: string;
  specialInstructions: string;
  images: string[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

// OrderStatus, PaymentStatus, and PaymentMethod are now imported from shared/order

export interface AdminOrderFilters extends OrderFilters {
  paymentStatus?: PaymentStatus;
  customerName?: string;
  orderNumber?: string;
}

export interface OrderActions {
  updateStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  markAsDelivered: (orderId: string) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  addNote: (orderId: string, note: string) => void;
}

export interface OrderHistoryItem {
  id: number;
  orderDate: string;
  deliveryDate: string;
  customer: string;
  cake: string;
  size: string;
  status: 'Delivered' | 'Cancelled';
  totalAmount: number;
  paymentStatus: PaymentStatus;
}

export interface AdminOrderStats extends OrderStats {
  confirmedOrders: number;
  preparingOrders: number;
  readyOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
}
