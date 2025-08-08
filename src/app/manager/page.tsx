import {
  getManagerDashboardStats,
  getManagerActivity,
} from "@/lib/dashboard/manager";
import ManagerDashboard from "@/components/manager/dashboard/ManagerDashboard";
import { getCookieValueAction } from "@/actions/cookie-action";
import { ICookieKeys } from "@/types/common";
import { redirect } from "next/navigation";

export default async function ManagerPage() {
  const token = await getCookieValueAction(ICookieKeys.TOKEN);

  if (!token.value) {
    return redirect("/login");
  }

  const [initialStats, initialActivity] = await Promise.all([
    getManagerDashboardStats(),
    getManagerActivity(),
  ]);
  // console.log("initialStats", initialStats);
  console.log("initialActivity manager", initialActivity);
  return (
    <div className="p-4">
      <ManagerDashboard
        token={token.value}
        initialStats={initialStats}
        initialActivity={initialActivity}
      />
    </div>
  );
}
