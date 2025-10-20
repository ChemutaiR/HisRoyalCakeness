// Admin staff management types

export interface AdminStaff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: StaffRole;
  permissions: StaffPermissions;
  isActive: boolean;
  lastLogin?: string;
  avatar?: string;
  department?: string;
  hireDate: string;
  salary?: number;
  address?: StaffAddress;
  emergencyContact?: EmergencyContact;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type StaffRole = 
  | 'admin'
  | 'manager'
  | 'supervisor'
  | 'staff'
  | 'intern';

export interface StaffPermissions {
  // Order Management
  manageOrders: boolean;
  viewOrders: boolean;
  updateOrderStatus: boolean;
  cancelOrders: boolean;
  
  // Product Management
  manageProducts: boolean;
  viewProducts: boolean;
  createProducts: boolean;
  updateProducts: boolean;
  deleteProducts: boolean;
  
  // Customer Management
  manageCustomers: boolean;
  viewCustomers: boolean;
  updateCustomerInfo: boolean;
  viewCustomerHistory: boolean;
  
  // Inventory Management
  manageInventory: boolean;
  viewInventory: boolean;
  updateStock: boolean;
  viewStockReports: boolean;
  
  // Financial Management
  viewFinancials: boolean;
  managePayments: boolean;
  viewReports: boolean;
  exportData: boolean;
  
  // Staff Management
  manageStaff: boolean;
  viewStaff: boolean;
  createStaff: boolean;
  updateStaff: boolean;
  deleteStaff: boolean;
  
  // Settings Management
  manageSettings: boolean;
  viewSettings: boolean;
  updateSettings: boolean;
  
  // Analytics & Reports
  viewAnalytics: boolean;
  generateReports: boolean;
  viewDashboard: boolean;
}

export interface StaffAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface StaffFormData {
  name: string;
  email: string;
  phone?: string;
  role: StaffRole;
  permissions: StaffPermissions;
  department?: string;
  salary?: number;
  address?: Omit<StaffAddress, 'id'>;
  emergencyContact?: Omit<EmergencyContact, 'id'>;
  notes?: string;
}

export interface StaffFilters {
  role?: StaffRole;
  isActive?: boolean;
  department?: string;
  hireDate?: {
    from: string;
    to: string;
  };
  lastLogin?: {
    from: string;
    to: string;
  };
  search?: string;
}

export interface StaffActions {
  createStaff: (data: StaffFormData) => Promise<void>;
  updateStaff: (id: string, data: Partial<StaffFormData>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  activateStaff: (id: string) => Promise<void>;
  deactivateStaff: (id: string) => Promise<void>;
  updatePermissions: (id: string, permissions: Partial<StaffPermissions>) => Promise<void>;
  resetPassword: (id: string) => Promise<void>;
  sendInvitation: (id: string) => Promise<void>;
  exportStaffData: (id: string) => Promise<void>;
}

export interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  staffByRole: Record<StaffRole, number>;
  staffByDepartment: Record<string, number>;
  newHiresThisMonth: number;
  averageTenure: number; // in months
}

export interface StaffActivity {
  id: string;
  staffId: string;
  staffName: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface StaffSchedule {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  breakTime?: number; // in minutes
  isWorking: boolean;
  notes?: string;
}

export interface StaffPerformance {
  staffId: string;
  staffName: string;
  period: string;
  ordersProcessed: number;
  customerSatisfaction: number;
  attendanceRate: number;
  punctualityRate: number;
  tasksCompleted: number;
  tasksAssigned: number;
  rating: number;
}
