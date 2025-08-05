'use client';

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, TaskStatus } from '@/types/task';
import { updateTaskStatusAction } from '@/actions/task';
import { errorToast, successToast } from '@/components/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface UpdateTaskStatusProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

export default function UpdateTaskStatus({ task, onStatusChange }: UpdateTaskStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(task.status);

  const getStatusBadge = (status: TaskStatus) => {
    const statusConfig = {
      [TaskStatus.TODO]: { variant: 'secondary' as const, label: 'To Do' },
      [TaskStatus.IN_PROGRESS]: { variant: 'default' as const, label: 'In Progress' },
      [TaskStatus.REVIEW]: { variant: 'outline' as const, label: 'Review' },
      [TaskStatus.COMPLETED]: { variant: 'default' as const, label: 'Completed' },
      [TaskStatus.CANCELLED]: { variant: 'destructive' as const, label: 'Cancelled' },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    
    try {
      const result = await updateTaskStatusAction(task.id, newStatus);

      if (result.success) {
        setCurrentStatus(newStatus as TaskStatus);
        successToast('Task status updated successfully');
        onStatusChange?.(task.id, newStatus as TaskStatus);
      } else {
        // Revert the status if the API call failed
        setCurrentStatus(task.status);
        errorToast(result.message || 'Failed to update task status');
      }
    } catch (error) {
      // Revert the status if there was an error
      setCurrentStatus(task.status);
      errorToast('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentStatus}
        onValueChange={handleStatusChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.values(TaskStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {getStatusBadge(status).props.children}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 