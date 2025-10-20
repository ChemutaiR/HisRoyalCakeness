// Report generation utility functions

import { AdminOrder } from '@/types/admin';

/**
 * Generate sales report
 */
export function generateSalesReport(orders: AdminOrder[], startDate: string, endDate: string) {
  const filteredOrders = orders.filter(order => 
    order.createdAt >= startDate && order.createdAt <= endDate
  );
  
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = filteredOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const statusBreakdown = filteredOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const paymentBreakdown = filteredOrders.reduce((acc, order) => {
    acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    period: { startDate, endDate },
    summary: {
      totalRevenue,
      totalOrders,
      averageOrderValue
    },
    statusBreakdown,
    paymentBreakdown,
    orders: filteredOrders
  };
}

/**
 * Generate product performance report
 */
export function generateProductPerformanceReport(orders: AdminOrder[], startDate: string, endDate: string) {
  const filteredOrders = orders.filter(order => 
    order.createdAt >= startDate && order.createdAt <= endDate
  );
  
  const productStats = filteredOrders.reduce((acc, order) => {
    const productName = order.cake;
    if (!acc[productName]) {
      acc[productName] = {
        name: productName,
        orders: 0,
        revenue: 0,
        averageOrderValue: 0
      };
    }
    acc[productName].orders += 1;
    acc[productName].revenue += order.totalAmount;
    return acc;
  }, {} as Record<string, { name: string; orders: number; revenue: number; averageOrderValue: number }>);
  
  // Calculate average order value for each product
  Object.values(productStats).forEach((product: { name: string; orders: number; revenue: number; averageOrderValue: number }) => {
    product.averageOrderValue = product.orders > 0 ? product.revenue / product.orders : 0;
  });
  
  const sortedProducts = Object.values(productStats).sort((a: { name: string; orders: number; revenue: number; averageOrderValue: number }, b: { name: string; orders: number; revenue: number; averageOrderValue: number }) => b.revenue - a.revenue);
  
  return {
    period: { startDate, endDate },
    products: sortedProducts,
    totalProducts: sortedProducts.length,
    topProduct: sortedProducts[0] || null
  };
}

/**
 * Generate customer report
 */
export function generateCustomerReport(orders: AdminOrder[], startDate: string, endDate: string) {
  const filteredOrders = orders.filter(order => 
    order.createdAt >= startDate && order.createdAt <= endDate
  );
  
  const customerStats = filteredOrders.reduce((acc, order) => {
    const customerEmail = order.customerEmail;
    if (!acc[customerEmail]) {
      acc[customerEmail] = {
        name: order.customerName,
        email: customerEmail,
        phone: order.customerPhone,
        orders: 0,
        totalSpent: 0,
        firstOrder: order.createdAt,
        lastOrder: order.createdAt
      };
    }
    acc[customerEmail].orders += 1;
    acc[customerEmail].totalSpent += order.totalAmount;
    if (order.createdAt < acc[customerEmail].firstOrder) {
      acc[customerEmail].firstOrder = order.createdAt;
    }
    if (order.createdAt > acc[customerEmail].lastOrder) {
      acc[customerEmail].lastOrder = order.createdAt;
    }
    return acc;
  }, {} as Record<string, { name: string; email: string; phone: string; orders: number; totalSpent: number; firstOrder: string; lastOrder: string }>);
  
  const customers = Object.values(customerStats);
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum: number, customer: { name: string; email: string; phone: string; orders: number; totalSpent: number; firstOrder: string; lastOrder: string }) => sum + customer.totalSpent, 0);
  const averageCustomerValue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
  
  const topCustomers = customers.sort((a: { name: string; email: string; phone: string; orders: number; totalSpent: number; firstOrder: string; lastOrder: string }, b: { name: string; email: string; phone: string; orders: number; totalSpent: number; firstOrder: string; lastOrder: string }) => b.totalSpent - a.totalSpent).slice(0, 10);
  
  return {
    period: { startDate, endDate },
    summary: {
      totalCustomers,
      totalRevenue,
      averageCustomerValue
    },
    topCustomers,
    allCustomers: customers
  };
}

/**
 * Generate daily sales report
 */
export function generateDailySalesReport(orders: AdminOrder[], date: string) {
  const dayOrders = orders.filter(order => order.createdAt.startsWith(date));
  
  const hourlyBreakdown = Array.from({ length: 24 }, (_, hour) => {
    const hourStr = hour.toString().padStart(2, '0');
    const hourOrders = dayOrders.filter(order => 
      order.createdAt.includes(`T${hourStr}:`)
    );
    
    return {
      hour: hourStr,
      orders: hourOrders.length,
      revenue: hourOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    };
  });
  
  const totalRevenue = dayOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = dayOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  return {
    date,
    summary: {
      totalRevenue,
      totalOrders,
      averageOrderValue
    },
    hourlyBreakdown,
    orders: dayOrders
  };
}

/**
 * Generate monthly comparison report
 */
export function generateMonthlyComparisonReport(orders: AdminOrder[], currentMonth: string, previousMonth: string) {
  const currentMonthOrders = orders.filter(order => order.createdAt.startsWith(currentMonth));
  const previousMonthOrders = orders.filter(order => order.createdAt.startsWith(previousMonth));
  
  const currentRevenue = currentMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const previousRevenue = previousMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  const currentOrders = currentMonthOrders.length;
  const previousOrders = previousMonthOrders.length;
  
  const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
  const orderGrowth = previousOrders > 0 ? ((currentOrders - previousOrders) / previousOrders) * 100 : 0;
  
  return {
    currentMonth: {
      month: currentMonth,
      revenue: currentRevenue,
      orders: currentOrders,
      averageOrderValue: currentOrders > 0 ? currentRevenue / currentOrders : 0
    },
    previousMonth: {
      month: previousMonth,
      revenue: previousRevenue,
      orders: previousOrders,
      averageOrderValue: previousOrders > 0 ? previousRevenue / previousOrders : 0
    },
    growth: {
      revenueGrowth,
      orderGrowth
    }
  };
}

/**
 * Export report to CSV format
 */
export function exportReportToCSV(data: any[], filename: string): string {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
}

/**
 * Format report data for display
 */
export function formatReportData(data: any, format: 'table' | 'chart' | 'summary' = 'table') {
  switch (format) {
    case 'table':
      return data;
    case 'chart':
      return {
        labels: Object.keys(data),
        datasets: [{
          label: 'Count',
          data: Object.values(data)
        }]
      };
    case 'summary':
      return {
        total: Object.values(data).reduce((sum: number, value: any) => sum + (typeof value === 'number' ? value : 0), 0),
        count: Object.keys(data).length,
        average: Object.keys(data).length > 0 ? Object.values(data).reduce((sum: number, value: any) => sum + (typeof value === 'number' ? value : 0), 0) / Object.keys(data).length : 0
      };
    default:
      return data;
  }
}
