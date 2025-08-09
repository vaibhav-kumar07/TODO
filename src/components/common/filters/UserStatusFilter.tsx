"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonButton from "@/components/common/Button";

export enum IUserFilterKey {
  ROLE = "role",
  IS_ACTIVE = "isActive",
  SEARCH = "search",
  INVITED_BY = "invitedBy",
  PAGE = "page",
}

// User status options
const USER_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
} as const;

type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

interface UserStatusFilterProps {
  className?: string;
}

export default function UserStatusFilter({ className }: UserStatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<UserStatus | null>(null);

  // Validate if the status value is valid
  const isValidStatus = (statusValue: boolean): boolean => {
    return Object.values(USER_STATUS).includes(statusValue);
  };

  // Sync local state from URL params and reset when param is removed
  useEffect(() => {
    const raw = searchParams.get(IUserFilterKey.IS_ACTIVE);
    if (raw === null) {
      // Param removed externally -> reset state
      setStatus(null);
      return;
    }

    const lower = raw.toLowerCase();
    const parsed = lower === "true" ? true : lower === "false" ? false : null;

    if (parsed === null) {
      // Remove invalid status from URL and reset
      const params = new URLSearchParams(searchParams.toString());
      params.delete(IUserFilterKey.IS_ACTIVE);
      router.replace(`?${params.toString()}`);
      setStatus(null);
      console.warn("Invalid user status value removed from URL:", raw);
      return;
    }

    setStatus(parsed as UserStatus);
  }, [searchParams, router]);

  // Handle status change
  const handleStatusChange = (value: UserStatus) => {
    // Validate that the value is valid
    if (!isValidStatus(value)) {
      console.warn("Invalid user status value attempted:", value);
      return;
    }

    // Toggle behavior: clicking the same value clears the filter
    const next = status === value ? null : value;
    setStatus(next);

    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (next !== null) {
      params.set(IUserFilterKey.IS_ACTIVE, next.toString());
    } else {
      params.delete(IUserFilterKey.IS_ACTIVE);
    }

    router.push(`?${params.toString()}`);
  };

  const statusOptions = [
    { value: USER_STATUS.ACTIVE, label: "Active" },
    { value: USER_STATUS.INACTIVE, label: "InActive" },
  ];

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {statusOptions.map((option) => (
        <CommonButton
          key={option.value.toString()}
          variant="outline"
          size="sm"
          className={`h-6 rounded-md text-xs text-muted-foreground ${
            status === option.value ? "bg-primary text-primary-foreground" : ""
          }`}
          onClick={() => handleStatusChange(option.value)}
        >
          {option.label}
        </CommonButton>
      ))}
    </div>
  );
}
