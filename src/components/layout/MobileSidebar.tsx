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
  Menu,
  X
} from 'lucide-react';
import LogoutButton from '@/components/auth/LogoutButton';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
  
interface NavigationItem {
  label: string;
  href: string; 
  icon: string;
}

interface MobileSidebarProps {
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

export default function MobileSidebar({ items, userRole }: MobileSidebarProps) {
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
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
          <SheetHeader className="px-6 py-4 border-b border-border">
            <SheetTitle className="text-left">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()} Panel
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
    </div>
  );
} 