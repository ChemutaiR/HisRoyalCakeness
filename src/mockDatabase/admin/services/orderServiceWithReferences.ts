/**
 * Enhanced Order Service with Reference Resolution
 * 
 * This service provides order management with automatic resolution of ID references
 * to full data objects using the centralized reference service.
 */

import { 
  OrderWithReferences, 
  OrderStatus, 
  CreateOrderRequestWithReferences,
  ResolvedOrder,
  ResolvedOrderItem,
  ResolvedDeliveryInfo
} from '@/types/orders/orderWithReferences';
import { AdminOrder } from '@/types/admin/orders';
import { 
  adminOrdersWithReferences, 
  getOrderStatistics,
  createOrder,
  updateOrder,
  searchOrders,
  filterOrders
} from '../orders/ordersWithReferences';
import { referenceService } from './referenceService';

export interface AdminOrderServiceWithReferences {
  // Order Management
  getAllOrders(): OrderWithReferences[];
  getOrderById(id: string): OrderWithReferences | undefined;
  getOrdersByStatus(status: OrderStatus): OrderWithReferences[];
  getRecentOrders(days?: number): OrderWithReferences[];
  
  // Order Operations
  createOrder(request: CreateOrderRequestWithReferences): OrderWithReferences;
  updateOrder(id: string, updates: Partial<OrderWithReferences>): OrderWithReferences | undefined;
  updateOrderStatus(id: string, status: OrderStatus): OrderWithReferences | undefined;
  
  // Reference Resolution
  getResolvedOrder(id: string): ResolvedOrder | undefined;
  getResolvedOrders(): ResolvedOrder[];
  getResolvedOrdersByStatus(status: OrderStatus): ResolvedOrder[];
  
  // Legacy AdminOrder Support
  getAdminOrders(): AdminOrder[];
  getAdminOrderById(id: string): AdminOrder | undefined;
  getAdminOrdersByStatus(status: OrderStatus): AdminOrder[];
  
  // Analytics
  getOrderStatistics(): {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<OrderStatus, number>;
  };
  
  // Search and Filter
  searchOrders(query: string): OrderWithReferences[];
  filterOrders(filters: {
    status?: OrderStatus;
    dateFrom?: Date;
    dateTo?: Date;
    customerId?: string;
  }): OrderWithReferences[];
}

class AdminOrderServiceWithReferencesImpl implements AdminOrderServiceWithReferences {
  getAllOrders(): OrderWithReferences[] {
    return [...adminOrdersWithReferences];
  }

  getOrderById(id: string): OrderWithReferences | undefined {
    return adminOrdersWithReferences.find(order => order.id === id);
  }

  getOrdersByStatus(status: OrderStatus): OrderWithReferences[] {
    return adminOrdersWithReferences.filter(order => order.status === status);
  }

  getRecentOrders(days: number = 7): OrderWithReferences[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return adminOrdersWithReferences.filter(order => order.createdAt >= cutoffDate);
  }

  createOrder(request: CreateOrderRequestWithReferences): OrderWithReferences {
    return createOrder(request);
  }

  updateOrder(id: string, updates: Partial<OrderWithReferences>): OrderWithReferences | undefined {
    return updateOrder(id, updates);
  }

  updateOrderStatus(id: string, status: OrderStatus): OrderWithReferences | undefined {
    return this.updateOrder(id, { status });
  }

  /**
   * Resolve order item references to full data
   */
  private resolveOrderItem(item: OrderWithReferences['items'][0]): ResolvedOrderItem | undefined {
    const cake = referenceService.getCakeById(item.cakeId);
    if (!cake) return undefined;

    const size = referenceService.getCakeSize(item.cakeId, item.sizeWeight);
    if (!size) return undefined;

    const cream = referenceService.getCreamOption(item.cakeId, item.creamIndex);
    if (!cream) return undefined;

    const decorations = referenceService.getDecorationsByIds(item.decorationIds);
    const containerType = referenceService.getContainerType(item.containerTypeName);
    if (!containerType) return undefined;

    return {
      id: item.id,
      cake: {
        id: cake.id,
        name: cake.name,
        description: cake.description,
        images: cake.images,
      },
      size,
      cream,
      decorations: decorations.map(dec => ({
        id: dec.id,
        name: dec.name,
        description: dec.description,
        imageUrl: dec.imageUrl,
        price: dec.price,
      })),
      containerType,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      customNotes: item.customNotes,
      uploadedImages: item.uploadedImages,
    };
  }

  /**
   * Resolve delivery information references to full data
   */
  private resolveDeliveryInfo(deliveryInfo: OrderWithReferences['deliveryInfo']): ResolvedDeliveryInfo | undefined {
    const zone = referenceService.getDeliveryZoneById(deliveryInfo.zoneId);
    if (!zone) return undefined;

    return {
      zone: {
        id: zone.id,
        name: zone.name,
        description: zone.description,
        deliveryFee: zone.deliveryFee,
        estimatedDeliveryTime: zone.estimatedDeliveryTime,
        isAvailable: zone.isAvailable,
      },
      address: deliveryInfo.address,
      date: deliveryInfo.date,
      time: deliveryInfo.time,
      specialInstructions: deliveryInfo.specialInstructions,
    };
  }

  /**
   * Get fully resolved order with all reference data populated
   */
  getResolvedOrder(id: string): ResolvedOrder | undefined {
    const order = this.getOrderById(id);
    if (!order) return undefined;

    const resolvedItems = order.items
      .map(item => this.resolveOrderItem(item))
      .filter((item): item is ResolvedOrderItem => item !== undefined);

    const resolvedDeliveryInfo = this.resolveDeliveryInfo(order.deliveryInfo);
    if (!resolvedDeliveryInfo) return undefined;

    return {
      ...order,
      items: resolvedItems,
      deliveryInfo: resolvedDeliveryInfo,
    };
  }

  /**
   * Get all orders with resolved references
   */
  getResolvedOrders(): ResolvedOrder[] {
    return adminOrdersWithReferences
      .map(order => this.getResolvedOrder(order.id))
      .filter((order): order is ResolvedOrder => order !== undefined);
  }

  /**
   * Get orders by status with resolved references
   */
  getResolvedOrdersByStatus(status: OrderStatus): ResolvedOrder[] {
    return this.getOrdersByStatus(status)
      .map(order => this.getResolvedOrder(order.id))
      .filter((order): order is ResolvedOrder => order !== undefined);
  }

  /**
   * Convert resolved order to legacy AdminOrder format
   */
  private convertToAdminOrder(resolvedOrder: ResolvedOrder): AdminOrder {
    const firstItem = resolvedOrder.items[0];
    const decorations = firstItem?.decorations.map(dec => 
      `${dec.name} (KES ${dec.price})`
    ).join(', ') || '';

    return {
      id: resolvedOrder.id,
      orderNumber: resolvedOrder.orderNumber,
      customerName: `${resolvedOrder.customerInfo.firstName} ${resolvedOrder.customerInfo.lastName}`,
      customerEmail: resolvedOrder.customerInfo.email,
      customerPhone: resolvedOrder.customerInfo.phone,
      size: firstItem ? `${firstItem.size.weight} - ${firstItem.size.servings} servings` : 'Standard',
      deliveryDate: resolvedOrder.deliveryInfo.date,
      totalAmount: resolvedOrder.total,
      paymentStatus: resolvedOrder.paymentInfo.status,
      paymentMethod: resolvedOrder.paymentInfo.method,
      createdAt: resolvedOrder.createdAt.toISOString(),
      updatedAt: resolvedOrder.updatedAt.toISOString(),
      dueDate: resolvedOrder.deliveryInfo.date,
      cake: firstItem?.cake.name || 'Custom Cake',
      cream: firstItem?.cream.name || 'Standard',
      topping: decorations,
      allergies: 'None', // Not tracked in new format
      specialInstructions: resolvedOrder.deliveryInfo.specialInstructions || '',
      customNotes: firstItem?.customNotes || undefined,
      status: resolvedOrder.status as any,
      images: firstItem?.uploadedImages || [],
    };
  }

  /**
   * Get legacy AdminOrder format orders
   */
  getAdminOrders(): AdminOrder[] {
    return this.getResolvedOrders().map(order => this.convertToAdminOrder(order));
  }

  /**
   * Get legacy AdminOrder by ID
   */
  getAdminOrderById(id: string): AdminOrder | undefined {
    const resolvedOrder = this.getResolvedOrder(id);
    if (!resolvedOrder) return undefined;
    return this.convertToAdminOrder(resolvedOrder);
  }

  /**
   * Get legacy AdminOrders by status
   */
  getAdminOrdersByStatus(status: OrderStatus): AdminOrder[] {
    return this.getResolvedOrdersByStatus(status).map(order => this.convertToAdminOrder(order));
  }

  getOrderStatistics() {
    return getOrderStatistics();
  }

  searchOrders(query: string): OrderWithReferences[] {
    return searchOrders(query);
  }

  filterOrders(filters: {
    status?: OrderStatus;
    dateFrom?: Date;
    dateTo?: Date;
    customerId?: string;
  }): OrderWithReferences[] {
    return filterOrders(filters);
  }
}

// Export singleton instance
export const adminOrderServiceWithReferences = new AdminOrderServiceWithReferencesImpl();
