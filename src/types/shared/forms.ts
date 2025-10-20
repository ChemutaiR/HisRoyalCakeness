// Form-related type definitions

// Form validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Generic form state
export interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
}

// Form field configuration
export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'date' | 'time' | 'datetime-local';
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  options?: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
    custom?: (value: any) => string | null;
  };
  dependencies?: string[]; // Fields that this field depends on
  conditional?: {
    field: string;
    value: any;
    operator?: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
  };
}

// Form configuration
export interface FormConfig<T> {
  fields: FormFieldConfig[];
  initialValues: T;
  validation?: {
    [K in keyof T]?: (value: T[K], formData: T) => string | null;
  };
  onSubmit: (data: T) => Promise<void> | void;
  onReset?: () => void;
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

// Form submission
export interface FormSubmission<T> {
  data: T;
  isValid: boolean;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  submitCount: number;
  lastSubmitted?: Date;
}

// Multi-step form
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: string[]; // Field names
  validation?: (data: any) => Record<string, string>;
  isOptional?: boolean;
}

export interface MultiStepFormConfig<T> {
  steps: FormStep[];
  initialValues: T;
  onSubmit: (data: T) => Promise<void> | void;
  onStepChange?: (stepId: string, data: T) => void;
  allowStepNavigation?: boolean;
  showProgress?: boolean;
  showStepNumbers?: boolean;
}

// Dynamic form
export interface DynamicFormField extends FormFieldConfig {
  id: string;
  group?: string;
  order?: number;
  visible?: boolean;
  conditional?: {
    field: string;
    value: any;
    operator?: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
  };
}

export interface DynamicFormConfig<T> {
  fields: DynamicFormField[];
  initialValues: T;
  groups?: Array<{
    id: string;
    title: string;
    description?: string;
    fields: string[];
    collapsible?: boolean;
    defaultCollapsed?: boolean;
  }>;
  onSubmit: (data: T) => Promise<void> | void;
  onFieldChange?: (fieldName: string, value: any, formData: T) => void;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

// Form hooks return types
export interface UseFormReturn<T> {
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string) => void;
  setErrors: (errors: Record<keyof T, string>) => void;
  clearError: (field: keyof T) => void;
  clearErrors: () => void;
  reset: () => void;
  submit: () => Promise<void>;
  validate: () => boolean;
  validateField: (field: keyof T) => boolean;
}

export interface UseMultiStepFormReturn<T> {
  currentStep: number;
  totalSteps: number;
  currentStepId: string;
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isValid: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goNext: () => void;
  goPrevious: () => void;
  goToStep: (step: number) => void;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  setError: (field: keyof T, error: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}
