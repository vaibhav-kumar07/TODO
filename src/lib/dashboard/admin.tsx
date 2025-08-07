import * as FetchUtils from "../common/fetch-utils";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`;

export async function getLoginCount() {
  const response = await FetchUtils.get(`${API_BASE_URL}/login-count`, {
    isWithToken: true,
  });
  return response;
}

export async function getDashboardStats() {
  const response = await FetchUtils.get(`${API_BASE_URL}/stats`, {
    isWithToken: true,
  });
  return response;
}

export async function getUserActivity() {
  const response = await FetchUtils.get(`${API_BASE_URL}/user-activity`, {
    isWithToken: true,
  });
  return response;
}
