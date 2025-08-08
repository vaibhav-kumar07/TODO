import { UserRole } from "@/types/auth";
import RoleBasedWrapper from "../common/RoleBasedWrapper";
import UserManagementDialog from "./UserManagementDialog";
import PageHeaderWithButton from "@/components/common/PageHeaderWithButton";

export default function UserManagementHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="items-center justify-between px-2 py-1 hidden sm:flex ">
      <PageHeaderWithButton
        title={title}
        description={description}
        className="mb-4 flex items-center  "
      />
      <RoleBasedWrapper allowedRoles={[UserRole.ADMIN]}>
        <UserManagementDialog mode="create" />
      </RoleBasedWrapper>
    </div>
  );
}
