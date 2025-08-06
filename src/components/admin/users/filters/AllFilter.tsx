'use client';
import CommonButton from '@/components/common/Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function AllFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const hasActiveFilters = () => {
        // Check if there are any search parameters at all
        return searchParams.toString().length > 0;
    };

    const clearFilters = () => {
        router.push(pathname);
    };

    // // Only show the All button when there are active filters
    // if (!hasActiveFilters()) {
    //     return null;
    // }

    return (
        <CommonButton 
            variant='outline' 
            size='sm' 
            className="h-6 rounded-md text-xs text-muted-foreground" 
            onClick={clearFilters}
        >
            All
        </CommonButton>
    )
}
