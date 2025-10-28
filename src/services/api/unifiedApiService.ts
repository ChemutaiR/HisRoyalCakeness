/**
 * Unified API Service
 * 
 * Provides a single interface that can switch between mock and real API
 * based on environment configuration. This makes it easy to develop with
 * mock data and deploy with real API endpoints.
 */

import { ordersApiService } from './ordersApi';
import { mockApiService } from './mockApiService';
import { ApiResponse } from './apiClient';
import { OrderWithReferences, CreateOrderRequestWithReferences, OrderStatus } from '@/types/orders/orderWithReferences';

export interface UnifiedApiConfig {
  useMockApi: boolean;
  mockConfig?: {
    delay: number;
    errorRate: number;
    offlineMode: boolean;
  };
}

class UnifiedApiService {
  private config: UnifiedApiConfig = {
    useMockApi: process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_API === 'true',
    mockConfig: {
      delay: 500,
      errorRate: 0.05,
      offlineMode: false,
    },
  };

  /**
   * Update configuration
   */
  updateConfig(config: Partial<UnifiedApiConfig>) {
    this.config = { ...this.config, ...config };
    
    if (this.config.mockConfig) {
      mockApiService.updateConfig(this.config.mockConfig);
    }
  }

  /**
   * Get the appropriate API service
   */
  private getApiService() {
    return this.config.useMockApi ? mockApiService : ordersApiService;
  }

  /**
   * Get all orders
   */
  async getAllOrders(): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    return this.getApiService().getAllOrders();
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: string): Promise<ApiResponse<OrderWithReferences>> {
    return this.getApiService().getOrderById(id);
  }

  /**
   * Get orders by status
   */
  async getOrdersByStatus(status: OrderStatus): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    return this.getApiService().getOrdersByStatus(status);
  }

  /**
   * Create new order
   */
  async createOrder(orderData: CreateOrderRequestWithReferences): Promise<ApiResponse<OrderWithReferences>> {
    return this.getApiService().createOrder(orderData);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: string, status: OrderStatus, notes?: string): Promise<ApiResponse<OrderWithReferences>> {
    return this.getApiService().updateOrderStatus(id, status, notes);
  }

  /**
   * Update order
   */
  async updateOrder(id: string, updates: Partial<OrderWithReferences>): Promise<ApiResponse<OrderWithReferences>> {
    return this.getApiService().updateOrder(id, updates);
  }

  /**
   * Delete order
   */
  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return this.getApiService().deleteOrder(id);
  }

  /**
   * Search orders
   */
  async searchOrders(query: string): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    return this.getApiService().searchOrders(query);
  }

  /**
   * Get order statistics
   */
  async getOrderStatistics(): Promise<ApiResponse<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<OrderStatus, number>;
  }>> {
    return this.getApiService().getOrderStatistics();
  }

  /**
   * Get recent orders
   */
  async getRecentOrders(days: number = 7): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    return this.getApiService().getRecentOrders(days);
  }

  /**
   * Filter orders
   */
  async filterOrders(filters: {
    status?: OrderStatus;
    dateFrom?: string;
    dateTo?: string;
    customerId?: string;
  }): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    return this.getApiService().filterOrders(filters);
  }

  /**
   * Check if using mock API
   */
  isUsingMockApi(): boolean {
    return this.config.useMockApi;
  }

  /**
   * Switch to mock API
   */
  useMockApi() {
    this.updateConfig({ useMockApi: true });
  }

  /**
   * Switch to real API
   */
  useRealApi() {
    this.updateConfig({ useMockApi: false });
  }
}

// Export singleton instance
export const unifiedApiService = new UnifiedApiService();
export default unifiedApiService;
