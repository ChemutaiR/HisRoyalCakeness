// Comprehensive admin orders mock database
import { Order, OrderStatus } from '@/types/orders/order';
// import { AdminOrder } from '@/types/admin/orders';

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
      street: '321 Lavington Green',
      directions: 'Next to Lavington Mall',
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
      street: '654 Runda Estate',
      directions: 'Near Runda Mall',
      country: 'Kenya'
    }
  }
];

// Sample cake data
const sampleCakes = [
  {
    id: 1,
    name: 'Vanilla Cake',
    image: '/product-images/vanilla cake.jpg',
    prices: [{ size: 'Small', amount: 2500, servings: 8 }]
  },
  {
    id: 2,
    name: 'Chocolate Cake',
    image: '/product-images/chcocolate fudge.jpg',
    prices: [{ size: 'Medium', amount: 3500, servings: 12 }]
  },
  {
    id: 3,
    name: 'Red Velvet',
    image: '/product-images/red velvet.jpg',
    prices: [{ size: 'Large', amount: 4500, servings: 16 }]
  }
];

// Sample delivery zones
const sampleZones = [
  {
    id: 'zone-cbd',
    name: 'CBD & Surrounding Areas',
    deliveryFee: 0
  },
  {
    id: 'zone-westlands',
    name: 'Westlands & Karen',
    deliveryFee: 300
  },
  {
    id: 'zone-eastlands',
    name: 'Eastlands',
    deliveryFee: 200
  }
];

// Generate comprehensive order data
const generateOrders = (): Order[] => {
  const orders: Order[] = [];
  const now = new Date();
  
  // Generate orders for the last 30 days
  for (let i = 0; i < 25; i++) {
    const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
    const cake = sampleCakes[Math.floor(Math.random() * sampleCakes.length)];
    const zone = sampleZones[Math.floor(Math.random() * sampleZones.length)];
    
    const orderDate = new Date(now.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000));
    const deliveryDate = new Date(orderDate.getTime() + (Math.random() * 7 * 24 * 60 * 60 * 1000));
    
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
    
    const subtotal = cake.prices[0].amount;
    const deliveryFee = zone.deliveryFee;
    const total = subtotal + deliveryFee;
    
    const order: Order = {
      id: generateOrderId(),
      orderNumber: generateOrderNumber(),
      customerInfo: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone
      },
      deliveryInfo: {
        zone: {
          id: zone.id,
          name: zone.name,
          deliveryFee: zone.deliveryFee
        },
        address: customer.address,
        date: deliveryDate.toISOString().split('T')[0],
        time: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'][Math.floor(Math.random() * 6)],
        specialInstructions: Math.random() > 0.7 ? 'Please call before delivery' : undefined
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
        cakeId: cake.id,
        cakeName: cake.name,
        cakeImage: cake.image,
        quantity: 1,
        unitPrice: cake.prices[0].amount,
        totalPrice: cake.prices[0].amount,
        customization: {
          selectedSize: {
            size: cake.prices[0].size,
            price: cake.prices[0].amount,
            servings: cake.prices[0].servings
          },
          selectedCream: {
            name: ['Vanilla', 'Chocolate', 'Strawberry'][Math.floor(Math.random() * 3)],
            price: 0,
            available: true
          },
          selectedContainerType: {
            name: 'Standard Box',
            value: 'standard'
          },
          selectedDecorations: [],
          customNotes: Math.random() > 0.8 ? 'Please add extra decorations' : '',
          uploadedImages: []
        }
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

// Export the comprehensive orders data
export const adminOrders = generateOrders();

// Export helper functions
export const getOrderById = (id: string): Order | undefined => {
  return adminOrders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return adminOrders.filter(order => order.status === status);
};

export const getOrdersByCustomer = (customerId: string): Order[] => {
  return adminOrders.filter(order => 
    `${order.customerInfo.firstName.toLowerCase()}.${order.customerInfo.lastName.toLowerCase()}` === customerId.toLowerCase()
  );
};

export const getRecentOrders = (days: number = 7): Order[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  return adminOrders.filter(order => order.createdAt >= cutoffDate);
};

export const getOrderStatistics = () => {
  const totalOrders = adminOrders.length;
  const totalRevenue = adminOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  
  const ordersByStatus = adminOrders.reduce((acc, order) => {
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
