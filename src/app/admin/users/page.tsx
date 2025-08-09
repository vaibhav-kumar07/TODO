import { UserRole } from "@/types/auth";
import UsersPage from "@/components/users/UsersPage";

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
  return <UsersPage requiredRole={UserRole.ADMIN} searchParams={searchParams} />;
}
