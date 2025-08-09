'use server';
import { UserRole } from '@/types/auth';
import { createUser, updateUser, deleteUser, changeUserPassword, adminDeleteUser } from '@/lib/user-api';
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
    // Prefer admin POST endpoint if available
    const result = await adminDeleteUser(userId);
    if (result?.success) {
      revalidatePath('/admin/users');
      return result;
    }
    const fallback = await deleteUser(userId);
    if (fallback?.success) {
      revalidatePath('/admin/users');
    }
    return fallback;
  } catch (error) {
    console.error('Delete user failed:', error);
    return {
      success: false,
      message: 'Failed to delete user',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Change user password (Admin only)
export async function changeUserPasswordAction(userId: string, newPassword: string) {
  try {
    const result = await changeUserPassword(userId, newPassword);
    revalidatePath('/admin/users');
    return result;
  } catch (error) {
    console.error('Change password failed:', error);
    return {
      success: false,
      message: 'Failed to change user password',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

