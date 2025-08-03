// Common API Response Types
export interface ApiSuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    description: string;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// Cookie Keys
export const ICookieKeys = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'role',
} as const;

// Common Error Codes
export const ErrorCodes = {
  BUSINESS_ERROR: 'BUSINESS_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
 
} as const;

// Common Response Handler
export interface ResponseHandlerResult<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    description: string;
  };
  
}