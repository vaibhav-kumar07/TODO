'use client';
import CommonButton from '@/components/common/Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function AllFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const hasActiveFilters = () => {
        return searchParams.get('role') || searchParams.get('isActive') || searchParams.get('search');
    };


    const clearFilters = () => {
        router.push(pathname);
    };

    return (
        <CommonButton variant='outline' size='sm' className={`h-6 rounded-md text-xs text-muted-foreground ${!hasActiveFilters() ? 'bg-primary text-primary-foreground' : ''}`} onClick={clearFilters} >
            All
        </CommonButton>
    )
}
