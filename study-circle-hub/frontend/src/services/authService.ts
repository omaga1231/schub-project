export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Simulated token storage key
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'current_user';

// Mock user data for development
const MOCK_USER: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  isAdmin: false
};

// Simulated API service for authentication
const authService = {
  // Simulate login
  login: async (credentials: LoginCredentials): Promise<User> => {
    // For development, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, this would be an actual API call
    if (credentials.email && credentials.password) {
      // Store authentication token
      localStorage.setItem(TOKEN_KEY, 'mock_jwt_token');
      localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));
      return MOCK_USER;
    }
    
    throw new Error('Invalid email or password');
  },

  // Simulate user registration
  register: async (credentials: RegisterCredentials): Promise<User> => {
    // For development, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, this would be an actual API call
    if (credentials.name && credentials.email && credentials.password) {
      const newUser: User = {
        ...MOCK_USER,
        name: credentials.name,
        email: credentials.email
      };
      
      // Store authentication token
      localStorage.setItem(TOKEN_KEY, 'mock_jwt_token');
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      return newUser;
    }
    
    throw new Error('Registration failed');
  },

  // Simulate logout
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem(TOKEN_KEY) !== null;
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
};

export default authService;

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const handleError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
  throw new Error(defaultMessage);
};

const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { ...user, token };
    } catch (error) {
      return handleError(error, 'Failed to login');
    }
  },

  register: async (data: RegisterData): Promise<User> => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { ...user, token };
    } catch (error) {
      return handleError(error, 'Failed to register');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
};

export default authService;

