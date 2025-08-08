import ChangePasswordDialog from "@/components/admin/ChangePasswordDialog";
import LogoutButton from "../auth/LogoutButton";

export default function QuickActions() {
  return (
   
      <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-2">
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
        <div className="space-y-3 inline sm:hidden ">
            <LogoutButton/>
        </div>
      </div>
  );
} 