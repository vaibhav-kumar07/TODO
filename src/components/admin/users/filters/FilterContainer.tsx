
import React from 'react';
import RoleFilter from './RoleFilter';
import StatusFilter from './StatusFilter';
import SearchFilter from './SearchFilter';
import AllFilter from './AllFilter';
import { ICookieKeys } from '@/types/common';
import { getCookieValue } from '@/lib/common/cookie-utils';


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
    <div className="flex items-center  border-t-lg rounded-t-lg border-border px-2 py-1">
     <div className='flex items-center gap-2'>
         <AllFilter />
         <RoleFilter userRole={finalUserRole} />
         <StatusFilter  />
     </div>
     <SearchFilter className='ml-auto' />
    </div>
  );
} 