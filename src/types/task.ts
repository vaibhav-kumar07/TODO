export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

// User interface for task assignments
export interface TaskUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  assignedTo: TaskUser; // Full user object
  assignedBy: TaskUser; // Full user object (creator)
  createdAt: Date;
  updatedAt: Date;
  teamId?: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: Date;
  assignedTo: string; // User ID for creation
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  assignedTo?: string; // User ID for updates
  status?: TaskStatus;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: Partial<TaskFilters>;
}

