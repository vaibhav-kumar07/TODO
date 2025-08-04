'use client';

import React, { useEffect, useState  } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RoleFilter from './RoleFilter';
import StatusFilter from './StatusFilter';
import CommonButton from '@/components/common/Button';
import SearchFilter from './SearchFilter';



export default function FilterContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Check if any filters are active
  const hasActiveFilters = () => {
    return searchParams.get('role') || searchParams.get('isActive') || searchParams.get('search');
  };  

  // Clear all filters
  const clearFilters = () => {
    router.push('/admin/users');
  };

  return (
    <div className="flex items-center  border-t-lg rounded-t-lg border-border px-2 py-1">
     <div className='flex items-center gap-2'>
     <CommonButton variant='outline' size='sm' className={`h-6 rounded-md text-xs text-muted-foreground ${hasActiveFilters() ? 'bg-primary text-primary-foreground' : ''}`} onClick={clearFilters} >
            All
        </CommonButton>
        <RoleFilter />
        <StatusFilter />
     </div>
     <SearchFilter className='ml-auto' />
    </div>
  );
} 