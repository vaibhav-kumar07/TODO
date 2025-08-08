import { 
  post, 
  get, 
  put
} from '@/lib/common/fetch-utils';
import { 
  LoginCredentials, 
  User,
  UpdateProfileData
} from '../types/auth';
import { ResponseHandlerResult } from '@/types/common';

export const AUTH_ENDPOINTS = {
  LOGIN: 'auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
} as const;

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || 'http://localhost:3001';

export async function getProfile(): Promise<any> {
  try {
    const response = await get(
      `${API_BASE_URL}${AUTH_ENDPOINTS.PROFILE}`,
      { isWithToken: true }
    );
    return response.data || response;
  } catch (error) {
    console.error('Get profile API error:', error);
    throw error;
  }
}

export async function updateProfile(profileData: UpdateProfileData): Promise<any> {
  try {
    const response = await put(
      `${API_BASE_URL}${AUTH_ENDPOINTS.PROFILE}`,
      profileData,
      { isWithToken: true }
    );
    return response.data || response;
  } catch (error) {
    console.error('Update profile API error:', error);
    throw error;
  }
}

export class AuthApiService {
  static async login(credentials: LoginCredentials): Promise<ResponseHandlerResult<any>> {
    return await post(
      `${API_BASE_URL}/${AUTH_ENDPOINTS.LOGIN}`,
      credentials,
      { isWithToken: false }
    );
  }


  static async getProfile(): Promise<ResponseHandlerResult<User>> {
    try {
      const response = await get(
        `${API_BASE_URL}${AUTH_ENDPOINTS.PROFILE}`,
        { isWithToken: true }
      );

      return response
    } catch (error) {
      console.error('Get profile API error:', error);
      return {
        success: false,
        message: 'Network error or server unreachable',
        error: {
          code: 'NETWORK_ERROR',
          description: 'Failed to connect to authentication server'
        }
      };
    }
  }

  
  static async updateProfile(profileData: UpdateProfileData): Promise<ResponseHandlerResult<User>> {
    try {
      const response = await put(
        `${API_BASE_URL}/auth/profile`,
        profileData,
        { isWithToken: true }
      );
      
      return response;  
    } catch (error) {
      console.error('Update profile API error:', error);
      return {
        success: false,
        message: 'Network error or server unreachable',
        error: {
          code: 'NETWORK_ERROR',
          description: 'Failed to connect to authentication server'
        }
      };
    }
  }
} 