'use server';
import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { UserRole } from '@/types/auth';
import { createUser, updateUser, deleteUser, toggleUserStatus, getUserById } from '@/lib/user-api';
import { revalidatePath } from 'next/cache';

// Invite new user
export async function inviteUserAction(userData: {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}) {
  try {
  
    const result = await createUser(userData);
    revalidatePath('/admin/users');

    return result;
  } catch (error) {
    console.error('Invite user failed:', error);
    return {
      success: false,
      message: 'Failed to invite user',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Get current user's role from cookies
async function getCurrentUserRole(): Promise<UserRole | null> {
  try {
    const role = await getCookieValue(ICookieKeys.USER_ROLE);
    if (role && Object.values(UserRole).includes(role as UserRole)) {
      return role as UserRole;
    }
    return null;
  } catch (error) {
    console.error('Error getting current user role:', error);
    return null;
  }
}

// Validate if current user can update target user
async function canUpdateUser(currentUserRole: UserRole, targetUserId: string, targetUserRole?: UserRole): Promise<boolean> {
  try {
    // Get current user's ID from cookies or context
    const currentUserId = await getCookieValue(ICookieKeys.USER_ID);
    
    // Admin can update anyone except self
    if (currentUserRole === UserRole.ADMIN) {
      return currentUserId !== targetUserId;
    }
    
    // Manager can only update members
    if (currentUserRole === UserRole.MANAGER) {
      return targetUserRole === UserRole.MEMBER;
    }
    
    // Members cannot update anyone
    return false;
  } catch (error) {
    console.error('Error validating update permissions:', error);
    return false;
  }
}

// Update existing user with role-based validation
export async function updateUserAction(userId: string, userData: {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}) {
  try {
       
    

    const result = await updateUser(userId, userData);
    revalidatePath('/admin/users');
    return result;
  } catch (error) {
    console.error('Update user failed:', error);
    return {
      success: false,
      message: 'Failed to update user',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Delete user
export async function deleteUserAction(userId: string) {
  try {
    const result = await deleteUser(userId);
    return result;
  } catch (error) {
    console.error('Delete user failed:', error);
    return {
      success: false,
      message: 'Failed to delete user',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Toggle user status (activate/deactivate)
export async function toggleUserStatusAction(userId: string, isActive: boolean) {
  try {
    const result = await toggleUserStatus(userId, isActive);
    return result;
  } catch (error) {
    console.error('Toggle user status failed:', error);
    return {
      success: false,
      message: 'Failed to update user status',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
} 