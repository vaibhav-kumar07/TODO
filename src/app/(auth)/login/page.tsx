import LoginForm from '@/components/auth/LoginForm';
import RoleThemeProvider from '@/components/provider/RoleThemeProvider';
import { UserRole } from '@/types/auth';

export default function LoginPage() {
  return (
    <RoleThemeProvider role={UserRole.ADMIN}>
      <div className="min-h-screen bg-background">
        <LoginForm />
      </div>
    </RoleThemeProvider>
  );
} 