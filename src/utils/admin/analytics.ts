// Analytics utility functions

import { AdminOrder } from '@/types/admin';

/**
 * Calculate revenue analytics
 */
export function calculateRevenueAnalytics(orders: AdminOrder[]) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Calculate monthly revenue
  const monthlyRevenue = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toISOString().slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + order.totalAmount;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate daily revenue for current month
  const currentMonth = new Date().toISOString().slice(0, 7);
  const dailyRevenue = orders
    .filter(order => order.createdAt.startsWith(currentMonth))
    .reduce((acc, order) => {
      const day = order.createdAt.slice(8, 10);
      acc[day] = (acc[day] || 0) + order.totalAmount;
      return acc;
    }, {} as Record<string, number>);
  
  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    monthlyRevenue,
    dailyRevenue
  };
}

/**
 * Calculate product performance
 */
export function calculateProductPerformance(orders: AdminOrder[]) {
  const productStats = orders.reduce((acc, order) => {
    const cakeName = order.cake;
    if (!acc[cakeName]) {
      acc[cakeName] = {
        name: cakeName,
        orders: 0,
        revenue: 0,
        averageRating: 0 // This would come from reviews
      };
    }
    acc[cakeName].orders += 1;
    acc[cakeName].revenue += order.totalAmount;
    return acc;
  }, {} as Record<string, { name: string; orders: number; revenue: number; averageRating: number }>);
  
  // Calculate average order value for each product
  Object.values(productStats).forEach((product: { name: string; orders: number; revenue: number; averageRating: number }) => {
    product.averageRating = product.orders > 0 ? product.revenue / product.orders : 0;
  });
  
  return Object.values(productStats).sort((a: { name: string; orders: number; revenue: number; averageRating: number }, b: { name: string; orders: number; revenue: number; averageRating: number }) => b.revenue - a.revenue);
}

/**
 * Calculate customer analytics
 */
export function calculateCustomerAnalytics(orders: AdminOrder[]) {
  const customerStats = orders.reduce((acc, order) => {
    const customerEmail = order.customerEmail;
    if (!acc[customerEmail]) {
      acc[customerEmail] = {
        name: order.customerName,
        email: customerEmail,
        orders: 0,
        totalSpent: 0,
        lastOrder: order.createdAt
      };
    }
    acc[customerEmail].orders += 1;
    acc[customerEmail].totalSpent += order.totalAmount;
    if (order.createdAt > acc[customerEmail].lastOrder) {
      acc[customerEmail].lastOrder = order.createdAt;
    }
    return acc;
  }, {} as Record<string, { name: string; email: string; orders: number; totalSpent: number; lastOrder: string }>);
  
  const customers = Object.values(customerStats);
  const totalCustomers = customers.length;
  const newCustomers = customers.filter((customer: { name: string; email: string; orders: number; totalSpent: number; lastOrder: string }) => {
    const customerDate = new Date(customer.lastOrder);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return customerDate >= thirtyDaysAgo;
  }).length;
  
  const returningCustomers = totalCustomers - newCustomers;
  const averageOrderValue = totalCustomers > 0 
    ? customers.reduce((sum: number, customer: { name: string; email: string; orders: number; totalSpent: number; lastOrder: string }) => sum + customer.totalSpent, 0) / totalCustomers 
    : 0;
  
  return {
    totalCustomers,
    newCustomers,
    returningCustomers,
    averageOrderValue,
    topCustomers: customers.sort((a: { name: string; email: string; orders: number; totalSpent: number; lastOrder: string }, b: { name: string; email: string; orders: number; totalSpent: number; lastOrder: string }) => b.totalSpent - a.totalSpent).slice(0, 10)
  };
}

/**
 * Calculate order analytics
 */
export function calculateOrderAnalytics(orders: AdminOrder[]) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => 
    ['pending', 'confirmed', 'preparing'].includes(order.status)
  ).length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
  
  const averageOrderValue = totalOrders > 0 
    ? orders.reduce((sum, order) => sum + order.totalAmount, 0) / totalOrders 
    : 0;
  
  // Calculate order growth (comparing current month to previous month)
  const currentMonth = new Date().toISOString().slice(0, 7);
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  const previousMonthStr = previousMonth.toISOString().slice(0, 7);
  
  const currentMonthOrders = orders.filter(order => order.createdAt.startsWith(currentMonth)).length;
  const previousMonthOrders = orders.filter(order => order.createdAt.startsWith(previousMonthStr)).length;
  
  const orderGrowth = previousMonthOrders > 0 
    ? ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100 
    : 0;
  
  return {
    totalOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    averageOrderValue,
    orderGrowth
  };
}

/**
 * Calculate category analytics
 */
export function calculateCategoryAnalytics(orders: AdminOrder[]) {
  const categoryStats = orders.reduce((acc, order) => {
    // Assuming cake names can be categorized
    const category = categorizeCake(order.cake);
    if (!acc[category]) {
      acc[category] = {
        category,
        totalSold: 0,
        revenue: 0
      };
    }
    acc[category].totalSold += 1;
    acc[category].revenue += order.totalAmount;
    return acc;
  }, {} as Record<string, { category: string; totalSold: number; revenue: number }>);
  
  const totalRevenue = Object.values(categoryStats).reduce((sum: number, cat: { category: string; totalSold: number; revenue: number }) => sum + cat.revenue, 0);
  
  return Object.values(categoryStats).map((category: { category: string; totalSold: number; revenue: number }) => ({
    ...category,
    percentage: totalRevenue > 0 ? (category.revenue / totalRevenue) * 100 : 0
  })).sort((a: { category: string; totalSold: number; revenue: number; percentage: number }, b: { category: string; totalSold: number; revenue: number; percentage: number }) => b.revenue - a.revenue);
}

/**
 * Simple cake categorization (this would be more sophisticated in a real app)
 */
function categorizeCake(cakeName: string): string {
  const name = cakeName.toLowerCase();
  if (name.includes('chocolate')) return 'Chocolate';
  if (name.includes('vanilla')) return 'Vanilla';
  if (name.includes('fruit')) return 'Fruit';
  if (name.includes('red velvet')) return 'Red Velvet';
  if (name.includes('cheese')) return 'Cheesecake';
  return 'Other';
}

/**
 * Generate chart data for revenue over time
 */
export function generateRevenueChartData(orders: AdminOrder[], days: number = 30) {
  // const endDate = new Date(); // Not currently used
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const chartData = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayRevenue = orders
      .filter(order => order.createdAt.startsWith(dateStr))
      .reduce((sum, order) => sum + order.totalAmount, 0);
    
    chartData.push({
      date: dateStr,
      revenue: dayRevenue,
      orders: orders.filter(order => order.createdAt.startsWith(dateStr)).length
    });
  }
  
  return chartData;
}

/**
 * Calculate conversion rate
 */
export function calculateConversionRate(orders: AdminOrder[], totalVisitors: number = 1000) {
  const totalOrders = orders.length;
  return totalVisitors > 0 ? (totalOrders / totalVisitors) * 100 : 0;
}
