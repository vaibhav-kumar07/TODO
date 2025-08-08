"use client";

import { Label } from "@/components/common/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationBarProps {
  className?: string;
  page: number;
  rowsPerPage: number;
  recordCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (value: string) => void;
}

export const STARTPAGE = 1;

export default function PaginationBar(props: PaginationBarProps) {
  const page = props.page;
  const startRecord = (props.page - 1) * props.rowsPerPage + 1;
  let endRecord = startRecord + props.rowsPerPage - 1;
  endRecord = endRecord > props.recordCount ? props.recordCount : endRecord;

  const totalPages = Math.ceil(props.recordCount / props.rowsPerPage);

  return (
    <div
      className={cn(
        "flex gap-4 justify-end align-middle items-center  py-4 ",
        props.className
      )}
    >
      {/* <div className="flex gap-1 align-middle items-center justify-center">
        <Label size={"sm"}>Rows per page</Label>
        <RowCountSelector
          onValueChange={props.onRowsPerPageChange}
          value={props.rowsPerPage.toString()}
        />
      </div> */}
      <div>
        <Label size={"sm"}>
          {startRecord}-{endRecord} of {props.recordCount}
        </Label>
      </div>
      <PageArrows
        page={page}
        totalPages={totalPages}
        onPageChange={props.onPageChange}
      />
    </div>
  );
}

const PageArrows = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const hasMorePages = page < totalPages;
  const hasPreviousPages = page > STARTPAGE;
  return (
    <div className="flex">
      {hasPreviousPages && (
        <a className="cursor-pointer" onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="h-6 w-6 text-slate-700" />
        </a>
      )}
      {!hasPreviousPages && <ChevronLeft className="h-6 w-6 text-slate-400" />}
      {hasMorePages && (
        <a className="cursor-pointer" onClick={() => onPageChange(page + 1)}>
          <ChevronRight className="h-6 w-6 text-slate-700" />
        </a>
      )}
      {!hasMorePages && <ChevronRight className="h-6 w-6 text-slate-400" />}
    </div>
  );
};

const rowCountOptions = ["10", "25", "50"];
const RowCountSelector = ({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void;
  value: string;
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger className="w-[50px] h-6 border-none outline-none active:outline-none focus:outline-none focus-visible:ring-0 focus:border-none bg-transparent active:border-none">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        {rowCountOptions.map((option) => (
          <SelectItem value={option} key={option}>
            <Label size={"sm"}>{option}</Label>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
