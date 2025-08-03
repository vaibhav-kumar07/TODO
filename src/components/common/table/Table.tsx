import { Table } from "../../ui/table";

// import KhataTableHeader from "@/components/common/table/KhataTableHeader";
// import KhataTableBody from "@/components/common/table/KhataTableBody";

export interface ITableMetadata {
  columnName: string;
  headerLabel?: string;
  sortable?: boolean;
  defaultSortColumn?: boolean;
  columnClass?: string;
  cellClass?: string;
  defaultSortOrder?: "asc" | "desc";
  type?:
    | "date"
    | "datetime"
    | "time"
    | "currency"
    | "number"
    | "string"
    | "icon"
    | "stringWithIcon"
    | "widget";
  icon?: IIcon;
  widgetName?: string;
  sortableIconClass?: string;
  showColumnLabel?: boolean;
  showColon?: boolean;
  cellContainerClass?: string;
  widgetClass?: string;
}

export interface IIcon {
  name: string;
  className?: string;
  onClick?: () => void;
}

export default function DataTable({
  data,
}: //   metadata,
{
  data: any;
  metadata: ITableMetadata[];
}) {
  return (
    <div>
      {data?.length > 0 && (
        <Table className="rounded-lg w-full ">
          {/* <KhataTableHeader metadata={metadata} />
          <KhataTableBody data={data} metadata={metadata} /> */}
        </Table>
      )}
    </div>
  );
}
