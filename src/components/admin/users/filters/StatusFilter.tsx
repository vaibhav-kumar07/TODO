'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommonButton from '@/components/common/Button';

interface StatusFilterProps {
  className?: string;
}

export default function StatusFilter({ className }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);

  // Initialize from URL params
  useEffect(() => {
    const statusParam = searchParams.get('isActive');
    setStatus(statusParam || null);
  }, [searchParams]);

  // Handle status change
  const handleStatusChange = (value: string) => {
    setStatus(value);
    
    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (value ) {
      params.set('isActive', value);
    } else {
      params.delete('isActive');
    }
    
    router.push(`?${params.toString()}`);
  };

  const statusOptions = [
    // { value: 'all', label: 'All Status' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' }
  ];

  return (
    <div className='flex items-center gap-2'>
      {statusOptions.map((option) => (
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