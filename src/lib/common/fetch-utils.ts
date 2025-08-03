import "server-only";
import { getCookieValue } from "@/lib/common/cookie-utils";
import { ErrorCodes, ICookieKeys } from "@/types/common";
import { ResponseHandler } from "./response-handler";

export type RequestOptions = {
  isWithToken: boolean;
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
    return ResponseHandler.handleResponse(response, responseData);
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
export const _getAccessToken = async (): Promise<string> =>
  await getCookieValue(ICookieKeys.TOKEN);