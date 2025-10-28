// Admin order management types

export interface OrderItem {
  id: string;
  cakeId: number;
  cakeName: string;
  cakeImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customization: {
    selectedSize?: {
      size: string;
      price: number;
      servings: number;
    };
    selectedCream?: {
      name: string;
      price: number;
      available: boolean;
    };
    selectedContainerType?: {
      name: string;
      value: string;
    };
    selectedDecorations?: Array<{
      id: number;
      name: string;
      price: number;
    }>;
    customNotes?: string;
    uploadedImages?: string[];
  };
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DeliveryInfo {
  zone: {
    id: string;
    name: string;
    deliveryFee: number;
  };
  address: {
    street: string;
    directions?: string;
    country: string;
  };
  date: string;
  time: string;
  specialInstructions?: string;
}

export interface PaymentInfo {
  method: 'mpesa';
  phoneNumber: string;
  amountPaid: number;
  amountRemaining: number;
  transactionId?: string;
  status: 'pending' | 'partial' | 'completed';
}

export type OrderStatus = 
  | 'received' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'dispatched' 
  | 'delivered' 
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

export interface CreateOrderRequest {
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: Omit<PaymentInfo, 'transactionId' | 'status'>;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
}

export interface PaymentProcessingRequest {
  phoneNumber: string;
  amount: number;
  orderId: string;
}

export interface PaymentProcessingResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  message?: string;
}

// Legacy AdminOrder interface for compatibility with existing admin components
export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  size: string;
  deliveryDate: string;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  cake: string;
  cream: string;
  topping: string;
  allergies: string;
  specialInstructions: string;
  customNotes?: string; // Custom notes from the Notes section
  status: OrderStatus;
  images: string[];
}