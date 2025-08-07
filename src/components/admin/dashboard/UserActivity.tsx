import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  Clock,
  User,
  Monitor,
  Globe,
  TrendingUp,
} from "lucide-react";
import { UserRole } from "@/types/auth";
import ActivitySummaryCard from "./ActivitySummaryCard";
import { useSocket } from "@/components/provider/socketProvider";
import { useForceUpdate } from "framer-motion";
import { useEffect, useState } from "react";
import { EventType } from "@/types/dashboard";

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
  details: { ipAddress: string };
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

interface ActivitySummaryItem {
  label: string;
  value: number;
  color: string;
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

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor(
    (now.getTime() - time.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
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
      socket.on(EventType.USER_CREATED, (data: any) => {});
    }
  }, [socket]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      {/* Recent Logins */}
      <ActivityCard title="Recent Logins">
        <div className="space-y-3">
          {data.recentLogins.slice(0, 5).map((login, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getInitials(login.userName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground truncate">
                    {login.userName}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getRoleColor(login.userRole)}`}
                  >
                    {login.userRole}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Monitor className="w-3 h-3" />
                    <span>{login.ipAddress}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(login.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ActivityCard>
    </div>
  );
}
