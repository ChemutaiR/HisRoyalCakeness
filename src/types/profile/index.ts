export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingOptIn: boolean;
}

export interface ProfileUpdateRequest {
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileWithSettings {
  profile: UserProfile;
  settings: AccountSettings;
}


