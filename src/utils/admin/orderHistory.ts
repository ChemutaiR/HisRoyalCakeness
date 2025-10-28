/**
 * Order History Utilities
 * 
 * Helper functions for order history functionality
 */

import { AdminOrder } from '@/types/admin/orders';
import { OrderHistoryFilters } from '@/types/admin/orderHistory';

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
}

/**
 * Format date and time for display
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Filter orders based on criteria
 */
export function filterOrders(orders: AdminOrder[], filters: OrderHistoryFilters): AdminOrder[] {
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
      const customerName = order.customerName.toLowerCase();
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
 * Sort orders by field and direction
 */
export function sortOrders(
  orders: AdminOrder[], 
  field: 'createdAt' | 'deliveryDate' | 'totalAmount' | 'customerName',
  direction: 'asc' | 'desc'
): AdminOrder[] {
  return [...orders].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (field) {
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
      case 'customerName':
        aValue = a.customerName.toLowerCase();
        bValue = b.customerName.toLowerCase();
        break;
      default:
        return 0;
    }

    if (direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
}

/**
 * Calculate order statistics
 */
export function calculateOrderStatistics(orders: AdminOrder[]) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Group by month
  const ordersByMonth: Record<string, number> = {};
  const revenueByMonth: Record<string, number> = {};
  
  orders.forEach(order => {
    const date = new Date(order.deliveryDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    ordersByMonth[monthKey] = (ordersByMonth[monthKey] || 0) + 1;
    revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + order.totalAmount;
  });

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    ordersByMonth,
    revenueByMonth
  };
}

/**
 * Generate CSV content from orders
 */
export function generateCSVContent(orders: AdminOrder[]): string {
  const headers = [
    'Order ID',
    'Order Number',
    'Customer Name',
    'Customer Email',
    'Customer Phone',
    'Cake',
    'Size',
    'Cream',
    'Topping',
    'Delivery Date',
    'Created At',
    'Total Amount',
    'Payment Method',
    'Payment Status',
    'Special Instructions',
    'Custom Notes'
  ];

  const rows = orders.map(order => [
    order.id,
    order.orderNumber,
    order.customerName,
    order.customerEmail,
    order.customerPhone,
    order.cake,
    order.size,
    order.cream,
    order.topping || '',
    order.deliveryDate,
    order.createdAt,
    order.totalAmount.toString(),
    order.paymentMethod,
    order.paymentStatus,
    order.specialInstructions || '',
    order.customNotes || ''
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  return csvContent;
}

/**
 * Generate JSON content from orders
 */
export function generateJSONContent(orders: AdminOrder[]): string {
  return JSON.stringify(orders, null, 2);
}

/**
 * Download file with given content and filename
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Validate date range
 */
export function validateDateRange(dateFrom?: string, dateTo?: string): { isValid: boolean; error?: string } {
  if (!dateFrom || !dateTo) return { isValid: true };
  
  const fromDate = new Date(dateFrom);
  const toDate = new Date(dateTo);
  
  if (fromDate > toDate) {
    return { isValid: false, error: 'End date must be after start date' };
  }
  
  return { isValid: true };
}

/**
 * Validate total amount range
 */
export function validateTotalRange(minTotal?: number, maxTotal?: number): { isValid: boolean; error?: string } {
  if (minTotal === undefined || maxTotal === undefined) return { isValid: true };
  
  if (minTotal > maxTotal) {
    return { isValid: false, error: 'Maximum total must be greater than minimum total' };
  }
  
  return { isValid: true };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
}

/**
 * Get filter summary text
 */
export function getFilterSummary(filters: OrderHistoryFilters): string[] {
  const activeFilters: string[] = [];

  if (filters.dateFrom) activeFilters.push(`From: ${formatDate(filters.dateFrom)}`);
  if (filters.dateTo) activeFilters.push(`To: ${formatDate(filters.dateTo)}`);
  if (filters.customerName) activeFilters.push(`Customer: ${filters.customerName}`);
  if (filters.customerEmail) activeFilters.push(`Email: ${filters.customerEmail}`);
  if (filters.minTotal) activeFilters.push(`Min: ${formatCurrency(filters.minTotal)}`);
  if (filters.maxTotal) activeFilters.push(`Max: ${formatCurrency(filters.maxTotal)}`);
  if (filters.searchQuery) activeFilters.push(`Search: ${filters.searchQuery}`);

  return activeFilters;
}
