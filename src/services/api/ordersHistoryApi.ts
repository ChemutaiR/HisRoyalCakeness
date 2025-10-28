/**
 * Orders History API Service
 * 
 * Handles API calls for order history functionality
 */

import { ApiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { 
  GetOrdersHistoryRequest, 
  GetOrdersHistoryResponse,
  GetOrderHistoryByIdRequest,
  GetOrderHistoryByIdResponse,
  ExportOrdersHistoryRequest,
  ExportOrdersHistoryResponse
} from '@/types/api/history';

export class OrdersHistoryApiService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get delivered orders with filters and pagination
   */
  async getDeliveredOrders(request: GetOrdersHistoryRequest): Promise<GetOrdersHistoryResponse> {
    try {
      const params = new URLSearchParams();
      
      // Add filters
      if (request.filters?.dateFrom) params.append('dateFrom', request.filters.dateFrom);
      if (request.filters?.dateTo) params.append('dateTo', request.filters.dateTo);
      if (request.filters?.customerName) params.append('customerName', request.filters.customerName);
      if (request.filters?.customerEmail) params.append('customerEmail', request.filters.customerEmail);
      if (request.filters?.minTotal) params.append('minTotal', request.filters.minTotal.toString());
      if (request.filters?.maxTotal) params.append('maxTotal', request.filters.maxTotal.toString());
      if (request.filters?.searchQuery) params.append('search', request.filters.searchQuery);

      // Add pagination
      if (request.pagination?.page) params.append('page', request.pagination.page.toString());
      if (request.pagination?.limit) params.append('limit', request.pagination.limit.toString());

      // Add sorting
      if (request.sort?.field) params.append('sortField', request.sort.field);
      if (request.sort?.direction) params.append('sortDirection', request.sort.direction);

      const url = `${API_ENDPOINTS.ORDER_HISTORY.DELIVERED}?${params.toString()}`;
      const response = await this.apiClient.get(url);

      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch delivered orders'
      };
    }
  }

  /**
   * Get specific order by ID from history
   */
  async getOrderById(request: GetOrderHistoryByIdRequest): Promise<GetOrderHistoryByIdResponse> {
    try {
      const url = API_ENDPOINTS.ORDER_HISTORY.BY_ID(request.id);
      const response = await this.apiClient.get(url);

      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch order details'
      };
    }
  }

  /**
   * Export orders history
   */
  async exportOrders(request: ExportOrdersHistoryRequest): Promise<ExportOrdersHistoryResponse> {
    try {
      const params = new URLSearchParams();
      params.append('format', request.format);
      
      // Add filters
      if (request.filters?.dateFrom) params.append('dateFrom', request.filters.dateFrom);
      if (request.filters?.dateTo) params.append('dateTo', request.filters.dateTo);
      if (request.filters?.customerName) params.append('customerName', request.filters.customerName);
      if (request.filters?.customerEmail) params.append('customerEmail', request.filters.customerEmail);
      if (request.filters?.minTotal) params.append('minTotal', request.filters.minTotal.toString());
      if (request.filters?.maxTotal) params.append('maxTotal', request.filters.maxTotal.toString());

      const url = `${API_ENDPOINTS.ORDER_HISTORY.EXPORT}?${params.toString()}`;
      const response = await this.apiClient.get(url);

      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to export orders'
      };
    }
  }

  /**
   * Get history statistics
   */
  async getStatistics(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.ORDER_HISTORY.STATISTICS);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch statistics'
      };
    }
  }
}
