// Permission management utility functions

import { StaffPermissions, StaffRole } from '@/types/admin';

/**
 * Check if user has specific permission
 */
export function hasPermission(userPermissions: StaffPermissions, permission: keyof StaffPermissions): boolean {
  return userPermissions[permission] === true;
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(userPermissions: StaffPermissions, permissions: (keyof StaffPermissions)[]): boolean {
  return permissions.some(permission => hasPermission(userPermissions, permission));
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(userPermissions: StaffPermissions, permissions: (keyof StaffPermissions)[]): boolean {
  return permissions.every(permission => hasPermission(userPermissions, permission));
}

/**
 * Get default permissions for role
 */
export function getDefaultPermissions(role: StaffRole): StaffPermissions {
  const basePermissions: StaffPermissions = {
    // Order Management
    manageOrders: false,
    viewOrders: false,
    updateOrderStatus: false,
    cancelOrders: false,
    
    // Product Management
    manageProducts: false,
    viewProducts: false,
    createProducts: false,
    updateProducts: false,
    deleteProducts: false,
    
    // Customer Management
    manageCustomers: false,
    viewCustomers: false,
    updateCustomerInfo: false,
    viewCustomerHistory: false,
    
    // Inventory Management
    manageInventory: false,
    viewInventory: false,
    updateStock: false,
    viewStockReports: false,
    
    // Financial Management
    viewFinancials: false,
    managePayments: false,
    viewReports: false,
    exportData: false,
    
    // Staff Management
    manageStaff: false,
    viewStaff: false,
    createStaff: false,
    updateStaff: false,
    deleteStaff: false,
    
    // Settings Management
    manageSettings: false,
    viewSettings: false,
    updateSettings: false,
    
    // Analytics & Reports
    viewAnalytics: false,
    generateReports: false,
    viewDashboard: false,
  };

  switch (role) {
    case 'admin':
      // Admin has all permissions
      return Object.keys(basePermissions).reduce((acc, key) => {
        acc[key as keyof StaffPermissions] = true;
        return acc;
      }, {} as StaffPermissions);

    case 'manager':
      return {
        ...basePermissions,
        // Order Management
        manageOrders: true,
        viewOrders: true,
        updateOrderStatus: true,
        cancelOrders: true,
        
        // Product Management
        manageProducts: true,
        viewProducts: true,
        createProducts: true,
        updateProducts: true,
        deleteProducts: false, // Only admin can delete
        
        // Customer Management
        manageCustomers: true,
        viewCustomers: true,
        updateCustomerInfo: true,
        viewCustomerHistory: true,
        
        // Inventory Management
        manageInventory: true,
        viewInventory: true,
        updateStock: true,
        viewStockReports: true,
        
        // Financial Management
        viewFinancials: true,
        managePayments: true,
        viewReports: true,
        exportData: true,
        
        // Staff Management
        viewStaff: true,
        createStaff: false, // Only admin can create staff
        updateStaff: false, // Only admin can update staff
        deleteStaff: false,
        manageStaff: false,
        
        // Settings Management
        viewSettings: true,
        updateSettings: false, // Only admin can update settings
        manageSettings: false,
        
        // Analytics & Reports
        viewAnalytics: true,
        generateReports: true,
        viewDashboard: true,
      };

    case 'supervisor':
      return {
        ...basePermissions,
        // Order Management
        viewOrders: true,
        updateOrderStatus: true,
        
        // Product Management
        viewProducts: true,
        updateProducts: true,
        
        // Customer Management
        viewCustomers: true,
        updateCustomerInfo: true,
        viewCustomerHistory: true,
        
        // Inventory Management
        viewInventory: true,
        updateStock: true,
        viewStockReports: true,
        
        // Financial Management
        viewFinancials: true,
        viewReports: true,
        
        // Analytics & Reports
        viewAnalytics: true,
        viewDashboard: true,
      };

    case 'staff':
      return {
        ...basePermissions,
        // Order Management
        viewOrders: true,
        updateOrderStatus: true,
        
        // Product Management
        viewProducts: true,
        
        // Customer Management
        viewCustomers: true,
        
        // Inventory Management
        viewInventory: true,
        
        // Analytics & Reports
        viewDashboard: true,
      };

    case 'intern':
      return {
        ...basePermissions,
        // Limited view-only permissions
        viewOrders: true,
        viewProducts: true,
        viewCustomers: true,
        viewInventory: true,
        viewDashboard: true,
      };

    default:
      return basePermissions;
  }
}

/**
 * Check if user can perform action on resource
 */
export function canPerformAction(
  userPermissions: StaffPermissions,
  action: string,
  resource: string
): boolean {
  const permissionMap: Record<string, keyof StaffPermissions> = {
    'view_orders': 'viewOrders',
    'manage_orders': 'manageOrders',
    'update_order_status': 'updateOrderStatus',
    'cancel_orders': 'cancelOrders',
    'view_products': 'viewProducts',
    'manage_products': 'manageProducts',
    'create_products': 'createProducts',
    'update_products': 'updateProducts',
    'delete_products': 'deleteProducts',
    'view_customers': 'viewCustomers',
    'manage_customers': 'manageCustomers',
    'update_customer_info': 'updateCustomerInfo',
    'view_customer_history': 'viewCustomerHistory',
    'view_inventory': 'viewInventory',
    'manage_inventory': 'manageInventory',
    'update_stock': 'updateStock',
    'view_stock_reports': 'viewStockReports',
    'view_financials': 'viewFinancials',
    'manage_payments': 'managePayments',
    'view_reports': 'viewReports',
    'export_data': 'exportData',
    'view_staff': 'viewStaff',
    'manage_staff': 'manageStaff',
    'create_staff': 'createStaff',
    'update_staff': 'updateStaff',
    'delete_staff': 'deleteStaff',
    'view_settings': 'viewSettings',
    'manage_settings': 'manageSettings',
    'update_settings': 'updateSettings',
    'view_analytics': 'viewAnalytics',
    'generate_reports': 'generateReports',
    'view_dashboard': 'viewDashboard',
  };

  const permissionKey = permissionMap[`${action}_${resource}`] || permissionMap[action];
  return permissionKey ? hasPermission(userPermissions, permissionKey) : false;
}

/**
 * Get permission description
 */
export function getPermissionDescription(permission: keyof StaffPermissions): string {
  const descriptions: Record<keyof StaffPermissions, string> = {
    // Order Management
    manageOrders: 'Can manage all order operations',
    viewOrders: 'Can view order information',
    updateOrderStatus: 'Can update order status',
    cancelOrders: 'Can cancel orders',
    
    // Product Management
    manageProducts: 'Can manage all product operations',
    viewProducts: 'Can view product information',
    createProducts: 'Can create new products',
    updateProducts: 'Can update existing products',
    deleteProducts: 'Can delete products',
    
    // Customer Management
    manageCustomers: 'Can manage all customer operations',
    viewCustomers: 'Can view customer information',
    updateCustomerInfo: 'Can update customer information',
    viewCustomerHistory: 'Can view customer order history',
    
    // Inventory Management
    manageInventory: 'Can manage all inventory operations',
    viewInventory: 'Can view inventory information',
    updateStock: 'Can update stock levels',
    viewStockReports: 'Can view stock reports',
    
    // Financial Management
    viewFinancials: 'Can view financial information',
    managePayments: 'Can manage payment operations',
    viewReports: 'Can view financial reports',
    exportData: 'Can export data and reports',
    
    // Staff Management
    manageStaff: 'Can manage all staff operations',
    viewStaff: 'Can view staff information',
    createStaff: 'Can create new staff accounts',
    updateStaff: 'Can update staff information',
    deleteStaff: 'Can delete staff accounts',
    
    // Settings Management
    manageSettings: 'Can manage all settings',
    viewSettings: 'Can view settings',
    updateSettings: 'Can update settings',
    
    // Analytics & Reports
    viewAnalytics: 'Can view analytics and insights',
    generateReports: 'Can generate reports',
    viewDashboard: 'Can view admin dashboard',
  };

  return descriptions[permission] || 'Unknown permission';
}

/**
 * Validate permission changes
 */
export function validatePermissionChanges(
  currentPermissions: StaffPermissions,
  newPermissions: Partial<StaffPermissions>,
  userRole: StaffRole
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const defaultPermissions = getDefaultPermissions(userRole);

  // Check if user is trying to grant permissions they don't have
  Object.entries(newPermissions).forEach(([key, value]) => {
    const permission = key as keyof StaffPermissions;
    if (value === true && !currentPermissions[permission]) {
      errors.push(`Cannot grant ${String(permission)} - insufficient privileges`);
    }
  });

  // Check if user is trying to grant permissions beyond their role
  Object.entries(newPermissions).forEach(([key, value]) => {
    const permission = key as keyof StaffPermissions;
    if (value === true && !defaultPermissions[permission]) {
      errors.push(`Cannot grant ${String(permission)} - exceeds role permissions`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}
