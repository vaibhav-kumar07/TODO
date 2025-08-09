import RoleThemeProvider from "@/components/provider/RoleThemeProvider";
import { UserRole } from "@/types/auth";
import RoleLayout from "@/components/layout/RoleLayout";
import "@/app/globals.css"
import TopLoader from "nextjs-toploader";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Admin - Task Management System",
  description: "Admin page for the task management system",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <TopLoader
      color="hsl(var(--primary))"
      height={3}
      showSpinner={false}
    />
    <RoleThemeProvider role={UserRole.ADMIN}>
      <RoleLayout allowedRoles={[UserRole.ADMIN]}>
        <div className="w-full overflow-y-auto p-2">
          {children}
        </div>
      </RoleLayout>
    </RoleThemeProvider></>
   
  );
}

