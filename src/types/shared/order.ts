// Order-related type definitions (shared between admin and user)

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'cash' | 'card' | 'mpesa' | 'bank_transfer';

export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: Address;
  deliveryDate: Date;
  deliveryTime: string;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  cakeId: number;
  cakeName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customization: OrderCustomization;
}

export interface OrderCustomization {
  size: string;
  cream: string;
  containerType: string;
  notes?: string;
  uploadedImages?: string[];
}

export interface Address {
  street: string;
  directions?: string;
  country: string;
}

export interface DeliverySlot {
  date: string;
  time: string;
  available: boolean;
}

export interface OrderSummary {
  orderNumber: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
  deliveryDate: Date;
  createdAt: Date;
}

export interface OrderTracking {
  orderId: number;
  status: OrderStatus;
  estimatedDelivery: Date;
  trackingSteps: TrackingStep[];
}

export interface TrackingStep {
  status: OrderStatus;
  timestamp: Date;
  description: string;
  completed: boolean;
}

export interface OrderFilters {
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}
