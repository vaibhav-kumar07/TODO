import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/auth/LogoutButton';
import { UserRole } from '@/types/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
  
  if (userRole !== UserRole.ADMIN) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              <span className="text-sm text-muted-foreground">
                Welcome, {userRole || 'Admin'}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <LogoutButton variant="button" className="text-sm">
                Logout
              </LogoutButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 