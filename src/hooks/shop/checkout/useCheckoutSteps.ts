import { useCallback, useMemo } from 'react';
import { CheckoutStep } from '@/types/orders/order';

export function useCheckoutSteps(currentStep: CheckoutStep, setCurrentStep: (s: CheckoutStep) => void) {
  const stepOrder: CheckoutStep[] = useMemo(() => ['delivery', 'payment', 'review', 'confirmation'], []);

  const goToNextStep = useCallback(() => {
    const idx = stepOrder.indexOf(currentStep);
    if (idx >= 0 && idx < stepOrder.length - 1) {
      setCurrentStep(stepOrder[idx + 1]);
    }
  }, [currentStep, setCurrentStep, stepOrder]);

  const goToPreviousStep = useCallback(() => {
    const idx = stepOrder.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(stepOrder[idx - 1]);
    }
  }, [currentStep, setCurrentStep, stepOrder]);

  return { goToNextStep, goToPreviousStep };
}

export default useCheckoutSteps;


