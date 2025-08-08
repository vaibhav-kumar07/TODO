"use client";

import { ClipboardList, Clock, AlertTriangle, Users } from "lucide-react";
import TaskStatsCard from "./TaskStatsCard";
import { ManagerStats, EventType } from "@/types/dashboard";
import { useSocket } from "@/components/provider/socketProvider";
import { useEffect, useState } from "react";

interface TaskStatsOverviewProps {
  stats: ManagerStats;
}

interface TaskStatItem {
  title: string;
  value: number;
  icon: any;
  color: string;
}

export default function TaskStatsOverview({ stats }: TaskStatsOverviewProps) {
  const [dashboardStats, setDashboardStats] = useState<ManagerStats | null>(
    stats || null
  );
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (socket && connected) {
      // Task creation events
      socket.on(EventType.TASK_CREATED, (data: any) => {
        console.log("TASK_CREATED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;
          return {
            ...prevStats,
            totalTasks: prevStats.totalTasks + 1,
            tasksCreatedToday: prevStats.tasksCreatedToday + 1,
            todaysSummary: {
              ...prevStats.todaysSummary,
              tasksCreated: prevStats.todaysSummary.tasksCreated + 1,
            },
            pendingTasks: prevStats.pendingTasks + 1,
          };
        });
      });

      // Task completion events
      socket.on(EventType.TASK_COMPLETED, (data: any) => {
        console.log("TASK_COMPLETED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;
          return {
            ...prevStats,
            completedTasks: prevStats.completedTasks + 1,
            todaysSummary: {
              ...prevStats.todaysSummary,
              tasksCompleted: prevStats.todaysSummary.tasksCompleted + 1,
            },
            pendingTasks: Math.max(0, prevStats.pendingTasks - 1),
          };
        });
      });

      // Task assignment events
      socket.on(EventType.TASK_ASSIGNED, (data: any) => {
        console.log("TASK_ASSIGNED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;
          return {
            ...prevStats,
            todaysSummary: {
              ...prevStats.todaysSummary,
              tasksAssigned: prevStats.todaysSummary.tasksAssigned + 1,
            },
          };
        });
      });

      // Task status change events
      socket.on(EventType.TASK_STATUS_CHANGED, (data: any) => {
        console.log("TASK_STATUS_CHANGED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;
          return {
            ...prevStats,
            todaysSummary: {
              ...prevStats.todaysSummary,
              statusChanges: prevStats.todaysSummary.statusChanges + 1,
            },
          };
        });
      });

      // Member added events
      socket.on(EventType.MEMBER_ADDED, (data: any) => {
        console.log("MEMBER_ADDED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;
          return {
            ...prevStats,
            totalMembers: prevStats.totalMembers + 1,
            membersAddedToday: prevStats.membersAddedToday + 1,
            membersWithoutTasks: prevStats.membersWithoutTasks + 1,
          };
        });
      });
    }
  }, [socket, connected]);

  const taskStatsData: TaskStatItem[] = [
    {
      title: "Total Tasks",
      value: dashboardStats?.totalTasks ?? 0,
      icon: ClipboardList,
      color: "chart-2",
    },
    {
      title: "High Priority",
      value: dashboardStats?.highPriorityTasks ?? 0,
      icon: AlertTriangle,
      color: "chart-2",
    },
    {
      title: "Overdue Tasks",
      value: dashboardStats?.overdueTasks ?? 0,
      icon: Clock,
      color: "chart-2",
    },
    {
      title: "Team Members",
      value: dashboardStats?.totalMembers ?? 0,
      icon: Users,
      color: "chart-2",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {taskStatsData.map((item, index) => (
        <TaskStatsCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}
