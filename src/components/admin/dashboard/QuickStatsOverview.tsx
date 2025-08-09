"use client";

import { TrendingUp, Users, Activity, Target } from "lucide-react";
import QuickStatsCard from "./QuickStatsCard";
import { AdminDashboardStats, EventAction, SocketEvent, UserEventPayload } from "@/types/dashboard";
import { useSocket } from "@/components/provider/socketProvider";
import { useEffect, useState } from "react";

interface QuickStatsOverviewProps {
  stats: AdminDashboardStats;
}

interface QuickStatItem {
  title: string;
  value: number;
  icon: any;
  color: string;
}

export default function QuickStatsOverview({ stats }: QuickStatsOverviewProps) {
  const [dashboardStats, setDashboardStats] = useState<AdminDashboardStats | null>(
    stats || null
  );
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (!socket || !connected) return;

      const userEventHandlers: Partial<Record<EventAction, (prev: AdminDashboardStats, evt: UserEventPayload) => AdminDashboardStats>> = {
      [EventAction.LOGIN]: (prev, evt) => ({
        ...prev,
        totalLogins: Math.max(0, prev.totalLogins + (evt.isIncrement ? 1 : -1)),
      }),
      [EventAction.USER_CREATED]: (prev, evt) => ({
        ...prev,
        totalUsers: Math.max(0, prev.totalUsers + (evt.isIncrement ? 1 : -1)),
      }),
      [EventAction.MANAGER_ADDED]: (prev, evt) => ({
        ...prev,
        totalManagers: Math.max(0, prev.totalManagers + (evt.isIncrement ? 1 : -1)),
      }),
      [EventAction.MANAGER_REMOVED]: (prev, evt) => ({
        ...prev,
        totalManagers: Math.max(0, prev.totalManagers + (evt.isIncrement ? 1 : -1)),
      }),
      [EventAction.MEMBER_ADDED]: (prev, evt) => ({
        ...prev,
        totalMembers: Math.max(0, prev.totalMembers + (evt.isIncrement ? 1 : -1)),
      }),
      [EventAction.MEMBER_REMOVED]: (prev, evt) => ({
        ...prev,
        totalMembers: Math.max(0, prev.totalMembers + (evt.isIncrement ? 1 : -1)),
      }),
      [EventAction.BECOME_MANAGER]: (prev) => ({
        ...prev,
        totalManagers: Math.max(0, prev.totalManagers + 1),
        totalMembers: Math.max(0, prev.totalMembers - 1),
      }),
    };

    const handleUserEvent = (evt: UserEventPayload) => {
      setDashboardStats((prev) => {
        if (!prev) return prev;
        const handler = userEventHandlers[evt.action];
        return handler ? handler(prev, evt) : prev;
      });
    };

    socket.on(SocketEvent.USER_EVENT, handleUserEvent);
    return () => {
      socket.off(SocketEvent.USER_EVENT, handleUserEvent);
    };
  }, [socket, connected]);

  const quickStatsData: QuickStatItem[] = [
    {
      title: "Total Users",
      value: dashboardStats?.totalUsers ?? 0,
      icon: Users,
      color: "chart-4",
    },
    {
      title: "Total Members",
      value: dashboardStats?.totalMembers ?? 0,
      icon: TrendingUp,
      color: "chart-4",
    },
    {
      title: "Total Logins",
      value: dashboardStats?.totalLogins ?? 0,
      icon: Activity,
      color: "chart-4",
    },
    {
      title: "Managers",
      value: dashboardStats?.totalManagers ?? 0,
      icon: Target,
      color: "chart-4",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg">
      {quickStatsData.map((item, index) => (
        <QuickStatsCard
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
