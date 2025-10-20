// Common utility types used across all domains

// Basic identifiers and status
export type ID = number | string;

export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';

export type SortOrder = 'asc' | 'desc';

// Base entity structure
export interface BaseEntity {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}

// Common utility types
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Generic pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

// Generic filtering
export interface FilterParams {
  search?: string;
  status?: Status;
  dateFrom?: Date;
  dateTo?: Date;
  [key: string]: any;
}
