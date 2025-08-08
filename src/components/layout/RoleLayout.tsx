import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { UserRole } from '@/types/auth';
import { redirect } from 'next/navigation';
import { navigationItems } from '@/lib/sidebar';

import MobileHeader from './MobileHeader';

interface RoleLayoutProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default async function RoleLayout({ children, allowedRoles }: RoleLayoutProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
  
  if (!token || !userRole) {
    redirect('/login');
  }

  // Check if user has access to this page
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    redirect('/login');
  }

  const items = navigationItems[userRole as UserRole];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Header with Sheet */}
      <MobileHeader items={items} userRole={userRole} />
      
      {/* Main content with proper spacing for persistent sidebar */}
      <div className="md:ml-64">
        <main className="  overflow-y-auto bg-background text-foreground">
          {children}
        </main>
      </div>
    </div>
  );
} 