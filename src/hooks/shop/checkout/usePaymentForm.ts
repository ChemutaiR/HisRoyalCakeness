import { useCallback } from 'react';
import { CheckoutFormData } from '@/types/orders/order';
import { PaymentMethod } from '@/types/shared/order';

export function usePaymentForm(updateFormData: (data: Partial<CheckoutFormData>) => void) {
  const setPaymentMethod = useCallback((paymentMethod: PaymentMethod) => updateFormData({ paymentMethod }), [updateFormData]);
  const setMpesaPhone = useCallback((mpesaPhoneNumber: string) => updateFormData({ mpesaPhoneNumber }), [updateFormData]);
  const setAgreeToTerms = useCallback((agreeToTerms: boolean) => updateFormData({ agreeToTerms }), [updateFormData]);
  const setSubscribeToNewsletter = useCallback((subscribeToNewsletter: boolean) => updateFormData({ subscribeToNewsletter }), [updateFormData]);
  return { setPaymentMethod, setMpesaPhone, setAgreeToTerms, setSubscribeToNewsletter };
}

export default usePaymentForm;


