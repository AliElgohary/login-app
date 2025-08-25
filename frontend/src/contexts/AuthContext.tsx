import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth/auth.service';


interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    const userData: User = {
      id: data.user.userId,
      email: data.user.email,
      name: data.user.name,
    };
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signup = async (email: string, name: string, password: string) => {
    const data = await authService.signup(email, name, password);
    const userData: User = {
      id: data.user.userId,
      email: data.user.email,
      name: data.user.name,
    };
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
