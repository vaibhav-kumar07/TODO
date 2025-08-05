import React from 'react';
import { User } from '@/lib/user-api-client';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserStatusWidgetProps {
  user: User;
}

export default function UserStatusWidget({ user }: UserStatusWidgetProps) {
  const isActive = user.isActive;
  return (
    <div className="flex items-center justify-center">
      <Badge 
        variant={isActive ? "default" : "secondary"}
        className={cn(
          "text-xs font-medium",
          isActive 
            ? "bg-green-100 text-green-800 border-green-200" 
            : "bg-gray-100 text-gray-600 border-gray-200"
        )}
      >
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
} 