import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys } from "@/types/common";
import { redirect } from "next/navigation";
import TaskManagementHeader from "@/components/manager/tasks/TaskManagementHeader";
import TaskTable from "@/components/manager/tasks/TaskTable";
import FilterContainer from "@/components/manager/tasks/filters/FilterContainer";
import { getAllTasks } from "@/lib/task-api";
import { paginationLimit } from "@/types/common";
import { UserRole } from "@/types/auth";
import { TaskFilters } from "@/types/task";
import { getTaskTableMetadataForSSR } from "@/lib/task-table-metadata";
import Pagination from "@/components/common/pagination/Pagination";

interface TaskManagementPageProps {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    search?: string;
    dueDate?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function TaskManagementPage({
  searchParams,
}: TaskManagementPageProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);

  if (
    !token ||
    !userRole ||
    userRole.toLowerCase() !== UserRole.MEMBER.toString().toLowerCase()
  ) {
    redirect("/login");
  }

  const { status, priority, search, dueDate, page, limit } = await searchParams;
  const filterParams: TaskFilters = {
    status: status as any,
    priority: priority as any,
    search: search || undefined,
    dueDate: dueDate || undefined,
    page: parseInt(page || "1"),
    limit: parseInt(limit || paginationLimit.LIMIT_10.toString()),
  };

  const tasksResponse = await getAllTasks(filterParams);
  const tasks = tasksResponse.success ? tasksResponse.data?.tasks || [] : [];
  const taskTableMetadata = getTaskTableMetadataForSSR(userRole);

  return (
    <div className="p-0  md:px-4 md:py-4">
    <TaskManagementHeader />
    <div className="md:border rounded-lg  sm:p-0 pt-2 ">
      <FilterContainer />
      <TaskTable
        tasks={tasks}
        className="rounded-lg  border-none p-4 sm:p-0 "
        metadata={taskTableMetadata}
      />
    </div>
    <Pagination
      recordCount={tasksResponse.data?.pagination?.total || 0}
      className="px-4 py-2"
    />
  </div>
  );
}
