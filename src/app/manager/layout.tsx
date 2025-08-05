import { RoleThemeProvider } from "@/components/provider/theme-provider";
import { UserRole } from "@/types/auth";
import Sidebar from "@/components/layout/Sidebar";
import RoleLayout from "@/components/layout/RoleLayout";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <RoleLayout allowedRoles={[UserRole.MANAGER]}>
    <RoleThemeProvider defaultRole={UserRole.MANAGER}>
        <div className="w-full">
          {children}
        </div>
    </RoleThemeProvider>
    </RoleLayout>
  );
}
