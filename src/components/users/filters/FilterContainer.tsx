
import React from 'react';
import RoleFilter from './RoleFilter';
import StatusFilter from '../../common/filters/StatusFilter';
import SearchFilter from '../../common/filters/SearchFilter';
import AllFilter from '../../common/filters/AllFilter';
import { ICookieKeys } from '@/types/common';
import { getCookieValue } from '@/lib/common/cookie-utils';
import RoleBasedWrapper from '@/components/common/RoleBasedWrapper';
import { UserRole } from '@/types/auth';


export default async function FilterContainer() {
  let finalUserRole = null;
  if (!finalUserRole) {
    try {
      finalUserRole = await getCookieValue(ICookieKeys.USER_ROLE);
    } catch (error) {
      console.error('Error getting user role from cookie:', error);
      finalUserRole = null;
    }
  }

  return (
    <div className="flex items-center  border-border px-2 py-1">
      <div className='flex items-center gap-2'>
        <AllFilter />
        <RoleFilter userRole={finalUserRole} />
        <RoleBasedWrapper allowedRoles={[UserRole.MANAGER]}>
          <StatusFilter />
        </RoleBasedWrapper>
      </div>
      <SearchFilter className='ml-auto' />
    </div>
  );
} 