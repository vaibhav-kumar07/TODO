"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskPriority } from "@/types/task";
import { updateTaskAction } from "@/actions/task";
import { successToast, errorToast } from "@/components/hooks/use-toast";
import { TaskPriorityBadge, getTaskPriorityLabel } from "@/components/tasks/taskStyle";

interface UpdateTaskPriorityProps {
  task: Task;
}

const PRIORITY_CONFIG = {} as const;

export default function UpdateTaskPriority({ task }: UpdateTaskPriorityProps) {
  const [currentPriority, setCurrentPriority] = useState<TaskPriority>(
    TaskPriority.MEDIUM
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const normalizedPriority = task.priority?.toUpperCase() as TaskPriority;
    setCurrentPriority(normalizedPriority);
  }, [task]);

  const handlePriorityChange = async (newPriority: TaskPriority) => {
    if (newPriority === currentPriority) return;

    setIsLoading(true);
    try {
      const result = await updateTaskAction(task._id, {
        priority: newPriority,
      });
      if (result.success) {
        setCurrentPriority(newPriority);
        successToast("Task priority has been updated successfully.");
      } else {
        errorToast(result.error || "Failed to update task priority.");
      }
    } catch {
      errorToast("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => (
    <TaskPriorityBadge priority={priority} />
  );

  const getPriorityLabel = (priority: TaskPriority) => getTaskPriorityLabel(priority);

  return (
    <div className="flex items-center gap-2">
      <Select
        value={currentPriority}
        onValueChange={handlePriorityChange}
        disabled={isLoading}
      >
        <SelectTrigger
          className="w-fit bg-background p-0 h-fit border-none "
          showIcon={false}
        >
          <SelectValue className="w-fit border-none">
            {getPriorityBadge(currentPriority)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[180px]">
          {Object.values(TaskPriority).map((priority) => (
            <SelectItem key={priority} value={priority} >
              {getPriorityLabel(priority)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
