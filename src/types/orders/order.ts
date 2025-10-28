import { CustomerInfo, DeliveryInfo, PaymentInfo } from '@/types/admin/orders';
import { OrderItem } from '@/types/admin/orders';
import { CustomLoafItem } from '@/types/shop/cart';

export type OrderStatus = 'received' | 'confirmed' | 'preparing' | 'ready' | 'dispatched' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  items: OrderItem[];
  customLoafItems: CustomLoafItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  notes?: string;
}

export interface CheckoutSession {
  formData: CheckoutFormData;
  currentStep: CheckoutStep;
  progress: number;
  startedAt: Date;
  lastUpdated: Date;
}

export type CheckoutStep = 'delivery' | 'payment' | 'review' | 'confirmation';

export interface CheckoutFormData {
  // Delivery info
  deliveryZone: string;
  deliveryAddress: {
    street: string;
    directions?: string;
    country: string;
  };
  deliveryDate: string;
  deliveryTime: string;
  specialInstructions?: string;
  
  // Cake scheduling
  cakeScheduleDate?: string;
  cakeScheduleTime?: string;
  isRushOrder?: boolean;
  
  // Payment info
  paymentMethod: string;
  mpesaPhoneNumber: string;
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
  
  // Order confirmation details
  orderNumber?: string;
  transactionId?: string;
}

export interface OrderConfirmationData {
  order: Order;
  success: boolean;
  message: string;
  transactionId?: string;
}

export interface CreateOrderRequest {
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  items: OrderItem[];
  customLoafItems: CustomLoafItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
}
