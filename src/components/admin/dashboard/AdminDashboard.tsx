"use client";
import UserActivity from "./UserActivity";
import QuickStatsOverview from "./QuickStatsOverview";
import { SocketProvider } from "@/components/provider/socketProvider";
import PageHeaderWithButton from "@/components/common/PageHeaderWithButton";
import { AdminDashboardStats, UserActivityData } from "@/types/dashboard";
import WebsocketConnectionStatus from "../../provider/WebsocketConnectionStatus";

interface AdminDashboardProps {
  token: string;
  initialStats?: AdminDashboardStats;
  initialActivity?: UserActivityData;
}

function DashboardContent({
  initialStats,
  initialActivity,
}: {
  initialStats?: AdminDashboardStats;
  initialActivity?: UserActivityData;
}) {
  const displayStats = initialStats;
  const displayActivity = initialActivity;
  console.log("initialStats", initialStats);

  return (
    <div className="w-full space-y-4 px-3 py-2">
      <PageHeaderWithButton
        title="Admin Dashboard"
        description="Monitor system activity and user statistics"
        action={<WebsocketConnectionStatus />}
        titleClassName="hidden sm:block"
      />
      <QuickStatsOverview stats={displayStats as AdminDashboardStats} />
      <UserActivity data={displayActivity as UserActivityData} />
    </div>
  );
}

export default function AdminDashboard({
  token,
  initialStats,
  initialActivity,
}: AdminDashboardProps) {
  return (
    <SocketProvider token={token}>
      <DashboardContent
        initialStats={initialStats}
        initialActivity={initialActivity}
      />
    </SocketProvider>
  );
}
