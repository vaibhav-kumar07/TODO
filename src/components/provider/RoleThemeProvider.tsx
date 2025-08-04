'use client';

import { useEffect, useState } from 'react';
import { UserRole } from '@/types/auth';

interface RoleThemeProviderProps {
  children: React.ReactNode;
  role?: UserRole;
}

export default function RoleThemeProvider({ children, role }: RoleThemeProviderProps) {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(role || null);

  useEffect(() => {
    // Apply role-based theme class to document
    const applyRoleTheme = (userRole: UserRole) => {
      // Remove existing role classes
      document.documentElement.classList.remove('role-admin', 'role-manager', 'role-member');
      
      // Add the appropriate role class
      switch (userRole) {
        case UserRole.ADMIN:
          document.documentElement.classList.add('role-admin');
          break;
        case UserRole.MANAGER:
          document.documentElement.classList.add('role-manager');
          break;
        case UserRole.MEMBER:
          document.documentElement.classList.add('role-member');
          break;
        default:
          // Default theme (no role class)
          break;
      }
    };

    if (currentRole) {
      applyRoleTheme(currentRole);
    } else {
      // Default to admin theme for login page
      applyRoleTheme(UserRole.ADMIN);
    }
  }, [currentRole]);

  // Update role when prop changes
  useEffect(() => {
    if (role && role !== currentRole) {
      setCurrentRole(role);
    }
  }, [role, currentRole]);

  return <>{children}</>;
} 