"use client";

import React, { useState } from "react";
import { BadgeX, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/common/Button";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { deleteUserAction } from "@/actions/user";
import { User } from "@/lib/user-api";
import { UserRole } from "@/types/auth";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";

interface DeleteUserWidgetProps {
  user: User;
  onDelete?: () => void;
}

export default function DeleteUserWidget({ user, onDelete }: DeleteUserWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteUserAction(user.id);
      if (result?.success) {
        successToast("User deleted successfully");
        setIsOpen(false);
        onDelete?.();
      } else {
        errorToast(result?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      errorToast("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };


  const isAdmin = user.role.toLowerCase() === UserRole.ADMIN.toLowerCase();

  if (isAdmin) {
    return (
    <Tooltip>
      <TooltipTrigger>
        <BadgeX className="h-4 w-4 text-amber-500" />
      </TooltipTrigger>
      <TooltipContent>
       <div>
       
  Admin cannot be deleted
      
       </div>
      </TooltipContent>
    </Tooltip>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CommonButton
          variant="destructive"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600 "
        >
          <Trash2 className="h-3 w-3" />
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            <span>Delete User</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete user &quot;{user.firstName} {user.lastName}&quot; ({user.email})? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete User"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


