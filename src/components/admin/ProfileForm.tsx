"use client";

import { useState } from "react";
import { updateProfileAction } from "@/actions/auth";
import { User, UpdateProfileData } from "@/types/auth";
import { Save } from "lucide-react";
import { errorToast, successToast } from "../hooks/use-toast";

interface ProfileFormProps {
  profile: User;
  onSuccess?: () => void;
}

export default function ProfileForm({ profile, onSuccess }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim() && !formData.lastName.trim()) {
      setError("At least one name field is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updateData: UpdateProfileData = {
        firstName: formData.firstName.trim() || undefined,
        lastName: formData.lastName.trim() || undefined,
      };

      const result = await updateProfileAction(updateData);

      if (result.success) {
        successToast("Profile updated successfully");
        onSuccess?.();
      } else {
        errorToast(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      errorToast("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Profile Information
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-destructive"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Email Address
          </label>
          <div className="p-3 bg-muted rounded-md border border-border">
            <span className="text-foreground">{profile.email}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Email address cannot be changed
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Role
          </label>
          <div className="p-3 bg-muted rounded-md border border-border">
            <span className="text-foreground">{profile.role}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Role cannot be changed
          </p>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-border">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
