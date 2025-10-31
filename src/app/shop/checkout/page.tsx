'use client';

import { useState, useEffect } from 'react';
import { useCheckoutSessionStore } from '@/store/slices/checkout/session';
import { useOrdersStore } from '@/store/slices/orders/orders';
import { useCart } from '@/hooks/shop/useCart';
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary';
import { CheckCircle, Circle, ArrowLeft, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { getDeliveryZones, getDeliveryZoneById } from '@/mockDatabase/shop/deliveryZones';
import { validateStep, getStepFieldErrors, isStepValid } from '@/lib/validation/checkout';
import { useRouter } from 'next/navigation';
import DeliveryStep from './DeliveryStep';
import PaymentStep from './PaymentStep';
import ReviewStep from './ReviewStep';
import ConfirmationStep from './ConfirmationStep';
import { useOrderSubmission } from '@/hooks/shop/checkout/useOrderSubmission';
import { useCheckoutSteps } from '@/hooks/shop/checkout/useCheckoutSteps';

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
    resetToStep
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
  const selectedZone = formData.deliveryZone ? (getDeliveryZoneById(formData.deliveryZone) ?? null) : null;
  const zoneDeliveryFee = selectedZone?.deliveryFee || 0;
  // Only calculate delivery fee if a zone is selected, otherwise return null
  const calculatedDeliveryFee = selectedZone ? zoneDeliveryFee : null;
  const total = subtotal + (calculatedDeliveryFee || 0);
  const [deliveryZones] = useState(() => getDeliveryZones());
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [validationAttempted, setValidationAttempted] = useState(false);

  // Navigation functions
  const { goToNextStep, goToPreviousStep } = useCheckoutSteps(step as any, setCurrentStep as any);

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

  const cartSummaryFromHook = useCart().cartSummary;
  const discountAmount = cartSummaryFromHook.discountAmount;
  const cartSummary = {
    subtotal,
    deliveryFee: calculatedDeliveryFee || 0,
    total: (subtotal - discountAmount) + (calculatedDeliveryFee || 0),
    totalItems,
    discountAmount,
  };

  // Helper function to mark a field as touched
  const markFieldTouched = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  // Helper function to get field-specific errors (only show if touched or validation attempted)
  const getFieldError = (fieldName: string) => {
    // Only show errors if field has been touched or validation has been attempted
    if (!touchedFields.has(fieldName) && !validationAttempted) {
      return '';
    }
    
    const result = validateStep(step as any, formData);
    if (result.success) return '';
    
    const fieldError = result.errors.find((err: any) => err.field === fieldName);
    return fieldError?.message || '';
  };

  // Handle next step with validation
  const handleNext = () => {
    setValidationAttempted(true);
    if (isCurrentStepValid) {
      goToNextStep();
      setValidationAttempted(false);
      setTouchedFields(new Set());
    }
  };

  // Initialize checkout session on mount
  useEffect(() => {
    // If user is on confirmation step but has items in cart, reset to delivery step
    // This handles the case where user completes an order and starts a new one
    if (step === 'confirmation' && totalItems > 0) {
      resetToStep('delivery');
    }
  }, [step, totalItems, resetToStep]);

  useEffect(() => {
    if (totalItems === 0 && step !== 'confirmation') {
      // Redirect to cart if empty, unless already on confirmation page
      // router.replace('/shop/cart'); // Assuming you have a router
    }
  }, [totalItems, step]);

  // Remove scheduling logic as it's no longer needed

  const { handlePlaceOrder: handlePlaceOrderHook, isSubmitting, isProcessingPayment, paymentError, setPaymentError: _setPaymentError } = useOrderSubmission();

  const handlePlaceOrder = async () => {
    await handlePlaceOrderHook({
      items,
      customLoafItems,
        subtotal,
        deliveryFee: calculatedDeliveryFee || 0,
        total,
      formData,
      selectedZone,
      addOrder,
      setCurrentOrder,
      updateFormData,
      clearCart,
      onSuccessNext: goToNextStep,
    });
  };

  // Remove outdated date change handler

  const renderStepContent = () => {
    switch (step) {
      case 'delivery':
        return (
          <DeliveryStep
            formData={formData}
            deliveryZones={deliveryZones}
            updateFormData={updateFormData}
            getFieldError={getFieldError}
            markFieldTouched={markFieldTouched}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            formData={formData}
            cartSummary={cartSummary}
            updateFormData={updateFormData}
            getFieldError={getFieldError}
          />
        );
      case 'review':
        return (
          <ReviewStep
            formData={formData}
                    subtotal={subtotal}
                    deliveryFee={calculatedDeliveryFee}
            cartSummary={cartSummary}
                    selectedZone={selectedZone}
            discountAmount={discountAmount}
                  />
        );
      case 'confirmation':
        return (
          <ConfirmationStep
            formData={formData}
            currentOrder={currentOrder}
          />
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
                  onClick={step === 'review' ? handlePlaceOrder : handleNext}
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
                total={cartSummary.total}
                discountAmount={discountAmount}
                selectedZone={selectedZone}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
