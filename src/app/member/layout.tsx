import RoleThemeProvider from "@/components/provider/RoleThemeProvider";
import { UserRole } from "@/types/auth";
import RoleLayout from "@/components/layout/RoleLayout";

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <RoleThemeProvider role={UserRole.MEMBER}>
      <RoleLayout allowedRoles={[UserRole.MEMBER]}>
        <div className="w-full overflow-y-auto">
          {children}
        </div>
      </RoleLayout>
    </RoleThemeProvider>
  );
} 