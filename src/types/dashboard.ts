export interface AdminDashboardStats {
   
  totalUsers: number;
  totalManagers: number;
  totalMembers: number;
  totalLogins: number;
}

export interface ManagerDashboardStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  inProgressTasks: number;
  info:{
      managerId: string;
  }
}


export enum EventAction {
  //USER EVENTS
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  USER_CREATED = 'USER_CREATED',
  MANAGER_ADDED = 'MANAGER_ADDED',
  MANAGER_REMOVED = 'MANAGER_REMOVED',
  MEMBER_ADDED = 'MEMBER_ADDED',
  MEMBER_REMOVED = 'MEMBER_REMOVED',
  BECOME_MANAGER = 'BECOME_MANAGER',

  //TASK EVENTS
  TASK_CREATED = 'TASK_CREATED',
  TASK_HIGH_PRIORITY = 'TASK_HIGH_PRIORITY',
  TASK_DUE_DATE = 'TASK_DUE_DATE',
  TASK_COMPLETED = 'TASK_COMPLETED',
  TASK_IN_PROGRESS = 'TASK_IN_PROGRESS',


      


  //event log
  USER_REGISTER = 'USER_REGISTER',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  USER_DELETED = 'USER_DELETED',
  USER_INVITED = 'USER_INVITED',
  USER_ACTIVATED = 'USER_ACTIVATED',
  USER_DEACTIVATED = 'USER_DEACTIVATED',
  USER_INVITATION_SUCCESS = 'USER_INVITATION_SUCCESS',
  USER_INVITATION_FAILED = 'USER_INVITATION_FAILED',
  USER_INVITATION_EXPIRED = 'USER_INVITATION_EXPIRED',
  PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
  PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  DASHBOARD_ACCESS = 'DASHBOARD_ACCESS',
  

}



export enum SocketEvent {
  USER_EVENT = 'USER_EVENT',
  TASK_EVENT = 'TASK_EVENT',
}

// Socket room control events
export enum SocketRoomEvent {
  JOIN_MANAGER_ROOM = 'JOIN_MANAGER_ROOM',
  LEAVE_MANAGER_ROOM = 'LEAVE_MANAGER_ROOM',
}

export interface UserEventPayload {
  action: EventAction;
  isIncrement: boolean;
  timestamp: number;
};

export interface TaskEventPayload extends UserEventPayload {}

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
  type: EventAction;  
  payload: LoginEventPayload | any; // Can be extended for other event types
  timestamp: string;
}
