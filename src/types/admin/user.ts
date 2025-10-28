// User-related type definitions

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type UserRole = 'customer' | 'admin' | 'staff';

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  preferences?: UserPreferences;
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
}

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface PasswordReset {
  email: string;
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
