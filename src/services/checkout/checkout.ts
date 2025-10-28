// Checkout service layer for API operations

import { mockCheckoutOperations } from '@/mockDatabase/admin/services/checkoutCompatibilityService';
import { CheckoutFormData, OrderConfirmation, TimeSlot } from '@/types/shop/cart/checkout';
import { CartItem, CustomLoafItem } from '@/types/shop/cart';
import { Address } from '@/types/shared/order';

export class CheckoutService {
  // Get available time slots for cake scheduling
  static async getAvailableTimeSlots(date: string): Promise<TimeSlot[]> {
    try {
      return await mockCheckoutOperations.getAvailableTimeSlots(date);
    } catch (error) {
      // console.error('Error fetching time slots:', error);
      throw new Error('Failed to fetch available time slots');
    }
  }

  // Check if a date is available for scheduling
  static async isDateAvailable(date: string): Promise<boolean> {
    try {
      return await mockCheckoutOperations.isDateAvailable(date);
    } catch (error) {
      // console.error('Error checking date availability:', error);
      throw new Error('Failed to check date availability');
    }
  }

  // Get business hours for a specific day
  static async getBusinessHours(date: string) {
    try {
      return await mockCheckoutOperations.getBusinessHours(date);
    } catch (error) {
      // console.error('Error fetching business hours:', error);
      throw new Error('Failed to fetch business hours');
    }
  }

  // Calculate delivery fee based on subtotal and address
  static async calculateDeliveryFee(subtotal: number, address: Address): Promise<number> {
    try {
      return await mockCheckoutOperations.calculateDeliveryFee(subtotal, address);
    } catch (error) {
      // console.error('Error calculating delivery fee:', error);
      throw new Error('Failed to calculate delivery fee');
    }
  }

  // Get available payment methods
  static async getPaymentMethods() {
    try {
      return await mockCheckoutOperations.getPaymentMethods();
    } catch (error) {
      // console.error('Error fetching payment methods:', error);
      throw new Error('Failed to fetch payment methods');
    }
  }

  // Validate checkout form data
  static validateCheckoutForm(formData: Partial<CheckoutFormData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Customer Information Validation
    if (!formData.firstName?.trim()) {
      errors.push('First name is required');
    }
    if (!formData.lastName?.trim()) {
      errors.push('Last name is required');
    }
    if (!formData.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    if (!formData.phone?.trim()) {
      errors.push('Phone number is required');
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      errors.push('Please enter a valid phone number');
    }

    // Delivery Information Validation
    if (!formData.deliveryAddress?.street?.trim()) {
      errors.push('Street address is required');
    }
    if (!formData.deliveryDate?.trim()) {
      errors.push('Delivery date is required');
    }
    if (!formData.deliveryTime?.trim()) {
      errors.push('Delivery time is required');
    }

    // Payment Method Validation
    if (!formData.paymentMethod) {
      errors.push('Payment method is required');
    }

    // Terms and Conditions
    if (!formData.agreeToTerms) {
      errors.push('You must agree to the terms and conditions');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Create order
  static async createOrder(orderData: {
    customerInfo: CheckoutFormData;
    items: CartItem[];
    customLoafItems: CustomLoafItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }): Promise<OrderConfirmation> {
    try {
      // Validate form data
      const validation = this.validateCheckoutForm(orderData.customerInfo);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Map form data to expected payload shape for compatibility service
      const payload = {
        customerInfo: {
          firstName: orderData.customerInfo.firstName,
          lastName: orderData.customerInfo.lastName,
          email: orderData.customerInfo.email,
          phone: orderData.customerInfo.phone,
        },
        deliveryInfo: {
          address: orderData.customerInfo.deliveryAddress,
          date: orderData.customerInfo.deliveryDate,
          time: orderData.customerInfo.deliveryTime,
          specialInstructions: orderData.customerInfo.specialInstructions,
        },
        paymentInfo: {
          method: String(orderData.customerInfo.paymentMethod),
        },
        items: orderData.items,
        customLoafItems: orderData.customLoafItems,
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        total: orderData.total,
      };

      // Create order
      const orderConfirmation = await mockCheckoutOperations.createOrder(payload);
      
      return orderConfirmation;
    } catch (error) {
      // console.error('Error creating order:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to create order');
    }
  }

  // Get order by ID
  static async getOrderById(orderId: string) {
    try {
      return await mockCheckoutOperations.getOrderById(orderId);
    } catch (error) {
      // console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }

  // Get order by order number
  static async getOrderByNumber(orderNumber: string) {
    try {
      return await mockCheckoutOperations.getOrderByNumber(orderNumber);
    } catch (error) {
      // console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }

  // Update order status
  static async updateOrderStatus(orderId: string, status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled') {
    try {
      return await mockCheckoutOperations.updateOrderStatus(orderId, status);
    } catch (error) {
      // console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  // Get all orders (for admin)
  static async getAllOrders() {
    try {
      return await mockCheckoutOperations.getAllOrders();
    } catch (error) {
      // console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  // Calculate order totals
  static calculateOrderTotals(
    items: CartItem[],
    customLoafItems: CustomLoafItem[],
    deliveryFee: number = 0
  ): {
    subtotal: number;
    deliveryFee: number;
    total: number;
  } {
    const itemsSubtotal = items.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
    const customLoafSubtotal = customLoafItems.reduce((sum, item) => {
      const basePrice = item.cakeSelection.price;
      const creamPrice = item.cakeSelection.whippingCream?.price || 0;
      const toppingPrice = item.cakeSelection.topping?.price || 0;
      return sum + (basePrice + creamPrice + toppingPrice) * item.quantity;
    }, 0);

    const subtotal = itemsSubtotal + customLoafSubtotal;
    const total = subtotal + deliveryFee;

    return {
      subtotal,
      deliveryFee,
      total
    };
  }

  // Format phone number for display
  static formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format as Kenyan phone number
    if (digits.startsWith('254')) {
      return `+${digits}`;
    } else if (digits.startsWith('0')) {
      return `+254${digits.substring(1)}`;
    } else if (digits.length === 9) {
      return `+254${digits}`;
    }
    
    return phone; // Return original if can't format
  }

  // Format address for display
  static formatAddress(address: Address): string {
    const parts = [
      address.street,
      address.country,
      address.directions
    ].filter(Boolean) as string[];
    
    return parts.join(', ');
  }

  // Get next available dates for scheduling
  static getNextAvailableDates(days: number = 14): string[] {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 1; i <= days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const isWeekend = dayOfWeek === 'saturday' || dayOfWeek === 'sunday';
      
      // Only include weekdays for now (can be configured)
      if (!isWeekend) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  }
}
