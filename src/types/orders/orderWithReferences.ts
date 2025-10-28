/**
 * Order types with ID references for single source of truth
 * 
 * These types store only IDs and reference data, ensuring consistency
 * across the application by referencing the centralized mock databases.
 */

import { CustomerInfo, PaymentInfo } from '@/types/admin/orders';

export type OrderStatus = 'received' | 'confirmed' | 'preparing' | 'ready' | 'dispatched' | 'delivered' | 'cancelled';

/**
 * Order item with ID references instead of full objects
 */
export interface OrderItemReference {
  id: string;
  cakeId: string; // Reference to adminProductsData
  sizeWeight: string; // Reference to cake.prices[].weight
  creamIndex: number; // Index in cake.whippingCreamOptions
  decorationIds: number[]; // References to mockDecorations
  containerTypeName: string; // Reference to container type
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customNotes?: string;
  uploadedImages?: string[];
}

/**
 * Delivery information with zone ID reference
 */
export interface DeliveryInfoReference {
  zoneId: string; // Reference to mockDeliveryZones
  address: {
    street: string;
    directions?: string;
    country: string;
  };
  date: string;
  time: string;
  specialInstructions?: string;
}

/**
 * Order with ID references for single source of truth
 */
export interface OrderWithReferences {
  id: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfoReference;
  paymentInfo: PaymentInfo;
  items: OrderItemReference[];
  customLoafItems: Array<{
    id: string;
    cakeSelection: {
      id: string;
      name: string;
    };
    quantity: number;
    totalPrice: number;
    addedAt: Date;
  }>;
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

/**
 * Create order request with ID references
 */
export interface CreateOrderRequestWithReferences {
  orderNumber?: string;
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfoReference;
  paymentInfo: Omit<PaymentInfo, 'transactionId' | 'status'>;
  items: OrderItemReference[];
  customLoafItems: Array<{
    id: string;
    cakeSelection: {
      id: string;
      name: string;
    };
    quantity: number;
    totalPrice: number;
    addedAt: Date;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status?: OrderStatus;
  notes?: string;
}

/**
 * Resolved order item with full data from references
 */
export interface ResolvedOrderItem {
  id: string;
  cake: {
    id: string;
    name: string;
    description: string;
    images: string[];
  };
  size: {
    weight: string;
    amount: number;
    servings: number;
  };
  cream: {
    name: string;
    price: number;
  };
  decorations: Array<{
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  }>;
  containerType: {
    name: string;
    value: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customNotes?: string;
  uploadedImages?: string[];
}

/**
 * Resolved delivery information with full zone data
 */
export interface ResolvedDeliveryInfo {
  zone: {
    id: string;
    name: string;
    description: string;
    deliveryFee: number;
    estimatedDeliveryTime: string;
    isAvailable: boolean;
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

/**
 * Fully resolved order with all reference data populated
 */
export interface ResolvedOrder {
  id: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  deliveryInfo: ResolvedDeliveryInfo;
  paymentInfo: PaymentInfo;
  items: ResolvedOrderItem[];
  customLoafItems: Array<{
    id: string;
    cakeSelection: {
      id: string;
      name: string;
    };
    quantity: number;
    totalPrice: number;
    addedAt: Date;
  }>;
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
