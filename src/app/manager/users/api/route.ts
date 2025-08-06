import { NextRequest, NextResponse } from 'next/server';
import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { UserRole } from '@/types/auth';
import { getAllUsers } from '@/lib/user-api';

export async function GET(request: NextRequest) {
  try {
  
    // Check authentication
    const token = await getCookieValue(ICookieKeys.TOKEN);
    const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
    
    if (!token || !userRole) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is manager
    if (userRole.toLowerCase() !== UserRole.MANAGER.toString().toLowerCase()) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Manager access required' },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const params = {
      role: searchParams.get('role') as UserRole,
      isActive: searchParams.get('isActive') === 'true' ? true : searchParams.get('isActive') === 'false' ? false : undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    // Fetch users
    const response = await getAllUsers(params);
    

    if (response.success) {
      return NextResponse.json(response);
    } else {
      return NextResponse.json(
        { success: false, message: response.message || 'Failed to fetch users' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Manager users API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 