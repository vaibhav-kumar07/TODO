"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonButton from "@/components/common/Button";
import { TaskPriority } from "@/types/task";

interface PriorityFilterProps {
  className?: string;
}

export default function PriorityFilter({}: PriorityFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priority, setPriority] = useState<string | null>(null);

  // Validate if the priority value is valid
  const isValidPriority = (priorityValue: string): boolean => {
    return Object.values(TaskPriority).includes(priorityValue as TaskPriority);
  };

  // Initialize from URL params with validation
  useEffect(() => {
    const priorityParam = searchParams.get("priority");

    if (priorityParam) {
      // Check if the priority value is valid
      if (isValidPriority(priorityParam)) {
        setPriority(priorityParam);
      } else {
        // Remove invalid priority from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete("priority");
        router.replace(`?${params.toString()}`);
        setPriority(null);
        console.warn("Invalid priority value removed from URL:", priorityParam);
      }
    } else {
      setPriority(null);
    }
  }, [searchParams, router]);

  // Handle priority change
  const handlePriorityChange = (value: string) => {
    // Validate that the value is valid
    if (!isValidPriority(value)) {
      console.warn("Invalid priority value attempted:", value);
      return;
    }

    setPriority(value);

    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("priority", value);
    } else {
      params.delete("priority");
    }

    router.push(`?${params.toString()}`);
  };

  const priorityOptions = [
    { value: TaskPriority.LOW, label: "Low" },
    { value: TaskPriority.MEDIUM, label: "Medium" },
    { value: TaskPriority.HIGH, label: "High" },
  ];

  return (
    <div className="flex items-center gap-2">
      {priorityOptions.map((option) => (
        <CommonButton
          key={option.value}
          variant="outline"
          size="sm"
          className={`h-6 rounded-md text-xs text-muted-foreground ${
            priority === option.value
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
          onClick={() => handlePriorityChange(option.value)}
        >
          {option.label}
        </CommonButton>
      ))}
    </div>
  );
}
