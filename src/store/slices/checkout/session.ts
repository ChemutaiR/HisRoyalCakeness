import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import { CheckoutFormData, CheckoutStep } from '@/types/orders/order';

export interface CheckoutSessionState {
  // Session data (sessionStorage)
  formData: CheckoutFormData;
  currentStep: CheckoutStep;
  progress: number;
  startedAt: Date;
  lastUpdated: Date;
  
  // Actions
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  setCurrentStep: (step: CheckoutStep) => void;
  updateProgress: (progress: number) => void;
  clearSession: () => void;
  saveSession: () => void;
  resetToStep: (step: CheckoutStep) => void;
}

const initialFormData: CheckoutFormData = {
  deliveryZone: '',
  deliveryAddress: {
    street: '',
    directions: '',
    country: 'Kenya',
    phone: ''
  },
  deliveryDate: '',
  deliveryTime: '',
  specialInstructions: '',
  paymentMethod: 'mpesa',
  mpesaPhoneNumber: '',
  agreeToTerms: false,
  subscribeToNewsletter: false
};

export const useCheckoutSessionStore = create<CheckoutSessionState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        formData: initialFormData,
        currentStep: 'delivery',
        progress: 0,
        startedAt: new Date(),
        lastUpdated: new Date(),
        
        // Actions
        updateFormData: (data) => {
          set(state => ({
            formData: { ...state.formData, ...data },
            lastUpdated: new Date()
          }));
        },
        
        setCurrentStep: (step) => {
          set(state => ({
            currentStep: step,
            progress: getStepProgress(step),
            lastUpdated: new Date()
          }));
        },
        
        updateProgress: (progress) => {
          set({ 
            progress: Math.max(0, Math.min(100, progress)),
            lastUpdated: new Date()
          });
        },
        
        clearSession: () => {
          set({
            formData: initialFormData,
            currentStep: 'delivery',
            progress: 0,
            startedAt: new Date(),
            lastUpdated: new Date()
          });
        },
        
        saveSession: () => {
          // Session is automatically saved via persist middleware
          set({ lastUpdated: new Date() });
        },
        
        resetToStep: (step) => {
          set({
            currentStep: step,
            progress: getStepProgress(step),
            lastUpdated: new Date()
          });
        }
      }),
      {
        name: 'checkout-session-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          formData: state.formData,
          currentStep: state.currentStep,
          progress: state.progress,
          startedAt: state.startedAt,
          lastUpdated: state.lastUpdated
        })
      }
    ),
    { name: 'checkout-session-store' }
  )
);

// Helper function to calculate step progress
function getStepProgress(step: CheckoutStep): number {
  const stepProgress = {
    delivery: 25,
    payment: 50,
    review: 75,
    confirmation: 100
  };
  return stepProgress[step];
}

// Selectors for better performance
export const selectFormData = (state: CheckoutSessionState) => state.formData;
export const selectCurrentStep = (state: CheckoutSessionState) => state.currentStep;
export const selectProgress = (state: CheckoutSessionState) => state.progress;
export const selectIsSessionActive = (state: CheckoutSessionState) => 
  state.currentStep !== 'delivery' || Object.keys(state.formData).length > 0;
