'use client';

import { useState, useEffect } from 'react';
import { useCheckoutSessionStore } from '@/store/slices/checkout/session';
import { useOrdersStore } from '@/store/slices/orders/orders';
import { useCart } from '@/hooks/shop/useCart';
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary';
import { CheckCircle, Circle, ArrowLeft, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { Address } from '@/types/shared/order';
import { DeliveryZoneSelector } from '@/components/checkout/DeliveryZoneSelector';
import { getDeliveryZones, getDeliveryZoneById } from '@/mockDatabase/shop/deliveryZones';
import { PaymentMethod } from '@/types/shared/order';
import { validateStep, getStepFieldErrors, isStepValid } from '@/lib/validation/checkout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paymentService } from '@/services/checkout/payment';
import { orderService } from '@/services/admin/orders';
import { CreateOrderRequest } from '@/types/orders/order';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 'delivery', name: 'Delivery Address', icon: MapPin },
  { id: 'payment', name: 'Payment Method', icon: CreditCard },
  { id: 'review', name: 'Review Order', icon: CheckCircle },
  { id: 'confirmation', name: 'Confirmation', icon: CheckCircle },
];

export default function CheckoutPage() {
  const _router = useRouter();
  
  // Checkout session store (sessionStorage)
  const {
    formData,
    currentStep: step,
    progress,
    updateFormData,
    setCurrentStep,
    clearSession: _clearSession,
    resetToStep: _resetToStep
  } = useCheckoutSessionStore();
  
  // Orders store (localStorage)
  const {
    addOrder,
    setCurrentOrder,
    clearCurrentOrder: _clearCurrentOrder,
    currentOrder
  } = useOrdersStore();

  const { 
    items, 
    customLoafItems,
    totalItems, 
    isLoading: isCartLoading, 
    error: cartError, 
    subtotal, 
    clearCart 
  } = useCart();
  
  // Calculate delivery fee based on selected zone
  const selectedZone = formData.deliveryZone ? getDeliveryZoneById(formData.deliveryZone) : null;
  const zoneDeliveryFee = selectedZone?.deliveryFee || 0;
  // Only calculate delivery fee if a zone is selected, otherwise return null
  const calculatedDeliveryFee = selectedZone ? zoneDeliveryFee : null;
  const total = subtotal + (calculatedDeliveryFee || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [_availableTimeSlots, _setAvailableTimeSlots] = useState<any[]>([]);
  const [_businessHours, _setBusinessHours] = useState<any>(null);
  const [deliveryZones] = useState(() => getDeliveryZones());

  // Navigation functions
  const goToNextStep = () => {
    const stepOrder = ['delivery', 'payment', 'review', 'confirmation'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1] as any);
    }
  };

  const goToPreviousStep = () => {
    const stepOrder = ['delivery', 'payment', 'review', 'confirmation'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1] as any);
    }
  };

  // Computed values using Zod validation
  const _currentStepErrors = getStepFieldErrors(step as any, formData);
  const isCurrentStepValid = isStepValid(step as any, formData);
  const canProceedToNext = isCurrentStepValid;
  const canGoBack = step !== 'delivery';
  const progressPercentage = progress;
  
  const stepTitles = {
    delivery: 'Delivery Address', 
    payment: 'Payment Method',
    review: 'Review Your Order',
    confirmation: 'Order Confirmed!',
  };
  
  const stepDescriptions = {
    delivery: 'Where should we deliver your delicious cake?',
    payment: 'How would you like to pay?',
    review: 'Almost there! Please review your order details.',
    confirmation: 'Thank you for your order!',
  };

  const cartSummary = {
    subtotal,
    deliveryFee: calculatedDeliveryFee || 0,
    total,
    totalItems,
  };

  // Helper function to get field-specific errors
  const getFieldError = (fieldName: string) => {
    const result = validateStep(step as any, formData);
    if (result.success) return '';
    
    const fieldError = result.errors.find((err: any) => err.field === fieldName);
    return fieldError?.message || '';
  };

  // Initialize checkout session on mount
  useEffect(() => {
    // Session is automatically managed by the store
  }, []);

  useEffect(() => {
    if (totalItems === 0 && step !== 'confirmation') {
      // Redirect to cart if empty, unless already on confirmation page
      // router.replace('/shop/cart'); // Assuming you have a router
    }
  }, [totalItems, step]);

  // Remove scheduling logic as it's no longer needed

  const handleNext = async () => {
    if (step === 'review') {
      await handlePlaceOrder();
    } else {
      goToNextStep();
    }
  };

  const handlePlaceOrder = async () => {
    // console.log('Starting order placement...');
    setIsSubmitting(true);
    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // Step 1: Process payment
      // console.log('Processing payment...', {
      //   phoneNumber: formData.mpesaPhoneNumber,
      //   amount: Math.round(subtotal * 0.5),
      //   subtotal
      // });
      
      const paymentResult = await paymentService.processMpesaPayment({
        phoneNumber: formData.mpesaPhoneNumber || '',
        amount: Math.round(subtotal * 0.5), // 50% of cake cost
        orderId: '', // Will be generated
      });

      // console.log('Payment result:', paymentResult);

      if (!paymentResult.success) {
        setPaymentError(paymentResult.error || 'Payment failed. Please try again.');
        return;
      }

      // Step 2: Create order
      // console.log('Creating order with data:', {
      //   items: items.length,
      //   subtotal,
      //   deliveryFee: calculatedDeliveryFee,
      //   total
      // });
      
      const orderRequest: CreateOrderRequest = {
        customerInfo: {
          firstName: 'Customer',
          lastName: 'User',
          email: 'customer@example.com',
          phone: formData.mpesaPhoneNumber || '',
        },
        deliveryInfo: {
          zone: {
            id: formData.deliveryZone || '',
            name: selectedZone?.name || '',
            deliveryFee: calculatedDeliveryFee || 0,
          },
          address: {
            street: formData.deliveryAddress?.street || '',
            directions: formData.deliveryAddress?.directions || '',
            country: formData.deliveryAddress?.country || 'Kenya',
          },
          date: formData.deliveryDate || '',
          time: formData.deliveryTime || '',
          specialInstructions: formData.specialInstructions || '',
        },
        paymentInfo: {
          method: 'mpesa',
          phoneNumber: formData.mpesaPhoneNumber || '',
          amountPaid: Math.round(subtotal * 0.5),
          amountRemaining: Math.round(subtotal * 0.5) + (calculatedDeliveryFee || 0),
          status: 'partial',
          transactionId: '',
        },
        items: items.map(item => ({
          id: item.id,
          cakeId: item.cake.id,
          cakeName: item.cake.name,
          cakeImage: item.cake.image,
          quantity: item.quantity,
          unitPrice: item.cake.prices?.[0]?.amount || 0,
          totalPrice: item.totalPrice,
          customization: {
            selectedSize: item.customization.selectedSize ? {
              size: item.customization.selectedSize.size,
              price: item.customization.selectedSize.price,
              servings: item.customization.selectedSize.servings,
            } : undefined,
            selectedCream: item.customization.selectedCream ? {
              name: item.customization.selectedCream.name,
              price: item.customization.selectedCream.price,
              available: item.customization.selectedCream.available,
            } : undefined,
            selectedContainerType: item.customization.selectedContainerType ? {
              name: item.customization.selectedContainerType.name,
              value: item.customization.selectedContainerType.value,
            } : undefined,
            selectedDecorations: item.customization.selectedDecorations?.map(d => ({
              id: d.id,
              name: d.name,
              price: d.price,
            })) || [],
            customNotes: item.customization.customNotes,
            uploadedImages: item.customization.uploadedImages,
          },
        })),
        customLoafItems: customLoafItems.map(item => ({
          id: item.id,
          cakeSelection: item.cakeSelection,
          customNotes: item.customNotes,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          addedAt: item.addedAt,
        })),
        subtotal,
        deliveryFee: calculatedDeliveryFee || 0,
        total,
        notes: `Order placed via checkout. Payment transaction: ${paymentResult.transactionId}`,
      };

      const createdOrder = await orderService.createOrder(orderRequest);
      // console.log('Order created successfully:', createdOrder);

      // Step 3: Update payment info with transaction ID
      await orderService.updatePaymentInfo(
        createdOrder.id,
        paymentResult.transactionId!,
        'partial'
      );

      // Step 4: Store order in centralized state
      addOrder(createdOrder);
      setCurrentOrder(createdOrder);

      // Step 5: Update form data with order details for confirmation
      updateFormData({
        orderNumber: createdOrder.orderNumber,
        transactionId: paymentResult.transactionId!,
      });

      // Step 6: Clear cart
      await clearCart();

      // Step 7: Go to confirmation step to show success message
      goToNextStep();

    } catch (error) {
      // console.error('Order placement error:', error);
      setPaymentError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsProcessingPayment(false);
    }
  };

  // Remove outdated date change handler

  const handleDeliveryDateChange = (date: Date | null) => {
    if (date) {
      updateFormData({ deliveryDate: format(date, 'yyyy-MM-dd') });
    } else {
      updateFormData({ deliveryDate: '' });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'delivery':
        return (
          <div className="space-y-6">
            {/* Delivery Zone Selection */}
            <DeliveryZoneSelector
              zones={deliveryZones}
              selectedZoneId={formData.deliveryZone}
              onZoneSelect={(zoneId) => updateFormData({ deliveryZone: zoneId })}
              error={getFieldError('deliveryZone')}
            />
            
            {/* Street Address */}
            <div className="space-y-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                id="street"
                placeholder="Enter your street address"
                value={formData.deliveryAddress?.street || ''}
                onChange={(e) => updateFormData({ deliveryAddress: { ...formData.deliveryAddress as Address, street: e.target.value } })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  getFieldError('deliveryAddress.street') 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#c7b8ea]'
                }`}
              />
              {getFieldError('deliveryAddress.street') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryAddress.street')}</p>
              )}
            </div>
            <div>
              <label htmlFor="directions" className="block text-sm font-medium text-gray-700 mb-1">Directions/Landmarks (Optional)</label>
              <textarea
                id="directions"
                placeholder="Describe nearby landmarks, building names, or specific directions to help us find you"
                value={formData.deliveryAddress?.directions || ''}
                onChange={(e) => updateFormData({ deliveryAddress: { ...formData.deliveryAddress as Address, directions: e.target.value } })}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  getFieldError('deliveryAddress.directions') 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#c7b8ea]'
                }`}
              ></textarea>
              {getFieldError('deliveryAddress.directions') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryAddress.directions')}</p>
              )}
            </div>
               {/* Delivery Date */}
              <div>
                <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                <DatePicker
                  selected={formData.deliveryDate ? parseISO(formData.deliveryDate) : null}
                  onChange={handleDeliveryDateChange}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                  placeholderText="Pick delivery date"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    getFieldError('deliveryDate') 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-[#c7b8ea]'
                  }`}
                />
                {getFieldError('deliveryDate') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryDate')}</p>
                )}
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">Why we need advance notice</p>
                      <p className="text-blue-800">
                        We require at least 24 hours notice to ensure your cake is freshly baked with the finest ingredients and crafted to perfection. This allows us to deliver the exceptional quality you deserve.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
              <Select
                value={formData.deliveryTime || ''}
                onValueChange={(value) => updateFormData({ deliveryTime: value })}
              >
                <SelectTrigger className={`w-full ${
                  getFieldError('deliveryTime') 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#c7b8ea]'
                }`}>
                  <SelectValue placeholder="Select delivery time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="17:00">5:00 PM</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                </SelectContent>
              </Select>
              {getFieldError('deliveryTime') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('deliveryTime')}</p>
              )}
            </div>
            <div>
              <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
              <textarea
                id="specialInstructions"
                placeholder="Any special delivery instructions or notes"
                value={formData.specialInstructions || ''}
                onChange={(e) => updateFormData({ specialInstructions: e.target.value })}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  getFieldError('specialInstructions') 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#c7b8ea]'
                }`}
              ></textarea>
              {getFieldError('specialInstructions') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('specialInstructions')}</p>
              )}
            </div>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-6">
               {/* Payment Terms Card */}
               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                 <div className="flex items-start space-x-3">
                   <div className="flex-shrink-0">
                     <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                   </div>
                   <div>
                     <h3 className="text-sm font-medium text-blue-900 mb-2">Payment Terms</h3>
                     <div className="text-sm text-blue-800 space-y-1">
                       <p>• Pay <strong>50% of cake cost (KES {Math.round(cartSummary.subtotal * 0.5).toLocaleString()})</strong> now to secure your order</p>
                       <p>• Pay the remaining <strong>50% (KES {Math.round(cartSummary.subtotal * 0.5).toLocaleString()}) + delivery fee (KES {(cartSummary.deliveryFee || 0).toLocaleString()})</strong> when your cake is ready for dispatch</p>
                       <p>• Your cake will <strong>not be dispatched</strong> until full payment is completed</p>
                     </div>
                   </div>
                 </div>
               </div>

            {/* M-Pesa Payment Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div className="space-y-4">
                {/* M-Pesa Option */}
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={formData.paymentMethod === 'mpesa'}
                      onChange={(e) => updateFormData({ paymentMethod: e.target.value as PaymentMethod })}
                      className="text-[#c7b8ea] focus:ring-[#c7b8ea]"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 flex items-center space-x-2">
                        <span>M-Pesa</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Pay securely with M-Pesa mobile money
                      </div>
                    </div>
                  </div>
                </div>

                   {/* M-Pesa Phone Number */}
                   {formData.paymentMethod === 'mpesa' && (
                     <div className="ml-6">
                       <div>
                         <label htmlFor="mpesaPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                           M-Pesa Phone Number
                         </label>
                         <input
                           type="tel"
                           id="mpesaPhoneNumber"
                           placeholder="Enter your M-Pesa registered phone number"
                           value={formData.mpesaPhoneNumber || ''}
                           onChange={(e) => updateFormData({ mpesaPhoneNumber: e.target.value })}
                           className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                             getFieldError('mpesaPhoneNumber') 
                               ? 'border-red-300 focus:ring-red-500' 
                               : 'border-gray-300 focus:ring-[#c7b8ea]'
                           }`}
                         />
                         {getFieldError('mpesaPhoneNumber') && (
                           <p className="mt-1 text-sm text-red-600">{getFieldError('mpesaPhoneNumber')}</p>
                         )}
                         <p className="text-xs text-gray-500 mt-1">
                           Enter the phone number registered with your M-Pesa account
                         </p>
                       </div>
                     </div>
                   )}
              </div>
              {getFieldError('paymentMethod') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('paymentMethod')}</p>
              )}
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms || false}
                  onChange={(e) => updateFormData({ agreeToTerms: e.target.checked })}
                  className={`rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea] ${
                    getFieldError('agreeToTerms') ? 'border-red-300' : ''
                  }`}
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm font-medium text-gray-700">
                  I agree to the <Link href="/terms" className="text-[#c7b8ea] hover:underline">terms and conditions</Link>
                </label>
              </div>
              {getFieldError('agreeToTerms') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('agreeToTerms')}</p>
              )}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribeToNewsletter"
                  checked={formData.subscribeToNewsletter || false}
                  onChange={(e) => updateFormData({ subscribeToNewsletter: e.target.checked })}
                  className="rounded border-gray-300 text-[#c7b8ea] focus:ring-[#c7b8ea]"
                />
                <label htmlFor="subscribeToNewsletter" className="ml-2 text-sm font-medium text-gray-700">
                  Subscribe to our newsletter
                </label>
              </div>
            </div>
          </div>
        );
      case 'review':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {/* Delivery Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 text-[#c7b8ea] mr-2" />
                  Delivery Information
                </h3>
                <div className="space-y-2 pl-7">
                  <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {formData.deliveryAddress?.street}</p>
                  {formData.deliveryAddress?.directions && <p className="text-sm text-gray-600"><span className="font-medium">Directions:</span> {formData.deliveryAddress.directions}</p>}
                  <p className="text-sm text-gray-600"><span className="font-medium">Date:</span> {formData.deliveryDate ? new Date(formData.deliveryDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not selected'}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Time:</span> {formData.deliveryTime}</p>
                  {formData.specialInstructions && <p className="text-sm text-gray-600"><span className="font-medium">Instructions:</span> {formData.specialInstructions}</p>}
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 text-[#c7b8ea] mr-2" />
                  Payment Information
                </h3>
                <div className="space-y-2 pl-7">
                  <p className="text-sm text-gray-600"><span className="font-medium">Method:</span> M-Pesa</p>
                  {formData.mpesaPhoneNumber && <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {formData.mpesaPhoneNumber}</p>}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <ShoppingBag className="w-5 h-5 text-[#c7b8ea] mr-2" />
                  Order Summary
                </h3>
                <div className="pl-7">
                  <CheckoutSummary 
                    subtotal={subtotal}
                    deliveryFee={calculatedDeliveryFee}
                    total={total}
                    selectedZone={selectedZone}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'confirmation':
        // Try to get current order or find it by order number
        let orderToDisplay: any = currentOrder;
        if (!orderToDisplay && formData.orderNumber) {
          // Find order by order number from the orders list
          const { orders } = useOrdersStore.getState();
          orderToDisplay = orders.find(order => order.orderNumber === formData.orderNumber) || null;
        }
        
        if (!orderToDisplay || !orderToDisplay.items) {
          return (
            <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading order details...</p>
            </div>
          );
        }

        return (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            {/* Order Confirmed Header */}
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
              
              {/* Order Details Card */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-green-800 mb-1">Order ID</p>
                    <p className="text-lg font-semibold text-green-900">{orderToDisplay.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800 mb-1">Payment Status</p>
                    <p className="text-lg font-semibold text-green-900">50% paid via M-Pesa</p>
                    <p className="text-xs text-green-700">Transaction: {orderToDisplay.paymentInfo.transactionId || 'Processing...'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <ShoppingBag className="w-5 h-5 text-[#c7b8ea] mr-2" />
                Order Summary
              </h3>
              
              {/* Items List */}
              <div className="space-y-4 mb-6">
                {(orderToDisplay.items || []).map((item: any) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.cakeImage}
                        alt={item.cakeName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.cakeName}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Qty: {item.quantity} • Size: {item.customization.selectedSize?.size} • Cream: {item.customization.selectedCream?.name}
                      </p>
                      {item.customization.selectedDecorations && item.customization.selectedDecorations.length > 0 && (
                        <p className="text-xs text-gray-500 mb-2">
                          Decorations: {item.customization.selectedDecorations.map((d: any) => d.name).join(', ')}
                        </p>
                      )}
                      {item.customization.uploadedImages && item.customization.uploadedImages.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-700 mb-1">Design References:</p>
                          <div className="flex space-x-1">
                            {item.customization.uploadedImages.slice(0, 3).map((image: any, index: number) => (
                              <div key={index} className="relative">
                                <Image
                                  src={image}
                                  alt={`Design reference ${index + 1}`}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 object-cover rounded border border-gray-200"
                                />
                              </div>
                            ))}
                            {item.customization.uploadedImages.length > 3 && (
                              <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">+{item.customization.uploadedImages.length - 3}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        KES {(item.totalPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({(orderToDisplay.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0) + (orderToDisplay.customLoafItems?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0)} items)</span>
                    <span className="font-medium">KES {(orderToDisplay.subtotal || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">KES {(orderToDisplay.deliveryFee || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-3">
                    <span>Total</span>
                    <span>KES {(orderToDisplay.total || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 border-t pt-2">
                    <span>Paid Now (50%)</span>
                    <span>KES {Math.round((orderToDisplay.subtotal || 0) * 0.5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Remaining (50% + Delivery)</span>
                    <span>KES {(Math.round((orderToDisplay.subtotal || 0) * 0.5) + (orderToDisplay.deliveryFee || 0)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/shop/catalog"
                className="inline-flex items-center px-6 py-3 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link 
                href="/admin/orders"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View in Admin Panel
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isCartLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 leading-relaxed">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 tracking-wide mb-4">Error Loading Cart</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{cartError}</p>
          <Link
            href="/shop/cart"
            className="inline-flex items-center px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  if (totalItems === 0 && step !== 'confirmation') {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-medium text-gray-800 tracking-wide mb-0.5 text-left w-full">Your Cart is Empty</h1>
          <p className="mb-8 text-sm text-gray-500 leading-relaxed w-full">Add some delicious cakes to get started!</p>
          <Link
            href="/shop/catalog"
            className="w-full bg-[#c7b8ea] text-black text-sm font-semibold py-2 rounded-full hover:bg-[#c7b8ea]/80 transition-colors shadow text-center"
          >
            Browse Cakes
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(s => s.id === step);
  const CurrentStepIcon = steps[currentStepIndex]?.icon || Circle;

  return (
    <div className="flex-1 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-medium text-gray-800 tracking-wide mb-8 text-center">Checkout</h1>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative mb-4">
            {steps.filter(s => s.id !== 'confirmation').map((s, index) => (
              <div key={s.id} className="flex-1 flex flex-col items-center">
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  s.id === step
                    ? 'border-[#c7b8ea] bg-[#c7b8ea] text-white'
                    : currentStepIndex > index
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                }`}>
                  {currentStepIndex > index ? <CheckCircle className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <p className={`text-xs mt-2 text-center ${
                  s.id === step ? 'font-semibold text-gray-800' : 'text-gray-500'
                }`}>{s.name}</p>
              </div>
            ))}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div className="h-full bg-[#c7b8ea] transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className={`grid gap-8 ${step === 'review' || step === 'confirmation' ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
          {/* Main Checkout Form */}
          <div className={`${step === 'review' || step === 'confirmation' ? 'lg:col-span-1' : 'lg:col-span-2'} ${step === 'confirmation' ? '' : 'bg-white rounded-lg shadow-md p-6'}`}>
            {step !== 'confirmation' && (
              <div className="flex items-center space-x-3 mb-6">
                <CurrentStepIcon className="w-6 h-6 text-[#c7b8ea]" />
                <div>
                  <h2 className="text-xl font-medium text-gray-800 tracking-wide">{stepTitles[step]}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{stepDescriptions[step]}</p>
                </div>
              </div>
            )}


            {paymentError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
                {paymentError}
              </div>
            )}

            {isProcessingPayment && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing payment... Please wait.</span>
                </div>
              </div>
            )}

            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {canGoBack && (
                <button
                  onClick={goToPreviousStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              {step !== 'confirmation' && (
                <button
                  onClick={handleNext}
                  disabled={!canProceedToNext || isSubmitting || isProcessingPayment}
                  className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors flex items-center space-x-2 ${
                    !canProceedToNext || isSubmitting || isProcessingPayment
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#c7b8ea] hover:bg-[#b3a4d6] text-black'
                  }`}
                >
                  {(isSubmitting || isProcessingPayment) ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  <span>
                    {step === 'review' 
                      ? (isProcessingPayment ? 'Processing Payment...' : isSubmitting ? 'Creating Order...' : 'Place Order')
                      : 'Next'
                    }
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Order Summary - Hidden for review and confirmation steps */}
          {step !== 'review' && step !== 'confirmation' && (
            <div className="lg:col-span-1">
              <CheckoutSummary 
                subtotal={subtotal}
                deliveryFee={calculatedDeliveryFee}
                total={total}
                selectedZone={selectedZone}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
