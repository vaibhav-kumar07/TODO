'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Users, 
  Building2, 
  Settings, 
  CheckSquare,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LogoutButton from '@/components/auth/LogoutButton';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  href: string; 
  icon: string;
}

interface MobileHeaderProps {
  items: NavigationItem[];
  userRole: string;
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

export default function MobileHeader({ items, userRole }: MobileHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

  // Get current page title
  const getCurrentPageTitle = () => {
    const currentItem = items.find(item => {
      if (item.href === '/admin' || item.href === '/manager' || item.href === '/member') {
        return pathname === item.href;
      }
      return pathname.startsWith(item.href);
    });
    
    return currentItem?.label || 'Dashboard';
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="px-6 py-4 border-b border-border ">
                <SheetTitle className="text-center">
                <Link href="/" className="flex items-center gap-2">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()} Panel
                </Link>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col h-full">
                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                  {items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors",
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
            </SheetContent>
          </Sheet>
          
          <h1 className="text-lg font-semibold text-card-foreground">
            {getCurrentPageTitle()}
          </h1>
          
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Persistent Sidebar - Only visible on md+ screens */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 border-r bg-card text-card-foreground border-border z-40">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <div className="flex items-center justify-center">
              <Link href="/" className="w-full flex items-center gap-2 justify-center ">
              <h1 className=" w-full text-lg font-semibold text-card-foreground flex items-center justify-center">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()} Panel
              </h1></Link>
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
    </>
  );
} 