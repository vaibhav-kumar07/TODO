"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Clock,
  User,
  TrendingUp,
  Edit,
  Calendar,
  Target,
} from "lucide-react";
import { UserRole } from "@/types/auth";
import { useSocket } from "@/components/provider/socketProvider";
import { useEffect, useState } from "react";
import {
  EventType,
  ManagerActivityData,
  type TaskEvent,
  TaskEventType,
} from "@/types/dashboard";

interface TaskActivityProps {
  data: ManagerActivityData;
}

interface ActivitySummaryItem {
  label: string;
  value: number;
  color: string;
}

const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case UserRole.ADMIN:
      return "bg-chart-1/20 text-chart-1 border-chart-1/30";
    case UserRole.MANAGER:
      return "bg-chart-2/20 text-chart-2 border-chart-2/30";
    case UserRole.MEMBER:
      return "bg-chart-3/20 text-chart-3 border-chart-3/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getActionIcon = (eventType: TaskEventType) => {
  switch (eventType) {
    case TaskEventType.TASK_CREATED:
      return Activity;
    case TaskEventType.TASK_STATUS_CHANGED:
      return Edit;
    case TaskEventType.TASK_PRIORITY_CHANGED:
      return Target;
    case TaskEventType.TASK_ASSIGNED:
      return User;
    case TaskEventType.TASK_DUE_DATE_CHANGED:
      return Calendar;
    default:
      return Activity;
  }
};

const getActionColor = (eventType: TaskEventType) => {
  switch (eventType) {
    case TaskEventType.TASK_CREATED:
      return "chart-1";
    case TaskEventType.TASK_STATUS_CHANGED:
      return "chart-2";
    case TaskEventType.TASK_PRIORITY_CHANGED:
      return "chart-3";
    case TaskEventType.TASK_ASSIGNED:
      return "chart-4";
    case TaskEventType.TASK_DUE_DATE_CHANGED:
      return "chart-5";
    default:
      return "chart-1";
  }
};

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - timestamp.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

const ActivityCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
);

export default function TaskActivity({ data }: TaskActivityProps) {
  const { socket, connected } = useSocket();
  const [activityData, setActivityData] = useState<ManagerActivityData>(data);

  useEffect(() => {
    if (socket && connected) {
      // Listen for task-related events
      socket.on(EventType.TASK_CREATED, (data: any) => {
        console.log("TASK_CREATED event received:", data);
        const newEvent: TaskEvent = {
          taskId: data.taskId,
          taskTitle: data.taskTitle,
          assignedTo: data.assignedTo,
          status: data.status,
          priority: data.priority,
          dueDate: data.dueDate,
          eventType: TaskEventType.TASK_CREATED,
          timestamp: new Date(),
          performedBy: {
            userId: data.userId,
            userName: data.userName,
            role: data.userRole,
          },
        };
        setActivityData((prevData) => ({
          ...prevData,
          recentTaskEvents: [
            newEvent,
            ...prevData.recentTaskEvents.slice(0, 9),
          ],
          todaysSummary: {
            ...prevData.todaysSummary,
            newTasks: prevData.todaysSummary.newTasks + 1,
          },
        }));
      });

      socket.on(EventType.TASK_STATUS_CHANGED, (data: any) => {
        console.log("TASK_STATUS_CHANGED event received:", data);
        const newEvent: TaskEvent = {
          taskId: data.taskId,
          taskTitle: data.taskTitle,
          assignedTo: data.assignedTo,
          status: data.newStatus,
          priority: data.priority,
          dueDate: data.dueDate,
          eventType: TaskEventType.TASK_STATUS_CHANGED,
          timestamp: new Date(),
          changes: {
            oldValue: data.oldStatus,
            newValue: data.newStatus,
            field: "status",
          },
          performedBy: {
            userId: data.userId,
            userName: data.userName,
            role: data.userRole,
          },
        };
        setActivityData((prevData) => ({
          ...prevData,
          recentTaskEvents: [
            newEvent,
            ...prevData.recentTaskEvents.slice(0, 9),
          ],
          todaysSummary: {
            ...prevData.todaysSummary,
            taskStatusChanges: prevData.todaysSummary.taskStatusChanges + 1,
          },
        }));
      });

      socket.on(EventType.TASK_PRIORITY_CHANGED, (data: any) => {
        console.log("TASK_PRIORITY_CHANGED event received:", data);
        const newEvent: TaskEvent = {
          taskId: data.taskId,
          taskTitle: data.taskTitle,
          assignedTo: data.assignedTo,
          status: data.status,
          priority: data.newPriority,
          dueDate: data.dueDate,
          eventType: TaskEventType.TASK_PRIORITY_CHANGED,
          timestamp: new Date(),
          changes: {
            oldValue: data.oldPriority,
            newValue: data.newPriority,
            field: "priority",
          },
          performedBy: {
            userId: data.userId,
            userName: data.userName,
            role: data.userRole,
          },
        };
        setActivityData((prevData) => ({
          ...prevData,
          recentTaskEvents: [
            newEvent,
            ...prevData.recentTaskEvents.slice(0, 9),
          ],
          todaysSummary: {
            ...prevData.todaysSummary,
            taskPriorityChanges: prevData.todaysSummary.taskPriorityChanges + 1,
          },
        }));
      });

      socket.on(EventType.TASK_ASSIGNED, (data: any) => {
        console.log("TASK_ASSIGNED event received:", data);
        const newEvent: TaskEvent = {
          taskId: data.taskId,
          taskTitle: data.taskTitle,
          assignedTo: data.newAssignee,
          status: data.status,
          priority: data.priority,
          dueDate: data.dueDate,
          eventType: TaskEventType.TASK_ASSIGNED,
          timestamp: new Date(),
          changes: {
            oldValue: data.oldAssignee?.userName,
            newValue: data.newAssignee?.userName,
            field: "assignedTo",
          },
          performedBy: {
            userId: data.userId,
            userName: data.userName,
            role: data.userRole,
          },
        };
        setActivityData((prevData) => ({
          ...prevData,
          recentTaskEvents: [
            newEvent,
            ...prevData.recentTaskEvents.slice(0, 9),
          ],
          todaysSummary: {
            ...prevData.todaysSummary,
            taskAssignmentChanges:
              prevData.todaysSummary.taskAssignmentChanges + 1,
          },
        }));
      });
    }
  }, [socket, connected]);

  const activitySummaryData: ActivitySummaryItem[] = [
    {
      label: "Status Changes",
      value: activityData.todaysSummary.taskStatusChanges,
      color: "chart-1",
    },
    {
      label: "Priority Changes",
      value: activityData.todaysSummary.taskPriorityChanges,
      color: "chart-2",
    },
    {
      label: "Assignments",
      value: activityData.todaysSummary.taskAssignmentChanges,
      color: "chart-3",
    },
    {
      label: "New Tasks",
      value: activityData.todaysSummary.newTasks,
      color: "chart-4",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Task Events */}
      <ActivityCard title="Recent Task Events">
        <div className="space-y-3">
          {activityData.recentTaskEvents.slice(0, 5).map((event, index) => {
            const ActionIcon = getActionIcon(event.eventType);
            const actionColor = getActionColor(event.eventType);

            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className={`p-2 rounded-lg bg-${actionColor}/20`}>
                  <ActionIcon className={`w-4 h-4 text-${actionColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground truncate">
                      {event.taskTitle}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getRoleColor(
                        event.performedBy.role
                      )}`}
                    >
                      {event.performedBy.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{event.performedBy.userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(event.timestamp)}</span>
                    </div>
                  </div>
                  {event.assignedTo && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Assigned to: {event.assignedTo.userName}
                    </div>
                  )}
                  {event.changes?.oldValue && event.changes?.newValue && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.changes.oldValue} → {event.changes.newValue}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ActivityCard>

      {/* Activity Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Today &apos;s Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {activitySummaryData.map((item, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-lg bg-${item.color}/10 border border-${item.color}/20 hover:bg-${item.color}/15 transition-colors duration-200`}
              >
                <div className={`text-2xl font-bold text-${item.color}`}>
                  {item.value?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
