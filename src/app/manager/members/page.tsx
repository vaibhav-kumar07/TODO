import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys, paginationLimit } from "@/types/common";
import { redirect } from "next/navigation";
import UserManagementHeader from "@/components/users/UserManagementHeader";
import UserTable from "@/components/users/UserTable";
import FilterContainer from "@/components/users/filters/FilterContainer";
import { getAllUsers } from "@/lib/user-api";
import { UserRole } from "@/types/auth";

interface UserManagementPageProps {
  searchParams: Promise<{
    role?: UserRole.MEMBER | UserRole.MANAGER;
    isActive?: string;
    search?: string;
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

  const { role, isActive, search } = await searchParams;
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
    page: 1,
    limit: paginationLimit.LIMIT_10,
  };

  const usersResponse = await getAllUsers(filterParams);
  const users = usersResponse.success ? usersResponse.data?.users || [] : [];
  return (
    <div className="space-y-4 px-4">
      <UserManagementHeader
        title="User Management"
        description="Create and manage users for your team members"
      />
      <div className="border rounded-xl">
        <FilterContainer />
        <UserTable users={users} className="rounded-y-xl" />
      </div>
    </div>
  );
}
