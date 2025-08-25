export interface UserApiResponse {
  message: string;
  user: User;
  timestamp: string;
}

export interface User {
  userId: string;
  email: string;
  name: string;
}
