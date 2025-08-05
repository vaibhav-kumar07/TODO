
import React from 'react';
import PageHeaderWithButton from '@/components/common/PageHeaderWithButton';
import TaskManagementDialog from './TaskManagementDialog';

export default function TaskManagementHeader() {
  return (
    <div className="flex items-center justify-between px-2 py-1">
      <PageHeaderWithButton
        title="Task Management"
        description="Create and manage tasks for your team members"
      />
      <TaskManagementDialog
        mode="create"
      />
    </div>
  );
} 