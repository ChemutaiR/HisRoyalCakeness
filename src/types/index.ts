// Main types export file

// Re-export all types from organized folders
export * from './shop/catalog';
// Avoid re-export conflicts by explicitly exporting needed cart types
export type { CheckoutFormData, PaymentInfo, DeliveryInfo, CheckoutState, TimeSlot, OrderConfirmation } from './shop/cart/checkout';
// Avoid conflicts: export specific admin types instead of wildcard
export type { Order, OrderItem, OrderStatus } from './admin/orders';
export * from './shared';

// Explicit exports to resolve conflicts
export type { SearchParams } from './shared/api';
