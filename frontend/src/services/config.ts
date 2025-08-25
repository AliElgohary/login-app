export const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error('REACT_APP_API_URL environment variable is not defined');
}

export const defaultHeaders = {
  'Content-Type': 'application/json',
} as const;

export const defaultConfig = {
  withCredentials: true,
  headers: defaultHeaders,
} as const;

export type ApiError = {
  message: string;
  status: number;
};

export class ApiException extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiException';
  }
} 