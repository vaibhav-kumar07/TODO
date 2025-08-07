import { get } from "@/lib/common/fetch-utils";
import { ManagerStats, ManagerActivityData } from "@/types/dashboard";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/manager`;

export async function getManagerDashboardStats(): Promise<ManagerStats> {
  const response = await get(`${API_BASE_URL}/stats`, { isWithToken: true });
//   console.log("response", response);
  return response.data;
}

export async function getManagerActivity(): Promise<ManagerActivityData> {
  const response = await get(`${API_BASE_URL}/activity`, { isWithToken: true });
  return response.data;
}