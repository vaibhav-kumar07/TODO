'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Users, 
  Building2, 
  Settings, 
  CheckSquare
} from 'lucide-react';
import LogoutButton from '@/components/auth/LogoutButton';  
import { cn } from '@/lib/utils';
  
interface NavigationItem {
  label: string;
  href: string; 
  icon: string;
}

interface SidebarClientProps {
  items: NavigationItem[];
  userRole: string;
  className?: string;
}

// Icon mapping
const iconMap = {
  LayoutDashboard,
  User,
  Users,
  Building2,
  Settings,
  CheckSquare
};

export default function SidebarClient({ items, userRole, className }: SidebarClientProps) {
  const pathname = usePathname();

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const isActive = (href: string) => {
    if (href === '/admin' || href === '/manager' || href === '/member') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={cn("w-64 h-screen border-r bg-card text-card-foreground border-border", className)}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-card-foreground">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()} Panel
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  active 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <span className="mr-3">
                  {getIcon(item.icon)}
                </span>
                {item.label}
              </Link> 
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
} 