import { useCallback } from 'react';
import { CheckoutFormData } from '@/types/orders/order';

export function useDeliveryForm(updateFormData: (data: Partial<CheckoutFormData>) => void) {
  const setStreet = useCallback((street: string) => updateFormData({ deliveryAddress: { street } as any }), [updateFormData]);
  const setDirections = useCallback((directions: string) => updateFormData({ deliveryAddress: { directions } as any }), [updateFormData]);
  const setZone = useCallback((deliveryZone: string) => updateFormData({ deliveryZone }), [updateFormData]);
  const setDate = useCallback((deliveryDate: string) => updateFormData({ deliveryDate }), [updateFormData]);
  const setTime = useCallback((deliveryTime: string) => updateFormData({ deliveryTime }), [updateFormData]);
  const setInstructions = useCallback((specialInstructions: string) => updateFormData({ specialInstructions }), [updateFormData]);
  return { setStreet, setDirections, setZone, setDate, setTime, setInstructions };
}

export default useDeliveryForm;


