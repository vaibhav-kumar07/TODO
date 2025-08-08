import { NextRequest, NextResponse } from 'next/server';
import { ICookieKeys } from '@/types/common';
import { UserRole } from '@/types/auth';

// Public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/logout',
  '/favicon.ico',
  '/_next',
  '/api/webhook',
  '/api/health',
];

// Role-based route access
const roleRoutes = {
  [UserRole.ADMIN]: ['/admin', '/api/admin'],
  [UserRole.MANAGER]: ['/manager', '/api/manager'],
  [UserRole.MEMBER]: ['/member', '/api/member'],
};

// Shared routes accessible by multiple roles
const sharedRoutes = {
  '/api/tasks': [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER],
  '/api/users': [UserRole.ADMIN, UserRole.MANAGER],
  '/api/profile': [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER],
  '/api/dashboard': [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER],
};

// Helper function to check if path matches a route pattern
function pathMatches(pattern: string, path: string): boolean {
  return path === pattern || path.startsWith(pattern + '/');
}

// Helper function to check if route is public
function isPublicRoute(path: string): boolean {
  return publicRoutes.some(route => pathMatches(route, path));
}

// Helper function to check if user has access to route
function hasAccess(userRole: string, path: string): boolean {
  // Check role-specific routes
  const userRoleRoutes = roleRoutes[userRole as UserRole] || [];
  if (userRoleRoutes.some(route => pathMatches(route, path))) {
    return true;
  }

  // Check shared routes
  for (const [route, allowedRoles] of Object.entries(sharedRoutes)) {
    if (pathMatches(route, path) && allowedRoles.includes(userRole as UserRole)) {
      return true;
    }
  }

  return false;
}

// Helper function to get redirect path based on role
function getRedirectPath(userRole: string): string {
  switch (userRole) {
    case UserRole.ADMIN:
      return '/admin';
    case UserRole.MANAGER:
      return '/manager';
    case UserRole.MEMBER:
      return '/member';
    default:
      return '/login';
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Get authentication cookies
  const token = request.cookies.get(ICookieKeys.TOKEN)?.value;
  const userRole = request.cookies.get(ICookieKeys.USER_ROLE)?.value;
  const userId = request.cookies.get(ICookieKeys.USER_ID)?.value;

  // Check if user is authenticated
  if (!token || !userRole || !userId) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Validate user role
  if (!Object.values(UserRole).includes(userRole as UserRole)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if user has access to the requested route
  console.log("userRole", userRole);
  console.log("pathname", pathname);
  if (!hasAccess(userRole, pathname)) {
    
    const redirectPath = getRedirectPath(userRole);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // User is authenticated and has access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
