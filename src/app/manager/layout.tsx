import RoleThemeProvider from "@/components/provider/RoleThemeProvider";
import { UserRole } from "@/types/auth";
import RoleLayout from "@/components/layout/RoleLayout";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <RoleThemeProvider role={UserRole.MANAGER}>
      <RoleLayout allowedRoles={[UserRole.MANAGER]}>
        <div className="w-full overflow-y-auto p-2">
          {children}
        </div>
      </RoleLayout>
    </RoleThemeProvider>
  );
}
