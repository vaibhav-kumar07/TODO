import RoleThemeProvider from "@/components/provider/RoleThemeProvider";
import { UserRole } from "@/types/auth";
import RoleLayout from "@/components/layout/RoleLayout";
import TopLoader from "nextjs-toploader";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Member - Task Management System",
  description: "Member page for the task management system",
};  
export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <>
      <TopLoader color="hsl(var(--primary))" height={3} showSpinner={false} />
      <RoleThemeProvider role={UserRole.MEMBER}>
        <RoleLayout allowedRoles={[UserRole.MEMBER]}>
          <div className="w-full overflow-y-auto p-2">
            {children}
          </div>
        </RoleLayout>
      </RoleThemeProvider>
    </>
  );
} 