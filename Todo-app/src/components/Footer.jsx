import { Button } from "@/components/ui/button";
import { useTodo } from "@/context/TodoContext";

export default function Footer() {
  const { state, dispatch } = useTodo();
  const { todos } = state;

  const remainingCount = todos.filter((todo) => !todo.done).length;
  const hasCompleted = todos.some((todo) => todo.done);

  function handleClear() {
    dispatch({ type: "Clear/Complete" });
  }
  return (
    <footer className="flex items-center justify-between border-t border-border pt-4">
      <p className="text-xs text-muted-foreground tabular-nums">
        {remainingCount === 0
          ? "Nothing left — you're done!"
          : `${remainingCount} item${remainingCount !== 1 ? "s" : ""} left`}
      </p>

      {hasCompleted && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-7 px-2 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          Clear completed
        </Button>
      )}
    </footer>
  );
}
