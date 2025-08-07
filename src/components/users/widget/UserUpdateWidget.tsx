import React from 'react';
import { User } from '@/lib/user-api';
import UserManagementDialog from '../UserManagementDialog';

export default function UserUpdateWidget({ user }: { user: User }) {
  
  return (
 <UserManagementDialog
    mode='update'
    user={user}
 />
  )
}
