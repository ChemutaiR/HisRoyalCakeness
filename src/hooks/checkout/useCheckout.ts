// Custom hook for checkout operations

import { useCallback, useMemo } from 'react';
import { useCheckoutStore } from '@/store/slices/checkout/checkout';
import { useCartStore } from '@/store/slices/shop/cart';
import { CheckoutFormData, TimeSlot, OrderConfirmation } from '@/types/shop/cart/checkout';
// import { CartItem, CustomLoafItem } from '@/types/shop/cart';
import { Address } from '@/types/shared/order';
import { CheckoutService } from '@/services/checkout/checkout';

export function useCheckout() {
  const {
    // State
    step,
    formData,
    paymentInfo,
    deliveryInfo,
    isLoading,
    error,
    
    // Actions
    setStep,
    updateFormData,
    setPaymentInfo,
    setDeliveryInfo,
    setLoading,
    setError,
    clearError,
    resetCheckout,
    
    // Async actions
    getAvailableTimeSlots,
    isDateAvailable,
    getBusinessHours,
    calculateDeliveryFee,
    getPaymentMethods,
    createOrder,
    
    // Computed state
    isFormValid,
    getFormErrors
  } = useCheckoutStore();

  const { items, customLoafItems, totalPrice, totalItems } = useCartStore();

  // Navigation helpers
  const goToNextStep = useCallback(() => {
    const steps: Array<typeof step> = ['delivery', 'payment', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step, setStep]);

  const goToPreviousStep = useCallback(() => {
    const steps: Array<typeof step> = ['delivery', 'payment', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step, setStep]);

  const goToStep = useCallback((targetStep: typeof step) => {
    setStep(targetStep);
  }, [setStep]);

  // Form data helpers
  const updateCustomerInfo = useCallback((data: Partial<Pick<CheckoutFormData, 'firstName' | 'lastName' | 'email' | 'phone'>>) => {
    updateFormData(data);
  }, [updateFormData]);

  const updateDeliveryInfo = useCallback((data: Partial<Pick<CheckoutFormData, 'deliveryAddress' | 'deliveryDate' | 'deliveryTime' | 'specialInstructions'>>) => {
    updateFormData(data);
  }, [updateFormData]);


  const updatePaymentInfo = useCallback((data: Partial<Pick<CheckoutFormData, 'paymentMethod' | 'agreeToTerms' | 'subscribeToNewsletter'>>) => {
    updateFormData(data);
  }, [updateFormData]);

  // Time slot management
  const fetchTimeSlots = useCallback(async (date: string): Promise<TimeSlot[]> => {
    try {
      clearError();
      return await getAvailableTimeSlots(date);
    } catch (error) {
      // console.error('Error fetching time slots:', error);
      throw error;
    }
  }, [getAvailableTimeSlots, clearError]);

  const checkDateAvailability = useCallback(async (date: string): Promise<boolean> => {
    try {
      clearError();
      return await isDateAvailable(date);
    } catch (error) {
      // console.error('Error checking date availability:', error);
      throw error;
    }
  }, [isDateAvailable, clearError]);

  const fetchBusinessHours = useCallback(async (date: string) => {
    try {
      clearError();
      return await getBusinessHours(date);
    } catch (error) {
      // console.error('Error fetching business hours:', error);
      throw error;
    }
  }, [getBusinessHours, clearError]);

  // Delivery fee calculation
  const calculateDelivery = useCallback(async (address: Address): Promise<number> => {
    try {
      clearError();
      const fee = await calculateDeliveryFee(totalPrice, address);
      return fee;
    } catch (error) {
      // console.error('Error calculating delivery fee:', error);
      throw error;
    }
  }, [calculateDeliveryFee, totalPrice, clearError]);

  // Payment methods
  const fetchPaymentMethods = useCallback(async () => {
    try {
      clearError();
      return await getPaymentMethods();
    } catch (error) {
      // console.error('Error fetching payment methods:', error);
      throw error;
    }
  }, [getPaymentMethods, clearError]);

  // Order creation
  const submitOrder = useCallback(async (): Promise<OrderConfirmation> => {
    try {
      clearError();
      
      if (!formData.deliveryAddress) {
        throw new Error('Delivery address is required');
      }

      const orderData = {
        customerInfo: formData as CheckoutFormData,
        items,
        customLoafItems,
        subtotal: totalPrice,
        deliveryFee: deliveryInfo?.deliveryFee || 0,
        total: totalPrice + (deliveryInfo?.deliveryFee || 0)
      };

      const orderConfirmation = await createOrder(orderData);
      return orderConfirmation;
    } catch (error) {
      // console.error('Error creating order:', error);
      throw error;
    }
  }, [formData, items, customLoafItems, totalPrice, deliveryInfo, createOrder, clearError]);

  // Computed values
  const currentStepErrors = useMemo(() => getFormErrors(step), [getFormErrors, step]);
  const isCurrentStepValid = useMemo(() => isFormValid(step), [isFormValid, step]);
  
  const canProceedToNext = useMemo(() => {
    return isCurrentStepValid && !isLoading;
  }, [isCurrentStepValid, isLoading]);

  const canGoBack = useMemo(() => {
    return step !== 'delivery' && step !== 'confirmation';
  }, [step]);

  const progressPercentage = useMemo(() => {
    const steps: Array<typeof step> = ['delivery', 'payment', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(step);
    return Math.round((currentIndex / (steps.length - 1)) * 100);
  }, [step]);

  const stepTitles = useMemo(() => ({
    delivery: 'Delivery Details',
    payment: 'Payment Method',
    review: 'Order Review',
    confirmation: 'Order Confirmation'
  }), []);

  const stepDescriptions = useMemo(() => ({
    delivery: 'Where should we deliver your order?',
    payment: 'How would you like to pay?',
    review: 'Review your order before payment',
    confirmation: 'Your order has been placed successfully'
  }), []);

  // Available dates for scheduling
  const availableDates = useMemo(() => {
    return CheckoutService.getNextAvailableDates(14);
  }, []);

  // Order summary
  const orderSummary = useMemo(() => {
    const subtotal = totalPrice;
    const deliveryFee = deliveryInfo?.deliveryFee || 0;
    const total = subtotal + deliveryFee;

    return {
      subtotal,
      deliveryFee,
      total,
      itemCount: totalItems,
      items: [
        ...items.map(item => ({
          name: item.cake.name,
          quantity: item.quantity,
          price: item.totalPrice * item.quantity,
          customization: {
            size: item.customization.selectedSize?.size,
            cream: item.customization.selectedCream?.name,
            decorations: item.customization.selectedDecorations?.map(d => d.name).join(', ') || 'None',
            notes: item.customization.customNotes || 'None'
          }
        })),
        ...customLoafItems.map(item => ({
          name: `Custom Loaf - ${item.cakeSelection.flavor.name}`,
          quantity: item.quantity,
          price: (item.cakeSelection.price + (item.cakeSelection.whippingCream?.price || 0) + (item.cakeSelection.topping?.price || 0)) * item.quantity,
          customization: {
            flavor: item.cakeSelection.flavor.name,
            cream: item.cakeSelection.whippingCream?.name || 'None',
            topping: item.cakeSelection.topping?.name || 'None',
            notes: item.customNotes || 'None'
          }
        }))
      ]
    };
  }, [totalPrice, deliveryInfo, totalItems, items, customLoafItems]);

  return {
    // State
    step,
    formData,
    paymentInfo,
    deliveryInfo,
    isLoading,
    error,
    
    // Navigation
    goToNextStep,
    goToPreviousStep,
    goToStep,
    canProceedToNext,
    canGoBack,
    progressPercentage,
    
    // Step info
    stepTitles,
    stepDescriptions,
    currentStepErrors,
    isCurrentStepValid,
    
    // Form updates
    updateCustomerInfo,
    updateDeliveryInfo,
    updatePaymentInfo,
    updateFormData,
    
    // Async operations
    fetchTimeSlots,
    checkDateAvailability,
    fetchBusinessHours,
    calculateDelivery,
    fetchPaymentMethods,
    submitOrder,
    
    // Computed values
    availableDates,
    orderSummary,
    
    // Actions
    setPaymentInfo,
    setDeliveryInfo,
    setLoading,
    setError,
    clearError,
    resetCheckout
  };
}
