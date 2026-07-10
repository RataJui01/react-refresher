import { Star } from "lucide-react";

export default function Rating({ value, count, size = 16 }) {
  const pct = Math.min(Math.max((value / 5) * 100, 0), 100);

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative inline-flex">
        {/* Empty stars background */}
        <div className="flex text-border">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={size} />
          ))}
        </div>
        {/* Filled stars clipped to exact rating percentage */}
        <div
          className="absolute inset-0 flex overflow-hidden text-yellow-400"
          style={{ width: `${pct}%` }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={size} fill="currentColor" />
          ))}
        </div>
      </div>
      <span className="text-sm text-muted-foreground">
        {value.toFixed(1)}
        {count != null && <span className="ml-1">({count})</span>}
      </span>
    </div>
  );
}
