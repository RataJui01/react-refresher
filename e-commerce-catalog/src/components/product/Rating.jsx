import { Star } from "lucide-react";

export default function Rating({ value, count, size = 16 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const fillPct = Math.min(Math.max(value - (i - 1), 0), 1) * 100;
          return (
            <div key={i} className="relative" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-border" />
              <div
                className="absolute inset-0 overflow-hidden text-yellow-400"
                style={{ width: `${fillPct}%` }}
              >
                <Star size={size} fill="currentColor" />
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-sm text-muted-foreground">
        {value.toFixed(1)}
        {count != null && <span className="ml-1">({count})</span>}
      </span>
    </div>
  );
}
