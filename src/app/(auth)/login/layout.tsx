import { ToastProvider } from "@/components/hooks/use-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ToastProvider />
      {children}
    </div>
  );
} 