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

//   /**
//    * Get current user profile
//    */
//   // static async getProfile(): Promise<ResponseHandlerResult<AuthData>> {
//   //   try {
//   //     const response = await get(
//   //       this.getApiUrl(AUTH_ENDPOINTS.PROFILE),
//   //       { isWithToken: true }
//   //     );

//   //     if (ResponseHandler.isSuccess(response)) {
//   //       return ResponseHandler.createSuccess(
//   //         response.data,
//   //         response.message || 'Profile retrieved successfully'
//   //       );
//   //     } else {
//   //       return response; // Already in correct format
//   //     }
//   //   } catch (error) {
//   //     console.error('Get profile API error:', error);
//   //     return ResponseHandler.createError(
//   //       'Network error or server unreachable',
//   //       'NETWORK_ERROR',
//   //       'Failed to connect to authentication server'
//   //     );
//   //   }
//   // }

//   /**
//    * Refresh access token
//    */
//   static async refreshToken(): Promise<ResponseHandlerResult<AuthData>> {
//     try {
//       const response = await post(
//         this.getApiUrl(AUTH_ENDPOINTS.REFRESH),
//         {},
//         { isWithToken: true }
//       );

//       if (ResponseHandler.isSuccess(response)) {
//         return ResponseHandler.createSuccess(
//           response.data,
//           response.message || 'Token refreshed successfully'
//         );
//       } else {
//         return response; // Already in correct format
//       }
//     } catch (error) {
//       console.error('Refresh token API error:', error);
//       return ResponseHandler.createError(
//         'Network error or server unreachable',
//         'NETWORK_ERROR',
//         'Failed to connect to authentication server'
//       );
//     }
//   }

//   /**
//    * Logout user
//    */
//   static async logout(): Promise<ResponseHandlerResult<{ message: string }>> {
//     try {
//       const response = await deleteData(
//         this.getApiUrl(AUTH_ENDPOINTS.LOGOUT),
//         { isWithToken: true }
//       );

//       if (ResponseHandler.isSuccess(response)) {
//         return ResponseHandler.createSuccess(
//           { message: 'Logout successful' },
//           response.message || 'Logout successful'
//         );
//       } else {
//         return response; // Already in correct format
//       }
//     } catch (error) {
//       console.error('Logout API error:', error);
//       return ResponseHandler.createError(
//         'Network error or server unreachable',
//         'NETWORK_ERROR',
//         'Failed to connect to authentication server'
//       );
//     }
//   }
} 