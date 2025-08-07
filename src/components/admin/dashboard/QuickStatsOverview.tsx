"use client";

import { TrendingUp, Users, Activity, Target } from "lucide-react";
import QuickStatsCard from "./QuickStatsCard";
import { DashboardStats, EventType } from "@/types/dashboard";
import { useSocket } from "@/components/provider/socketProvider";
import { useEffect, useState } from "react";

interface QuickStatsOverviewProps {
  stats: DashboardStats;
}

interface QuickStatItem {
  title: string;
  value: number;
  icon: any;
  color: string;
}

export default function QuickStatsOverview({ stats }: QuickStatsOverviewProps) {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    stats || null
  );
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (socket && connected) {
      socket.on(EventType.LOGIN, (data: any) => {
        console.log("LOGIN event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;

          return {
            ...prevStats,
            totalLogins: prevStats.totalLogins + 1,
            loginsToday: prevStats.loginsToday + 1,
          };
        });
      });
      socket.on(EventType.USER_CREATED, (data: any) => {
        console.log("USER_CREATED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;

          return {
            ...prevStats,
            totalUsers: prevStats.totalUsers + 1,
          };
        });
      });
      socket.on(EventType.USER_ACTIVATED, (data: any) => {
        console.log("USER_ACTIVATED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;

          return {
            ...prevStats,
            activeMembers: prevStats.activeMembers + 1,
          };
        });
      });
      socket.on(EventType.MEMBER_ADDED, (data: any) => {
        console.log("MEMBER_ADDED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;

          return {
            ...prevStats,
            activeMembers: prevStats.activeMembers + 1,
          };
        });
      });
      socket.on(EventType.MEMBER_REMOVED, (data: any) => {
        console.log("MEMBER_REMOVED event received:", data);
        setDashboardStats((prevStats) => {
          if (!prevStats) return prevStats;

          return {
            ...prevStats,
            activeMembers: prevStats.activeMembers - 1,
          };
        });
      });
    }
  }, [socket]);

  const quickStatsData: QuickStatItem[] = [
    {
      title: "Total Users",
      value: dashboardStats?.totalUsers ?? 0,
      icon: Users,
      color: "chart-4",
    },
    {
      title: "Active Users",
      value: dashboardStats?.activeMembers ?? 0,
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
      value: dashboardStats?.managersCount ?? 0,
      icon: Target,
      color: "chart-4",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
