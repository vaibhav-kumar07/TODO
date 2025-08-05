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

  // Validate if the status value is valid (only 'true' or 'false')
  const isValidStatus = (statusValue: string): boolean => {
    return statusValue === 'true' || statusValue === 'false';
  };

  // Initialize from URL params with validation
  useEffect(() => {
    const statusParam = searchParams.get('isActive');
    
    if (statusParam) {
      // Check if the status value is valid
      if (isValidStatus(statusParam)) {
        setStatus(statusParam);
      } else {
        // Remove invalid status from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete('isActive');
        router.replace(`?${params.toString()}`);
        setStatus(null);
        console.warn('Invalid isActive value removed from URL:', statusParam);
      }
    } else {
      setStatus(null);
    }
  }, [searchParams, router]);

  // Handle status change
  const handleStatusChange = (value: string) => {
    // Validate that the value is valid
    if (!isValidStatus(value)) {
      console.warn('Invalid status value attempted:', value);
      return;
    }

    setStatus(value);
    
    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('isActive', value);
    } else {
      params.delete('isActive');
    }
    
    router.push(`?${params.toString()}`);
  };

  const statusOptions = [
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