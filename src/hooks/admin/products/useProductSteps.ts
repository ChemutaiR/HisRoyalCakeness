"use client";

import { useState, useCallback } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface UseProductStepsProps {
  steps: Step[];
  initialStep?: number;
  validateStep?: (step: number) => boolean;
}

/**
 * Hook for managing multi-step form navigation
 */
export function useProductSteps({
  steps,
  initialStep = 1,
  validateStep,
}: UseProductStepsProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleNext = useCallback(() => {
    if (validateStep && !validateStep(currentStep)) {
      return false;
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
    return true;
  }, [currentStep, steps.length, validateStep]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  return {
    currentStep,
    steps,
    handleNext,
    handlePrevious,
    goToStep,
    isFirstStep,
    isLastStep,
  };
}

