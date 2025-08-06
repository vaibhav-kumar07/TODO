'use server';
import { UserRole } from '@/types/auth';
import { createUser, updateUser, deleteUser } from '@/lib/user-api';
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

