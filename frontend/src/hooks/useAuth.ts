import { useState, useCallback } from 'react';
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const { login, signup, logout, isAuthenticated, loading } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [login]);

  const handleSignup = useCallback(async (email: string, name: string, password: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await signup(email, name, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [signup]);

  const handleLogout = useCallback(() => {
    setError(null);
    logout();
  }, [logout]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAuthenticated,
    loading,
    isSubmitting,
    error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    clearError,
  };
}; 