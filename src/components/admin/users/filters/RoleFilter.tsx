'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommonButton from '@/components/common/Button';
import { UserRole } from '@/types/auth';

interface StatusFilterProps {
  className?: string;
}

export default function RoleFilter({ className }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);

  // Initialize from URL params
  useEffect(() => {
    const roleParam = searchParams.get('role');
    setStatus(roleParam || null);
  }, [searchParams]);

  // Handle status change
  const handleStatusChange = (value: string) => {
    setStatus(value);
    
    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (value ) {
      params.set('role', value);
    } else {
      params.delete('role');
    }
    
    router.push(`?${params.toString()}`);
  };

  const roleOptions = [
    // { value: 'all', label: 'All Roles' },
    { value: UserRole.ADMIN, label: 'Admin' },
    { value: UserRole.MANAGER, label: 'Manager' },
    { value: UserRole.MEMBER, label: 'Member' }
  ];

  return (
    <div className='flex items-center gap-2'>
      {roleOptions.map((option) => (
        <CommonButton 
          key={option.value} 
          variant='outline' 
          size='sm'  
          className={`h-6 rounded-md text-xs text-muted-foreground ${status === option.value ? 'bg-primary text-primary-foreground' : ''}`} 
          onClick={() => handleStatusChange(option.value)}
        >
          {option.label}
        </CommonButton>
      ))}
    </div>
  );
} 