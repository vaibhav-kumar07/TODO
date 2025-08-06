'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommonSearchFilterProps {
  className?: string;
  placeholder?: string;
  searchParamName?: string;
  debounceMs?: number;
}

export default function CommonSearchFilter({ 
  className,
  placeholder = "Search...",
  searchParamName = "search",
  debounceMs = 300
}: CommonSearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get(searchParamName) || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchValue.trim()) {
        params.set(searchParamName, searchValue.trim());
      } else {
        params.delete(searchParamName);
      }
      
      // Reset to first page when searching
      params.delete('page');
      
      router.push(`?${params.toString()}`);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, router, searchParams, searchParamName, debounceMs]);

  useEffect(() => {
    const searchParam = searchParams.get(searchParamName);
    setSearchValue(searchParam || '');
  }, [searchParams, searchParamName]);

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10 h-8 text-sm"
      />
    </div>
  );
} 