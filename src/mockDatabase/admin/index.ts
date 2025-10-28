// Admin mock database exports - explicit exports to avoid conflicts

// Original order functions
export {
  getOrderById,
  getOrderStatistics,
  getOrdersByStatus,
  getRecentOrders
} from './orders/orders';

// Order service functions
export * from './services/orderService';
export * from './services/checkoutCompatibilityService';

// New reference-based exports
export * from './orders/ordersWithReferences';
export * from './services/orderServiceWithReferences';
export * from './services/referenceService';
