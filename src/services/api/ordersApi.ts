/**
 * Orders API Service
 * 
 * Handles all order-related API calls with proper error handling
 * and data transformation between API and frontend formats.
 */

import { apiClient, ApiResponse } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { OrderWithReferences, CreateOrderRequestWithReferences, OrderStatus } from '@/types/orders/orderWithReferences';
// import { AdminOrder } from '@/types/admin/orders';

export interface OrdersApiResponse {
  orders: OrderWithReferences[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
}

export class OrdersApiService {
  /**
   * Get all orders
   */
  async getAllOrders(): Promise<ApiResponse<OrdersApiResponse>> {
    return apiClient.get<OrdersApiResponse>(API_ENDPOINTS.ORDERS.BASE);
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: string): Promise<ApiResponse<OrderWithReferences>> {
    return apiClient.get<OrderWithReferences>(API_ENDPOINTS.ORDERS.BY_ID(id));
  }

  /**
   * Get orders by status
   */
  async getOrdersByStatus(status: OrderStatus): Promise<ApiResponse<OrdersApiResponse>> {
    return apiClient.get<OrdersApiResponse>(API_ENDPOINTS.ORDERS.BY_STATUS(status));
  }

  /**
   * Create new order
   */
  async createOrder(orderData: CreateOrderRequestWithReferences): Promise<ApiResponse<OrderWithReferences>> {
    return apiClient.post<OrderWithReferences>(API_ENDPOINTS.ORDERS.BASE, orderData);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: string, status: OrderStatus, notes?: string): Promise<ApiResponse<OrderWithReferences>> {
    return apiClient.patch<OrderWithReferences>(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), {
      status,
      notes,
    });
  }

  /**
   * Update order
   */
  async updateOrder(id: string, updates: Partial<OrderWithReferences>): Promise<ApiResponse<OrderWithReferences>> {
    return apiClient.put<OrderWithReferences>(API_ENDPOINTS.ORDERS.BY_ID(id), updates);
  }

  /**
   * Delete order
   */
  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.ORDERS.BY_ID(id));
  }

  /**
   * Search orders
   */
  async searchOrders(query: string): Promise<ApiResponse<OrdersApiResponse>> {
    return apiClient.get<OrdersApiResponse>(API_ENDPOINTS.ORDERS.SEARCH(query));
  }

  /**
   * Get order statistics
   */
  async getOrderStatistics(): Promise<ApiResponse<OrderStatistics>> {
    return apiClient.get<OrderStatistics>(API_ENDPOINTS.ORDERS.STATISTICS);
  }

  /**
   * Get recent orders
   */
  async getRecentOrders(days: number = 7): Promise<ApiResponse<OrdersApiResponse>> {
    return apiClient.get<OrdersApiResponse>(`${API_ENDPOINTS.ORDERS.BASE}?recent=${days}`);
  }

  /**
   * Filter orders
   */
  async filterOrders(filters: {
    status?: OrderStatus;
    dateFrom?: string;
    dateTo?: string;
    customerId?: string;
  }): Promise<ApiResponse<OrdersApiResponse>> {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);
    if (filters.customerId) params.append('customerId', filters.customerId);

    return apiClient.get<OrdersApiResponse>(`${API_ENDPOINTS.ORDERS.BASE}?${params.toString()}`);
  }
}

// Export singleton instance
export const ordersApiService = new OrdersApiService();
export default ordersApiService;
