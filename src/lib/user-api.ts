import * as FetchUtils from "./common/fetch-utils";
import qs from "query-string";
import { UserRole } from "@/types/auth";
import { QueryParameters, SortOrder } from "@/types/common";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || 'http://localhost:3001';

export interface User {
  id: string;                    
  email: string;                 
  firstName: string;             
  lastName: string;              
  role: UserRole      
  isActive: boolean;             
  invitedBy?: string;            
  invitedAt?: Date;              
  createdAt: Date;               
  updatedAt: Date;               
}

export interface IUserParams {
  role?: UserRole;
  isActive?: boolean | string | undefined;
  search?: string;
  invitedBy?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export enum IUserFilterKey {
  ROLE = "role",
  IS_ACTIVE = "isActive",
  SEARCH = "search",
  INVITED_BY = "invitedBy",
  PAGE = "page",
}

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

const buildUserQueryString = (params: IUserParams) => {
  const queryParams: QueryParameters = {};
  if (params.role) queryParams["role"] = params.role;
  if (params.isActive !== undefined) queryParams["isActive"] = params.isActive.toString();
  if (params.search) queryParams["search"] = params.search;
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

export async function getAllUsers(params: IUserParams = {}) {
  const queryString = buildUserQueryString(params);
  return await FetchUtils.get(`${API_BASE_URL}/auth/users?${queryString}`, {
    isWithToken: true,
  });
}

export async function getUserById(userId: string) {
  return await FetchUtils.get(`${API_BASE_URL}/auth/users/${userId}`, {
    isWithToken: true,
  });
}

export async function createUser(userData: {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}) {
  return await FetchUtils.post(`${API_BASE_URL}/auth/invite`, userData, {
    isWithToken: true,
  });
}

export async function updateUser(userId: string, userData: Partial<User>) {
  return await FetchUtils.put(`${API_BASE_URL}/auth/users/${userId}`, userData, {
    isWithToken: true,
  });
  
}

export async function changeUserPassword(userId: string, newPassword: string) {
  return await FetchUtils.put(`${API_BASE_URL}/auth/admin/users/${userId}/password`, {
    newPassword
  }, {
    isWithToken: true,
  });
}

export async function deleteUser(userId: string) {
  return await FetchUtils.deleteData(`${API_BASE_URL}/auth/users/${userId}`, {
    isWithToken: true,
  });
}

// Admin-specific delete endpoint (POST)
export async function adminDeleteUser(userId: string) {
  return await FetchUtils.post(
    `${API_BASE_URL}/auth/admin/users/${userId}/delete`,
    {},
    { isWithToken: true }
  );
}