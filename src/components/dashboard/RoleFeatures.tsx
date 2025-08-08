import { UserRole } from "@/types/auth";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Users,
  Settings,
  Activity,
  UserCheck,
  CheckSquare,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Award,
} from "lucide-react";

const RoleFeatures = () => {
  const features = {
    [UserRole.ADMIN]: [
      {
        icon: Shield,
        title: "System Administration",
        description: "Full system control and user management",
      },
      {
        icon: Users,
        title: "User Management",
        description: "Create, edit, and manage all users",
      },
      {
        icon: Settings,
        title: "System Settings",
        description: "Configure application-wide settings",
      },
      {
        icon: Activity,
        title: "Analytics Dashboard",
        description: "View comprehensive system analytics",
      },
    ],
    [UserRole.MANAGER]: [
      {
        icon: UserCheck,
        title: "Team Management",
        description: "Manage team members and assignments",
      },
      {
        icon: CheckSquare,
        title: "Task Management",
        description: "Create and assign tasks to team members",
      },
      {
        icon: TrendingUp,
        title: "Performance Tracking",
        description: "Monitor team performance and progress",
      },
      {
        icon: Calendar,
        title: "Project Planning",
        description: "Plan and schedule project timelines",
      },
    ],
    [UserRole.MEMBER]: [
      {
        icon: CheckSquare,
        title: "Task Execution",
        description: "Complete assigned tasks and update status",
      },
      {
        icon: Clock,
        title: "Time Tracking",
        description: "Track time spent on tasks",
      },
      {
        icon: Target,
        title: "Goal Setting",
        description: "Set personal goals and track progress",
      },
      {
        icon: Award,
        title: "Achievement Tracking",
        description: "View personal achievements and milestones",
      },
    ],
  };

  return (
    <div className="space-y-12">
      {/* Admin Features */}
      <div className="role-admin">
        <div
          className="bg-card border rounded-xl p-6 shadow-sm"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Admin Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features[UserRole.ADMIN].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary rounded-lg"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 text-card-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Manager Features */}
      <div className="role-manager">
        <div
          className="bg-card border rounded-xl p-6 shadow-sm"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Manager Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features[UserRole.MANAGER].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary rounded-lg"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 text-card-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Member Features */}
      <div className="role-member">
        <div
          className="bg-card border rounded-xl p-6 shadow-sm"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Member Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features[UserRole.MEMBER].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary rounded-lg"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 text-card-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleFeatures;
