'use server';

import { AuthApiService } from '@/lib/auth-api';
import { LoginCredentials } from '@/types/auth';
import { deleteCookie } from '@/lib/common/cookie-utils';
import { redirect } from 'next/navigation';
import { ResponseHandlerResult } from '@/types/common';
import { ICookieKeys } from '@/types/common';


export async function AdminLoginAction(credentials: LoginCredentials): Promise<ResponseHandlerResult<{ accessToken:string, refreshToken:string, user:any }>> {
    const response = await AuthApiService.login(credentials); 
    return response;
}


export async function logoutAction(): Promise<ResponseHandlerResult<{ message: string }>> {
  try {
    // Clear all auth cookies
    await deleteCookie(ICookieKeys.TOKEN);
    await deleteCookie(ICookieKeys.REFRESH_TOKEN);
    await deleteCookie(ICookieKeys.USER_ROLE);

    return {
      success: true,
      data: { message: 'Logout successful' },
      message: 'Logout completed successfully'
    };
  } catch (error) {
    console.error('Logout action error:', error);
    
    // Clear cookies even if there's an error
    await deleteCookie(ICookieKeys.TOKEN);
    await deleteCookie(ICookieKeys.REFRESH_TOKEN);
    await deleteCookie(ICookieKeys.USER_ROLE);

    return {
      success: true,
      data: { message: 'Logout completed' },
      message: 'Logout completed'
    };
  }
}
