import { getCookieValue } from '@/lib/common/cookie-utils';
import { ICookieKeys } from '@/types/common';
import { redirect } from 'next/navigation';
import TaskManagementHeader from '@/components/manager/tasks/TaskManagementHeader';
import TaskTable from '@/components/manager/tasks/TaskTable';
import FilterContainer from '@/components/manager/tasks/filters/FilterContainer';
import { getAllTasks } from '@/lib/task-api';
import { getAllUsers } from '@/lib/user-api';
import { paginationLimit } from '@/types/common';
import { UserRole } from '@/types/auth';
import { TaskFilters } from '@/types/task';

interface TaskManagementPageProps {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    search?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function TaskManagementPage({ searchParams }: TaskManagementPageProps) {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  const userRole = await getCookieValue(ICookieKeys.USER_ROLE);
  
  if (!token || !userRole || userRole.toLowerCase() !== UserRole.MANAGER.toString().toLowerCase()) {
    redirect('/login');
  }

  const { status, priority, search, page, limit } = await searchParams;
  const filterParams: TaskFilters = {
    status: status as any,
    priority: priority as any,
    search: search || undefined,
    page: parseInt(page || '1'),
    limit: parseInt(limit || paginationLimit.LIMIT_10.toString())
  };

  const tasksResponse = await getAllTasks(filterParams);
  console.log('tasksResponse', tasksResponse);
  const tasks = tasksResponse.success ? tasksResponse.data?.tasks || [] : [];

  return (
    <div className="space-y-4 px-4">
      <TaskManagementHeader />
      <div className="border rounded-xl ">
        <FilterContainer />
        <TaskTable tasks={tasks} className='rounded-y-xl'/>
      </div>
    </div>
  );
} 