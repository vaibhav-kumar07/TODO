import * as FetchUtils from "./common/client-fetch-utils";
import qs from "query-string";
import { UserRole } from "@/types/auth";
import { QueryParameters, SortOrder } from "@/types/common";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || 'http://localhost:3001';

// Enums for filter values
export enum UserView {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
  BY_ROLE = 'BY_ROLE'
}

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  teamId?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  invitedBy?: string;
  invitedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Filter parameters interface
export interface IUserParams {
  view?: UserView;
  role?: UserRole;
  teamId?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  search?: string;
  invitedBy?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

// Response interface
export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: Partial<IUserParams>;
}

// Build query string for user filters
const buildUserQueryString = (params: IUserParams) => {
  const queryParams: QueryParameters = {};
  if (params.view) queryParams["view"] = params.view;
  if (params.role) queryParams["role"] = params.role;
  if (params.teamId) queryParams["teamId"] = params.teamId;
  if (params.isActive !== undefined) queryParams["isActive"] = params.isActive.toString();
  if (params.isEmailVerified !== undefined) queryParams["isEmailVerified"] = params.isEmailVerified.toString();
  if (params.search) queryParams["search"] = params.search;
  if (params.invitedBy) queryParams["invitedBy"] = params.invitedBy;
  if (params.page) queryParams["page"] = params.page.toString();
  if (params.limit) queryParams["limit"] = params.limit.toString();
  if (params.sortBy) queryParams["sortBy"] = params.sortBy;
  if (params.sortOrder) queryParams["sortOrder"] = params.sortOrder;

  return qs.stringify(queryParams, {
    arrayFormat: "comma",
    skipNull: true,
    skipEmptyString: true,
    encode: false,
  });
};

// Get all users with filters (client-side)
export async function getAllUsers(params: IUserParams = {}) {
  const queryString = buildUserQueryString(params);
  const url = `${API_BASE_URL}/auth/users${queryString ? `?${queryString}` : ''}`;
  const response = await FetchUtils.get(url, { isWithToken: true });
  return response;
}

// Get user by ID (client-side)
export async function getUserById(userId: string) {
  const response = await FetchUtils.get(`${API_BASE_URL}/auth/users/${userId}`, { isWithToken: true });
  return response;
}

// Create new user (client-side)
export async function createUser(userData: {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}) {
  const response = await FetchUtils.post(`${API_BASE_URL}/auth/invite`, userData, { isWithToken: true });
  return response;
}

// Update user (client-side)
export async function updateUser(userId: string, userData: Partial<User>) {
  const response = await FetchUtils.put(`${API_BASE_URL}/auth/admin/update-user/${userId}`, userData, { isWithToken: true });
  return response;
}

// Delete user (client-side)
export async function deleteUser(userId: string) {
  const response = await FetchUtils.deleteData(`${API_BASE_URL}/auth/users/${userId}`, { isWithToken: true });
  return response;
}

// Activate/Deactivate user (client-side)
export async function toggleUserStatus(userId: string, isActive: boolean) {
  const response = await FetchUtils.patch(`${API_BASE_URL}/auth/users/${userId}/status`, { isActive }, { isWithToken: true });
  return response;
}

// Resend invitation (client-side)
export async function resendInvitation(userId: string) {
  const response = await FetchUtils.post(`${API_BASE_URL}/auth/users/${userId}/resend-invitation`, {}, { isWithToken: true });
  return response;
} 