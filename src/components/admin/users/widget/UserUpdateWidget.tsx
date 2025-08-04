import React from 'react'
import UserManagementDialog from '../UserManagementDialog'
import { User } from '@/lib/user-api-client'

export default function UserUpdateWidget({ user }: { user: User }) {
    console.log('user', user);
  return (
 <UserManagementDialog
    mode='update'
    user={user}
 />
  )
}
