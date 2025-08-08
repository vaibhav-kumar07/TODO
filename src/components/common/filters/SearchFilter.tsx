"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchFilter({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local state when URL params change (but not when user is typing)
  useEffect(() => {
    if (!isTyping) {
      const urlSearchTerm = searchParams.get("search") || "";
      if (urlSearchTerm !== searchTerm) {
        setSearchTerm(urlSearchTerm);
      }
    }
  }, [searchParams, isTyping, searchTerm]);

  // Debounced URL update
  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      router.push(`${pathname}?${params.toString()}`);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, router, pathname, searchParams, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsTyping(true);
  };

  const handleInputFocus = () => {
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    // Small delay to ensure any pending changes are processed
    setTimeout(() => {
      setIsTyping(false);
    }, 100);
  };

  return (
    <div className={`relative ${className} `}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="pl-12 w-64 rounded-full h-7"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </div>
  );
}
