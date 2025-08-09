import { ITableMetadata } from "@/components/common/table/Table";
import { UserRole } from "@/types/auth";


// Manager-specific metadata with widgets
const managerTaskTableMetadata: ITableMetadata[] = [
  {
    columnName: "title",
    headerLabel: "Title",
    sortable: true,
    columnClass: "w-full md:w-[20%] lg:w-[20%] text-left text-muted-foreground md:pl-4",
    cellClass: "w-full md:w-[20%] lg:w-[20%] text-left md:pl-2",
  },
  {
    columnName: "description",
    headerLabel: "Description",
    sortable: true,
    columnClass: "w-full md:w-[16%] lg:w-[21%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[16%] lg:w-[21%]",
  },
  {
    columnName: "status",
    headerLabel: "Status",
    sortable: true,
    columnClass: "w-full md:w-[12%] lg:w-[12%] text-muted-foreground",
    cellClass: "w-full md:w-[12%] lg:w-[12%] md:px-0 md:text-center",
    type: "widget",
    widgetName: "updateTaskStatusWidget",
  },
  {
    columnName: "priority",
    headerLabel: "Priority",
    sortable: true,
    columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[10%] lg:w-[10%]",
    type: "widget",
    widgetName: "updateTaskPriorityWidget",
  },
  {
    columnName: "dueDate",
    headerLabel: "Due Date",
    sortable: true,
    columnClass: "w-full md:w-[12%] lg:w-[12%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[12%] lg:w-[12%]",
  },
  {
    columnName: "assignedTo",
    headerLabel: "Assigned To",
    sortable: true,
columnClass: "w-full md:w-[12%] lg:w-[15%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[12%] lg:w-[15%]",
    type: "widget",
    widgetName: "reassignTaskWidget",
  },
  {
    columnName: "actions",
    headerLabel: "Edit",
    sortable: false,
    columnClass: "w-full md:w-[8%] lg:w-[5%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[8%] lg:w-[5%]",
    type: "widget",
    widgetName: "taskUpdateWidget",
  },
  {
    columnName: "delete",
    headerLabel: "Delete",
    sortable: false,
    columnClass: "w-full md:w-[8%] lg:w-[5%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[8%] lg:w-[5%]",
    type: "widget",
    widgetName: "deleteTaskWidget",
  },
];

// Member-specific metadata (no widgets, no assignee field, view-only actions)
const memberTaskTableMetadata: ITableMetadata[] = [
  {
    columnName: "title",
    headerLabel: "Title",
    sortable: true,
    columnClass: "w-full md:w-[25%] lg:w-[20%] text-left text-muted-foreground md:pl-4",
    cellClass: "w-full md:w-[25%] lg:w-[20%] text-left md:pl-2",
  },
  {
    columnName: "description",
    headerLabel: "Description",
    sortable: true,
    columnClass: "w-full md:w-[25%] lg:w-[25%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[25%] lg:w-[25%]",
  },
  {
    columnName: "status",
    headerLabel: "Status",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%] ",
    type: "widget",
    widgetName: "updateTaskStatusWidget",
  },
  {
    columnName: "priority",
    headerLabel: "Priority",
    sortable: true,
    columnClass: "w-full md:w-[12%] lg:w-[12%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[12%] lg:w-[12%]",
  },
  {
    columnName: "dueDate",
    headerLabel: "Due Date",
    sortable: true,
    columnClass: "w-full md:w-[18%] lg:w-[18%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[18%] lg:w-[18%]",
  },
  {
    columnName: "assignedBy",
    headerLabel: "Assigned By",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%]",
  },
];

// Admin-specific metadata (all fields with full control)
const adminTaskTableMetadata: ITableMetadata[] = [
  {
    columnName: "title",
    headerLabel: "Title",
    sortable: true,
    columnClass: "w-full md:w-[18%] lg:w-[14%] text-left text-muted-foreground md:pl-4",
    cellClass: "w-full md:w-[18%] lg:w-[14%] text-left md:pl-2",
  },
  {
    columnName: "description",
    headerLabel: "Description",
    sortable: true,
    columnClass: "w-full md:w-[14%] lg:w-[14%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[14%] lg:w-[14%]",
  },
  {
    columnName: "status",
    headerLabel: "Status",
    sortable: true,
    columnClass: "w-full md:w-[10%] lg:w-[10%] text-muted-foreground",
    cellClass: "w-full md:w-[10%] lg:w-[10%] md:px-0 md:text-center",
    type: "widget",
    widgetName: "updateTaskStatusWidget",
  },
  {
    columnName: "priority",
    headerLabel: "Priority",
    sortable: true,
    columnClass: "w-full md:w-[8%] lg:w-[8%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[8%] lg:w-[8%]",
    type: "widget",
    widgetName: "updateTaskPriorityWidget",
  },
  {
    columnName: "dueDate",
    headerLabel: "Due Date",
    sortable: true,
    columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[10%] lg:w-[10%]",
  },
  {
    columnName: "assignedTo",
    headerLabel: "Assigned To",
    sortable: true,
    columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[10%] lg:w-[10%]",
    type: "widget",
    widgetName: "reassignTaskWidget",
  },
  {
    columnName: "assignedBy",
    headerLabel: "Assigned By",
    sortable: true,
    columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[10%] lg:w-[10%]",
  },
  {
    columnName: "actions",
    headerLabel: "Actions",
    sortable: false,
    columnClass: "w-full md:w-[6%] lg:w-[10%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[6%] lg:w-[10%]",
    type: "widget",
    widgetName: "taskUpdateWidget",
  },
  {
    columnName: "delete",
    headerLabel: "Delete",
    sortable: false,
    columnClass: "w-full md:w-[4%] lg:w-[6%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[4%] lg:w-[6%]",
    type: "widget",
    widgetName: "deleteTaskWidget",
  },
];


export function getTaskTableMetadata(role: string): ITableMetadata[] {
  const normalizedRole = role?.toLowerCase();
  
  switch (normalizedRole) {
    case UserRole.ADMIN.toLowerCase():
      return adminTaskTableMetadata;
    case UserRole.MANAGER.toLowerCase():
      return managerTaskTableMetadata;
    case UserRole.MEMBER.toLowerCase():
      return memberTaskTableMetadata;
    default:
      return memberTaskTableMetadata;
  }
}

export function getTaskTableMetadataForSSR(role: string): ITableMetadata[] {
  return getTaskTableMetadata(role);
}

export function isColumnVisible(columnName: string, role: string): boolean {
  const metadata = getTaskTableMetadata(role);
  return metadata.some(col => col.columnName === columnName);
}


export function getVisibleColumns(role: string): string[] {
  const metadata = getTaskTableMetadata(role);
  return metadata.map(col => col.columnName);
} 