import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys } from "@/types/common";
import { redirect } from "next/navigation";
import UserManagementHeader from "@/components/users/UserManagementHeader";
import UserTable from "@/components/users/UserTable";
import FilterContainer from "@/components/users/filters/FilterContainer";
import { getAllUsers } from "@/lib/user-api";
import { paginationLimit } from "@/types/common";
import { UserRole } from "@/types/auth";
import Pagination from "@/components/common/pagination/Pagination";

interface UserManagementPageProps {
  searchParams: Promise<{
    role?: string;
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
    userRole.toLowerCase() !== UserRole.ADMIN.toString().toLowerCase()
  ) {
    redirect("/login");
  }

  const { role, isActive, search, page } = await searchParams;
  const filterParams = {
    role: role as any,
    isActive:
      isActive === "true" ? true : isActive === "false" ? false : undefined,
    search: search || undefined,
    page: parseInt(page || "1"),
    limit: paginationLimit.LIMIT_10,
  };

  const usersResponse = await getAllUsers(filterParams);
  const users = usersResponse.success ? usersResponse.data?.users || [] : [];

  return (
    <div className="  px-4">
      <UserManagementHeader
        title="User Management"
        description="Create and manage users for your team "
      />
      <div className="border rounded-lg  sm:p-0 ">
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
