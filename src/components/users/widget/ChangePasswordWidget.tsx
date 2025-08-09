"use client";

import React, { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordWidgetProps {
  user: User;
}

export default function ChangePasswordWidget({
  user,
}: ChangePasswordWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!newPassword.trim()) {
      errorToast("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      errorToast("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const result = await changeUserPasswordAction(
        user.id,
        newPassword
      );

      if (result.success) {
        successToast("Password changed successfully");
        setIsOpen(false);
        setNewPassword("");
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
      setNewPassword("");
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <CommonButton
              type="submit"
              disabled={isLoading || !newPassword.trim()}
              loading={isLoading}
              className="h-9 px-5"
            >
              Set New
            </CommonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
