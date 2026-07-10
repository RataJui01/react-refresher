import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  icon: Icon,
  heading,
  subtext,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Icon size={32} className="text-muted-foreground" />
        </div>
      )}
      <div className="space-y-1">
        <h2 className="font-display text-xl font-semibold">{heading}</h2>
        {subtext && <p className="text-muted-foreground">{subtext}</p>}
      </div>
      {actionLabel && actionTo && (
        <Button asChild>
          <Link to={actionTo}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
