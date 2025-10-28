/**
 * API Endpoints Configuration
 * 
 * Centralized endpoint definitions for all API calls.
 * This makes it easy to update URLs and maintain consistency.
 */

export const API_ENDPOINTS = {
  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    BY_STATUS: (status: string) => `/orders?status=${status}`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
    SEARCH: (query: string) => `/orders/search?q=${encodeURIComponent(query)}`,
    STATISTICS: '/orders/statistics',
  },

  // Order History
  ORDER_HISTORY: {
    BASE: '/orders/history',
    DELIVERED: '/orders/history/delivered',
    BY_ID: (id: string) => `/orders/history/${id}`,
    EXPORT: '/orders/history/export',
    STATISTICS: '/orders/history/statistics',
  },

  // Products
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `/products/${id}`,
    SEARCH: (query: string) => `/products/search?q=${encodeURIComponent(query)}`,
    BY_CATEGORY: (category: string) => `/products?category=${category}`,
  },

  // Decorations
  DECORATIONS: {
    BASE: '/decorations',
    BY_ID: (id: string) => `/decorations/${id}`,
    BY_CATEGORY: (categoryId: string) => `/decorations?category=${categoryId}`,
  },

  // Delivery Zones
  DELIVERY_ZONES: {
    BASE: '/delivery-zones',
    BY_ID: (id: string) => `/delivery-zones/${id}`,
    CALCULATE_FEE: '/delivery-zones/calculate-fee',
  },

  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },

  // Checkout
  CHECKOUT: {
    VALIDATE: '/checkout/validate',
    CREATE_ORDER: '/checkout/orders',
    PAYMENT_METHODS: '/checkout/payment-methods',
    DELIVERY_FEE: '/checkout/delivery-fee',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    ORDERS: '/analytics/orders',
    PRODUCTS: '/analytics/products',
    REVENUE: '/analytics/revenue',
  },

  // Settings
  SETTINGS: {
    BUSINESS: '/settings/business',
    NOTIFICATIONS: '/settings/notifications',
    INTEGRATIONS: '/settings/integrations',
  },
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS;
