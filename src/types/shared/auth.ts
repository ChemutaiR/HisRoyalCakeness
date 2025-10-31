// Authentication-related type definitions

import React from 'react';
// import { ValidationError, FormValidation } from './forms';

// User roles and permissions
export type UserRole = 'customer' | 'admin' | 'staff' | 'manager';

// Basic user structure
export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  dietary: {
    allergies: string[];
    restrictions: string[];
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
}

// Authentication state
export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Form data types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// API Response Types
export interface LoginResponse {
  success: boolean;
  user: AuthUser;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignupResponse {
  success: boolean;
  user: AuthUser;
  token: string;
  refreshToken: string;
  message: string;
  requiresEmailVerification: boolean;
}

export interface RefreshTokenResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// ValidationError and FormValidation are now imported from './forms'

// Auth Context Types
export interface AuthContextType {
  // State
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginFormData) => Promise<LoginResponse>;
  signup: (userData: SignupFormData) => Promise<SignupResponse>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<RefreshTokenResponse>;
  forgotPassword: (email: string) => Promise<ForgotPasswordResponse>;
  resetPassword: (data: ResetPasswordFormData) => Promise<ResetPasswordResponse>;
  changePassword: (data: ChangePasswordFormData) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<AuthUser>;
  clearError: () => void;
  
  // Utilities
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isEmailVerified: () => boolean;
}

// Route Protection Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  requireEmailVerification?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Session Management Types
export interface SessionData {
  user: AuthUser;
  token: string;
  refreshToken: string;
  expiresAt: number;
  lastActivity: number;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Auth Error Types
export type AuthErrorType = 
  | 'INVALID_CREDENTIALS'
  | 'USER_NOT_FOUND'
  | 'EMAIL_NOT_VERIFIED'
  | 'ACCOUNT_DISABLED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'PASSWORD_TOO_WEAK'
  | 'EMAIL_ALREADY_EXISTS'
  | 'RATE_LIMIT_EXCEEDED'
  | 'TWO_FACTOR_REQUIRED'
  | 'TWO_FACTOR_INVALID'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface AuthError {
  type: AuthErrorType;
  message: string;
  field?: string;
  code?: string;
}
