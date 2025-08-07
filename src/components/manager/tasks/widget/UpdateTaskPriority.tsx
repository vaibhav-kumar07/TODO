'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Task, TaskPriority } from '@/types/task';
import { updateTaskAction } from '@/actions/task';
import { successToast, errorToast } from '@/components/hooks/use-toast';
import { Circle, AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface UpdateTaskPriorityProps {
  task: Task;
}

const PRIORITY_CONFIG = {
  [TaskPriority.LOW]: {
    label: 'Low',
    variant: 'secondary' as const,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: Circle
  },
  [TaskPriority.MEDIUM]: {
    label: 'Medium',
    variant: 'default' as const,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: AlertCircle
  },
  [TaskPriority.HIGH]: {
    label: 'High',
    variant: 'outline' as const,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: AlertTriangle
  }
} as const;

export default function UpdateTaskPriority({ task }: UpdateTaskPriorityProps) {
  const [currentPriority, setCurrentPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
  const normalizedPriority = task.priority?.toUpperCase() as TaskPriority
    setCurrentPriority(normalizedPriority);
  }, [task]);


  const handlePriorityChange = async (newPriority: TaskPriority) => {
    if (newPriority === currentPriority) return;
    
    setIsLoading(true);
    try {
      const result = await updateTaskAction(task._id, { priority: newPriority });
      if (result.success) {
        setCurrentPriority(newPriority);
        successToast('Task priority has been updated successfully.');
      } else {
        errorToast(result.error || 'Failed to update task priority.');
      }
    } catch (error) {
      errorToast('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    const config = PRIORITY_CONFIG[priority];
    if (!config) {
      // Fallback to medium if priority is not found
      const fallbackConfig = PRIORITY_CONFIG[TaskPriority.MEDIUM];
      const IconComponent = fallbackConfig.icon;
      console.log("fallbackConfig :",fallbackConfig)
      return (
        <Badge
          // variant={fallbackConfig.variant}
          className={`${fallbackConfig.color} border-none rounded-lg w-fit h-fit py-1 px-2`}
        >
          <IconComponent className="h-3 w-3 mr-1" />
          {fallbackConfig.label}
        </Badge>
      );
    }
    const IconComponent = config.icon;
    return (
      <Badge
        variant={config.variant}
        className={`${config.color} border-none rounded-lg w-fit h-fit py-1 px-2`}
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    const config = PRIORITY_CONFIG[priority];
    if (!config) {
      // Fallback to medium if priority is not found
      const fallbackConfig = PRIORITY_CONFIG[TaskPriority.MEDIUM];
      const IconComponent = fallbackConfig.icon;
      return (
        <div className="flex items-center gap-2">
          <IconComponent className="h-4 w-4" />
          {fallbackConfig.label}
        </div>
      );
    }
    const IconComponent = config.icon;
    return (
      <div className="flex items-center gap-2">
        <IconComponent className="h-4 w-4" />
        {config.label}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentPriority}
        onValueChange={handlePriorityChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-fit bg-background p-0 h-fit border-none " showIcon={false}>
          <SelectValue className='w-fit border-none'>
            {getPriorityBadge(currentPriority)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.values(TaskPriority).map((priority) => (
            <SelectItem key={priority} value={priority}>
              {getPriorityLabel(priority)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 