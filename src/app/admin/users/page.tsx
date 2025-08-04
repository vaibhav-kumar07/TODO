import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { redirect } from 'next/navigation';
import UserManagementHeader from '@/components/admin/users/UserManagementHeader';
import UserTable from '@/components/admin/users/UserTable';
import FilterContainer from '@/components/admin/users/filters/FilterContainer';
import { getAllUsers } from '@/lib/user-api';
import { SortOrder } from '@/types/common';

interface UserManagementPageProps {
  searchParams: {
    role?: string;
    isActive?: string;
    search?: string;
  };
}

export default async function UserManagementPage({ searchParams }: UserManagementPageProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
  
  if (!token || !userRole || userRole !== 'ADMIN') {
    redirect('/login');
  }

  // Parse URL parameters
  const role = searchParams.role || undefined;
  const isActive = searchParams.isActive !== undefined ? searchParams.isActive === 'true' : undefined;
  const search = searchParams.search || undefined;

  // Build filter parameters
  const filterParams = {
    role: role as any,
    isActive,
    search: search || undefined,
    page: 1,
    limit: 20,
    // sortBy: 'createdAt',
    // sortOrder: SortOrder.DESC,
  };

  const usersResponse = await getAllUsers(filterParams);

  const users = usersResponse.success ? usersResponse.data?.users || [] : [];

  return (
    <div className="space-y-6 py-8 px-4">
      <UserManagementHeader />
     
      <div className="border rounded-lg">
      <FilterContainer />
        <UserTable users={users} className='rounded-b-lg border border-border'/>
      </div>
    </div>
  );
} 