import React from 'react';
import { User } from '@/lib/user-api';
import UserManagementDialog from '../UserManagementDialog';
import { UserRole } from '@/types/auth';
import { AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function UserUpdateWidget({ user }: { user: User }) {
  const isAdmin = user.role.toLowerCase() === UserRole.ADMIN.toLowerCase();

  if (isAdmin) {
    return (
    <Tooltip>
      <TooltipTrigger>
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      </TooltipTrigger>
      <TooltipContent>
       <div>
       
      Go To settings to update Admin
      
       </div>
      </TooltipContent>
    </Tooltip>
    );
  }

  return (
    <UserManagementDialog
      mode="update"
      user={user}
    />
  );
}
