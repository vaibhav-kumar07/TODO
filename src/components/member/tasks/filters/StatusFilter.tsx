'use client';

import React, { useState } from 'react';
import CommonButton from '@/components/common/Button';
import { TaskStatus, TaskFilters } from '@/types/task';

interface StatusFilterProps {
  className?: string;
  onFilterChange: (filters: Partial<TaskFilters>) => void;
}

export default function StatusFilter({ className, onFilterChange }: StatusFilterProps) {
  const [status, setStatus] = useState<TaskStatus | null>(null);

  const handleStatusChange = (value: TaskStatus) => {
    const newStatus = status === value ? null : value;
    setStatus(newStatus);
    onFilterChange({ status: newStatus || undefined });
  };

  const statusOptions = [
    { value: TaskStatus.TODO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.REVIEW, label: 'Review' },
    { value: TaskStatus.COMPLETED, label: 'Completed' },
    { value: TaskStatus.CANCELLED, label: 'Cancelled' }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
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