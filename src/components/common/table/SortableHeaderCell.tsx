"use client";

import { Label } from "@/components/common/Label";
import { useGetSearchParamValue } from "@/components/hooks/request";
import { cn } from "@/lib/utils";

const _paramKeys = {
  sortColumn: "sortColumn",
  sortOrder: "sortOrder",
};

const _sortOrder = { asc: "asc", desc: "desc" };
interface ISortableHeaderProps {
  columnName: string;
  label: string;
  defaultSortColumn?: boolean;
  defaultSortOrder?: string;
  className?: string;
  iconClass?: string;
  sortOrder?: string;
}

export default function SortableHeaderCell({
  columnName,
  label,
  defaultSortColumn,
  defaultSortOrder,
  className,
  iconClass,
}: ISortableHeaderProps) {
  const _defaultSortColumn = defaultSortColumn ? columnName : "";
  const sortOrder = useGetSearchParamValue(
    _paramKeys.sortOrder,
    defaultSortOrder
  );
  const sortColumn = useGetSearchParamValue(
    _paramKeys.sortColumn,
    _defaultSortColumn
  );

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      const order =
        sortOrder === _sortOrder.asc ? _sortOrder.desc : _sortOrder.asc;

      //   router.push(appendSearchParams(_paramKeys.sortOrder as string, order));
    } else {
      //   router.push(appendSearchParams(_paramKeys.sortColumn as string, column));
    }
  };

  return (
    <Label
      variant={"semibold"}
      className={cn("cursor-pointer flex items-center ", className)}
      onClick={() => handleSort(columnName)}
      size={"sm"}
    >
      {label}
      {sortColumn === columnName && (
        <SortArrow direction={sortOrder} className={iconClass} />
      )}
    </Label>
  );
}

export function SortArrow({
  direction: direction,
  className,
}: {
  direction: string;
  className?: string;
}) {
  return (
    <span className={cn("text-muted-foreground  ", className)}>
      {direction === "asc" ? " ▲" : " ▼"}
    </span>
  );
}
