import StatsSection from "@/components/dashboard/StatsSection";
import RoleFeatures from "@/components/dashboard/RoleFeatures";
import NavigationPreview from "@/components/dashboard/NavigationPreview";
import PlatformFeatures from "@/components/dashboard/PlatformFeatures";
import CTASection from "@/components/dashboard/CTASection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys } from "@/types/common";
import { UserRole } from "@/types/auth";

export default async function HomePage() {
  // Server-side cookie check
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE) as UserRole;
  
  const isAuthenticated = token && userRole;
  
  const getDashboardPath = (role: UserRole): string => {
    switch (role) {
      case UserRole.ADMIN:
        return "/admin";
      case UserRole.MANAGER:
        return "/manager";
      case UserRole.MEMBER:
        return "/member";
      default:
        return "/";
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="bg-card border-b"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {/* Navigation Bar */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  T
                </span>
              </div>
              <span className="text-lg font-semibold text-card-foreground">
                TaskFlow
              </span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Link href={getDashboardPath(userRole)}>
                  <Button size="sm" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-card-foreground">
              Task Management System
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              A comprehensive role-based task management platform designed for
              teams of all sizes. Explore the different roles and their
              capabilities below.
            </p>
           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Stats Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">
              Platform Overview
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Key metrics and statistics that showcase our platform&apos;s
              capabilities
            </p>
          </div>
          <StatsSection />
        </div>

        {/* Role Features */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">
              Role-Based Capabilities
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              Our platform implements a hierarchical role system that ensures
              proper access control and efficient task management across your
              organization.
            </p>
          </div>
          <RoleFeatures />
        </div>

        {/* Navigation Preview */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">
              Navigation Access
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Each role has access to specific navigation items and features
            </p>
          </div>
          <NavigationPreview />
        </div>

        {/* Platform Features */}
        <div>
          <PlatformFeatures />
        </div>

        {/* CTA Section */}
        <div>
          <CTASection />
        </div>
      </div>
    </div>
  );
}
