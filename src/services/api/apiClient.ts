/**
 * API Client for HTTP communication
 * 
 * This client provides a unified interface for making HTTP requests
 * with proper error handling, retry logic, and request/response interceptors.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

export class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultRetries: number;
  private authToken: string | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    this.defaultTimeout = 10000; // 10 seconds
    this.defaultRetries = 3;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  /**
   * Get default headers
   */
  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with retry logic
   */
  async request<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    const {
      method,
      url,
      data,
      headers = {},
      timeout = this.defaultTimeout,
      retries = this.defaultRetries
    } = config;

    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    const requestHeaders = { ...this.getDefaultHeaders(), ...headers };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(fullUrl, {
          method,
          headers: requestHeaders,
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return {
          success: true,
          data: result,
          timestamp: new Date().toISOString(),
        };

      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (error instanceof Error && error.name === 'AbortError') {
          break;
        }

        // Wait before retry (exponential backoff)
        if (attempt < retries) {
          const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || 'Request failed',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      ...config,
    });
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
      ...config,
    });
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
      ...config,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url,
      ...config,
    });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      url,
      data,
      ...config,
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
