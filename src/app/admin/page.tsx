// app/dashboard/page.tsx
import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys } from "@/types/common";
import { getDashboardStats, getUserActivity } from "@/lib/dashboard/admin";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";

export default async function DashboardPage() {
  // Fetch initial data server-side
  let initialStats = null;
  let initialActivity = null;

  try {
    const statsResponse = await getDashboardStats();
    if (statsResponse.success) {
      initialStats = statsResponse.data;
    }

    const activityResponse = await getUserActivity();
    if (activityResponse.success) {
      initialActivity = activityResponse.data;
    }
  } catch (error) {
    console.error("Error fetching initial dashboard data:", error);
  }

  const token = await getCookieValue(ICookieKeys.TOKEN);
  return (
    <div className="p-0  md:px-4 md:py-6">
    <AdminDashboard
      token={token}
      initialStats={initialStats}
      initialActivity={initialActivity}
    />
    </div>
  );
}
