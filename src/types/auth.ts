// Authentication Types and Interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member'
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Auth Constants
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
} as const;

export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'userRole',
} as const;

