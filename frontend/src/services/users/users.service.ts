import { apiClient } from "../api-client";
import { User, UserApiResponse } from "./types";


export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient<UserApiResponse>('/users/me', {
      method: 'GET',
    });
    return response.user
  },
};
