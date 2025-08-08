"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/user-api";
import { changeUserPasswordAction } from "@/actions/user";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import CommonButton from "@/components/common/Button";

interface ChangePasswordWidgetProps {
  user: User;
}

export default function ChangePasswordWidget({
  user,
}: ChangePasswordWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const newPasswordRef = useRef("");

  const handlePasswordChange = async () => {
    if (!newPasswordRef.current.trim()) {
      errorToast("Please enter a new password");
      return;
    }

    if (newPasswordRef.current.length < 6) {
      errorToast("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const result = await changeUserPasswordAction(
        user.id,
        newPasswordRef.current
      );

      if (result.success) {
        successToast("Password changed successfully");
        setIsOpen(false);
        newPasswordRef.current = "";
      } else {
        errorToast(result.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Change password error:", error);
      errorToast("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      newPasswordRef.current = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-xs w-fit"
          disabled={isLoading}
        >
          Set New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Change Password for {user.firstName} {user.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPasswordRef.current}
              onChange={(e) => (newPasswordRef.current = e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <CommonButton
              onClick={handlePasswordChange}
              disabled={isLoading || !newPasswordRef.current.trim()}
              loading={isLoading}
              className="h-9 px-5"
            >
              Set New
            </CommonButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
