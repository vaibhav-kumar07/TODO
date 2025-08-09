import { ToastProvider } from "@/components/hooks/use-toast";
import { Metadata } from "next";
import TopLoader from "nextjs-toploader";



export const metadata: Metadata = {
  title: "Signup - Task Management System",
  description: "Signup page for the task management system",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopLoader color="hsl(var(--primary))" height={3} showSpinner={false} />
      <ToastProvider />
      {children}
    </>
  );
} 