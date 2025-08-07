import { UserRole } from '@/types/auth';

export interface RoleOption {
  value: UserRole;
  label: string;
}

// Get role filter options based on the current user's role
export function getRoleOptions(userRole: UserRole | null | undefined): RoleOption[] {
  if (!userRole) {
    return [];
  }

  switch (userRole) {
    case UserRole.ADMIN:
      return [
        { value: UserRole.MANAGER, label: 'Manager' },
        { value: UserRole.MEMBER, label: 'Member' }
      ];
    
    case UserRole.MANAGER:
      return [
        { value: UserRole.MEMBER, label: 'Member' },
      ];
    
    case UserRole.MEMBER:
      return [];
    
    default:
      return [];
  }
}

// Get allowed roles for a specific user role
export function getAllowedRoles(userRole: UserRole | null | undefined): UserRole[] {
  if (!userRole) {
    return [];
  }

  switch (userRole) {
    case UserRole.ADMIN:
      return [ UserRole.MANAGER, UserRole.MEMBER];
    
    case UserRole.MANAGER:
      return [UserRole.MEMBER];
    
    case UserRole.MEMBER:
      return [];
    
    default:
      return [];
  }
}


export function canAccessRole(userRole: UserRole | null | undefined, targetRole: UserRole): boolean {
  if (!userRole) {
    return false;
  }
  const allowedRoles = getAllowedRoles(userRole);
  return allowedRoles.includes(targetRole);
}

export function getRoleDisplayName(role: UserRole | null | undefined): string {
  if (!role) {
    return 'Unknown';
  }

  switch (role) {
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.MANAGER:
      return 'Manager';
    case UserRole.MEMBER:
      return 'Member';
    default:
      return 'Unknown';
  }
}

// Safely get user role from string or enum
export function getSafeUserRole(roleValue: string | UserRole | null | undefined): UserRole | null {
  if (!roleValue) {
    return null;
  }

  if (Object.values(UserRole).includes(roleValue as UserRole)) {
    return roleValue as UserRole;
  }

  const roleString = roleValue.toString().toUpperCase();
  if (roleString === UserRole.ADMIN) return UserRole.ADMIN;
  if (roleString === UserRole.MANAGER) return UserRole.MANAGER;
  if (roleString === UserRole.MEMBER) return UserRole.MEMBER;

  return null;
} 