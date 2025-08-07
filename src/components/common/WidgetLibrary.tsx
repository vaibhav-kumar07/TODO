
import { User } from '@/lib/user-api';
import { Task } from '@/types/task';
import TaskUpdateWidget from '@/components/manager/tasks/widget/TaskUpdateWidget';
import UpdateTaskStatus from '@/components/manager/tasks/widget/UpdateTaskStatus';
import UpdateTaskPriority from '@/components/manager/tasks/widget/UpdateTaskPriority';
import ReassignTask from '@/components/manager/tasks/widget/ReassignTask';
import UserUpdateWidget from '@/components/users/widget/UserUpdateWidget';
import UserStatusWidget from '@/components/users/widget/UserStatusWidget';
import UpdateStatus from '@/components/users/widget/UpdateStatus';
import DeleteTaskWidget from '@/components/manager/tasks/widget/DeleteTaskWidget';

const widgets: any = {
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

  updateTaskPriorityWidget: (value: string, rowData: Task) => {
    return <UpdateTaskPriority task={rowData} />;
  },
  deleteTaskWidget: (value: string, rowData: Task) => {
    return <DeleteTaskWidget taskId={rowData._id} taskTitle={rowData.title} />;
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
