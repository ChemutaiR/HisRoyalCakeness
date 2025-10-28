/**
 * Mock History API Service
 * 
 * Simulates backend behavior for order history using the mock database
 */

import { 
  GetOrdersHistoryRequest, 
  GetOrdersHistoryResponse,
  GetOrderHistoryByIdRequest,
  GetOrderHistoryByIdResponse,
  ExportOrdersHistoryRequest,
  ExportOrdersHistoryResponse
} from '@/types/api/history';
import { adminOrderServiceWithReferences } from '@/mockDatabase/admin/services/orderServiceWithReferences';
import { OrderHistoryFilters } from '@/types/admin/orderHistory';

export class MockHistoryApiService {
  /**
   * Simulate API delay
   */
  private async delay(ms: number = 300): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get delivered orders with filters and pagination
   */
  async getDeliveredOrders(request: GetOrdersHistoryRequest): Promise<GetOrdersHistoryResponse> {
    await this.delay(200);

    try {
      // Get all delivered orders
      const allDeliveredOrders = adminOrderServiceWithReferences.getAdminOrdersByStatus('delivered');
      
      // Apply filters
      let filteredOrders = this.applyFilters(allDeliveredOrders, request.filters || {});
      
      // Apply sorting
      if (request.sort) {
        filteredOrders = this.applySorting(filteredOrders, request.sort);
      }

      // Apply pagination
      const page = request.pagination?.page || 1;
      const limit = request.pagination?.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
      const hasMore = endIndex < filteredOrders.length;

      // Calculate statistics
      const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const averageOrderValue = filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0;

      return {
        success: true,
        data: {
          orders: paginatedOrders,
          pagination: {
            page,
            limit,
            total: filteredOrders.length,
            hasMore
          },
          filters: request.filters || {},
          statistics: {
            totalOrders: filteredOrders.length,
            totalRevenue,
            averageOrderValue
          }
        }
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
    await this.delay(100);

    try {
      const order = adminOrderServiceWithReferences.getAdminOrderById(request.id);
      
      if (!order) {
        return {
          success: false,
          error: 'Order not found'
        };
      }

      return {
        success: true,
        data: order
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
    await this.delay(500);

    try {
      // Get filtered orders
      const allDeliveredOrders = adminOrderServiceWithReferences.getAdminOrdersByStatus('delivered');
      const _filteredOrders = this.applyFilters(allDeliveredOrders, request.filters || {});

      // Generate mock download URL
      const filename = `orders-history-${new Date().toISOString().split('T')[0]}.${request.format}`;
      const downloadUrl = `https://mock-api.com/downloads/${filename}`;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

      return {
        success: true,
        data: {
          downloadUrl,
          filename,
          expiresAt
        }
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
    await this.delay(150);

    try {
      const deliveredOrders = adminOrderServiceWithReferences.getAdminOrdersByStatus('delivered');
      const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const averageOrderValue = deliveredOrders.length > 0 ? totalRevenue / deliveredOrders.length : 0;

      return {
        success: true,
        data: {
          totalOrders: deliveredOrders.length,
          totalRevenue,
          averageOrderValue,
          ordersByMonth: this.getOrdersByMonth(deliveredOrders),
          revenueByMonth: this.getRevenueByMonth(deliveredOrders)
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch statistics'
      };
    }
  }

  /**
   * Apply filters to orders
   */
  private applyFilters(orders: any[], filters: OrderHistoryFilters): any[] {
    return orders.filter(order => {
      // Date range filter
      if (filters.dateFrom) {
        const orderDate = new Date(order.deliveryDate);
        const fromDate = new Date(filters.dateFrom);
        if (orderDate < fromDate) return false;
      }
      
      if (filters.dateTo) {
        const orderDate = new Date(order.deliveryDate);
        const toDate = new Date(filters.dateTo);
        if (orderDate > toDate) return false;
      }

      // Customer name filter
      if (filters.customerName) {
        const customerName = `${order.customerName}`.toLowerCase();
        if (!customerName.includes(filters.customerName.toLowerCase())) return false;
      }

      // Customer email filter
      if (filters.customerEmail) {
        const customerEmail = order.customerEmail.toLowerCase();
        if (!customerEmail.includes(filters.customerEmail.toLowerCase())) return false;
      }

      // Total amount filters
      if (filters.minTotal && order.totalAmount < filters.minTotal) return false;
      if (filters.maxTotal && order.totalAmount > filters.maxTotal) return false;

      // Search query filter
      if (filters.searchQuery) {
        const searchTerm = filters.searchQuery.toLowerCase();
        const searchableText = [
          order.id,
          order.orderNumber,
          order.customerName,
          order.customerEmail,
          order.cake,
          order.cream,
          order.topping
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchTerm)) return false;
      }

      return true;
    });
  }

  /**
   * Apply sorting to orders
   */
  private applySorting(orders: any[], sort: { field: string; direction: 'asc' | 'desc' }): any[] {
    return [...orders].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sort.field) {
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'deliveryDate':
          aValue = new Date(a.deliveryDate).getTime();
          bValue = new Date(b.deliveryDate).getTime();
          break;
        case 'totalAmount':
          aValue = a.totalAmount;
          bValue = b.totalAmount;
          break;
        default:
          return 0;
      }

      if (sort.direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }

  /**
   * Get orders grouped by month
   */
  private getOrdersByMonth(orders: any[]): Record<string, number> {
    const months: Record<string, number> = {};
    
    orders.forEach(order => {
      const date = new Date(order.deliveryDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months[monthKey] = (months[monthKey] || 0) + 1;
    });

    return months;
  }

  /**
   * Get revenue grouped by month
   */
  private getRevenueByMonth(orders: any[]): Record<string, number> {
    const months: Record<string, number> = {};
    
    orders.forEach(order => {
      const date = new Date(order.deliveryDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months[monthKey] = (months[monthKey] || 0) + order.totalAmount;
    });

    return months;
  }
}
