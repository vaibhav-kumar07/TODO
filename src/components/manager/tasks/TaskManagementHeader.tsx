import React from "react";
import PageHeaderWithButton from "@/components/common/PageHeaderWithButton";
import TaskManagementDialog from "./TaskManagementDialog";
import RoleBasedWrapper from "@/components/common/RoleBasedWrapper";
import { UserRole } from "@/types/auth";

export default function TaskManagementHeader() {
  return (
    <div className="flex items-center justify-between px-2 py-1 mb-4">
      <PageHeaderWithButton
        title="Task Management"
        description="Create and manage tasks for your team members"
      />
      <RoleBasedWrapper allowedRoles={[UserRole.MANAGER]}>
        <TaskManagementDialog mode="create" />
      </RoleBasedWrapper>
    </div>
  );
}
