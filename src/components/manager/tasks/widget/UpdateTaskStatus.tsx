'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, TaskStatus } from '@/types/task';
import { updateTaskStatusAction } from '@/actions/task';
import { errorToast, successToast } from '@/components/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Circle, RefreshCw, Eye, CheckCircle, XCircle } from 'lucide-react';

interface UpdateTaskStatusProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

// Status color configurations
const TASK_STATUS_CONFIG = {
  [TaskStatus.TODO]: {
    label: 'To Do',
    variant: 'secondary' as const,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: Circle
  },
  [TaskStatus.IN_PROGRESS]: {
    label: 'In Progress',
    variant: 'default' as const,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: RefreshCw
  },
  [TaskStatus.REVIEW]: {
    label: 'Review',
    variant: 'outline' as const,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Eye
  },
  [TaskStatus.COMPLETED]: {
    label: 'Completed',
    variant: 'default' as const,
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle
  },
  [TaskStatus.CANCELLED]: {
    label: 'Cancelled',
    variant: 'destructive' as const,
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle
  }
} as const;

export default function UpdateTaskStatus({ task, onStatusChange }: UpdateTaskStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(task.status);

  useEffect(() => {
    setCurrentStatus(task.status);
  }, [task.status]);


  const getStatusBadge = (status: TaskStatus) => {
    const config = TASK_STATUS_CONFIG[status];
    const IconComponent = config.icon;
    return (
      <Badge 
        // variant={config.variant}
        className={`${config.color} border-none rounded-lg w-fit h-fit py-1 px-2`}
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getStatusLabel = (status: TaskStatus) => {
    const config = TASK_STATUS_CONFIG[status];
    // const IconComponent = config.icon;
    return (
      <div className="flex items-center gap-2">
        {/* <IconComponent className="h-4 w-4" /> */}
        {config.label}
      </div>
    );
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    
    try {
      const result = await updateTaskStatusAction(task._id, newStatus);

      if (result.success) {
        setCurrentStatus(newStatus as TaskStatus);
        successToast('Task status updated successfully');
        onStatusChange?.(task._id, newStatus as TaskStatus);
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
        <SelectTrigger className="w-fit bg-background p-0 h-fit border-none" showIcon={false}>
          <SelectValue className='w-fit border-none'>
            {getStatusBadge(currentStatus)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.values(TaskStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {getStatusLabel(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 