import RoleThemeProvider from "@/components/provider/RoleThemeProvider";
import { UserRole } from "@/types/auth";
import RoleLayout from "@/components/layout/RoleLayout";
import "@/app/globals.css"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleThemeProvider role={UserRole.ADMIN}>
      <RoleLayout allowedRoles={[UserRole.ADMIN]}>
        <div className="w-full overflow-y-auto p-2">
          {children}
        </div>
      </RoleLayout>
    </RoleThemeProvider>
  );
}

