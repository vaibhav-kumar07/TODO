// Dashboard Statistics Types - Exact API Format
export interface DashboardStats {
  // 👥 User Statistics (12 fields)
  totalUsers: number;
  totalManagers: number;
  totalMembers: number;
  activeManagers: number;
  inactiveManagers: number;
  activeMembers: number;
  inactiveMembers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  newManagersToday: number;
  newMembersToday: number;
  
  // Legacy fields for backward compatibility
  managersCount: number;
  membersCount: number;
  activeUsers: number;
  inactiveUsers: number;
  totalTeams: number;
  activeTeams: number;
  
  // 🔐 Authentication Statistics (8 fields)
  totalLogins: number;
  loginsToday: number;
  loginsThisWeek: number;
  loginsThisMonth: number;
  failedLoginsToday: number;
  failedLoginsThisWeek: number;
  passwordResetsToday: number;
  forgotPasswordRequests: number;
  
  // 📋 Task Statistics (7 fields)
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  tasksCreatedToday: number;
  tasksCompletedToday: number;
  tasksUpdatedToday: number;
  
  // 📈 Activity Summary (4 fields)
  totalActivities: number;
  activitiesToday: number;
  activitiesThisWeek: number;
  activitiesThisMonth: number;
}

// Event Types
export enum EventType {
  // Authentication Events
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_FAILED = 'LOGIN_FAILED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  
  // User Management Events
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  USER_CREATED = 'USER_CREATED',
  USER_DELETED = 'USER_DELETED',
  USER_INVITED = 'USER_INVITED',
  USER_ACTIVATED = 'USER_ACTIVATED',
  USER_DEACTIVATED = 'USER_DEACTIVATED',

  //USER ROLE EVENTS
  MANAGER_ADDED = 'MANAGER_ADDED',
  MANAGER_REMOVED = 'MANAGER_REMOVED',
  MEMBER_ADDED = 'MEMBER_ADDED',
  MEMBER_REMOVED = 'MEMBER_REMOVED',
  
  // Task Management Events
  TASK_CREATED = 'TASK_CREATED',
  TASK_UPDATED = 'TASK_UPDATED',
  TASK_DELETED = 'TASK_DELETED',
  TASK_ASSIGNED = 'TASK_ASSIGNED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  TASK_STATUS_CHANGED = 'TASK_STATUS_CHANGED',
  TASK_PRIORITY_CHANGED = 'TASK_PRIORITY_CHANGED',
  TASK_DUE_DATE_CHANGED = 'TASK_DUE_DATE_CHANGED',
  
  // Team Management Events
  ROLE_CHANGED = 'ROLE_CHANGED',
}

// User Activity Types - Exact API Format
export interface RecentLogin {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface ActivitySummary {
  totalActivities: number;
  activitiesToday: number;
  activitiesThisWeek: number;
  activitiesThisMonth: number;
}

export interface RecentUserEvent {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
  action: string;
  timestamp: string;
  details: { ipAddress: string; loginTime: string };
}

export interface UserActivityData {
  recentLogins: RecentLogin[];
  recentUserEvents: RecentUserEvent[];
  activitySummary: ActivitySummary;
}

// Event Payload Interfaces
export interface LoginEventPayload {
  userId: string;
  userRole: 'admin' | 'manager' | 'member';
  timestamp: string;
  ipAddress?: string;
}

// Manager Dashboard Types
export interface ManagerStats {
  // Task Statistics
  totalTasks: number;
  tasksCreatedToday: number;
  pendingTasks: number;
  completedTasks: number;
  overdueTasks: number;
  highPriorityTasks: number;
  dueTodayTasks: number;
  
  // Member Statistics
  totalMembers: number;
  membersAddedToday: number;
  membersWithTasks: number;
  membersWithoutTasks: number;
  
  // Today's Activity Summary
  todaysSummary: {
    tasksCreated: number;
    tasksCompleted: number;
    tasksAssigned: number;
    tasksUpdated: number;
    tasksDeleted: number;
    statusChanges: number;
    priorityChanges: number;
    dueDateChanges: number;
  };
}

export interface TaskEventAssignee {
  userId: string;
  userName: string;
  userEmail: string;
}

export interface TaskEventPerformer {
  userId: string;
  userName: string;
  role: string;
}

export enum TaskEventType {
  TASK_CREATED = 'TASK_CREATED',
  TASK_UPDATED = 'TASK_UPDATED',
  TASK_DELETED = 'TASK_DELETED',
  TASK_ASSIGNED = 'TASK_ASSIGNED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  TASK_STATUS_CHANGED = 'TASK_STATUS_CHANGED',
  TASK_PRIORITY_CHANGED = 'TASK_PRIORITY_CHANGED',
  TASK_DUE_DATE_CHANGED = 'TASK_DUE_DATE_CHANGED',
}

export interface TaskEvent {
  taskId: string;
  taskTitle: string;
  assignedTo?: {
    userId: string;
    userName: string;
    userEmail: string;
  };
  status?: string;
  priority?: string;
  dueDate?: Date;
  eventType: TaskEventType;
  timestamp: Date;
  changes?: {
    oldValue?: any;
    newValue?: any;
    field?: string;
  };
  performedBy: {
    userId: string;
    userName: string;
    role: string;
  };
}

export interface TaskActivitySummary {
  taskStatusChanges: number;
  taskPriorityChanges: number;
  taskAssignmentChanges: number;
  newTasks: number;
}

export interface ManagerActivityData {
  recentTaskEvents: TaskEvent[];
  todaysSummary: {
    taskStatusChanges: number;
    taskPriorityChanges: number;
    taskAssignmentChanges: number;
    newTasks: number;
  };
}

export interface DashboardEventPayload {
  type: EventType;
  payload: LoginEventPayload | any; // Can be extended for other event types
  timestamp: string;
}
