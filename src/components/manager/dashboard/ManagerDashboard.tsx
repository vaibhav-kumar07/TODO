"use client";
import TaskStatsOverview from "./TaskStatsOverview";
import TaskActivity from "./TaskActivity";
import { SocketProvider } from "@/components/provider/socketProvider";
import PageHeaderWithButton from "@/components/common/PageHeaderWithButton";
import { ManagerStats, ManagerActivityData } from "@/types/dashboard";

interface ManagerDashboardProps {
  token: string;
  initialStats?: ManagerStats;
  initialActivity?: ManagerActivityData;
}

function ManagerDashboardContent({
  initialStats,
  initialActivity,
}: {
  initialStats?: ManagerStats;
  initialActivity?: ManagerActivityData;
}) {
  const displayStats = initialStats;
  const displayActivity = initialActivity;

  return (
    <div className="space-y-4 px-3 py-2">
      <PageHeaderWithButton
        title="Manager Dashboard"
        description="Monitor task activities and team performance"
      />
      <TaskStatsOverview stats={displayStats as ManagerStats} />
      <TaskActivity data={displayActivity as ManagerActivityData} />
    </div>
  );
}

export default function ManagerDashboard({
  token,
  initialStats,
  initialActivity,
}: ManagerDashboardProps) {
  return (
    <SocketProvider token={token}>
      <ManagerDashboardContent
        initialStats={initialStats}
        initialActivity={initialActivity}
      />
    </SocketProvider>
  );
}
