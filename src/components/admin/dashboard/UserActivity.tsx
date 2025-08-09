import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  AlertTriangle,
  Key,
  Mail,
  Settings,
  UserCog,
} from "lucide-react";
import { UserRole } from "@/types/auth";
import { useSocket } from "@/components/provider/socketProvider";
import { useEffect, useState } from "react";
import { EventAction, RecentUserEvent, SocketEvent } from "@/types/dashboard";
import {  formatRelativeOrDate } from "@/lib/common/date-utils";

const getRoleColor = (role: string) => {
  switch (role.toUpperCase() as UserRole) {
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



const getEventIcon = (action: string) => {
  switch (action) {
    case EventAction.LOGIN:
      return <LogIn className="w-4 h-4" />;
    case EventAction.LOGOUT:
      return <LogOut className="w-4 h-4" />;
    case EventAction.USER_CREATED:
      return <UserPlus className="w-4 h-4" />;
    case EventAction.USER_DELETED:
      return <UserMinus className="w-4 h-4" />;
    case EventAction.USER_ACTIVATED:
      return <UserCheck className="w-4 h-4" />;
    case EventAction.USER_DEACTIVATED:
      return <UserX className="w-4 h-4" />;
    case EventAction.PASSWORD_RESET:
      return <Key className="w-4 h-4" />;
    case EventAction.PASSWORD_RESET_SUCCESS:
      return <Mail className="w-4 h-4" />;
    case EventAction.PASSWORD_RESET_FAILED:
      return <AlertTriangle className="w-4 h-4" />;
    case EventAction.PROFILE_UPDATE:
      return <Settings className="w-4 h-4" />;
    case EventAction.BECOME_MANAGER:
      return <UserCog className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
};

const getEventColor = (action: string) => {
  switch (action) {
    case EventAction.LOGIN:
      return "bg-green-500/20 text-green-600 border-green-500/30";
    case EventAction.LOGOUT:
      return "bg-blue-500/20 text-blue-600 border-blue-500/30";
    case EventAction.USER_CREATED:
      return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30";
    case EventAction.USER_DELETED:
      return "bg-red-500/20 text-red-600 border-red-500/30";
    case EventAction.USER_ACTIVATED:
      return "bg-green-500/20 text-green-600 border-green-500/30";
    case EventAction.USER_DEACTIVATED:
      return "bg-orange-500/20 text-orange-600 border-orange-500/30";
    case EventAction.PASSWORD_RESET:
      return "bg-purple-500/20 text-purple-600 border-purple-500/30";
    case EventAction.PASSWORD_RESET_SUCCESS:
      return "bg-cyan-500/20 text-cyan-600 border-cyan-500/30";
    case EventAction.PASSWORD_RESET_FAILED:
      return "bg-red-500/20 text-red-600 border-red-500/30";
    case EventAction.PROFILE_UPDATE:
      return "bg-indigo-500/20 text-indigo-600 border-indigo-500/30";
    case EventAction.BECOME_MANAGER:
      return "bg-amber-500/20 text-amber-600 border-amber-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getEventLabel = (action: string) => {
  switch (action) {
      case EventAction.LOGIN:
      return "Login";
    case EventAction.LOGOUT:
      return "Logout";
    case EventAction.USER_CREATED:
      return "User Created";
    case EventAction.USER_DELETED:
      return "User Deleted";
    case EventAction.USER_ACTIVATED:
      return "User Activated";
    case EventAction.USER_DEACTIVATED:
      return "User Deactivated";
    case EventAction.PASSWORD_RESET:
      return "Password Reset";
    case EventAction.PASSWORD_RESET_SUCCESS:
      return "Forgot Password";
    case EventAction.PASSWORD_RESET_FAILED:
      return "Login Failed";
    case EventAction.PROFILE_UPDATE:
      return "Profile Updated";
    case EventAction.BECOME_MANAGER:
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
  <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-lg">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
);

export default function UserActivity({ data }: { data: RecentUserEvent[] }) {
  const { socket, connected } = useSocket();
  const [activityData, setActivityData] = useState<RecentUserEvent[]>(data);

  useEffect(() => {
    if (!socket || !connected) return;

    const MAX_EVENTS = 5
    const addToFront = (prev: RecentUserEvent[], evt: RecentUserEvent) =>
      [evt, ...prev].slice(0, MAX_EVENTS);

    const userEventHandlers: Partial<Record<EventAction, (prev: RecentUserEvent[], evt: RecentUserEvent) => RecentUserEvent[]>> = {
      [EventAction.LOGIN]: addToFront,
      [EventAction.LOGOUT]: addToFront,
      [EventAction.USER_CREATED]: addToFront,
      [EventAction.USER_DELETED]: addToFront,
      [EventAction.USER_ACTIVATED]: addToFront,
      [EventAction.USER_DEACTIVATED]: addToFront,
      [EventAction.PASSWORD_RESET]: addToFront,
      [EventAction.PROFILE_UPDATE]: addToFront,
      [EventAction.BECOME_MANAGER]: addToFront,
      [EventAction.USER_INVITED]: addToFront,
      [EventAction.USER_INVITATION_SUCCESS]: addToFront,
      [EventAction.USER_INVITATION_FAILED]: addToFront,
      [EventAction.USER_INVITATION_EXPIRED]: addToFront,
      [EventAction.USER_REGISTER]: addToFront,
    };

    const handleUserEvent = (evt: RecentUserEvent) => {
      console.log("evt", evt);
      setActivityData((prev) => {
        if (!prev) return prev;
        const handler = userEventHandlers[evt.action as EventAction];
        return handler ? handler(prev, evt) : addToFront(prev, evt);
      });
    };

    socket.on(SocketEvent.ACTIVITY_EVENT, handleUserEvent);
    return () => {
      socket.off(SocketEvent.ACTIVITY_EVENT, handleUserEvent);
    };
  }, [socket, connected]);

  console.log("activityData", activityData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 rounded-lg ">
      {/* Recent User Events */}
      <ActivityCard title="Recent User Events ">
        <div className="space-y-3 rounded-lg">
          {activityData.slice(0,5).map((event: RecentUserEvent, index: number) => (
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
                    className={`text-xs capitalize ${getRoleColor(event.userRole)}`}
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
                    <span>{formatRelativeOrDate(event.details.loginTime, "DD-MM-YYYY")}</span>
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
