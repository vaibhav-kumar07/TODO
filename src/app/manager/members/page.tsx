import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys, paginationLimit } from "@/types/common";
import { redirect } from "next/navigation";
import UserManagementHeader from "@/components/users/UserManagementHeader";
import UserTable from "@/components/users/UserTable";
import FilterContainer from "@/components/users/filters/FilterContainer";
import { getAllUsers } from "@/lib/user-api";
import { UserRole } from "@/types/auth";
import Pagination from "@/components/common/pagination/Pagination";

interface UserManagementPageProps {
  searchParams: Promise<{
    role?: UserRole.MEMBER | UserRole.MANAGER;
    isActive?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function UserManagementPage({
  searchParams,
}: UserManagementPageProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);

  if (
    !token ||
    !userRole ||
    userRole.toLowerCase() !== UserRole.MANAGER.toString().toLowerCase()
  )
    redirect("/login");

  const { role, isActive, search, page } = await searchParams;
  const finalRole =
    role === UserRole.MEMBER
      ? UserRole.MEMBER
      : role === UserRole.MANAGER
      ? UserRole.MANAGER
      : undefined;
  const finalSearch = search || undefined;

  const filterParams = {
    role: finalRole as any,
    isActive,
    search: finalSearch,
    page: parseInt(page || "1"),
    limit: paginationLimit.LIMIT_10,
  };

  const usersResponse = await getAllUsers(filterParams);
  const users = usersResponse.success ? usersResponse.data?.users || [] : [];
  return (
    <div className="p-0  md:px-4 md:py-4">
      <UserManagementHeader
        title="User Management"
        description="Create and manage users for your team "
        
      />
      <div className="md:border rounded-lg  sm:p-0 pt-2 ">
        <FilterContainer />
        <UserTable
          users={users}
          className="rounded-lg  border-none p-4 sm:p-0 "
          rowClassName="p-2"
        />
      </div>
      <Pagination
        recordCount={usersResponse.data?.pagination?.total || 0}
        className="p-4"
      />
    </div>
  );
}
