'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/auth';
import CommonButton from '../common/Button';


export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const result = await logoutAction();
      
      if (result.success) {
        // Redirect to login page after successful logout
        router.push('/login');
        router.refresh(); // Refresh to clear any cached data
      } else {
        // Even if logout fails, redirect to login page
        console.error('Logout failed:', result.message);
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Always redirect to login page even on error
      router.push('/login');
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <CommonButton
      onClick={handleLogout}
      disabled={isLoading}
      variant="destructive"
      className='w-full h-9'
      loading={isLoading}
    >
      Logout
    </CommonButton>
  );
} 