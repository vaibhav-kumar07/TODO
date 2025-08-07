interface ActivitySummaryCardProps {
  label: string;
  value: number;
  color: string;
}

export default function ActivitySummaryCard({
  label,
  value,
  color,
}: ActivitySummaryCardProps) {
  return (
    <div
      className={`text-center p-4 rounded-lg bg-${color} border border-${color}/20 hover:bg-${color}/15 transition-colors duration-200`}
    >
      <div className={`text-2xl font-bold text-${color}`}>
        {value.toLocaleString()}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
