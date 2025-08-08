'use client';
import CommonButton from '@/components/common/Button'
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AllFilter({className}: {className?: string}) {
    const router = useRouter();
    const pathname = usePathname();

    const clearFilters = () => {
        router.push(pathname);
    };


    return (
        <CommonButton 
            variant='outline' 
            size='sm' 
            className={cn("h-6 rounded-md text-xs text-muted-foreground", className)} 
            onClick={clearFilters}
        >
            All
        </CommonButton>
    )
} 