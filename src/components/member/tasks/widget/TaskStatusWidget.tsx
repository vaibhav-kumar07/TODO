import { TaskStatus } from '@/types/task';
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TaskStatusWidgetProps {
  status: string;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case TaskStatus.IN_PROGRESS:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case TaskStatus.REVIEW:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case TaskStatus.COMPLETED:
      return 'bg-green-100 text-green-800 border-green-200';
    case TaskStatus.CANCELLED:
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusLabel = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return 'To Do';
    case TaskStatus.IN_PROGRESS:
      return 'In Progress';
    case TaskStatus.REVIEW:
      return 'Review';
    case TaskStatus.COMPLETED:
      return 'Completed';
    case TaskStatus.CANCELLED:
      return 'Cancelled';
    default:
      return status;
  }
};

export default function TaskStatusWidget({ status }: TaskStatusWidgetProps) {
  const statusColor = getStatusColor(status as TaskStatus);
  const statusLabel = getStatusLabel(status as TaskStatus);

  return (
    <Badge 
      variant="outline" 
      className={`${statusColor} text-xs font-medium px-2 py-1 rounded-md`}
    >
      {statusLabel}
    </Badge>
  );
} 