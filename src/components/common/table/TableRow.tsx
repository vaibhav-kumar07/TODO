import { ITableMetadata } from "@/components/common/table/Table";
import KhataTableCell from "@/components/common/table/TableCell";
import { cn } from "@/lib/utils";

interface ITableRowProps {
  metadata: ITableMetadata[];
  data: any;
  className?: string;
}

export default function TableRow(props: ITableRowProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col lg:flex-row  lg:flex-nowrap bg-white  border  rounded-lg md:rounded-none shadow lg:shadow-none  transition-all duration-200 md:items-center  ",
        props.className
      )}
    >
      {props.metadata.map((meta) => (
        <KhataTableCell
          key={meta.columnName}
          meta={meta}
          value={props.data[meta.columnName]}
          rowdata={props.data}
        />
      ))}
    </div>
  );
}
