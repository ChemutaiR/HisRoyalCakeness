// API-related type definitions

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface ApiEndpoints {
  auth: {
    login: string;
    register: string;
    logout: string;
    refresh: string;
    profile: string;
    forgotPassword: string;
    resetPassword: string;
  };
  cakes: {
    list: string;
    detail: string;
    create: string;
    update: string;
    delete: string;
    search: string;
  };
  orders: {
    list: string;
    detail: string;
    create: string;
    update: string;
    cancel: string;
    track: string;
  };
  users: {
    list: string;
    detail: string;
    update: string;
    delete: string;
  };
  reviews: {
    list: string;
    create: string;
    update: string;
    delete: string;
  };
  promotions: {
    list: string;
    detail: string;
    create: string;
    update: string;
    delete: string;
  };
  analytics: {
    dashboard: string;
    sales: string;
    orders: string;
    customers: string;
    products: string;
  };
  upload: {
    images: string;
    documents: string;
  };
}
