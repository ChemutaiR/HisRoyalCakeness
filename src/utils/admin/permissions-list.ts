import { Permission } from '@/components/admin/staff/PermissionMatrixGrid';

/**
 * Default permissions list for the system
 * This can be moved to a database/API in the future
 */
export const defaultPermissions: Permission[] = [
  // Orders
  { id: 'orders:view', name: 'View Orders', description: 'View order details and status', category: 'Orders' },
  { id: 'orders:create', name: 'Create Orders', description: 'Create new orders', category: 'Orders' },
  { id: 'orders:edit', name: 'Edit Orders', description: 'Modify existing orders', category: 'Orders' },
  { id: 'orders:delete', name: 'Delete Orders', description: 'Remove orders from system', category: 'Orders' },
  
  // Customers
  { id: 'customers:view', name: 'View Customers', description: 'View customer information', category: 'Customers' },
  { id: 'customers:edit', name: 'Edit Customers', description: 'Modify customer details', category: 'Customers' },
  
  // Products
  { id: 'products:view', name: 'View Products', description: 'View product catalog', category: 'Products' },
  { id: 'products:create', name: 'Create Products', description: 'Add new products', category: 'Products' },
  { id: 'products:edit', name: 'Edit Products', description: 'Modify product details', category: 'Products' },
  { id: 'products:delete', name: 'Delete Products', description: 'Remove products from catalog', category: 'Products' },
  
  // Recipes
  { id: 'recipes:view', name: 'View Recipes', description: 'View recipe details', category: 'Recipes' },
  { id: 'recipes:create', name: 'Create Recipes', description: 'Add new recipes', category: 'Recipes' },
  { id: 'recipes:edit', name: 'Edit Recipes', description: 'Modify existing recipes', category: 'Recipes' },
  { id: 'recipes:delete', name: 'Delete Recipes', description: 'Remove recipes from system', category: 'Recipes' },
  
  // Analytics
  { id: 'analytics:view', name: 'View Analytics', description: 'Access reports and analytics', category: 'Analytics' },
  
  // Staff
  { id: 'staff:view', name: 'View Staff', description: 'View staff member information', category: 'Staff' },
  { id: 'staff:create', name: 'Create Staff', description: 'Add new staff members', category: 'Staff' },
  { id: 'staff:edit', name: 'Edit Staff', description: 'Modify staff details', category: 'Staff' },
  { id: 'staff:delete', name: 'Delete Staff', description: 'Remove staff members', category: 'Staff' },
  
  // Settings
  { id: 'settings:view', name: 'View Settings', description: 'View system settings', category: 'Settings' },
  { id: 'settings:edit', name: 'Edit Settings', description: 'Modify system settings', category: 'Settings' }
];

