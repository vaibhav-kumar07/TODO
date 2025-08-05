'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommonButton from '@/components/common/Button';
import { UserRole } from '@/types/auth';
import { getRoleOptions, RoleOption, getSafeUserRole } from '@/lib/role-options';

interface RoleFilterProps {
  className?: string;
  userRole: UserRole | string | null | undefined;
}

export default function RoleFilter({ userRole }: RoleFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Get the actual user role from cookies for security validation
  const getActualUserRole = (): UserRole | null => {
    try {
      const cookieRole = userRole;
      if (cookieRole && Object.values(UserRole).includes(cookieRole as UserRole)) {
        return cookieRole as UserRole;
      }
      return null;
    } catch (error) {
      console.error('Error getting user role from cookie:', error);
      return null;
    }
  };

  // Validate if a role is accessible to the current user
  const isRoleAccessible = (role: string): boolean => {
    const actualUserRole = getActualUserRole();
    if (!actualUserRole) return false;

    // Get allowed roles for the actual user
    const allowedRoles = getRoleOptions(actualUserRole);
    return allowedRoles.some(option => option.value === role);
  };

  // Initialize from URL params with security validation
  useEffect(() => {
    const roleParam = searchParams.get('role');
    
    if (roleParam) {
      // Check if the role in URL is accessible to the current user
      if (isRoleAccessible(roleParam)) {
        setSelectedRole(roleParam);
      } else {
        // Remove unauthorized role from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete('role');
        router.replace(`?${params.toString()}`);
        setSelectedRole(null);
      }
    } else {
      setSelectedRole(null);
    }
  }, [searchParams, router]);

  // Handle role change with security validation
  const handleRoleChange = (value: string) => {
    // Validate that the user can access this role
    if (!isRoleAccessible(value)) {
      console.warn('User attempted to access unauthorized role:', value);
      return;
    }

    setSelectedRole(value);
    
    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('role', value);
    } else {
      params.delete('role');
    }
    
    router.push(`?${params.toString()}`);
  };

  // Safely get the user role
  const safeUserRole = getSafeUserRole(userRole);

  // Get role options based on user role
  const roleOptions: RoleOption[] = getRoleOptions(safeUserRole);

  // Don't render if no role options are available
  if (roleOptions.length === 0) {
    return null;
  }

  return (
    <div className='flex items-center gap-2'>
      {roleOptions.map((option) => (
        <CommonButton 
          key={option.value} 
          variant='outline' 
          size='sm'  
          className={`h-6 rounded-md text-xs text-muted-foreground ${selectedRole === option.value ? 'bg-primary text-primary-foreground' : ''}`} 
          onClick={() => handleRoleChange(option.value)}
        >
          {option.label}
        </CommonButton>
      ))}
    </div>
  );
} 