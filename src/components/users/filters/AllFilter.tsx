"use client";
import CommonButton from "@/components/common/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AllFilter() {
  const router = useRouter();
  const pathname = usePathname();

  const clearFilters = () => {
    router.push(pathname);
  };
  return (
    <CommonButton
      variant="outline"
      size="sm"
      className="h-6 rounded-md text-xs text-muted-foreground"
      onClick={clearFilters}
    >
      All
    </CommonButton>
  );
}
