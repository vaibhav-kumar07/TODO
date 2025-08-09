import { ITableMetadata } from "@/components/common/table/Table";
import { UserRole } from "@/types/auth";
import { ICookieKeys } from "@/types/common";
import { getCookieValue } from "./common/cookie-utils";

const adminUserTableMetadata: ITableMetadata[] = [
  {
    columnName: "fullName",
    headerLabel: "User",
    sortable: true,
    columnClass:
      "w-full md:w-[30%] lg:w-[25%] text-left text-muted-foreground md:pl-4",
    cellClass: "w-full md:w-[30%] lg:w-[25%] text-left md:pl-2",
  },
  {
    columnName: "email",
    headerLabel: "Email",
    sortable: true,
    columnClass:
      "w-full md:w-[25%] lg:w-[25%] text-left text-muted-foreground truncate",
    cellClass: "w-full md:w-[25%] lg:w-[25%] truncate",
  },
  {
    columnName: "role",
    headerLabel: "Role",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%]",
  },
  {
    columnName: "status",
    headerLabel: "Status",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%] md:px-0 md:text-center",
    type: "widget",
    widgetName: "updateStatusWidget",
  },
  {
    columnName: "createdAt",
    headerLabel: "Created",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%]",
  },
  {
    columnName: "actions",
    headerLabel: "Actions",
    sortable: false,
    columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[10%] lg:w-[10%]",
    type: "widget",
    widgetName: "userUpdateWidget",
  },
 
  {
    columnName: "password",
    headerLabel: " Set Password",
    sortable: false,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%]",
    type: "widget",
    widgetName: "changePasswordWidget",
  },
  {
    columnName: "delete",
    headerLabel: "Delete",
    sortable: false,
    columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[10%] lg:w-[10%]",
    type: "widget",
    widgetName: "deleteUserWidget",
  },
];

const managerUserTableMetadata: ITableMetadata[] = [
  {
    columnName: "fullName",
    headerLabel: "User",
    sortable: true,
    columnClass:
      "w-full md:w-[30%] lg:w-[25%] text-left text-muted-foreground md:pl-4",
    cellClass: "w-full md:w-[30%] lg:w-[25%] text-left md:pl-2",
  },
  {
    columnName: "email",
    headerLabel: "Email",
    sortable: true,
    columnClass:
      "w-full md:w-[25%] lg:w-[25%] text-left text-muted-foreground truncate",
    cellClass: "w-full md:w-[25%] lg:w-[25%] truncate",
  },
  {
    columnName: "role",
    headerLabel: "Role",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%]",
  },
  {
    columnName: "status",
    headerLabel: "Status",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%] md:px-0 md:text-center",
    type: "widget",
    widgetName: "updateStatusWidget",
  },
  {
    columnName: "createdAt",
    headerLabel: "Created",
    sortable: true,
    columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
    cellClass: "w-full md:w-[15%] lg:w-[15%]",
  },
  // Note: hide admin-only columns: actions, password
];

export async function getUserTableMetadata(): Promise<ITableMetadata[]> {
    const role = await getCookieValue(ICookieKeys.USER_ROLE);
  const normalizedRole = role?.toLowerCase();
  switch (normalizedRole) {
    case UserRole.ADMIN.toLowerCase():
      return adminUserTableMetadata;
    case UserRole.MANAGER.toLowerCase():
      return managerUserTableMetadata;
    default:
      return managerUserTableMetadata;
  }
}

export async function getVisibleUserColumns(): Promise<string[]> {
  const metadata = await getUserTableMetadata();
  return metadata.map((c) => c.columnName);
}

