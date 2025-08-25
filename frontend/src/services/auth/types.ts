export interface LoginResponse {
  access_token: string;
  user: {
    userId: string;
    email: string;
    name: string;
  };
}