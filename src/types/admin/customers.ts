// Admin customers management types

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: CustomerAddress;
  dateOfBirth?: string;
  joinDate: string;
  lastOrderDate?: string;
  status: CustomerStatus;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteProducts: string[];
  dietaryRestrictions: string[];
  allergies: string[];
  preferences: CustomerPreferences;
  isDeactivated: boolean;
  isBlacklisted: boolean;
  notes?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerStatus = 
  | 'active'
  | 'inactive'
  | 'pending'
  | 'suspended';

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  landmark?: string;
  isDefault: boolean;
}

export interface CustomerPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  marketing: {
    promotions: boolean;
    newsletters: boolean;
    newProducts: boolean;
  };
  delivery: {
    preferredTime: string;
    specialInstructions?: string;
  };
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address?: Omit<CustomerAddress, 'isDefault'>;
  dateOfBirth?: string;
  dietaryRestrictions: string[];
  allergies: string[];
  preferences: CustomerPreferences;
  notes?: string;
}

export interface CustomerFilters {
  status?: CustomerStatus;
  totalOrders?: {
    min: number;
    max: number;
  };
  totalSpent?: {
    min: number;
    max: number;
  };
  joinDate?: {
    from: string;
    to: string;
  };
  lastOrderDate?: {
    from: string;
    to: string;
  };
  isDeactivated?: boolean;
  isBlacklisted?: boolean;
  search?: string;
}

export interface CustomerActions {
  createCustomer: (data: CustomerFormData) => Promise<void>;
  updateCustomer: (id: string, data: Partial<CustomerFormData>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  deactivateCustomer: (id: string, reason: string) => Promise<void>;
  reactivateCustomer: (id: string) => Promise<void>;
  blacklistCustomer: (id: string, reason: string) => Promise<void>;
  removeFromBlacklist: (id: string) => Promise<void>;
  addNote: (id: string, note: string) => Promise<void>;
  exportCustomerData: (id: string) => Promise<void>;
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newCustomersThisMonth: number;
  customersByStatus: Record<CustomerStatus, number>;
  averageOrderValue: number;
  topSpendingCustomers: number;
  customerRetentionRate: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: CustomerSegmentCriteria;
  customerCount: number;
  createdAt: string;
}

export interface CustomerSegmentCriteria {
  totalOrders?: {
    min: number;
    max: number;
  };
  totalSpent?: {
    min: number;
    max: number;
  };
  lastOrderDate?: {
    from: string;
    to: string;
  };
  favoriteCategories?: string[];
  location?: {
    city?: string;
    state?: string;
  };
}
