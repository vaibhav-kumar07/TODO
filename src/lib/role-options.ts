import { UserRole } from '@/types/auth';

export interface RoleOption {
  value: UserRole;
  label: string;
}

/**
 * Get role filter options based on the current user's role
 * @param userRole - The current user's role (can be null/undefined)
 * @returns Array of role options that the user can filter by
 */
export function getRoleOptions(userRole: UserRole | null | undefined): RoleOption[] {
  if (!userRole) {
    // If no role is provided, return empty array (no filtering)
    return [];
  }

  switch (userRole) {
    case UserRole.ADMIN:
      // Admins can see and filter by all roles
      return [
        { value: UserRole.ADMIN, label: 'Admin' },
        { value: UserRole.MANAGER, label: 'Manager' },
        { value: UserRole.MEMBER, label: 'Member' }
      ];
    
    case UserRole.MANAGER:
      // Managers can only see and filter by MEMBER role
      return [
        { value: UserRole.MEMBER, label: 'Member' },
        { value: UserRole.MANAGER, label: 'Manager' }
      ];
    
    case UserRole.MEMBER:
      // Members typically don't have role filtering capabilities
      return [];
    
    default:
      return [];
  }
}

/**
 * Get allowed roles for a specific user role
 * @param userRole - The current user's role (can be null/undefined)
 * @returns Array of UserRole values that the user can access
 */
export function getAllowedRoles(userRole: UserRole | null | undefined): UserRole[] {
  if (!userRole) {
    return [];
  }

  switch (userRole) {
    case UserRole.ADMIN:
      return [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER];
    
    case UserRole.MANAGER:
      return [UserRole.MEMBER];
    
    case UserRole.MEMBER:
      return [];
    
    default:
      return [];
  }
}

/**
 * Check if a user can access a specific role
 * @param userRole - The current user's role (can be null/undefined)
 * @param targetRole - The role to check access for
 * @returns Boolean indicating if the user can access the target role
 */
export function canAccessRole(userRole: UserRole | null | undefined, targetRole: UserRole): boolean {
  if (!userRole) {
    return false;
  }
  
  const allowedRoles = getAllowedRoles(userRole);
  return allowedRoles.includes(targetRole);
}

/**
 * Get role display name
 * @param role - The role to get display name for (can be null/undefined)
 * @returns Display name for the role
 */
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

/**
 * Safely get user role from string or enum
 * @param roleValue - The role value (string or UserRole)
 * @returns UserRole or null if invalid
 */
export function getSafeUserRole(roleValue: string | UserRole | null | undefined): UserRole | null {
  if (!roleValue) {
    return null;
  }

  // If it's already a UserRole enum value
  if (Object.values(UserRole).includes(roleValue as UserRole)) {
    return roleValue as UserRole;
  }

  // If it's a string, try to match it
  const roleString = roleValue.toString().toUpperCase();
  if (roleString === UserRole.ADMIN) return UserRole.ADMIN;
  if (roleString === UserRole.MANAGER) return UserRole.MANAGER;
  if (roleString === UserRole.MEMBER) return UserRole.MEMBER;

  return null;
} 