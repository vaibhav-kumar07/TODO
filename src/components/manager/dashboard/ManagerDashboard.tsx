"use client";
import TaskStatsOverview from "./TaskStatsOverview";
import { SocketProvider } from "@/components/provider/socketProvider";
import PageHeaderWithButton from "@/components/common/PageHeaderWithButton";
import { ManagerDashboardStats, ManagerActivityData } from "@/types/dashboard";
import WebsocketConnectionStatus from "../../provider/WebsocketConnectionStatus";

interface ManagerDashboardProps {
  token: string;
  initialStats?: ManagerDashboardStats;
  initialActivity?: ManagerActivityData;
}

function ManagerDashboardContent({
  initialStats,
}: {
  initialStats?: ManagerDashboardStats;
  initialActivity?: ManagerActivityData;
}) {
  const displayStats = initialStats;
  return (
    <div className="space-y-4 px-3 py-2">
      <PageHeaderWithButton
        title="Manager Dashboard"
        description="Monitor task activities and team performance"
        action={<WebsocketConnectionStatus />}
      />
      <TaskStatsOverview stats={displayStats as ManagerDashboardStats} />
    </div>
  );
}

export default function ManagerDashboard({
  token,
  initialStats,
  initialActivity,
}: ManagerDashboardProps) {
  return (
    <SocketProvider token={token}  >
      <ManagerDashboardContent
        initialStats={initialStats}
        initialActivity={initialActivity}
      />
    </SocketProvider>
  );
}
