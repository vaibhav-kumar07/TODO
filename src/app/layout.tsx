import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RoleThemeProvider } from "@/components/provider/theme-provider";
import { UserRole } from "@/types/auth";
import { ToastProvider } from "@/components/hooks/use-toast";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "TaskManager",
  description: "Team task management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <ToastProvider />
        <RoleThemeProvider defaultRole={UserRole.ADMIN}>
          {children}
        </RoleThemeProvider>
      </body>
    </html>
  );
}
