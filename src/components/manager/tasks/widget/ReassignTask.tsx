'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskUser } from '@/types/task';
import { User } from '@/lib/user-api';
import { reassignTaskAction } from '@/actions/task';
import { errorToast, successToast } from '@/components/hooks/use-toast';
import { UserRole } from '@/types/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, User as UserIcon } from 'lucide-react';
import { Label } from '@/components/common/Label';

interface ReassignTaskProps {
  task: Task;
}

export default function ReassignTask({ task }: ReassignTaskProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAssignee, setCurrentAssignee] = useState<TaskUser | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/manager/users/api?role=${UserRole.MEMBER}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const fetchedUsers = data.data?.users || [];
            setUsers(fetchedUsers);
            
            // Set current assignee from task data
            setCurrentAssignee(task.assignedTo || null);
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
  }, [task.assignedTo]);

  const handleReassign = async (newAssigneeId: string) => {
    if (newAssigneeId === task.assignedTo?._id) return;

    setIsLoading(true);
    try {
      const result = await reassignTaskAction(task._id , newAssigneeId);
      if (result.success) {
        const newAssignee = users.find(user => user.id === newAssigneeId);
        if (newAssignee) {
          setCurrentAssignee({
            _id: newAssignee.id,
            email: newAssignee.email,
            firstName: newAssignee.firstName,
            lastName: newAssignee.lastName
          });
        }
        successToast('Task reassigned successfully');
      } else {
        errorToast(result.message || 'Failed to reassign task');
      }
    } catch (error) {
      errorToast('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getAssigneeDisplayName = (user: TaskUser | null): string => {
    if (!user) return 'Unassigned';
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
            <div className="w-fit flex items-center space-x-2 cursor-pointer text-xs bg-primary/10 rounded-lg px-2 py-1">
              <UserIcon className="h-3 w-3" />
              <Label variant={"semibold"} size={"xs"} className='cursor-pointer'>{getAssigneeDisplayName(currentAssignee)}</Label>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {users.map((user) => (
            <DropdownMenuItem 
              key={user.id}
              onClick={() => handleReassign(user.id)}
              className="cursor-pointer"
            >
              <UserIcon className="h-4 w-4 mr-2" />
              {user.firstName} {user.lastName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 