/**
 * Admin orders mock database with ID references for single source of truth
 * 
 * This file contains order data that references other mock databases by ID,
 * ensuring consistency and eliminating data duplication.
 */

import { OrderWithReferences, OrderStatus, CreateOrderRequestWithReferences } from '@/types/orders/orderWithReferences';

// Generate realistic order data
const generateOrderId = () => `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const generateOrderNumber = () => `HRC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

// Sample customer data
const sampleCustomers = [
  {
    id: 'customer_1',
    firstName: 'Grace',
    lastName: 'Mwangi',
    email: 'grace.mwangi@email.com',
    phone: '+254712345678',
    address: {
      street: '123 Kilimani Road',
      directions: 'Near Yaya Centre',
      country: 'Kenya'
    }
  },
  {
    id: 'customer_2',
    firstName: 'John',
    lastName: 'Kamau',
    email: 'john.kamau@email.com',
    phone: '+254723456789',
    address: {
      street: '456 Westlands Drive',
      directions: 'Opposite Sarit Centre',
      country: 'Kenya'
    }
  },
  {
    id: 'customer_3',
    firstName: 'Mary',
    lastName: 'Wanjiku',
    email: 'mary.wanjiku@email.com',
    phone: '+254734567890',
    address: {
      street: '789 Karen Road',
      directions: 'Near Karen Shopping Centre',
      country: 'Kenya'
    }
  },
  {
    id: 'customer_4',
    firstName: 'Peter',
    lastName: 'Ochieng',
    email: 'peter.ochieng@email.com',
    phone: '+254745678901',
    address: {
      street: '321 Thika Road',
      directions: 'Near Thika Road Mall',
      country: 'Kenya'
    }
  },
  {
    id: 'customer_5',
    firstName: 'Sarah',
    lastName: 'Akinyi',
    email: 'sarah.akinyi@email.com',
    phone: '+254756789012',
    address: {
      street: '654 Mombasa Road',
      directions: 'Near Athi River',
      country: 'Kenya'
    }
  }
];

// Reference data - these IDs must exist in the respective mock databases
const sampleCakeReferences = [
  { cakeId: 'prod1', sizeWeight: '1 kg', creamIndex: 0, decorationIds: [1, 2] }, // Vanilla with rose petals and chocolate shavings
  { cakeId: 'prod2', sizeWeight: '0.5 kg', creamIndex: 1, decorationIds: [3] }, // Eggless with chocolate cream and gold leaf
  { cakeId: 'prod3', sizeWeight: '1.5 kg', creamIndex: 0, decorationIds: [4, 5] }, // Vanilla Orange with strawberries and candles
  { cakeId: 'prod4', sizeWeight: '2.0 kg', creamIndex: 2, decorationIds: [6] }, // Chocolate with strawberry cream and custom message
  { cakeId: 'prod5', sizeWeight: '1 kg', creamIndex: 0, decorationIds: [1, 3] }, // Red Velvet with rose petals and gold leaf
];

const sampleZoneReferences = [
  'zone-1', // CBD & Surrounding Areas
  'zone-2', // Eastlands
  'zone-3', // Westlands & Karen
  'zone-4', // Thika Road & Beyond
  'zone-5', // Mombasa Road
];

const containerTypeReferences = [
  'Round Tin',
  'Square Tin',
  'Heart Tin',
  'Standard Box',
  'Premium Box',
];

/**
 * Generate orders with ID references
 */
const generateOrdersWithReferences = (): OrderWithReferences[] => {
  const orders: OrderWithReferences[] = [];
  const now = new Date();

  // Generate orders for the last 30 days
  for (let i = 0; i < 25; i++) {
    const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
    const cakeRef = sampleCakeReferences[Math.floor(Math.random() * sampleCakeReferences.length)];
    const zoneId = sampleZoneReferences[Math.floor(Math.random() * sampleZoneReferences.length)];
    const containerType = containerTypeReferences[Math.floor(Math.random() * containerTypeReferences.length)];

    const orderDate = new Date(now.getTime() - (Math.random() * 7 * 24 * 60 * 60 * 1000));
    const deliveryDate = new Date(now.getTime() + (Math.random() * 14 * 24 * 60 * 60 * 1000) + (24 * 60 * 60 * 1000));

    // Focus on the 3 main statuses with realistic distribution
    // 40% received, 30% ready, 30% delivered
    const statusWeights = [
      { status: 'received' as OrderStatus, weight: 40 },
      { status: 'ready' as OrderStatus, weight: 30 },
      { status: 'delivered' as OrderStatus, weight: 30 }
    ];

    const random = Math.random() * 100;
    let cumulativeWeight = 0;
    let status: OrderStatus = 'received';

    for (const { status: statusValue, weight } of statusWeights) {
      cumulativeWeight += weight;
      if (random <= cumulativeWeight) {
        status = statusValue;
        break;
      }
    }

    // Calculate pricing (these would normally be resolved from reference data)
    const basePrice = 2000 + Math.random() * 3000; // Mock base price
    const decorationPrice = cakeRef.decorationIds.length * 200; // Mock decoration price
    const subtotal = basePrice + decorationPrice;
    const deliveryFee = zoneId === 'zone-1' ? 0 : 200 + Math.random() * 300; // Mock delivery fee
    const total = subtotal + deliveryFee;

    const order: OrderWithReferences = {
      id: generateOrderId(),
      orderNumber: generateOrderNumber(),
      customerInfo: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone
      },
      deliveryInfo: {
        zoneId,
        address: customer.address,
        date: deliveryDate.toISOString().split('T')[0],
        time: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'][Math.floor(Math.random() * 6)],
        specialInstructions: Math.random() > 0.7 ? 'Please call before delivery' : undefined,
      },
      paymentInfo: {
        method: 'mpesa',
        phoneNumber: customer.phone,
        amountPaid: Math.random() > 0.1 ? total : 0,
        amountRemaining: Math.random() > 0.1 ? 0 : total,
        status: Math.random() > 0.1 ? 'completed' : 'pending',
        transactionId: Math.random() > 0.1 ? `MPESA-${Date.now()}-${Math.floor(Math.random() * 10000)}` : undefined
      },
      items: [{
        id: `item_${i}`,
        cakeId: cakeRef.cakeId,
        sizeWeight: cakeRef.sizeWeight,
        creamIndex: cakeRef.creamIndex,
        decorationIds: cakeRef.decorationIds,
        containerTypeName: containerType,
        quantity: 1,
        unitPrice: basePrice,
        totalPrice: basePrice + decorationPrice,
        customNotes: Math.random() > 0.8 ? 'Please add extra decorations' : undefined,
        uploadedImages: Math.random() > 0.7 ? [`/uploads/design_${i}.jpg`] : []
      }],
      customLoafItems: [],
      subtotal,
      deliveryFee,
      total,
      status,
      createdAt: orderDate,
      updatedAt: orderDate,
      estimatedDelivery: deliveryDate,
      notes: Math.random() > 0.8 ? 'Customer requested special handling' : undefined
    };

    orders.push(order);
  }

  return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Export the comprehensive orders data with references
export const adminOrdersWithReferences = generateOrdersWithReferences();

// Export helper functions
export const getOrderById = (id: string): OrderWithReferences | undefined => {
  return adminOrdersWithReferences.find(order => order.id === id);
};

export const getOrdersByStatus = (status: OrderStatus): OrderWithReferences[] => {
  return adminOrdersWithReferences.filter(order => order.status === status);
};

export const getAllOrders = (): OrderWithReferences[] => {
  return [...adminOrdersWithReferences];
};

export const getRecentOrders = (days: number = 7): OrderWithReferences[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return adminOrdersWithReferences.filter(order => order.createdAt >= cutoffDate);
};

export const getOrderStatistics = () => {
  const orders = adminOrdersWithReferences;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatus, number>);

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    ordersByStatus
  };
};

export const createOrder = (orderData: CreateOrderRequestWithReferences): OrderWithReferences => {
  const newOrder: OrderWithReferences = {
    id: generateOrderId(),
    orderNumber: orderData.orderNumber || generateOrderNumber(),
    customerInfo: orderData.customerInfo,
    deliveryInfo: orderData.deliveryInfo,
      paymentInfo: {
        ...orderData.paymentInfo,
        status: 'pending',
      },
    items: orderData.items,
    customLoafItems: orderData.customLoafItems,
    subtotal: orderData.subtotal,
    deliveryFee: orderData.deliveryFee,
    total: orderData.total,
    status: orderData.status || 'received',
    notes: orderData.notes,
    createdAt: new Date(),
    updatedAt: new Date(),
    estimatedDelivery: orderData.deliveryInfo.date ? new Date(orderData.deliveryInfo.date) : undefined,
    actualDelivery: undefined,
  };

  adminOrdersWithReferences.unshift(newOrder);
  return newOrder;
};

export const updateOrder = (id: string, updates: Partial<OrderWithReferences>): OrderWithReferences | undefined => {
  const orderIndex = adminOrdersWithReferences.findIndex(order => order.id === id);
  if (orderIndex === -1) return undefined;

  const updatedOrder = {
    ...adminOrdersWithReferences[orderIndex],
    ...updates,
    updatedAt: new Date()
  };

  adminOrdersWithReferences[orderIndex] = updatedOrder;
  return updatedOrder;
};

export const deleteOrder = (id: string): boolean => {
  const orderIndex = adminOrdersWithReferences.findIndex(order => order.id === id);
  if (orderIndex === -1) return false;

  adminOrdersWithReferences.splice(orderIndex, 1);
  return true;
};

export const searchOrders = (query: string): OrderWithReferences[] => {
  const lowercaseQuery = query.toLowerCase();
  return adminOrdersWithReferences.filter(order => 
    order.orderNumber.toLowerCase().includes(lowercaseQuery) ||
    order.customerInfo.firstName.toLowerCase().includes(lowercaseQuery) ||
    order.customerInfo.lastName.toLowerCase().includes(lowercaseQuery) ||
    order.customerInfo.email.toLowerCase().includes(lowercaseQuery) ||
    order.customerInfo.phone.includes(query)
  );
};

export const filterOrders = (filters: {
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  customerId?: string;
}): OrderWithReferences[] => {
  return adminOrdersWithReferences.filter(order => {
    if (filters.status && order.status !== filters.status) return false;
    if (filters.dateFrom && order.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && order.createdAt > filters.dateTo) return false;
    if (filters.customerId && order.customerInfo.phone !== filters.customerId) return false;
    return true;
  });
};
