import { Label } from "../Label";
import WidgetLibrary from "../WidgetLibrary";
import { ITableMetadata } from "./Table";
import { cn } from "@/lib/utils";
import moment from "moment";

interface ITableCellProps {
  value: any;
  meta: ITableMetadata;
  rowdata?: any;
}

export default function TableCell({ value, meta, rowdata }: ITableCellProps) {
  return (
    <div
      className={cn(
        "w-full transition-all  duration-300 py-0.5 md:py-1",
        meta.cellClass
      )}
    >
      {(() => {
        if (meta.type === "widget") {
          return <CellWidget value={value} meta={meta} rowData={rowdata} />;
        } else if (meta.type === "icon" || meta.type === "stringWithIcon") {
          return <CellIcon value={value} meta={meta} />;
        } else {
          return <CellLabel value={value} meta={meta} />;
        }
      })()}
    </div>
  );
}

function CellLabel({ value, meta }: { value: any; meta: ITableMetadata }) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-2 md:grid-cols-1  ",
        meta.cellContainerClass
      )}
    >
      <div className=" md:hidden">
        {meta.showColumnLabel !== false && (
          <Label
            size="sm"
            variant={"semibold"}
            className=" font-lato text-gray-600"
          >
            {`${meta.headerLabel || meta.columnName}`}
          </Label>
        )}
      </div>
      <div>
        {value ? (
          <Label
            size="sm"
            className={cn(
              "text-gray-800 block md:inline md:col-span-1",
              meta.cellClass
            )}
          >
            {getCellValue(value, meta.type)}
          </Label>
        ) : (
          <SkeletonCell />
        )}
      </div>
    </div>
  );
}

function CellIcon({ meta, value }: { meta: ITableMetadata; value?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 transition-transform duration-300",
        meta.cellClass
      )}
    >
      {meta.showColumnLabel !== false && value && (
        <CellLabel value={value} meta={meta} />
      )}
    </div>
  );
}

function CellWidget({
  value,
  meta,
  rowData,
}: {
  value: string;
  meta: ITableMetadata;
  rowData?: any;
}) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-2  md:grid-cols-none ",
        meta.cellContainerClass
      )}
    >
      <div className="md:hidden ">
        {meta.showColumnLabel !== false && (
          <Label
            size="sm"
            variant={"semibold"}
            className="font-semibold font-lato text-gray-600"
          >
            {`${meta.headerLabel || meta.columnName}`}
          </Label>
        )}
      </div>
      <WidgetLibrary
        widgetName={meta.widgetName!}
        value={value}
        rowData={rowData}
      />
    </div>
  );
}

function SkeletonCell() {
  return <div className=" md:text-center">{`--`}</div>;
}

function getCellValue(value: any, type?: string) {
  if (!value) return "-";
  switch (type) {
    case "datetime":
      return dateTimeCell(value);
    default:
      return typeof value === "object" ? JSON.stringify(value) : value;
  }
}

const dateTimeCell = (value: string) => {
  return value ? moment(value).fromNow() : "";
};
