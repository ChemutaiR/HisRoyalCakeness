/**
 * Customer Management Types
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'Pending' | 'Inactive' | 'Deactivated' | 'Blacklisted';
  orders: number;
  totalSpent: number;
  avatar: string;
  isDeactivated: boolean;
  isBlacklisted: boolean;
}

export type CustomerTab = 'active' | 'deactivated';
