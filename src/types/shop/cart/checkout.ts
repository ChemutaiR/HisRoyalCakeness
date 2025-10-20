// Checkout and payment-related types

import { PaymentMethod, PaymentStatus, Address } from '../../shared/order';

export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Delivery Information
  deliveryAddress: Address;
  deliveryDate: string;
  deliveryTime: string;
  specialInstructions?: string;
  
  // Payment Information
  paymentMethod: PaymentMethod;
  
  // Additional
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
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
  step: 'customer' | 'delivery' | 'payment' | 'review' | 'confirmation';
  formData: Partial<CheckoutFormData>;
  paymentInfo?: PaymentInfo;
  deliveryInfo?: DeliveryInfo;
  isLoading: boolean;
  error: string | null;
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
