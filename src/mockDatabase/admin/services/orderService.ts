// Comprehensive order service for admin operations
import { Order, OrderStatus, CreateOrderRequest } from '@/types/orders/order';
import { adminOrders, getOrderStatistics } from '../orders/orders';

export interface AdminOrderService {
  // Order Management
  getAllOrders(): Order[];
  getOrderById(id: string): Order | undefined;
  getOrdersByStatus(status: OrderStatus): Order[];
  getRecentOrders(days?: number): Order[];
  
  // Order Operations
  createOrder(request: CreateOrderRequest): Order;
  updateOrder(id: string, updates: Partial<Order>): Order | undefined;
  updateOrderStatus(id: string, status: OrderStatus): Order | undefined;
  
  // Analytics
  getOrderStatistics(): {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<OrderStatus, number>;
  };
  
  // Search and Filter
  searchOrders(query: string): Order[];
  filterOrders(filters: {
    status?: OrderStatus;
    dateFrom?: Date;
    dateTo?: Date;
    customerId?: string;
  }): Order[];
}

class AdminOrderServiceImpl implements AdminOrderService {
  private orders: Order[] = [...adminOrders];

  getAllOrders(): Order[] {
    return [...this.orders];
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  getOrdersByStatus(status: OrderStatus): Order[] {
    return this.orders.filter(order => order.status === status);
  }

  getRecentOrders(days: number = 7): Order[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return this.orders.filter(order => order.createdAt >= cutoffDate);
  }

  createOrder(request: CreateOrderRequest): Order {
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const orderNumber = `HRC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    const now = new Date();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerInfo: request.customerInfo,
      deliveryInfo: request.deliveryInfo,
      paymentInfo: {
        ...request.paymentInfo,
        status: 'pending'
      },
      items: request.items,
      customLoafItems: request.customLoafItems,
      subtotal: request.subtotal,
      deliveryFee: request.deliveryFee,
      total: request.total,
      status: 'received',
      createdAt: now,
      updatedAt: now,
      estimatedDelivery: new Date(request.deliveryInfo.date),
      notes: request.notes
    };

    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrder(id: string, updates: Partial<Order>): Order | undefined {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) return undefined;

    const updatedOrder = {
      ...this.orders[orderIndex],
      ...updates,
      updatedAt: new Date()
    };

    this.orders[orderIndex] = updatedOrder;
    return updatedOrder;
  }

  updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
    return this.updateOrder(id, { status });
  }

  getOrderStatistics() {
    return getOrderStatistics();
  }

  searchOrders(query: string): Order[] {
    const lowercaseQuery = query.toLowerCase();
    return this.orders.filter(order => 
      order.orderNumber.toLowerCase().includes(lowercaseQuery) ||
      `${order.customerInfo.firstName} ${order.customerInfo.lastName}`.toLowerCase().includes(lowercaseQuery) ||
      order.customerInfo.email.toLowerCase().includes(lowercaseQuery) ||
      order.customerInfo.phone.includes(query)
    );
  }

  filterOrders(filters: {
    status?: OrderStatus;
    dateFrom?: Date;
    dateTo?: Date;
    customerId?: string;
  }): Order[] {
    return this.orders.filter(order => {
      if (filters.status && order.status !== filters.status) return false;
      if (filters.dateFrom && order.createdAt < filters.dateFrom) return false;
      if (filters.dateTo && order.createdAt > filters.dateTo) return false;
      if (filters.customerId) {
        const customerName = `${order.customerInfo.firstName.toLowerCase()}.${order.customerInfo.lastName.toLowerCase()}`;
        if (customerName !== filters.customerId.toLowerCase()) return false;
      }
      return true;
    });
  }
}

// Export singleton instance
export const adminOrderService = new AdminOrderServiceImpl();
