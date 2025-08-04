import "server-only";
import { ICookieKeys } from "@/types/common";
import { redirect } from "next/navigation";
import { deleteCookieValue, getCookieValueAction } from "@/actions/cookie-action";
import { refreshTokenAction } from "@/actions/auth";

export type RequestOptions = {
  isWithToken: boolean;
};

// Refresh token function
const refreshToken = async (): Promise<boolean> => {
  try {
    const result = await refreshTokenAction();
    return result.success;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

const fetchRequest = async (
  url: string,
  method: string,
  body: any,
  requestOption: RequestOptions
) => {
  const requestInput: any = await _getRequestInput(
    method,
    body,
    requestOption
  );
  console.log(`Request ${method} to ${url}`, "debug", body, requestInput);

  const response = await fetch(url, requestInput);
  const responseData = await response.json();
  console.log("responseData", responseData);
  
  // Handle 401 Unauthorized - try to refresh token
  if (response.status === 401 && requestOption.isWithToken) {
    console.log("Received 401, attempting token refresh...");
    
    const refreshSuccess = await refreshToken();
    
    if (refreshSuccess) {
      console.log("Token refreshed successfully, retrying original request...");
      
      // Retry the original request with new token
      const retryRequestInput = await _getRequestInput(method, body, requestOption);
      const retryResponse = await fetch(url, retryRequestInput);
      const retryResponseData = await retryResponse.json();
      
      console.log("Retry responseData", retryResponseData);
      return retryResponseData;
    } else {
      console.log("Token refresh failed, clearing cookies and redirecting to login");
      
      // Clear all auth cookies on refresh failure
      await deleteCookieValue(ICookieKeys.TOKEN);
      await deleteCookieValue(ICookieKeys.REFRESH_TOKEN);
      await deleteCookieValue(ICookieKeys.USER_ROLE);   
      redirect('/login');
    }
  }
  
  return responseData;
};

// HTTP Methods
export const get = async (url: string, requestOptions: RequestOptions) =>
  fetchRequest(url, "GET", null, requestOptions);

export const post = async (
  url: string,
  body: any,
  requestOption: RequestOptions
) => fetchRequest(url, "POST", body, requestOption);

export const patch = async (
  url: string,
  body: any,
  requestOption: RequestOptions
) => fetchRequest(url, "PATCH", body, requestOption);

export const put = async (
  url: string,
  body: any,
  requestOption: RequestOptions
) => fetchRequest(url, "PUT", body, requestOption);

export const deleteData = async (
  url: string,
  requestOption: RequestOptions,
  body?: any
) => fetchRequest(url, "DELETE", body, requestOption);

// Request Config Helper
const _getRequestInput = async (
  method: string,
  body: any,
  options: RequestOptions
) => {
  const requestInput: any = { method };

  if (body) requestInput.body = JSON.stringify(body);
  if (options.isWithToken) {
    const token = await _getAccessToken();
    if (!token) throw new Error("Token not found");
    requestInput.headers = { Authorization: `Bearer ${token}` };
  }

  requestInput.headers = {
    "Content-Type": "application/json",
    ...requestInput.headers,
  };

  return requestInput;
};

// Get Token
export const _getAccessToken = async (): Promise<string> => {
  const result = await getCookieValueAction(ICookieKeys.TOKEN);
  return result.value;
};