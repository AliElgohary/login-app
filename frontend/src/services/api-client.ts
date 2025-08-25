import axios from 'axios';
import { API_URL, ApiException, defaultConfig } from './config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

const axiosInstance = axios.create({
  ...defaultConfig,
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = config.headers || {};
    (config.headers as any)['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


export async function apiClient<T>(endpoint: string, options: RequestOptions): Promise<T> {
  const { method, body, headers } = options;

  try {
    const { data } = await axiosInstance.request<T>({
      method,
      url: endpoint,
      data: body,
      headers,
    });
    return data;
  } catch (error: any) {
    if (error?.response) {
      throw new ApiException(
        error.response.status,
        error.response.data?.message || 'An error occurred'
      );
    }
    throw new ApiException(500, 'Network error');
  }
}
