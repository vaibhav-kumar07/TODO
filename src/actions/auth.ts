'use server';

import { AuthApiService } from '@/lib/auth-api';
import { LoginCredentials, AuthData, User, UserRole } from '@/types/auth';
import { setCookie, deleteCookie } from '@/lib/common/cookie-utils';
import { redirect } from 'next/navigation';
import { ResponseHandler } from '@/lib/common/response-handler';
import { ResponseHandlerResult } from '@/types/common';

/**
 * Server action to handle user login
 */
export async function AdminLoginAction(credentials: LoginCredentials): Promise<ResponseHandlerResult<{ accessToken:string, refreshToken:string, user:any }>> {
    // Call API service
    const response = await AuthApiService.login(credentials); 

    return response;
}


// /**
//  * Server action to handle user logout
//  */
// export async function logoutAction(): Promise<ResponseHandlerResult<{ message: string }>> {
//   try {
//     // Call API service to logout
//     await AuthApiService.logout();

//     // Clear all auth cookies
//     await deleteCookie('token');
//     await deleteCookie('refreshToken');
//     await deleteCookie('userRole');

//     return ResponseHandler.createSuccess(
//       { message: 'Logout successful' },
//       'Logout completed successfully'
//     );
//   } catch (error) {
//     console.error('Logout action error:', error);
    
//     // Clear cookies even if API call fails
//     await deleteCookie('token');
//     await deleteCookie('refreshToken');
//     await deleteCookie('userRole');

//     return ResponseHandler.createSuccess(
//       { message: 'Logout completed' },
//       'Logout completed (offline)'
//     );
//   }
// }

// /**
//  * Server action to get current user profile
//  */
// export async function getProfileAction(): Promise<ResponseHandlerResult<{ user: User }>> {
//   try {
//     const response = await AuthApiService.getProfile();

//     if (ResponseHandler.isSuccess(response)) {
//       return ResponseHandler.createSuccess(
//         { user: response.data.user },
//         response.message || 'Profile retrieved successfully'
//       );
//     }

//     return response; // Return error response as-is
//   } catch (error) {
//     console.error('Get profile action error:', error);
//     return ResponseHandler.createError(
//       'Failed to get user profile',
//       'NETWORK_ERROR'
//     );
//   }
// }

// /**
//  * Server action to refresh authentication token
//  */
// export async function refreshTokenAction(): Promise<ResponseHandlerResult<{ message: string }>> {
//   try {
//     const response = await AuthApiService.refreshToken();

//     if (ResponseHandler.isSuccess(response)) {
//       const { accessToken, refreshToken } = response.data;

//       // Update cookies with new tokens
//       await setCookie('token', accessToken);
//       await setCookie('refreshToken', refreshToken);

//       return ResponseHandler.createSuccess(
//         { message: 'Token refreshed successfully' },
//         response.message || 'Token refreshed successfully'
//       );
//     }

//     // Convert error response to expected format
//     return ResponseHandler.createError(
//       response.message || 'Token refresh failed',
//       response.error?.code || 'BUSINESS_ERROR'
//     );
//   } catch (error) {
//     console.error('Refresh token action error:', error);
//     return ResponseHandler.createError(
//       'Failed to refresh token',
//       'NETWORK_ERROR'
//     );
//   }
// }

// /**
//  * Server action to redirect to admin dashboard after successful login
//  */
// export async function redirectToAdminDashboard() {
//   redirect('/admin');
// }

// /**
//  * Server action to redirect to login page
//  */
// export async function redirectToLogin() {
//   redirect('/login');
// } 