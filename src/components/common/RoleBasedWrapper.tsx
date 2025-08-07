
import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { UserRole } from '@/types/auth';

interface RoleBasedWrapperProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default async function RoleBasedWrapper({ 
  children, 
  allowedRoles 
}: RoleBasedWrapperProps) {
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
  const hasPermission = userRole && allowedRoles.includes(userRole as UserRole);

  // Render children only if user has permission
  return hasPermission ? <>{children}</> : null;
} 