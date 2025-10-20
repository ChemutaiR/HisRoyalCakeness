// Admin settings management types

export interface BusinessSettings {
  businessInfo: BusinessInfo;
  businessHours: BusinessHours;
  deliverySettings: DeliverySettings;
  paymentSettings: PaymentSettings;
  notificationSettings: NotificationSettings;
  securitySettings: SecuritySettings;
  seoSettings: SEOSettings;
  appearanceSettings: AppearanceSettings;
}

export interface BusinessInfo {
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  businessAddress: string;
  aboutUs: string;
  logo?: string;
  website?: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  is24Hours?: boolean;
}

export interface DeliverySettings {
  freeDeliveryEnabled: boolean;
  sameDayDeliveryEnabled: boolean;
  nextDayDeliveryEnabled: boolean;
  freeDeliveryThreshold: number;
  deliveryRadius: number;
  deliveryFee: number;
  estimatedDeliveryTime: string;
  deliveryZones: DeliveryZone[];
  deliveryTimeSlots: DeliveryTimeSlot[];
}

export interface DeliveryZone {
  id: string;
  name: string;
  radius: number;
  deliveryFee: number;
  estimatedTime: string;
  isActive: boolean;
}

export interface DeliveryTimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  maxOrders: number;
  isActive: boolean;
}

export interface PaymentSettings {
  mpesaEnabled: boolean;
  cardPaymentEnabled: boolean;
  cashOnDeliveryEnabled: boolean;
  bankTransferEnabled: boolean;
  minimumOrderAmount: number;
  maximumOrderAmount: number;
  currency: string;
  taxRate: number;
  serviceCharge: number;
  paymentMethods: PaymentMethodConfig[];
}

export interface PaymentMethodConfig {
  id: string;
  name: string;
  type: 'mpesa' | 'card' | 'cash' | 'bank_transfer';
  isActive: boolean;
  processingFee?: number;
  configuration?: Record<string, any>;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  orderNotifications: boolean;
  deliveryNotifications: boolean;
  reviewNotifications: boolean;
  promotionNotifications: boolean;
  customerNotifications: boolean;
  adminNotifications: boolean;
  notificationTemplates: NotificationTemplate[];
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push';
  subject?: string;
  template: string;
  variables: string[];
  isActive: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordPolicy: PasswordPolicy;
  loginAttempts: LoginAttempts;
  ipWhitelist: string[];
  auditLog: boolean;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiry: number; // in days
}

export interface LoginAttempts {
  maxAttempts: number;
  lockoutDuration: number; // in minutes
  lockoutThreshold: number;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  googleAnalyticsId: string;
  googleBusinessProfile: string;
  facebookPixelId?: string;
  structuredData: Record<string, any>;
  sitemapUrl?: string;
  robotsTxt?: string;
}

export interface AppearanceSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
  logo: {
    mainLogo: string;
    favicon: string;
    mobileLogo?: string;
  };
  fonts: {
    primaryFont: string;
    secondaryFont: string;
  };
  layout: {
    headerStyle: 'default' | 'minimal' | 'centered';
    footerStyle: 'default' | 'minimal' | 'extended';
    sidebarStyle: 'default' | 'collapsible' | 'floating';
  };
}

export interface SettingsActions {
  updateBusinessInfo: (data: Partial<BusinessInfo>) => Promise<void>;
  updateBusinessHours: (data: Partial<BusinessHours>) => Promise<void>;
  updateDeliverySettings: (data: Partial<DeliverySettings>) => Promise<void>;
  updatePaymentSettings: (data: Partial<PaymentSettings>) => Promise<void>;
  updateNotificationSettings: (data: Partial<NotificationSettings>) => Promise<void>;
  updateSecuritySettings: (data: Partial<SecuritySettings>) => Promise<void>;
  updateSEOSettings: (data: Partial<SEOSettings>) => Promise<void>;
  updateAppearanceSettings: (data: Partial<AppearanceSettings>) => Promise<void>;
  resetToDefaults: (section: keyof BusinessSettings) => Promise<void>;
  exportSettings: () => Promise<void>;
  importSettings: (data: BusinessSettings) => Promise<void>;
}
