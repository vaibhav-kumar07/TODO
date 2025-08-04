
import StatusWidget from "./StatusWidget";
import UserUpdateWidget from "@/components/admin/users/widget/UserUpdateWidget";
import UpdateStatus from "@/components/admin/users/widget/UpdateStatus";
import UserStatusWidget from "@/components/admin/users/widget/UserStatusWidget";
import { User } from "@/lib/user-api-client";


const widgets: any = {
  statusWidget: () => {
    return <StatusWidget />;
  },

  userUpdateWidget: (value: string, rowData: User) => {
    return <UserUpdateWidget user={rowData} />;
  },

  updateStatusWidget: (value: string, rowData: User) => {
    return <UpdateStatus user={rowData} />;
  },

  userStatusWidget: (value: string, rowData: User) => {
    return <UserStatusWidget user={rowData} />;
  },
};
export default function WidgetLibrary({
  widgetName,
  value,
  rowData,
}: {
  widgetName: string;
  value: string;
  rowData?: any;
  className?: string;
}) {
  return widgets[widgetName](value, rowData);
}
