import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { redirect } from 'next/navigation';
import Sidebar from './Sidebar';

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

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 