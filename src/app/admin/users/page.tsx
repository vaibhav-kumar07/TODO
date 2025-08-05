import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { redirect } from 'next/navigation';
import UserManagementHeader from '@/components/admin/users/UserManagementHeader';
import UserTable from '@/components/admin/users/UserTable';
import FilterContainer from '@/components/admin/users/filters/FilterContainer';
import { getAllUsers } from '@/lib/user-api';
import { paginationLimit } from '@/types/common';
import { UserRole } from '@/types/auth';

interface UserManagementPageProps {
  searchParams: Promise<{
    role?: string;
    isActive?: string;
    search?: string;
  }>;
}

export default async function UserManagementPage({ searchParams }: UserManagementPageProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
  
  if (!token || !userRole || userRole.toLowerCase() !== UserRole.ADMIN.toString().toLowerCase()) {
    redirect('/login');
  }

  const {role, isActive, search} = await searchParams;
  const filterParams = {
    role: role as any,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    search: search || undefined,
    page: 1,
    limit: paginationLimit.LIMIT_10
  };

  const usersResponse = await getAllUsers(filterParams);
  const users = usersResponse.success ? usersResponse.data?.users || [] : [];

  return (
    <div className="space-y-4  px-4">
      <UserManagementHeader />
      <div className="border rounded-lg">
        <FilterContainer  />
        <UserTable users={users} className='rounded-lg  border-none'/>
      </div>
    </div>
  );
} 