'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/auth';

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'button' | 'link' | 'icon';
}

export default function LogoutButton({ 
  className = '', 
  children = 'Logout',
  variant = 'button'
}: LogoutButtonProps) {
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

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

  const variantClasses = {
    button: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 rounded-md',
    link: 'text-destructive underline-offset-4 hover:underline',
    icon: 'h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={buttonClasses}
      title="Logout"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {variant === 'button' && 'Logging out...'}
        </>
      ) : (
        <>
          {variant === 'icon' ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          ) : (
            <>
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {children}
            </>
          )}
        </>
      )}
    </button>
  );
} 