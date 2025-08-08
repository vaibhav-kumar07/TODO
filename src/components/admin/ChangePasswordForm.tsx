"use client";

import { useState } from "react";
import { updateProfileAction } from "@/actions/auth";
import { Eye, EyeOff, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { errorToast, successToast } from "../hooks/use-toast";
import CommonButton from "../common/Button";

interface ChangePasswordFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ChangePasswordForm({
  onSuccess,
  onCancel,
}: ChangePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.currentPassword.trim()) {
      errorToast("Current password is required");
      return false;
    }
    if (!formData.newPassword.trim()) {
      errorToast("New password is required");
      return false;
    }
    if (formData.newPassword.length < 6) {
      errorToast("New password must be at least 6 characters long");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errorToast("New passwords do not match");
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      errorToast("New password must be different from current password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await updateProfileAction({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (result.success) {
        successToast("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        onSuccess?.();
      } else {
        errorToast(result.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      errorToast("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1 pl-1">
        <Label htmlFor="currentPassword">Current Password</Label>
        <div className="relative">
          <Input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter current password"
            className="pr-10"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-1 pl-1">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter new password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showNewPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Password must be at least 6 characters long
        </p>
      </div>

      <div className="space-y-1 pl-1">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Confirm new password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
          className="h-10"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <CommonButton
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
          className="h-10"
        >
          <>
            <Save className="h-4 w-4 mr-2" />
            Change Password
          </>
        </CommonButton>
      </div>
    </form>
  );
}
