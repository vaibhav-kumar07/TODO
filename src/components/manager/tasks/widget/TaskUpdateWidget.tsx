'use client';

import React, { useState, useEffect } from 'react';
import TaskManagementDialog from '../TaskManagementDialog';
import { Task } from '@/types/task';
import { User } from '@/lib/user-api';
import { UserRole } from '@/types/auth';

interface TaskUpdateWidgetProps {
  task: Task;
}

export default function TaskUpdateWidget({ task }: TaskUpdateWidgetProps) {
  const [users, setUsers] = useState<User[]>([]);

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

  console.log('task', task);
  return (
    <TaskManagementDialog
      mode='update'
      task={task}
      availableUsers={users}
    />
  )
} 