'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommonButton from '@/components/common/Button';
import { TaskStatus } from '@/types/task';

interface StatusFilterProps {
  className?: string;
}

export default function StatusFilter({ className }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);

  // Validate if the status value is valid
  const isValidStatus = (statusValue: string): boolean => {
    return Object.values(TaskStatus).includes(statusValue as TaskStatus);
  };

  // Initialize from URL params with validation
  useEffect(() => {
    const statusParam = searchParams.get('status');
    
    if (statusParam) {
      // Check if the status value is valid
      if (isValidStatus(statusParam)) {
        setStatus(statusParam);
      } else {
        // Remove invalid status from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete('status');
        router.replace(`?${params.toString()}`);
        setStatus(null);
        console.warn('Invalid status value removed from URL:', statusParam);
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
      params.set('status', value);
    } else {
      params.delete('status');
    }
    
    router.push(`?${params.toString()}`);
  };

  const statusOptions = [
    { value: TaskStatus.TODO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.REVIEW, label: 'Review' },
    { value: TaskStatus.COMPLETED, label: 'Completed' },
    { value: TaskStatus.CANCELLED, label: 'Cancelled' }
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