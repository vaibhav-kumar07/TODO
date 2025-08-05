'use client';

import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/types/task';
import { User } from '@/lib/user-api';
import { reassignTaskAction } from '@/actions/task';
import { errorToast, successToast } from '@/components/hooks/use-toast';
import { UserRole } from '@/types/auth';

interface ReassignTaskProps {
  task: Task;
}

export default function ReassignTask({ task }: ReassignTaskProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/manager/users/api?role=${UserRole.MEMBER}`);
        if (response.ok) {
          const data = await response.json();
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

  const handleReassign = async (newAssigneeId: string) => {
    if (newAssigneeId === task.assignedTo) return;

    setIsLoading(true);
    try {
      const result = await reassignTaskAction(task.id, newAssigneeId);
      if (result.success) {
        successToast('Task reassigned successfully');
        window.location.reload();
      } else {
        errorToast(result.message || 'Failed to reassign task');
      }
    } catch (error) {
      errorToast('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const currentAssignee = users.find(user => user.id === task.assignedTo);  

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={currentAssignee?.id}
        onValueChange={handleReassign}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select assignee" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 