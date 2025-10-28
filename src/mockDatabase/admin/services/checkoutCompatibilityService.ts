// Compatibility service to maintain existing checkout functionality
import { OrderConfirmation } from '@/types/shop/cart/checkout';
import { CartItem, CustomLoafItem } from '@/types/shop/cart';
import { Address } from '@/types/shared/order';
import { adminOrderServiceWithReferences } from './orderServiceWithReferences';
import { CreateOrderRequestWithReferences } from '@/types/orders/orderWithReferences';

// Mock payment methods
const mockPaymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', isActive: true, description: 'Pay with M-Pesa' },
  { id: 'cash', name: 'Cash on Delivery', isActive: false, description: 'Pay when your order arrives' },
  { id: 'card', name: 'Credit/Debit Card', isActive: false, description: 'Pay with your card' }
];

// Mock delivery zones
const mockDeliveryZones = [
  { id: 'zone-cbd', name: 'CBD & Surrounding Areas', radius: 5, deliveryFee: 0, estimatedTime: '30-45 mins', isActive: true },
  { id: 'zone-westlands', name: 'Westlands & Karen', radius: 10, deliveryFee: 300, estimatedTime: '45-60 mins', isActive: true },
  { id: 'zone-eastlands', name: 'Eastlands', radius: 8, deliveryFee: 200, estimatedTime: '40-55 mins', isActive: true },
  { id: 'zone-thika', name: 'Thika Road', radius: 15, deliveryFee: 500, estimatedTime: '60-90 mins', isActive: true }
];

// Generate order number
const generateOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `HRC-${year}${month}${random}`;
};

// Calculate delivery fee
const calculateDeliveryFee = (subtotal: number, address: Address): number => {
  const baseFee = 200;
  const distanceMultiplier = 1.2; // Mock distance calculation
  return Math.round(baseFee * distanceMultiplier);
};

// Mock checkout operations for compatibility
export const mockCheckoutOperations = {
  // Time slots for a given date (mocked)
  getAvailableTimeSlots: async (date: string) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    // Simple mock: 3 slots, all available
    return [
      { id: `${date}-morning`, startTime: '09:00', endTime: '11:00', isAvailable: true, maxOrders: 10, currentOrders: 2 },
      { id: `${date}-noon`, startTime: '12:00', endTime: '14:00', isAvailable: true, maxOrders: 10, currentOrders: 5 },
      { id: `${date}-evening`, startTime: '16:00', endTime: '18:00', isAvailable: true, maxOrders: 10, currentOrders: 1 },
    ];
  },

  // Simple date availability (mock: weekdays only)
  isDateAvailable: async (date: string) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    const d = new Date(date);
    const day = d.getDay();
    return day !== 0 && day !== 6; // Mon-Fri only
  },

  // Business hours for a given date
  getBusinessHours: async (date: string) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { open: '08:00', close: '18:00', closed: false };
  },
  // Get available payment methods
  getPaymentMethods: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPaymentMethods.filter(method => method.isActive);
  },

  // Calculate delivery fee
  calculateDeliveryFee: async (subtotal: number, address: Address): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return calculateDeliveryFee(subtotal, address);
  },

  // Get delivery zones
  getDeliveryZones: async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockDeliveryZones.filter(zone => zone.isActive);
  },

  // Create order
  createOrder: async (orderData: {
    customerInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    deliveryInfo: {
      address: Address;
      date: string;
      time: string;
      specialInstructions?: string;
    };
    paymentInfo: {
      method: string;
    };
    items: CartItem[];
    customLoafItems: CustomLoafItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }): Promise<OrderConfirmation> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const _orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const _orderNumber = generateOrderNumber();
    
    // Calculate estimated delivery (using delivery date from form data)
    const deliveryDate = new Date(orderData.deliveryInfo.date);
    const estimatedDelivery = new Date(deliveryDate.getTime());

    // Find delivery zone by address (simplified logic)
    const deliveryZoneId = 'zone-cbd'; // Default zone for now

    // Create reference-based order request
    const orderRequest: CreateOrderRequestWithReferences = {
      customerInfo: {
        firstName: orderData.customerInfo.firstName,
        lastName: orderData.customerInfo.lastName,
        email: orderData.customerInfo.email,
        phone: orderData.customerInfo.phone,
      },
      deliveryInfo: {
        zoneId: deliveryZoneId,
        address: orderData.deliveryInfo.address,
        date: orderData.deliveryInfo.date,
        time: orderData.deliveryInfo.time,
        specialInstructions: orderData.deliveryInfo.specialInstructions,
      },
      paymentInfo: {
        method: 'mpesa' as const,
        phoneNumber: orderData.customerInfo.phone,
        amountPaid: 0,
        amountRemaining: orderData.total,
      },
      items: orderData.items.map(item => ({
        id: item.id,
        cakeId: item.cake.id.toString(), // Convert to string for reference
        sizeWeight: item.customization.selectedSize?.size || 'Medium (8 inches)',
        creamIndex: 0, // Default cream index
        decorationIds: item.customization.selectedDecorations?.map(dec => dec.id) || [],
        containerTypeName: item.customization.selectedContainerType?.name || 'Round Tin',
        quantity: item.quantity,
        unitPrice: item.cake.prices?.[0]?.amount || 0,
        totalPrice: item.totalPrice,
        customNotes: item.customization.customNotes,
        uploadedImages: item.customization.uploadedImages
      })),
      customLoafItems: orderData.customLoafItems.map(item => ({
        id: item.id,
        cakeSelection: {
          id: item.cakeSelection.id.toString(),
          name: item.cakeSelection.name
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        addedAt: item.addedAt,
      })),
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      total: orderData.total,
      notes: undefined,
    };

    // Add to admin order service with references
    const newOrder = adminOrderServiceWithReferences.createOrder(orderRequest);

    // Return confirmation
    return {
      orderNumber: newOrder.orderNumber,
      orderId: newOrder.id,
      total: orderData.total,
      estimatedDelivery,
      paymentStatus: 'pending',
      items: [
        ...orderData.items.map(item => ({
          id: item.id,
          name: item.cake.name,
          quantity: item.quantity,
          price: item.totalPrice
        })),
        ...orderData.customLoafItems.map(item => ({
          id: item.id,
          name: 'Custom Loaf',
          quantity: item.quantity,
          price: item.totalPrice
        }))
      ],
    };
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return adminOrderServiceWithReferences.updateOrderStatus(orderId, status as any);
  },

  // Get order by ID
  getOrderById: async (orderId: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return adminOrderServiceWithReferences.getOrderById(orderId);
  },

  // Get order by order number
  getOrderByNumber: async (orderNumber: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const all = adminOrderServiceWithReferences.getAllOrders();
    return all.find(o => o.orderNumber === orderNumber);
  },

  // Get all orders
  getAllOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return adminOrderServiceWithReferences.getAllOrders();
  }
};
