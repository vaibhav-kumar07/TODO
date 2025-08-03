"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ClearFilters = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const clearFiltersHandler = () => {
    router.push(pathname);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "bg-white text-foreground shadow-none border rounded-md h-[30px] px-2 hover:bg-muted flex items-center cursor-pointer",
        className
      )}
      onClick={clearFiltersHandler}
    >
      <X size={18} />
      {title && <span className="ml-2">{title}</span>}
    </motion.div>
  );
};

export default ClearFilters;
