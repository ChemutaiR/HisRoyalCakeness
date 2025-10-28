/**
 * Unified History API Service
 * 
 * Provides a unified interface for order history API calls
 * Can switch between mock and real API implementations
 */

import { ApiClient } from './apiClient';
import { OrdersHistoryApiService } from './ordersHistoryApi';
import { MockHistoryApiService } from './mockHistoryApiService';
import { 
  GetOrdersHistoryRequest, 
  GetOrdersHistoryResponse,
  GetOrderHistoryByIdRequest,
  GetOrderHistoryByIdResponse,
  ExportOrdersHistoryRequest,
  ExportOrdersHistoryResponse
} from '@/types/api/history';

export class UnifiedHistoryApiService {
  private ordersHistoryApi: OrdersHistoryApiService;
  private mockHistoryApi: MockHistoryApiService;
  private useMockApi: boolean;

  constructor(useMockApi: boolean = true) {
    this.useMockApi = useMockApi;
    this.ordersHistoryApi = new OrdersHistoryApiService(new ApiClient());
    this.mockHistoryApi = new MockHistoryApiService();
  }

  /**
   * Switch between mock and real API
   */
  setUseMockApi(useMock: boolean): void {
    this.useMockApi = useMock;
  }

  /**
   * Get delivered orders with filters and pagination
   */
  async getDeliveredOrders(request: GetOrdersHistoryRequest): Promise<GetOrdersHistoryResponse> {
    if (this.useMockApi) {
      return this.mockHistoryApi.getDeliveredOrders(request);
    }
    return this.ordersHistoryApi.getDeliveredOrders(request);
  }

  /**
   * Get specific order by ID from history
   */
  async getOrderById(request: GetOrderHistoryByIdRequest): Promise<GetOrderHistoryByIdResponse> {
    if (this.useMockApi) {
      return this.mockHistoryApi.getOrderById(request);
    }
    return this.ordersHistoryApi.getOrderById(request);
  }

  /**
   * Export orders history
   */
  async exportOrders(request: ExportOrdersHistoryRequest): Promise<ExportOrdersHistoryResponse> {
    if (this.useMockApi) {
      return this.mockHistoryApi.exportOrders(request);
    }
    return this.ordersHistoryApi.exportOrders(request);
  }

  /**
   * Get history statistics
   */
  async getStatistics(): Promise<{ success: boolean; data?: any; error?: string }> {
    if (this.useMockApi) {
      return this.mockHistoryApi.getStatistics();
    }
    return this.ordersHistoryApi.getStatistics();
  }
}

// Export singleton instance
export const unifiedHistoryApiService = new UnifiedHistoryApiService(true);
export default unifiedHistoryApiService;
