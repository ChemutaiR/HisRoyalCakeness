// Zustand store for checkout state management

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { CheckoutFormData, CheckoutState, PaymentInfo, DeliveryInfo, TimeSlot, OrderConfirmation } from '@/types/shop/cart/checkout';
import { CartItem, CustomLoafItem } from '@/types/shop/cart';
import { Address } from '@/types/shared/order';
import { CheckoutService } from '@/services/checkout/checkout';

interface CheckoutStore extends CheckoutState {
  // Actions
  setStep: (step: CheckoutState['step']) => void;
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  setPaymentInfo: (paymentInfo: PaymentInfo) => void;
  setDeliveryInfo: (deliveryInfo: DeliveryInfo) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetCheckout: () => void;
  
  // Async actions
  getAvailableTimeSlots: (date: string) => Promise<TimeSlot[]>;
  isDateAvailable: (date: string) => Promise<boolean>;
  getBusinessHours: (date: string) => Promise<any>;
  calculateDeliveryFee: (subtotal: number, address: Address) => Promise<number>;
  getPaymentMethods: () => Promise<any[]>;
  createOrder: (orderData: {
    customerInfo: CheckoutFormData;
    items: CartItem[];
    customLoafItems: CustomLoafItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }) => Promise<OrderConfirmation>;
  
  // Computed state
  isFormValid: (step: CheckoutState['step']) => boolean;
  getFormErrors: (step: CheckoutState['step']) => string[];
}

const initialFormData: Partial<CheckoutFormData> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  deliveryZone: '',
  deliveryAddress: {
    street: '',
    directions: '',
    country: 'Kenya'
  },
  deliveryDate: '',
  deliveryTime: '',
  specialInstructions: '',
  paymentMethod: undefined,
  mpesaPhoneNumber: '',
  agreeToTerms: false,
  subscribeToNewsletter: false
};

export const useCheckoutStore = create<CheckoutStore>()(
  devtools(
    subscribeWithSelector(
      (set, get) => ({
        // Initial state
        step: 'delivery',
        formData: initialFormData,
        paymentInfo: undefined,
        deliveryInfo: undefined,
        isLoading: false,
        error: null,

        // Actions
        setStep: (step) => set({ step }),

        updateFormData: (data) => set((state) => ({
          formData: { ...state.formData, ...data }
        })),

        setPaymentInfo: (paymentInfo) => set({ paymentInfo }),

        setDeliveryInfo: (deliveryInfo) => set({ deliveryInfo }),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),

        clearError: () => set({ error: null }),

        resetCheckout: () => set({
          step: 'delivery',
          formData: initialFormData,
          paymentInfo: undefined,
          deliveryInfo: undefined,
          isLoading: false,
          error: null
        }),

        // Async actions
        getAvailableTimeSlots: async (date: string) => {
          set({ isLoading: true, error: null });
          try {
            const timeSlots = await CheckoutService.getAvailableTimeSlots(date);
            set({ isLoading: false });
            return timeSlots;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch time slots';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        isDateAvailable: async (date: string) => {
          try {
            return await CheckoutService.isDateAvailable(date);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to check date availability';
            set({ error: errorMessage });
            throw error;
          }
        },

        getBusinessHours: async (date: string) => {
          try {
            return await CheckoutService.getBusinessHours(date);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch business hours';
            set({ error: errorMessage });
            throw error;
          }
        },

        calculateDeliveryFee: async (subtotal: number, address: Address) => {
          try {
            return await CheckoutService.calculateDeliveryFee(subtotal, address);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to calculate delivery fee';
            set({ error: errorMessage });
            throw error;
          }
        },

        getPaymentMethods: async () => {
          try {
            return await CheckoutService.getPaymentMethods();
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch payment methods';
            set({ error: errorMessage });
            throw error;
          }
        },

        createOrder: async (orderData) => {
          set({ isLoading: true, error: null });
          try {
            const orderConfirmation = await CheckoutService.createOrder(orderData);
            set({ 
              paymentInfo: {
                method: orderData.customerInfo.paymentMethod,
                status: 'pending',
                amount: orderData.total,
                currency: 'KES',
                processedAt: new Date()
              },
              isLoading: false 
            });
            return orderConfirmation;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // Computed state
        isFormValid: (step) => {
          const { formData } = get();
          
          switch (step) {
            case 'delivery':
              return !!(
                formData.firstName?.trim() &&
                formData.lastName?.trim() &&
                formData.email?.trim() &&
                formData.phone?.trim() &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || '') &&
                formData.deliveryAddress?.street?.trim() &&
                formData.deliveryDate?.trim() &&
                formData.deliveryTime?.trim()
              );
            
            case 'payment':
              return !!(
                formData.paymentMethod &&
                formData.agreeToTerms
              );
            
            default:
              return false;
          }
        },

        getFormErrors: (step) => {
          const { formData } = get();
          const errors: string[] = [];
          
          switch (step) {
            case 'delivery':
              if (!formData.firstName?.trim()) errors.push('First name is required');
              if (!formData.lastName?.trim()) errors.push('Last name is required');
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
              if (!formData.deliveryAddress?.street?.trim()) errors.push('Street address is required');
              if (!formData.deliveryDate?.trim()) errors.push('Delivery date is required');
              if (!formData.deliveryTime?.trim()) errors.push('Delivery time is required');
              break;
            
            case 'payment':
              if (!formData.paymentMethod) errors.push('Payment method is required');
              if (!formData.agreeToTerms) errors.push('You must agree to the terms and conditions');
              break;
          }
          
          return errors;
        }
      })
    ),
    { name: 'checkout-store' }
  )
);
