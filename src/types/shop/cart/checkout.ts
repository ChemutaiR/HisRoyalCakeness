// Checkout and payment-related types

import { PaymentMethod, PaymentStatus, Address } from '../../shared/order';

export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Delivery Information
  deliveryZone: string;
  deliveryAddress: Address;
  deliveryDate: string;
  deliveryTime: string;
  specialInstructions?: string;
  
  // Payment Information
  paymentMethod: PaymentMethod;
  mpesaPhoneNumber?: string;
  
  // Additional
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
  
  // Order confirmation details
  orderNumber?: string;
  transactionId?: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  amount: number;
  currency: string;
  processedAt?: Date;
  failureReason?: string;
}

export interface DeliveryInfo {
  address: Address;
  date: string;
  time: string;
  estimatedDelivery: Date;
  specialInstructions?: string;
  deliveryFee: number;
  isFreeDelivery: boolean;
}

export interface CheckoutState {
  step: 'delivery' | 'payment' | 'review' | 'confirmation';
  formData: Partial<CheckoutFormData>;
  paymentInfo?: PaymentInfo;
  deliveryInfo?: DeliveryInfo;
  isLoading: boolean;
  error: string | null;
}


export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxOrders: number;
  currentOrders: number;
}

export interface OrderConfirmation {
  orderNumber: string;
  orderId: string;
  total: number;
  estimatedDelivery: Date;
  paymentStatus: PaymentStatus;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}
