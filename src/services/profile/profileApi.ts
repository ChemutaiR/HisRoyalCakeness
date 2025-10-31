import { apiClient, ApiResponse } from '@/services/api/apiClient';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { UserProfile, ProfileUpdateRequest, AccountSettings, ProfileWithSettings } from '@/types/profile';

export class ProfileApiService {
  async getProfile(): Promise<ApiResponse<ProfileWithSettings>> {
    return apiClient.get<ProfileWithSettings>(API_ENDPOINTS.PROFILE.BASE);
  }

  async updateProfile(data: ProfileUpdateRequest): Promise<ApiResponse<UserProfile>> {
    return apiClient.put<UserProfile>(API_ENDPOINTS.PROFILE.UPDATE, data);
  }

  async updateAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    const form = new FormData();
    form.append('avatar', file);
    return apiClient.post<{ avatarUrl: string }>(API_ENDPOINTS.PROFILE.AVATAR, form as any, {
      headers: { },
    });
  }

  async updatePassword(data: { currentPassword: string; newPassword: string }): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }>(API_ENDPOINTS.PROFILE.PASSWORD, data);
  }

  async updateSettings(data: AccountSettings): Promise<ApiResponse<AccountSettings>> {
    return apiClient.put<AccountSettings>(API_ENDPOINTS.PROFILE.SETTINGS, data);
  }

  async getOrders(): Promise<ApiResponse<any[]>> {
    return apiClient.get<any[]>(API_ENDPOINTS.PROFILE.ORDERS);
  }
}

export const profileApiService = new ProfileApiService();
export default profileApiService;


