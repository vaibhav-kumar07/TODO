
import StatusWidget from "./StatusWidget";
import UserUpdateWidget from "@/components/admin/users/widget/UserUpdateWidget";
import UpdateStatus from "@/components/admin/users/widget/UpdateStatus";
import UserStatusWidget from "@/components/admin/users/widget/UserStatusWidget";
import TaskUpdateWidget from "@/components/manager/tasks/widget/TaskUpdateWidget";
import UpdateTaskStatus from "@/components/manager/tasks/widget/UpdateTaskStatus";
import ReassignTask from "@/components/manager/tasks/widget/ReassignTask";
import { User } from "@/lib/user-api-client";
import { Task } from "@/types/task";

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

  taskUpdateWidget: (value: string, rowData: Task) => {
    return <TaskUpdateWidget task={rowData} />;
  },

  updateTaskStatusWidget: (value: string, rowData: Task) => {
    return <UpdateTaskStatus task={rowData} />;
  },

  reassignTaskWidget: (value: string, rowData: Task) => {
    return <ReassignTask task={rowData} />;
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
