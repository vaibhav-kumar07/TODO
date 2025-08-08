import { UserRole } from "@/types/auth";
import { navigationItems } from "@/lib/sidebar";
import {
  LayoutDashboard,
  Users,
  Settings,
  User,
  CheckSquare,
  ArrowRight,
} from "lucide-react";

const NavigationPreview = () => {
  const iconMap = {
    LayoutDashboard,
    Users,
    Settings,
    User,
    CheckSquare,
  };

  const roleTitles = {
    [UserRole.ADMIN]: "Admin Navigation",
    [UserRole.MANAGER]: "Manager Navigation",
    [UserRole.MEMBER]: "Member Navigation",
  };

  return (
    <div className="space-y-8">
      {Object.values(UserRole).map((role) => {
        const navItems = navigationItems[role];
        const IconComponent = iconMap.LayoutDashboard;

        return (
          <div key={role} className={`role-${role.toLowerCase()}`}>
            <div
              className="bg-card border rounded-xl p-6 shadow-sm"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <h4 className="font-semibold text-lg mb-4 text-primary">
                {roleTitles[role]}
              </h4>
              <div className="space-y-3">
                {navItems.map((item, index) => {
                  const ItemIcon =
                    iconMap[item.icon as keyof typeof iconMap] || IconComponent;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="p-2 bg-primary/10 rounded-md">
                        <ItemIcon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-card-foreground">
                        {item.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NavigationPreview;
