// Order management service for admin operations

import { Order, CreateOrderRequest, OrderStatus } from '@/types/orders/order';
import { adminOrderService } from '@/mockDatabase/admin/services/orderService';

class OrderService {
  private static instance: OrderService;

  static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  /**
   * Create a new order
   */
  async createOrder(request: CreateOrderRequest): Promise<Order> {
    try {
      const order = adminOrderService.createOrder(request);
      
      // Store order in localStorage for demo purposes
      // In production, this would be stored in a database
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const existingOrders = this.getStoredOrders();
        const updatedOrders = [...existingOrders, order];
        localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
        // console.log('Order stored in localStorage:', order.orderNumber);
      } else {
        // console.warn('localStorage not available, order not persisted');
      }

      return order;

    } catch (error) {
      // console.error('Error creating order:', error);
      throw new Error('Failed to create order. Please try again.');
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: OrderStatus, notes?: string): Promise<Order> {
    try {
      const updatedOrder = adminOrderService.updateOrderStatus(orderId, status);
      
      if (!updatedOrder) {
        throw new Error('Order not found');
      }

      // Update localStorage for persistence
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const existingOrders = this.getStoredOrders();
        const orderIndex = existingOrders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
          existingOrders[orderIndex] = updatedOrder;
          localStorage.setItem('admin_orders', JSON.stringify(existingOrders));
        }
      }

      return updatedOrder;

    } catch (error) {
      // console.error('Error updating order status:', error);
      throw new Error('Failed to update order status.');
    }
  }

  /**
   * Get all orders
   */
  async getAllOrders(): Promise<Order[]> {
    try {
      return adminOrderService.getAllOrders();
    } catch (error) {
      // console.error('Error fetching orders:', error);
      return [];
    }
  }

  /**
   * Get all orders (alias for getAllOrders for consistency)
   */
  async getOrders(): Promise<Order[]> {
    return this.getAllOrders();
  }

  /**
   * Get orders by status
   */
  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    try {
      return adminOrderService.getOrdersByStatus(status);
    } catch (error) {
      // console.error('Error fetching orders by status:', error);
      return [];
    }
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      return adminOrderService.getOrderById(orderId) || null;
    } catch (error) {
      // console.error('Error fetching order by ID:', error);
      return null;
    }
  }

  /**
   * Update payment information
   */
  async updatePaymentInfo(orderId: string, transactionId: string, status: 'partial' | 'completed'): Promise<Order> {
    try {
      const orders = this.getStoredOrders();
      const orderIndex = orders.findIndex(order => order.id === orderId);

      if (orderIndex === -1) {
        throw new Error('Order not found');
      }

      const updatedOrder: Order = {
        ...orders[orderIndex],
        paymentInfo: {
          ...orders[orderIndex].paymentInfo,
          transactionId,
          status,
        },
        updatedAt: new Date(),
      };

      orders[orderIndex] = updatedOrder;
      localStorage.setItem('admin_orders', JSON.stringify(orders));

      return updatedOrder;

    } catch (error) {
      // console.error('Error updating payment info:', error);
      throw new Error('Failed to update payment information.');
    }
  }

  /**
   * Generate unique order ID
   */
  private generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }

  /**
   * Generate order number (human-readable)
   */
  private generateOrderNumber(): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `HRC${year}${month}${day}${random}`;
  }

  /**
   * Get stored orders from localStorage
   */
  private getStoredOrders(): Order[] {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        // console.warn('localStorage not available, returning empty orders array');
        return [];
      }
      
      const stored = localStorage.getItem('admin_orders');
      if (!stored) return [];
      
      const orders = JSON.parse(stored);
      // Convert date strings back to Date objects
      return orders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
        estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
        actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined,
      }));
    } catch (error) {
      // console.error('Error parsing stored orders:', error);
      return [];
    }
  }
}

export const orderService = OrderService.getInstance();
