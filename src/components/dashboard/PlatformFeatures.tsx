import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Users,
  CheckSquare,
  TrendingUp,
  Calendar,
  Activity,
} from "lucide-react";

const PlatformFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Role-based access with secure authentication",
      roleClass: "role-admin",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless collaboration across all team members",
      roleClass: "role-manager",
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Comprehensive task creation and tracking",
      roleClass: "role-member",
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Detailed analytics and performance insights",
      roleClass: "role-admin",
    },
    {
      icon: Calendar,
      title: "Scheduling",
      description: "Advanced scheduling and deadline management",
      roleClass: "role-manager",
    },
    {
      icon: Activity,
      title: "Real-time Updates",
      description: "Live updates and notifications",
      roleClass: "role-member",
    },
  ];

  return (
    <div
      className="bg-card rounded-xl shadow-sm border p-8"
      style={{ borderColor: "hsl(var(--border))" }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-card-foreground">
          Platform Features
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
          Discover the powerful features that make our task management system
          stand out
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className={feature.roleClass}>
            <Card
              className="hover:shadow-md transition-all duration-300 border rounded-xl"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformFeatures;
