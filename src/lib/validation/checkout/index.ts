import { z } from 'zod';
import { deliveryValidationSchema } from './delivery';
import { paymentValidationSchema } from './payment';

// Combined validation schema for the entire checkout form
export const checkoutValidationSchema = z.object({
  // Delivery step
  ...deliveryValidationSchema.shape,
  
  // Payment step
  ...paymentValidationSchema.shape,
});

// Step-specific validation schemas
export const stepValidationSchemas = {
  delivery: deliveryValidationSchema,
  payment: paymentValidationSchema,
  review: z.object({}), // Review step has no validation
  confirmation: z.object({}), // Confirmation step has no validation
} as const;

// Validation function for each step
export const validateStep = (step: keyof typeof stepValidationSchemas, data: any) => {
  const schema = stepValidationSchemas[step];
  if (!schema) {
    return { success: true, data, errors: [] };
  }
  
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      data,
      errors: [{ field: 'general', message: 'Validation failed' }],
    };
  }
};

// Get field errors for a specific step
export const getStepFieldErrors = (step: keyof typeof stepValidationSchemas, data: any) => {
  try {
    const result = validateStep(step, data);
    if (result.success || !result.errors) return [];
    
    return result.errors.map(err => err.message);
  } catch (err: any) {
    // console.error('Error in getStepFieldErrors:', err);
    return [];
  }
};

// Check if a step is valid
export const isStepValid = (step: keyof typeof stepValidationSchemas, data: any) => {
  try {
    return validateStep(step, data).success;
  } catch (err: any) {
    // console.error('Error in isStepValid:', err);
    return false;
  }
};

// Export individual schemas
export { deliveryValidationSchema } from './delivery';
export { paymentValidationSchema } from './payment';

// Export types
export type { DeliveryFormData } from './delivery';
export type { PaymentFormData } from './payment';
