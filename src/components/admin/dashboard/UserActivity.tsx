import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  Clock,
  Monitor,
  LogIn,
  LogOut,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Shield,
  AlertTriangle,
  Key,
  Mail,
  Settings,
  Users,
  UserCog,
} from "lucide-react";
import { UserRole } from "@/types/auth";
import { useSocket } from "@/components/provider/socketProvider";
import { useEffect, useState } from "react";
import { EventType } from "@/types/dashboard";
import { formatDate } from "@/lib/common/date-utils";

interface RecentLogin {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

interface RecentUserEvent {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
  action: string;
  timestamp: string;
  details: { ipAddress: string; loginTime: string };
}

interface ActivitySummary {
  totalActivities: number;
  activitiesToday: number;
  activitiesThisWeek: number;
  activitiesThisMonth: number;
}

interface UserActivityData {
  recentLogins: RecentLogin[];
  recentUserEvents: RecentUserEvent[];
  activitySummary: ActivitySummary;
}

interface UserActivityProps {
  data: UserActivityData;
}

const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case UserRole.ADMIN:
      return "bg-chart-1/20 text-chart-1 border-chart-1/30";
    case UserRole.MANAGER:
      return "bg-chart-2/20 text-chart-2 border-chart-2/30";
    case UserRole.MEMBER:
      return "bg-chart-3/20 text-chart-3 border-chart-3/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getEventIcon = (action: string) => {
  switch (action) {
    case EventType.LOGIN:
      return <LogIn className="w-4 h-4" />;
    case EventType.LOGOUT:
      return <LogOut className="w-4 h-4" />;
    case EventType.USER_CREATED:
      return <UserPlus className="w-4 h-4" />;
    case EventType.USER_DELETED:
      return <UserMinus className="w-4 h-4" />;
    case EventType.USER_ACTIVATED:
      return <UserCheck className="w-4 h-4" />;
    case EventType.USER_DEACTIVATED:
      return <UserX className="w-4 h-4" />;
    case EventType.PASSWORD_RESET:
      return <Key className="w-4 h-4" />;
    case EventType.FORGOT_PASSWORD:
      return <Mail className="w-4 h-4" />;
    case EventType.LOGIN_FAILED:
      return <AlertTriangle className="w-4 h-4" />;
    case EventType.PROFILE_UPDATE:
      return <Settings className="w-4 h-4" />;
    case EventType.USER_INVITED:
      return <Users className="w-4 h-4" />;
    case EventType.ROLE_CHANGED:
      return <UserCog className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
};

const getEventColor = (action: string) => {
  switch (action) {
    case EventType.LOGIN:
      return "bg-green-500/20 text-green-600 border-green-500/30";
    case EventType.LOGOUT:
      return "bg-blue-500/20 text-blue-600 border-blue-500/30";
    case EventType.USER_CREATED:
      return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30";
    case EventType.USER_DELETED:
      return "bg-red-500/20 text-red-600 border-red-500/30";
    case EventType.USER_ACTIVATED:
      return "bg-green-500/20 text-green-600 border-green-500/30";
    case EventType.USER_DEACTIVATED:
      return "bg-orange-500/20 text-orange-600 border-orange-500/30";
    case EventType.PASSWORD_RESET:
      return "bg-purple-500/20 text-purple-600 border-purple-500/30";
    case EventType.FORGOT_PASSWORD:
      return "bg-cyan-500/20 text-cyan-600 border-cyan-500/30";
    case EventType.LOGIN_FAILED:
      return "bg-red-500/20 text-red-600 border-red-500/30";
    case EventType.PROFILE_UPDATE:
      return "bg-indigo-500/20 text-indigo-600 border-indigo-500/30";
    case EventType.USER_INVITED:
      return "bg-pink-500/20 text-pink-600 border-pink-500/30";
    case EventType.ROLE_CHANGED:
      return "bg-amber-500/20 text-amber-600 border-amber-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getEventLabel = (action: string) => {
  switch (action) {
    case EventType.LOGIN:
      return "Login";
    case EventType.LOGOUT:
      return "Logout";
    case EventType.USER_CREATED:
      return "User Created";
    case EventType.USER_DELETED:
      return "User Deleted";
    case EventType.USER_ACTIVATED:
      return "User Activated";
    case EventType.USER_DEACTIVATED:
      return "User Deactivated";
    case EventType.PASSWORD_RESET:
      return "Password Reset";
    case EventType.FORGOT_PASSWORD:
      return "Forgot Password";
    case EventType.LOGIN_FAILED:
      return "Login Failed";
    case EventType.PROFILE_UPDATE:
      return "Profile Updated";
    case EventType.USER_INVITED:
      return "User Invited";
    case EventType.ROLE_CHANGED:
      return "Role Changed";
    default:
      return action;
  }
};

const ActivityCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
);

export default function UserActivity({ data }: UserActivityProps) {
  const { socket, connected } = useSocket();
  const [activityData, setActivityData] = useState<UserActivityData>(data);

  useEffect(() => {
    if (socket && connected) {
      socket.on(EventType.LOGIN, (data: any) => {
        console.log("LOGIN event received:", data);

        setActivityData((prevData) => ({
          ...prevData,
          recentLogins: [...prevData.recentLogins, data],
        }));
      });
      socket.on(EventType.USER_CREATED, (data: any) => {
        console.log("USER_CREATED event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });

      socket.on(EventType.USER_DELETED, (data: any) => {
        console.log("USER_DELETED event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });
      socket.on(EventType.USER_ACTIVATED, (data: any) => {
        console.log("USER_ACTIVATED event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });
      socket.on(EventType.USER_DEACTIVATED, (data: any) => {
        console.log("USER_DEACTIVATED event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });
      socket.on(EventType.PASSWORD_RESET, (data: any) => {
        console.log("PASSWORD_RESET event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });
      socket.on(EventType.FORGOT_PASSWORD, (data: any) => {
        console.log("FORGOT_PASSWORD event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });
      socket.on(EventType.LOGIN_FAILED, (data: any) => {
        console.log("LOGIN_FAILED event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });

      socket.on(EventType.PROFILE_UPDATE, (data: any) => {
        console.log("PROFILE_UPDATE event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });

      socket.on(EventType.USER_INVITED, (data: any) => {
        console.log("USER_INVITED event received:", data);
        setActivityData((prevData) => ({
          ...prevData,
          recentUserEvents: [...prevData.recentUserEvents, data],
        }));
      });
    }
  }, [socket]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      {/* Recent User Events */}
      <ActivityCard title="Recent User Events">
        <div className="space-y-3">
          {activityData.recentUserEvents.slice(0, 5).map((event, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className={`p-2 rounded-lg ${getEventColor(event.action)}`}>
                {getEventIcon(event.action)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground truncate">
                    {event.userName}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getRoleColor(event.userRole)}`}
                  >
                    {event.userRole}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium">
                      {getEventLabel(event.action)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatDate(event.details.loginTime, "DD-MM-YYYY ")}
                    </span>
                  </div>
                </div>
                {event.details?.ipAddress && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Monitor className="w-3 h-3" />
                    <span>{event.details.ipAddress}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ActivityCard>
    </div>
  );
}
