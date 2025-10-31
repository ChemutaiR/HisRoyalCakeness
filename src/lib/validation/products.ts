/**
 * Product Form Validation Schemas
 * 
 * Zod validation schemas for product forms
 */

import { z } from 'zod';

/**
 * Price point validation schema
 */
export const priceSchema = z.object({
  weight: z.string().min(1, 'Weight is required'),
  amount: z.number().min(0, 'Amount must be 0 or greater'),
  servings: z.number().min(1, 'Servings must be at least 1').int('Servings must be a whole number'),
});

/**
 * Product form validation schema
 */
export const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Product name must be less than 200 characters'),
  description: z.string().min(1, 'Product description is required').max(1000, 'Description must be less than 1000 characters'),
  images: z.array(z.string().min(1, 'Image path cannot be empty')).min(1, 'At least one image is required'),
  prices: z.array(priceSchema).min(1, 'At least one price is required'),
  whippingCreamOptions: z.array(z.string()).optional(),
  defaultCreamIndex: z.number().int().optional(),
  isActive: z.boolean().optional().default(true),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

/**
 * Validate product form data
 */
export function validateProductForm(data: Partial<ProductFormData>): { isValid: boolean; errors: Record<string, string> } {
  try {
    productFormSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err: z.ZodIssue) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { _form: 'Validation failed' } };
  }
}

