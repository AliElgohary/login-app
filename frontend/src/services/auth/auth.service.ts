import { apiClient } from "../api-client";
import { LoginResponse } from "./types";


export const authService = {
    login: (email: string, password: string) =>
        apiClient<LoginResponse>('/auth/signin', {
            method: 'POST',
            body: { email, password },
        }),

    signup: (email: string, name: string, password: string) =>
        apiClient<LoginResponse>('/auth/signup', {
            method: 'POST',
            body: { email, name, password },
        }),
};
