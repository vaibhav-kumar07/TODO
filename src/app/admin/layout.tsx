import { RoleThemeProvider } from "@/components/provider/theme-provider";
import { UserRole } from "@/types/auth";
import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleThemeProvider defaultRole={UserRole.ADMIN}>
      <main className="w-full flex">
        <Sidebar />
        <div className="w-full">
          {children}
        </div>
      </main>
    </RoleThemeProvider>
  );
}
