/**
 * Mock API Service
 * 
 * Simulates backend API behavior for development and testing.
 * This service provides realistic API responses with delays, errors, and data.
 */

import { ApiResponse } from './apiClient';
import { OrderWithReferences, CreateOrderRequestWithReferences, OrderStatus } from '@/types/orders/orderWithReferences';
import { adminOrderServiceWithReferences } from '@/mockDatabase/admin/services/orderServiceWithReferences';
// import { referenceService } from '@/mockDatabase/admin/services/referenceService';

export interface MockApiConfig {
  delay: number;
  errorRate: number;
  offlineMode: boolean;
}

class MockApiService {
  private config: MockApiConfig = {
    delay: 500, // 500ms delay
    errorRate: 0.05, // 5% error rate
    offlineMode: false,
  };

  /**
   * Update mock configuration
   */
  updateConfig(config: Partial<MockApiConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Simulate API delay
   */
  private async simulateDelay(): Promise<void> {
    if (this.config.offlineMode) {
      throw new Error('Network error: Offline mode');
    }

    const delay = this.config.delay + Math.random() * 200; // Add some randomness
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Simulate random errors
   */
  private simulateError(): void {
    if (Math.random() < this.config.errorRate) {
      const errors = [
        'Network timeout',
        'Server error',
        'Database connection failed',
        'Rate limit exceeded',
        'Invalid request data',
      ];
      const randomError = errors[Math.floor(Math.random() * errors.length)];
      throw new Error(randomError);
    }
  }

  /**
   * Create success response
   */
  private createSuccessResponse<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Create error response
   */
  private createErrorResponse(error: string): ApiResponse {
    return {
      success: false,
      error,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get all orders
   */
  async getAllOrders(): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const orders = adminOrderServiceWithReferences.getAllOrders();
      
      return this.createSuccessResponse({
        orders,
        total: orders.length,
        page: 1,
        limit: 100,
      });
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to fetch orders');
    }
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: string): Promise<ApiResponse<OrderWithReferences>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const order = adminOrderServiceWithReferences.getOrderById(id);
      if (!order) {
        throw new Error('Order not found');
      }

      return this.createSuccessResponse(order);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to fetch order');
    }
  }

  /**
   * Get orders by status
   */
  async getOrdersByStatus(status: OrderStatus): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const orders = adminOrderServiceWithReferences.getOrdersByStatus(status);
      
      return this.createSuccessResponse({
        orders,
        total: orders.length,
        page: 1,
        limit: 100,
      });
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to fetch orders');
    }
  }

  /**
   * Create new order
   */
  async createOrder(orderData: CreateOrderRequestWithReferences): Promise<ApiResponse<OrderWithReferences>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const order = adminOrderServiceWithReferences.createOrder(orderData);
      
      return this.createSuccessResponse(order);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to create order');
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: string, status: OrderStatus, notes?: string): Promise<ApiResponse<OrderWithReferences>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const order = adminOrderServiceWithReferences.updateOrderStatus(id, status);
      if (!order) {
        throw new Error('Order not found');
      }

      return this.createSuccessResponse(order);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to update order status');
    }
  }

  /**
   * Update order
   */
  async updateOrder(id: string, updates: Partial<OrderWithReferences>): Promise<ApiResponse<OrderWithReferences>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const order = adminOrderServiceWithReferences.updateOrder(id, updates);
      if (!order) {
        throw new Error('Order not found');
      }

      return this.createSuccessResponse(order);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to update order');
    }
  }

  /**
   * Delete order
   */
  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      // Note: The reference service doesn't have delete, so we'll just simulate success
      return this.createSuccessResponse(undefined as any);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to delete order');
    }
  }

  /**
   * Search orders
   */
  async searchOrders(query: string): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const orders = adminOrderServiceWithReferences.searchOrders(query);
      
      return this.createSuccessResponse({
        orders,
        total: orders.length,
        page: 1,
        limit: 100,
      });
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to search orders');
    }
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
    try {
      await this.simulateDelay();
      this.simulateError();

      const stats = adminOrderServiceWithReferences.getOrderStatistics();
      
      return this.createSuccessResponse(stats);
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to fetch statistics');
    }
  }

  /**
   * Get recent orders
   */
  async getRecentOrders(days: number = 7): Promise<ApiResponse<{ orders: OrderWithReferences[]; total: number; page: number; limit: number }>> {
    try {
      await this.simulateDelay();
      this.simulateError();

      const orders = adminOrderServiceWithReferences.getRecentOrders(days);
      
      return this.createSuccessResponse({
        orders,
        total: orders.length,
        page: 1,
        limit: 100,
      });
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to fetch recent orders');
    }
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
    try {
      await this.simulateDelay();
      this.simulateError();

      const orders = adminOrderServiceWithReferences.filterOrders({
        ...filters,
        dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
        dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined,
      });
      
      return this.createSuccessResponse({
        orders,
        total: orders.length,
        page: 1,
        limit: 100,
      });
    } catch (error) {
      return this.createErrorResponse(error instanceof Error ? error.message : 'Failed to filter orders');
    }
  }
}

// Export singleton instance
export const mockApiService = new MockApiService();
export default mockApiService;
