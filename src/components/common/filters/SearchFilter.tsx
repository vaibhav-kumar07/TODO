'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchFilter({className}:{className?:string}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, router, pathname, searchParams]);

  return (
    <div className={`relative ${className} `}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-12 w-64 rounded-full h-7"
      />
    </div>
  );
} 