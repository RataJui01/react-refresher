import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodo } from "@/context/TodoContext";

export default function TodoItem({ todo, style }) {
  const { dispatch } = useTodo();

  function handleToggle() {
    dispatch({ type: "Toggle/Todo", id: todo.id });
  }

  function handleDelete() {
    dispatch({ type: "Delete/Todo", id: todo.id });
  }
  return (
    <li
      style={style}
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3",
        "animate-in-item transition-opacity duration-200",
        todo.done && "opacity-50",
      )}
    >
      <Checkbox
        checked={todo.done}
        onCheckedChange={handleToggle}
        aria-label={`Mark "${todo.text}" as ${todo.done ? "incomplete" : "complete"}`}
      />

      <span
        className={cn(
          "relative min-w-0 flex-1 text-sm leading-snug transition-colors duration-200 select-none",
          todo.done ? "text-muted-foreground line-through" : "text-foreground",
        )}
      >
        {todo.text}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        aria-label={`Delete task: ${todo.text}`}
        className={cn(
          "h-7 w-7 shrink-0 rounded-md text-muted-foreground",
          "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
          "transition-opacity duration-150 hover:bg-destructive/10 hover:text-destructive",
        )}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM2 3.5C2 3.22386 2.22386 3 2.5 3H12.5C12.7761 3 13 3.22386 13 3.5C13 3.77614 12.7761 4 12.5 4H11.9201L11.1517 11.6911C11.0509 12.6946 10.2072 13.5 9.19898 13.5H5.80102C4.79282 13.5 3.94912 12.6946 3.84832 11.6911L3.0799 4H2.5C2.22386 4 2 3.77614 2 3.5ZM4.08533 4L4.84921 11.5953C4.90765 12.1733 5.39386 12.6 5.97461 12.6H9.02539C9.60614 12.6 10.0924 12.1733 10.1508 11.5953L10.9147 4H4.08533Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </li>
  );
}
