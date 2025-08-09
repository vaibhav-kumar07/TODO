import { UserRole } from "@/types/auth";
import UsersPage from "@/components/users/UsersPage";

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
  return (
    <UsersPage
      requiredRole={UserRole.MANAGER}
      searchParams={searchParams}
      title="User Management"
      description="Create and manage users for your team "
    />
  );
}
