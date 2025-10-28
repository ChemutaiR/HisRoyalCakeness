/**
 * History API Types
 * 
 * Request and response types for order history API endpoints
 */

import { AdminOrder } from '@/types/admin/orders';
import { OrderHistoryFilters } from '@/types/admin/orderHistory';

export interface GetOrdersHistoryRequest {
  status: 'delivered';
  filters?: OrderHistoryFilters;
  pagination?: {
    page: number;
    limit: number;
  };
  sort?: {
    field: 'createdAt' | 'deliveryDate' | 'totalAmount';
    direction: 'asc' | 'desc';
  };
}

export interface GetOrdersHistoryResponse {
  success: boolean;
  data?: {
    orders: AdminOrder[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      hasMore: boolean;
    };
    filters: OrderHistoryFilters;
    statistics: {
      totalOrders: number;
      totalRevenue: number;
      averageOrderValue: number;
    };
  };
  error?: string;
}

export interface GetOrderHistoryByIdRequest {
  id: string;
}

export interface GetOrderHistoryByIdResponse {
  success: boolean;
  data?: AdminOrder;
  error?: string;
}

export interface ExportOrdersHistoryRequest {
  format: 'csv' | 'json';
  filters?: OrderHistoryFilters;
}

export interface ExportOrdersHistoryResponse {
  success: boolean;
  data?: {
    downloadUrl: string;
    filename: string;
    expiresAt: string;
  };
  error?: string;
}
