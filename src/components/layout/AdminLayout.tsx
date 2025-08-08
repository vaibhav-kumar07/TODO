import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { UserRole } from '@/types/auth';
import { redirect } from 'next/navigation';
import { navigationItems } from '@/lib/sidebar';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
  
  if (!token || !userRole) {
    redirect('/login');
  }

  const items = navigationItems[userRole as UserRole];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header with Sheet */}
      <MobileHeader items={items} userRole={userRole} />
      
      {/* Main content with proper spacing for persistent sidebar */}
      <div className="md:ml-64">
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 