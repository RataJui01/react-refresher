import { useTodo } from "@/context/TodoContext";
import { cn } from "@/lib/utils";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function FilterBar() {
  const { state, dispatch } = useTodo();
  const { filter } = state;
  return (
    <nav aria-label="Filter tasks">
      <div className="flex gap-1">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => {
              dispatch({ type: "Set/Filter", filter: value });
            }}
            className={cn(
              "h-8 rounded-full px-4 text-sm font-medium transition-colors duration-150",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
              filter === value
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
