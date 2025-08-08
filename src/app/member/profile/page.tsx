import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/common/cookie-utils";
import { ICookieKeys } from "@/types/common";
import ProfileForm from "@/components/admin/ProfileForm";
import ChangePasswordDialog from "@/components/admin/ChangePasswordDialog";
import { AuthApiService } from "@/lib/auth-api";
import { User } from "@/types/auth";

export default async function MemberProfilePage() {
  // Server-side auth check
  const token = await getCookieValue(ICookieKeys.TOKEN);
  if (!token) {
    redirect("/login");
  }

  // Fetch profile data
  const profileResult = await AuthApiService.getProfile();
  const profile = profileResult.data;
  return (
    <section className="w-full flex justify-center items-center">
      <div className="p-4 md:p-6 ">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-foreground md:mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <ProfileForm profile={profile as User} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <ChangePasswordDialog>
                  <div className="w-full text-left p-3 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors block cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="h-5 w-5 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Change Password
                      </span>
                    </div>
                  </div>
                </ChangePasswordDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
