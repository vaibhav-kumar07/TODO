import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickStatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function QuickStatsCard({
  title,
  value,
  icon: Icon,
  color,
}: QuickStatsCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden  shadow-md rounded-lg border border-border bg-gradient-to-br from-${color}/5 via-${color}/10 to-${color}/5 hover:from-${color}/10 hover:via-${color}/15 hover:to-${color}/10 transition-all duration-300`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className={`text-4xl font-bold text-${color}`}>{value ?? 0}</p>
          </div>
          <div
            className={`p-4 rounded-2xl bg-${color}/20 group-hover:bg-${color}/30 transition-colors duration-300`}
          >
            <Icon className={`w-5 h-5 text-${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
