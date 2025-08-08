import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { UserRole } from '@/types/auth';
import { navigationItems } from '@/lib/sidebar';
import SidebarClient from './SidebarClient';
import MobileSidebar from './MobileSidebar';

export default async function Sidebar() {
  // Server-side role detection
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE) as UserRole;
  const items = navigationItems[userRole];

  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarClient items={items} userRole={userRole} className="sticky top-0 hidden lg:block" />
      
      {/* Mobile Sidebar */}
      <MobileSidebar items={items} userRole={userRole} />
    </>
  );
} 