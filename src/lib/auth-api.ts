import { 
  post, 
  get, 
  deleteData 
} from '@/lib/common/fetch-utils';
import { 
  LoginCredentials, 
  AuthData, 
  User 
} from '../types/auth';
import { ResponseHandler } from '@/lib/common/response-handler';
import { ResponseHandlerResult } from '@/types/common';

export const AUTH_ENDPOINTS = {
  LOGIN: 'auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
} as const;

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || 'http://localhost:3001';

export class AuthApiService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<ResponseHandlerResult<any>> {
    return await post(
      `${API_BASE_URL}/${AUTH_ENDPOINTS.LOGIN}`,
      credentials,
      { isWithToken: false }
    );
  }
} 