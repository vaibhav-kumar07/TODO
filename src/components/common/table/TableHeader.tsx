import SortableHeaderCell from "./SortableHeaderCell";
import { ITableMetadata } from "../../common/table/Table";
import { Label } from "../../common/Label";
import { cn } from "@/lib/utils";

export default function TableHeader({
    metadata,
    className,
}: {
    metadata: ITableMetadata[];
    className?: string;
}) {
    return (
        <div
            className={cn(
                "bg-gray-200 md:flex  md:items-center  md:py-1 hidden rounded-t-sm  ",
                className,
            )}
        >
            {metadata.map((meta, index) =>
                meta.sortable ? (
                    <SortableHeaderCell
                        key={index}
                        columnName={meta.columnName}
                        label={meta.headerLabel || ""}
                        defaultSortColumn={meta.defaultSortColumn}
                        defaultSortOrder={meta.defaultSortOrder}
                        className={cn("hidden lg:table-cell", meta.columnClass)}
                        iconClass={meta.sortableIconClass}
                    />
                ) : (
                    <Label
                        key={index}
                        variant={"semibold"}
                        size={"sm"}
                        className={cn(
                            "font-semibold text-sm ",
                            meta.columnClass,
                        )}
                    >
                        {meta.headerLabel}
                    </Label>
                ),
            )}
        </div>
    );
}
