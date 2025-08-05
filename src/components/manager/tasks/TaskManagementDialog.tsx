'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Task } from '@/types/task';
import { User } from '@/lib/user-api';
import { createTaskAction, updateTaskAction } from '@/actions/task';
import { errorToast, successToast } from '@/components/hooks/use-toast';
import { Plus, Edit, ClipboardList, Pencil } from 'lucide-react';
import TaskForm, { TaskFormData } from './TaskForm';
import CommonButton from '@/components/common/Button';
import { UserRole } from '@/types/auth';

interface TaskManagementDialogProps {
  mode: 'create' | 'update';
  task?: Task;
  children?: React.ReactNode;
  availableUsers?: User[];
}

export default function TaskManagementDialog({ 
  mode, 
  task, 
  children,
  availableUsers = []
}: TaskManagementDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/manager/users/api?role=${UserRole.MEMBER}`);
       
        if (response.ok) {
          const data = await response.json();
          console.log('data', data);
          if (data.success) {
            setUsers(data.data?.users || []);
          } else {
            console.error('Failed to fetch users:', data.message);
          }
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (formData: TaskFormData) => {
    setIsLoading(true);

    try {
      let result;

      if (mode === 'create') {
        result = await createTaskAction({
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          dueDate: formData.dueDate,
          assignedTo: formData.assignedTo,
        });
      } else {
        if (!task?.id) {
          errorToast('Task ID is required for update');
          return;
        }

        result = await updateTaskAction(task.id, {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          dueDate: formData.dueDate,
          assignedTo: formData.assignedTo,
          status: formData.status,
        });
      }

      if (result.success) {
        successToast(result.message || 'Operation completed successfully');
        setIsOpen(false);
        window.location.reload();
      } else {
        errorToast(result.message || 'Operation failed');
      }
    } catch (error) {
      errorToast('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const getDialogTitle = () => {
    return mode === 'create' ? 'Create New Task' : 'Update Task';
  };

  const getTriggerButton = () => {
    if (children) return children;
    
    return mode === 'create' ? (
      <CommonButton className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Create Task</span>
      </CommonButton>
    ) : (
      <Pencil className="h-4 w-4 cursor-pointer" />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {getTriggerButton()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ClipboardList className="h-5 w-5" />
            <span>{getDialogTitle()}</span>
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          mode={mode}
          task={task}
          availableUsers={users}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
} 