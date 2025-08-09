import RoleThemeProvider from "@/components/provider/RoleThemeProvider";
import { UserRole } from "@/types/auth";
import RoleLayout from "@/components/layout/RoleLayout";
import TopLoader from "nextjs-toploader";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Manager - Task Management System",
  description: "Manager page for the task management system",
};

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <>
      <TopLoader color="hsl(var(--primary))" height={3} showSpinner={false} />
      <RoleThemeProvider role={UserRole.MANAGER}>
        <RoleLayout allowedRoles={[UserRole.MANAGER]}>
          <div className="w-full overflow-y-auto p-2">
            {children}
          </div>
        </RoleLayout>
      </RoleThemeProvider>
    </>
  );
}
