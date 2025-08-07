"use client";

import React from "react";
import CommonButton from "@/components/common/Button";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterButtonProps {
  options: FilterOption[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export default function FilterButton({
  options,
  selectedValue,
  onValueChange,
  className = "",
  size = "sm",
}: FilterButtonProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {options.map((option) => (
        <CommonButton
          key={option.value}
          variant="outline"
          size={size}
          className={`h-6 rounded-md text-xs text-muted-foreground ${
            selectedValue === option.value
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
          onClick={() => onValueChange(option.value)}
        >
          {option.label}
        </CommonButton>
      ))}
    </div>
  );
}
