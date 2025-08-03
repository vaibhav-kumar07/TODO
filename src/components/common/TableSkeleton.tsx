import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
    return (
        <div className="w-full p-4 space-y-4">
            {/* Table header skeleton */}
            <div className="flex justify-between mb-2">
                <Skeleton className="h-6 w-1/5" />
                <Skeleton className="h-6 w-1/5" />
                <Skeleton className="h-6 w-1/5" />
                <Skeleton className="h-6 w-1/5" />
                <Skeleton className="h-6 w-1/5" />
            </div>

            {/* Table row skeletons */}
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center py-2"
                >
                    <Skeleton className="h-6 w-1/5" />
                    <Skeleton className="h-6 w-1/5" />
                    <Skeleton className="h-6 w-1/5" />
                    <Skeleton className="h-6 w-1/5" />
                    <Skeleton className="h-6 w-1/5" />
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;
