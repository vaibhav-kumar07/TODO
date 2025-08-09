"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskPriority, TaskStatus } from "@/types/task";
import { AlertCircle, AlertTriangle, CheckCircle, Circle, Eye, RefreshCw, XCircle } from "lucide-react";
import { Label } from "@radix-ui/react-label";

export const TASK_STATUS_STYLE: Record<
  TaskStatus,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  [TaskStatus.TODO]: {
    label: "To Do",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: Circle,
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: RefreshCw,
  },
  [TaskStatus.REVIEW]: {
    label: "Review",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Eye,
  },
  [TaskStatus.COMPLETED]: {
    label: "Completed",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  [TaskStatus.CANCELLED]: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
};

export const TASK_PRIORITY_STYLE: Record<
  TaskPriority,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  [TaskPriority.LOW]: {
    label: "Low",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: Circle,
  },
  [TaskPriority.MEDIUM]: {
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: AlertCircle,
  },
  [TaskPriority.HIGH]: {
    label: "High",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: AlertTriangle,
  },
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const cfg = TASK_STATUS_STYLE[status] ?? TASK_STATUS_STYLE[TaskStatus.TODO];
  const Icon = cfg.icon;
  return (
    <div className={`${cfg.color} border-none rounded-lg w-fit h-fit py-1 px-2 flex items-center gap-1`}>
      <Icon className="h-3 w-3 " />
    <Label className="text-xs font-medium">{cfg.label}</Label>
    </div>
  );
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const cfg = TASK_PRIORITY_STYLE[priority] ?? TASK_PRIORITY_STYLE[TaskPriority.MEDIUM];
  const Icon = cfg.icon;
  return (
    <div className={`${cfg.color} border-none rounded-lg w-fit h-fit py-1 px-2 flex items-center gap-1`}>
      <Icon className="h-3 w-3 " />
      <Label className="text-xs font-medium">{cfg.label}</Label>
    </div>
  );
}

export function getTaskStatusLabel(status: TaskStatus) {
  return <TaskStatusBadge status={status} />;
}

export function getTaskPriorityLabel(priority: TaskPriority) {
  return <TaskPriorityBadge priority={priority} />;
}


