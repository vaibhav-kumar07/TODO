import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys, paginationLimit } from "@/types/common";
import { redirect } from "next/navigation";
import UserManagementHeader from "@/components/users/UserManagementHeader";
import UserTable from "@/components/users/UserTable";
import FilterContainer from "@/components/users/filters/FilterContainer";
import { getAllUsers } from "@/lib/user-api";
import Pagination from "@/components/common/pagination/Pagination";
import { UserRole } from "@/types/auth";

type SearchParamsShape = {
  role?: string;
  isActive?: string;
  search?: string;
  page?: string;
};

interface UsersPageProps {
  requiredRole: UserRole;
  searchParams: Promise<SearchParamsShape>;
  title?: string;
  description?: string;
}

function normalizeRole(value?: string): UserRole | undefined {
  if (!value) return undefined;
  const v = value.toString().toLowerCase();
  if (v === UserRole.ADMIN.toLowerCase()) return UserRole.ADMIN;
  if (v === UserRole.MANAGER.toLowerCase()) return UserRole.MANAGER;
  if (v === UserRole.MEMBER.toLowerCase()) return UserRole.MEMBER;
  return undefined;
}

function parseBoolean(value?: string): boolean | undefined {
  if (value === undefined) return undefined;
  if (value?.toLowerCase() === "true") return true;
  if (value?.toLowerCase() === "false") return false;
  return undefined;
}

export default async function UsersPage({
  requiredRole,
  searchParams,
  title = "User Management",
  description = "Create and manage users for your team ",
}: UsersPageProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);

  if (!token || !userRole || userRole.toLowerCase() !== requiredRole.toLowerCase()) {
    redirect("/login");
  }

  const { role, isActive, search, page } = await searchParams;

  const normalizedRole = normalizeRole(role);
  const filterParams = {
    role: normalizedRole as any,
    isActive: parseBoolean(isActive),
    search: search || undefined,
    page: parseInt(page || "1"),
    limit: paginationLimit.LIMIT_10,
  };

  const usersResponse = await getAllUsers(filterParams);
  const users = usersResponse.success ? usersResponse.data?.users || [] : [];

  return (
    <div className="p-0  md:px-4 md:py-6">
      <UserManagementHeader title={title} description={description} />
      <div className="md:border rounded-lg  sm:p-0 pt-2 ">
        <FilterContainer />
        <UserTable users={users} className="rounded-lg  border-none p-4 sm:p-0 " rowClassName="p-2" />
      </div>
      <Pagination recordCount={usersResponse.data?.pagination?.total || 0} className="p-4" />
    </div>
  );
}


