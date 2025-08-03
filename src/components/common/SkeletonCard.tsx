import { Card } from "@/components/ui/card";

export default function SkeletonCard() {
  return (
    <Card className="p-6 bg-white shadow-md rounded-xl overflow-hidden border">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          {/* Title skeleton */}
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />

          {/* Value skeleton */}
          <div className="h-8 w-16 bg-gray-300 rounded-md animate-pulse" />
        </div>

        {/* Icon container skeleton */}
        <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse ring-4 ring-gray-100" />
      </div>
    </Card>
  );
}
