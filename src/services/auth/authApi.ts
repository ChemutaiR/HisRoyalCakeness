import { apiClient, ApiResponse } from '@/services/api/apiClient';
import { API_ENDPOINTS } from '@/services/api/endpoints';

export class AuthApiService {
  async requestPasswordReset(email: string): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<{ success: boolean }>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }
}

export const authApiService = new AuthApiService();
export default authApiService;


