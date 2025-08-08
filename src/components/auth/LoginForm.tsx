"use client";

import { useState } from "react";
import { AdminLoginAction } from "@/actions/auth";
import { LoginCredentials, UserRole } from "@/types/auth";
import { useRouter } from "next/navigation";
import { setCookieValue } from "@/actions/cookie-action";
import { ICookieKeys } from "@/types/common";
import { errorToast, successToast } from "../hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import Link from "next/link";
import CommonButton from "../common/Button";

interface LoginFormProps {
  onSuccess?: () => void;
  userRole?: UserRole;
}

export default function LoginForm({ onSuccess, userRole }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!credentials.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!credentials.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (!credentials.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case UserRole.ADMIN:
        return "/admin";
      case UserRole.MANAGER:
        return "/manager";
      case UserRole.MEMBER:
        return "/member";
      default:
        return "/";
    }
  };

  const getFormTitle = (): string => {
    if (userRole) {
      return `${
        userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()
      } Login`;
    }
    return "Login";
  };

  const getFormSubtitle = (): string => {
    if (userRole) {
      return `Sign in to access the ${userRole.toLowerCase()} dashboard`;
    }
    return "Sign in to access your dashboard";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validateForm()) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await AdminLoginAction(credentials);

      if (result.success) {
        successToast("Login successful");
        // Set cookies
        setCookieValue(ICookieKeys.TOKEN, result.data?.accessToken || "");
        setCookieValue(
          ICookieKeys.REFRESH_TOKEN,
          result.data?.refreshToken || ""
        );
        setCookieValue(ICookieKeys.USER_ROLE, result.data?.user?.role);

        // Redirect based on user role
        const redirectPath = getRedirectPath(result.data?.user?.role);
        setTimeout(() => {
          router.push(redirectPath);
        }, 2000);
      } else {
        errorToast(result.message || "Login failed");
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">
              {getFormTitle()}
            </CardTitle>
            <CardDescription className="text-center">
              {getFormSubtitle()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              autoComplete="off"
            >
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  autoComplete="username"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <ForgotPasswordDialog />
                <Link
                  href="/signup"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin Signup
                </Link>
              </div>

              <CommonButton
                type="submit"
                className="w-full"
                disabled={isLoading}
                loading={isLoading}
              >
                Sign In
              </CommonButton>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
