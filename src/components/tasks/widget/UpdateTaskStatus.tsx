"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskStatus } from "@/types/task";
import { updateTaskStatusAction } from "@/actions/task";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { TaskStatusBadge, getTaskStatusLabel } from "@/components/tasks/taskStyle";

interface UpdateTaskStatusProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}


export default function UpdateTaskStatus({
  task,
  onStatusChange,
}: UpdateTaskStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(task.status);

  useEffect(() => {
    setCurrentStatus(task.status);
  }, [task.status]);

  const getStatusBadge = (status: TaskStatus) => <TaskStatusBadge status={status} />;

  const getStatusLabel = (status: TaskStatus) => getTaskStatusLabel(status);

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);

    try {
      const result = await updateTaskStatusAction(task._id, newStatus);

      if (result.success) {
        setCurrentStatus(newStatus as TaskStatus);
        successToast("Task status updated successfully");
        onStatusChange?.(task._id, newStatus as TaskStatus);
      } else {
        // Revert the status if the API call failed
        setCurrentStatus(task.status);
        errorToast(result.message || "Failed to update task status");
      }
    } catch (error) {
      // Revert the status if there was an error
      setCurrentStatus(task.status);
      console.error("An unexpected error occurred:", error);
      errorToast("An unexpected error occurred");
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
        <SelectTrigger
          className="w-fit bg-background p-0 h-fit border-none"
          showIcon={false}
        >
          <SelectValue className="w-fit border-none">
            {getStatusBadge(currentStatus)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[180px]">
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
