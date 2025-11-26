import { cn } from "@/lib/utils";

export default function CardStat({
  label,
  value,
  icon: Icon,
  iconBg = "bg-gradient-primary/10",
  className,
}) {
  return (
    <div className={cn("stat-card group", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div
          className={cn(
            "p-3 rounded-lg group-hover:shadow-glow transition-all duration-300 text-primary",
            iconBg
          )}
        >
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </div>
  );
}
