import { UserRole } from '@/types/auth';

// Navigation items configuration
export const navigationItems = {
  [UserRole.ADMIN]: [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Profile',
      href: '/admin/profile',
      icon: 'User'
    },
    {
      label: 'User Management',
      href: '/admin/users',
      icon: 'Users'
    },
    {
      label: 'Team Management',
      href: '/admin/teams',
      icon: 'Building2'
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: 'Settings'
    }
  ],
  [UserRole.MANAGER]: [
    {
      label: 'Dashboard',
      href: '/manager',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Profile',
      href: '/manager/profile',
      icon: 'User'
    },
    {
      label: 'Team Members',
      href: '/manager/members',
      icon: 'Users'
    },
    {
      label: 'Tasks',
      href: '/manager/tasks',
      icon: 'CheckSquare'
    }
  ],
  [UserRole.MEMBER]: [
    {
      label: 'Dashboard',
      href: '/member',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Profile',
      href: '/member/profile',
      icon: 'User'
    },
    {
      label: 'My Tasks',
      href: '/member/tasks',
      icon: 'CheckSquare'
    }
  ]
}; 