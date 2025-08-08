import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckSquare, Target, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: Users,
      roleClass: "role-admin",
    },
    {
      label: "Active Tasks",
      value: "567",
      icon: CheckSquare,
      roleClass: "role-manager",
    },
    {
      label: "Projects",
      value: "89",
      icon: Target,
      roleClass: "role-member",
    },
    {
      label: "Completion Rate",
      value: "94%",
      icon: TrendingUp,
      roleClass: "role-admin",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={stat.roleClass}>
          <Card
            className="hover:shadow-lg transition-all duration-300 border rounded-xl"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1 text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
