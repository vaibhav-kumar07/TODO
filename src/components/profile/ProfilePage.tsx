import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys } from "@/types/common";
import ProfileForm from "@/components/admin/ProfileForm";
import QuickActions from "@/components/common/QuickActions";
import { AuthApiService } from "@/lib/auth-api";
import { User } from "@/types/auth";

export default async function ProfilePage() {
  const token = await getCookieValue(ICookieKeys.TOKEN);
  if (!token) {
    redirect("/login");
  }

  const profileResult = await AuthApiService.getProfile();
  const profile = profileResult.data;

  return (
    <section className="w-full flex justify-center items-center">
      <div className="p-4 md:p-6 ">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-foreground md:mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileForm profile={profile as User} />
          </div>

          <QuickActions />
        </div>
      </div>
    </section>
  );
}


