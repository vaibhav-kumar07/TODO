import Link from "next/link";
import { RoleSwitcher } from "@/components/styles/role-switcher";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <RoleSwitcher />
      <h1>Task Management System</h1>
    </div>
  );
}
