/**
 * Analytics API Service
 * 
 * Handles analytics data fetching with dynamic date range support
 */

import { apiClient, ApiResponse } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import {
  DateRangeParams,
  DynamicAnalyticsResponse,
  ExportAnalyticsRequest,
} from '@/types/admin/analytics-dynamic';

export class AnalyticsApiService {
  /**
   * Get analytics data for a specific date range
   */
  async getAnalytics(params: DateRangeParams): Promise<ApiResponse<DynamicAnalyticsResponse>> {
    const queryParams = new URLSearchParams();
    queryParams.append('rangeType', params.rangeType);
    
    if (params.from) {
      queryParams.append('from', params.from);
    }
    if (params.to) {
      queryParams.append('to', params.to);
    }

    return apiClient.get<DynamicAnalyticsResponse>(
      `${API_ENDPOINTS.ANALYTICS.DASHBOARD}?${queryParams.toString()}`
    );
  }

  /**
   * Export analytics data
   */
  async exportAnalytics(request: ExportAnalyticsRequest): Promise<ApiResponse<Blob>> {
    return apiClient.post<Blob>(
      API_ENDPOINTS.ANALYTICS.EXPORT,
      request,
      {
        headers: {
          'Accept': 'application/octet-stream',
        },
      }
    );
  }
}

// Export singleton instance
export const analyticsApiService = new AnalyticsApiService();
export default analyticsApiService;

