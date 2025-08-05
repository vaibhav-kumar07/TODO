'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';
import { cn } from '@/lib/utils';
import { Task, TaskStatus, TaskPriority, CreateTaskData, UpdateTaskData } from '@/types/task';
import { User } from '@/lib/user-api';
import { errorToast } from '@/components/hooks/use-toast';
import { z } from 'zod';
import CommonButton from '@/components/common/Button';
import { formatDate } from '@/lib/common/date-utils';

// Zod schemas for validation
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.date(),
  assignedTo: z.string().min(1, 'Assignee is required'),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.date(),
  assignedTo: z.string().min(1, 'Assignee is required'),
  status: z.nativeEnum(TaskStatus),
});

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: Date;
  assignedTo: string;
  status?: TaskStatus;
}

interface TaskFormProps {
  mode: 'create' | 'update';
  task?: Task;
  availableUsers?: User[];
  onSubmit: (data: TaskFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TaskForm({ 
  mode, 
  task, 
  availableUsers = [],
  onSubmit, 
  onCancel, 
  isLoading = false 
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM,
    dueDate: new Date(),
    assignedTo: '',
    status: TaskStatus.TODO,
  });

  // Initialize form data when task is provided (update mode)
  useEffect(() => {
    if (task && mode === 'update') {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: new Date(task.dueDate),
        assignedTo: task.assignedTo,
        status: task.status,
      });
    }
  }, [task, mode]);

  const handleInputChange = (field: keyof TaskFormData, value: string | Date | TaskPriority | TaskStatus) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    try {
      if (mode === 'create') {
        createTaskSchema.parse(formData);
      } else {
        updateTaskSchema.parse(formData);
      }
      return true;
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        errorToast(firstError.message);
      } else {
        errorToast('Validation failed');
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          disabled={isLoading}
          placeholder="Enter task title"
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={isLoading}
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      {/* Priority */}
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) => handleInputChange('priority', value as TaskPriority)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
            <SelectItem value={TaskPriority.MEDIUM}>Medium</SelectItem>
            <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
            <SelectItem value={TaskPriority.URGENT}>Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Due Date */}
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.dueDate && "text-muted-foreground"
              )}
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dueDate ? formatDate(formData.dueDate, "PPP"): <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.dueDate}
              onSelect={(date) => date && handleInputChange('dueDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Assignee */}
      <div>
        <Label htmlFor="assignedTo">Assign To</Label>
        <Select
          value={formData.assignedTo}
          onValueChange={(value) => handleInputChange('assignedTo', value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>
          <SelectContent>
            {availableUsers.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status - only for update mode */}
      {mode === 'update' && (
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleInputChange('status', value as TaskStatus)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
              <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
              <SelectItem value={TaskStatus.REVIEW}>Review</SelectItem>
              <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
              <SelectItem value={TaskStatus.CANCELLED}>Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <CommonButton
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className='h-10 px-4'
        >
          { mode === 'create' ? 'Create Task' : 'Update Task'}
        </CommonButton>
      </div>
    </form>
  );
} 