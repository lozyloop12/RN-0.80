import { useAuthStore } from '@src/app/stores';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import Config from 'react-native-config';

// API Configuration
export const BaseURL =
  (Config as any)?.API_URL
    ? `${(Config as any).API_URL}/v1/`
    : 'https://jsonplaceholder.typicode.com/posts';

// Create axios instance with default configuration
const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: BaseURL,
});

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
);

// Types
export interface ApiError {
  message: string;
  code?: string;
  success: boolean;
}

export interface ApiResponse<T = any> {
  data?: T;
  success: boolean;
  errors?: Array<{ message: string; code?: string }>;
}

// Error handling utility
const handleApiError = (error: any): ApiError => {
  if (error.response?.data) {
    const { data } = error.response;
    const { errors, success } = data;

    if (!success && errors?.length > 0) {
      const { message, code } = errors[0];
      return {
        message: message?.message || message || 'An error occurred',
        code,
        success: false,
      };
    }

    return data;
  }

  return {
    message: error.message || 'Network error occurred',
    success: false,
  };
};

// Response preprocessing utility
const preprocessResponse = <T>(result: ApiResponse<T>): T | ApiError => {
  const { success, errors, data } = result || {};

  if (success) {
    return (data || result) as T;
  }

  if (errors && errors.length > 0) {
    return { ...errors[0], success: false };
  }

  return result as T;
};

export class ApiService {
  // Get authorization headers
  private static getAuthHeaders(): Record<string, string> {
    const token = useAuthStore.getState().token;

    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // Get form data headers
  private static getFormDataHeaders(): Record<string, string> {
    const token = useAuthStore.getState().token;

    return {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // Generic request method
  private static async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosInstance(config);
      return preprocessResponse(response.data) as T;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // GET request
  static async get<T = any>(url: string, params?: any): Promise<T> {
    return this.makeRequest<T>({
      method: 'GET',
      url,
      headers: this.getAuthHeaders(),
      params,
      paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
    });
  }

  // POST request
  static async post<T = any>(
    url: string,
    data?: any,
    isFormData = false,
  ): Promise<T> {
    return this.makeRequest<T>({
      method: 'POST',
      url,
      headers: isFormData ? this.getFormDataHeaders() : this.getAuthHeaders(),
      data,
    });
  }

  // PUT request
  static async put<T = any>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>({
      method: 'PUT',
      url,
      headers: this.getAuthHeaders(),
      data,
    });
  }

  // DELETE request
  static async delete<T = any>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>({
      method: 'DELETE',
      url,
      headers: this.getAuthHeaders(),
      data,
    });
  }

  // PATCH request
  static async patch<T = any>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>({
      method: 'PATCH',
      url,
      headers: this.getAuthHeaders(),
      data,
    });
  }
}
