"use client";

import { ClipboardList, Clock, AlertTriangle, Users } from "lucide-react";
import TaskStatsCard from "./TaskStatsCard";
import { ManagerDashboardStats, EventAction, SocketEvent, TaskEventPayload, SocketRoomEvent } from "@/types/dashboard";
import { useSocket } from "@/components/provider/socketProvider";
import { useEffect, useState } from "react";

interface TaskStatsOverviewProps {
  stats: ManagerDashboardStats;
}

interface TaskStatItem {
  title: string;
  value: number;
  icon: any;
  color: string;
}

export default function TaskStatsOverview({ stats }: TaskStatsOverviewProps) {
  const [dashboardStats, setDashboardStats] = useState<ManagerDashboardStats | null>(
    stats || null
  );
  const { socket, connected } = useSocket();
  

  useEffect(() => {
    if (!socket || !connected) return;

    const handleTaskEvent = (evt: TaskEventPayload) => {
      console.log('TASK_EVENT', evt);
      setDashboardStats((prev) => {
        if (!prev) return prev;
        const handler = taskEventHandlers[evt.action as EventAction];
        return handler ? handler(prev, evt) : prev;
      });
    };

    const managerId = stats?.info?.managerId;
    socket.emit(SocketRoomEvent.JOIN_MANAGER_ROOM, managerId);
    socket.on('JOINED_MANAGER_ROOM', (data) => {
      console.log(`✅ Joined room: ${data.room}`);
    });
   
    socket.on(SocketEvent.TASK_EVENT, handleTaskEvent);

    const taskEventHandlers: Partial<Record<EventAction, (prev: ManagerDashboardStats, evt: TaskEventPayload) => ManagerDashboardStats>> = {
      [EventAction.TASK_CREATED]: (prev, evt) => ({
        ...prev,
        totalTasks: Math.max(0, (prev.totalTasks ?? 0) + (evt.isIncrement ? 1 : -1)),
      }),
        [EventAction.TASK_COMPLETED]: (prev, evt) => {
          console.log('TASK_COMPLETED', evt);
        return {
        ...prev,
        completedTasks: Math.max(0, (prev.completedTasks ?? 0) + (evt.isIncrement ? 1 : -1)),
        }
       
      },
      [EventAction.TASK_DUE_DATE]: (prev, evt) => ({
        ...prev,
        overdueTasks: Math.max(0, prev.overdueTasks + (evt.isIncrement ? 1 : -1)),
      }),
      [EventAction.TASK_IN_PROGRESS]: (prev, evt) => {
        console.log('TASK_IN_PROGRESS', evt);
        return {
        ...prev,
        inProgressTasks: Math.max(0, (prev.inProgressTasks ?? 0) + (evt.isIncrement ? 1 : -1)),
      }}
    };

   

   
    return () => {
      socket.off(SocketEvent.TASK_EVENT, handleTaskEvent);
    };
  }, [socket, connected]);

  const taskStatsData: TaskStatItem[] = [
    {
      title: "Total Tasks",
      value: dashboardStats?.totalTasks ?? 0,
      icon: ClipboardList,
      color: "chart-2",
    },
    {
      title: "Completed Tasks",
      value: dashboardStats?.completedTasks ?? 0,
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
      title: "In Progress Tasks",
      value: dashboardStats?.inProgressTasks ?? 0,
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
