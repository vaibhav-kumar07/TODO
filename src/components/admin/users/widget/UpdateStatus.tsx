'use client';

import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { User } from '@/lib/user-api-client';
import { updateUserAction } from '@/actions/user';
import { errorToast, successToast } from '@/components/hooks/use-toast';
import { Label } from '@/components/common/Label';

interface UpdateStatusProps {
  user: User;
  onStatusChange?: (userId: string, newStatus: boolean) => void;
}

export default function UpdateStatus({ user, onStatusChange }: UpdateStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(user.isActive);

  const handleStatusToggle = async (checked: boolean) => {
    
    try {
      const result = await updateUserAction(user.id, {
        isActive: checked
      });

      if (result.success) {
        setIsActive(checked);
        successToast(`User ${checked ? 'activated' : 'deactivated'} successfully`);
        onStatusChange?.(user.id, checked);
      } else {
        // Revert the switch if the API call failed
        setIsActive(!checked);
        errorToast(result.message || 'Failed to update user status');
      }
    } catch (error) {
      // Revert the switch if there was an error
      setIsActive(!checked);
      errorToast('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
        <Switch
          checked={isActive}
          onCheckedChange={handleStatusToggle}
          disabled={isLoading}
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
        />
       <Label className={`text-sm font-medium ${isActive ? "text-green-500" : "text-red-500"}`}> {isActive ? "Active" : "Inactive"}</Label>
    </div>
  );
}
