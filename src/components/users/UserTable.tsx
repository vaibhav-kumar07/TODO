import React from "react";
import TableHeader from "@/components/common/table/TableHeader";
import TableRow from "@/components/common/table/TableRow";
import { User } from "@/lib/user-api";
import { Label } from "@/components/common/Label";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/common/date-utils";
import { UserRole } from "@/types/auth";
import { getUserTableMetadata } from "@/lib/user-table-metadata";

interface UserTableProps {
  users: User[];
  className?: string;
  rowClassName?: string;
}

export default async function UserTable(props: UserTableProps) {
  const metadata =  await getUserTableMetadata();
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-4 md:gap-0 md:overflow-auto rounded-b-xl p-2 sm:p-0",
        props.className
      )}
    >
      <TableHeader
        metadata={metadata}
        className="border-none rounded-none md:px-0 md:py-1.5 md:gap-0 text-foreground rounded-t-xl"
      />
      {props.users?.length ? (
        props.users.map((user: User) => {
          const userData = {
            ...user,
            status: user, // Pass the full user object for the widget
            password: user, // Pass the full user object for the password widget
            fullName: `${user.firstName} ${user.lastName}`,
            createdAt: formatDate(user.createdAt, "MMM DD, YYYY"),
            role:
              user.role == UserRole.ADMIN
                ? "Admin"
                : user.role == UserRole.MEMBER
                ? "Member"
                : "Manager",
          };
          return (
              <TableRow
              key={user.id}
              data={userData}
              metadata={metadata}
              className={cn(
                "w-full border-x-0 border-b-0 px-4 py-2 md:py-1 md:px-0",
                props.rowClassName
              )}
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
