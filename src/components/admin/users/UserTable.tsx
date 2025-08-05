import { Label } from "@/components/common/Label";
import { ITableMetadata } from "@/components/common/table/Table";
import TableHeader from "@/components/common/table/TableHeader";
import TableRow from "@/components/common/table/TableRow";
import { User } from "@/lib/user-api-client";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/common/date-utils";
import { UserRole } from "@/types/auth";

interface UserTableProps {
    users: User[];
    className?: string;
}

const userTableMetadata: ITableMetadata[] = [
    {
        columnName: "fullName",
        headerLabel: "User",
        sortable: true,
        columnClass: "w-full md:w-[30%] lg:w-[25%] text-left text-muted-foreground md:pl-4",
        cellClass: "w-full md:w-[30%] lg:w-[25%] text-left md:pl-2",
        // type: "widget",
        // widgetName: "userDetailWidget",
    },
    {
        columnName: "email",
        headerLabel: "Email",
        sortable: true,
        columnClass: "w-full md:w-[20%] lg:w-[20%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[20%] lg:w-[20%]",
    },
    {
        columnName: "role",
        headerLabel: "Role",
        sortable: true,
        columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] lg:w-[15%]",
        // type: "widget",
        // widgetName: "userRoleWidget",
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
];

export default function UserTable(props: UserTableProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0 md:overflow-auto",
                props.className,
            )}
        >
            <TableHeader
                metadata={userTableMetadata}
                className="border-none rounded-none md:px-0 md:py-1.5 md:gap-0 text-foreground"
            />
            {props.users?.length ? (
                props.users.map((user: User) => {
                    const userData = {
                        ...user,
                        status: user, // Pass the full user object for the widget
                        fullName: `${user.firstName} ${user.lastName}`,
                        createdAt: formatDate(user.createdAt,"MMM DD, YYYY"),
                        role: user.role==UserRole.ADMIN ? "Admin" : user.role==UserRole.MEMBER ? "Member" : "Manager",
                    }
                    return (
                        <TableRow
                            key={user.id}
                            data={userData}
                            metadata={userTableMetadata}
                            className="w-full border-x-0 border-b-0 px-4 py-2 md:py-1 md:px-0"
                        />
                    );
                })
            ) : (
                <div className="py-2 text-center">
                    <Label className="text-muted-foreground" variant="semibold">
                        No users found with matching criteria
                    </Label>
                </div>
            )}
        </div>
    );
}