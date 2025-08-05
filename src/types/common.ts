
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

export interface QueryParameters {
  [key: string]: string | string[] | number | boolean | undefined;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export const ICookieKeys = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'role',
  USER_ID: 'userId',
} as const;

export const ErrorCodes = {
  BUSINESS_ERROR: 'BUSINESS_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
 
} as const;

export interface ResponseHandlerResult<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    description: string;
  };
  
}

export enum paginationLimit{
  LIMIT_5=5,
  LIMIT_10=10,
  LIMIT_20=20,
  LIMIT_50=50
}
