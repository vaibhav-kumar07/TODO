'use server';

import { LoginCredentials } from '@/types/auth';
import { redirect } from 'next/navigation';
import { ResponseHandlerResult } from '@/types/common';
import { ICookieKeys } from '@/types/common';
import { AuthApiService } from '@/lib/auth-api';
import { deleteMultipleCookies, getCookieValueAction, setCookieValue } from './cookie-action';

export async function AdminLoginAction(credentials: LoginCredentials): Promise<ResponseHandlerResult<{ accessToken:string, refreshToken:string, user:any }>> {
    const response = await AuthApiService.login(credentials);
    return response;
}

export async function logoutAction(): Promise<ResponseHandlerResult<{ message: string }>> {
  try {
    await deleteMultipleCookies([ICookieKeys.TOKEN, ICookieKeys.REFRESH_TOKEN, ICookieKeys.USER_ROLE]);
    return {
      success: true,
      data: { message: 'Logout successful' },
      message: 'Logout completed successfully'
    };
  } catch (error) {
    await deleteMultipleCookies([ICookieKeys.TOKEN, ICookieKeys.REFRESH_TOKEN, ICookieKeys.USER_ROLE]);
    return {
      success: true,
      data: { message: 'Logout completed' },
      message: 'Logout completed'
    };
  }
}

export async function getProfileAction(): Promise<ResponseHandlerResult<any>> {
  try {
    const response = await AuthApiService.getProfile();
    if (response.success && response.data) {
      return { success: true, data: response.data, message: response.message || 'Profile retrieved successfully' };
    }
    return response;
  } catch (error) {
    console.error('Get profile action error:', error);
    return { success: false, message: 'Failed to get user profile', error: { code: 'NETWORK_ERROR', description: 'Network error occurred' } };
  }
}

export async function updateProfileAction(profileData: any): Promise<ResponseHandlerResult<any>> {
  try {
    const response = await AuthApiService.updateProfile(profileData);
    if (response.success && response.data) {
      return { success: true, data: response.data, message: response.message || 'Profile updated successfully' };
    }
    return response;
  } catch (error) {
    console.error('Update profile action error:', error);
    return { success: false, message: 'Failed to update user profile', error: { code: 'NETWORK_ERROR', description: 'Network error occurred' } };
  }
}

export async function refreshTokenAction(): Promise<ResponseHandlerResult<{ accessToken: string; refreshToken: string }>> {
    const refreshTokenResult = await getCookieValueAction(ICookieKeys.REFRESH_TOKEN);
    const refreshToken = refreshTokenResult.value;

    if (!refreshToken) {
     redirect('/login');
    }
    const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (response.ok) {
      const data = await response.json();
     
      await setCookieValue(ICookieKeys.TOKEN, data.accessToken);
      await setCookieValue(ICookieKeys.REFRESH_TOKEN, data.refreshToken);
      return {
        success: true,
        data: { accessToken: data.accessToken, refreshToken: data.refreshToken },
        message: 'Token refreshed successfully'
      };
    }
    
    return {
      success: false,
      message: 'Token refresh failed',
      error: { code: 'REFRESH_FAILED', description: 'Failed to refresh token' }
    };
  
}
