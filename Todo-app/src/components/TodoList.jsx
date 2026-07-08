import { useTodo } from "@/context/TodoContext";
import TodoItem from "./TodoItem";

// const filteredTodos = [
//   { id: "1", text: "Read React docs on useReducer", done: true },
//   { id: "2", text: "Build the TodoContext provider", done: false },
//   { id: "3", text: "Wire up dispatch in each component", done: false },
//   { id: "4", text: "Set up Vite + React project", done: true },
// ];

export default function TodoList() {
  const { state } = useTodo();
  const filteredTodos =
    state.filter === "active"
      ? state.todos.filter((todo) => !todo.done)
      : state.filter === "completed"
        ? state.todos.filter((todo) => todo.done)
        : state.todos;

  if (filteredTodos.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="text-muted-foreground/30"
        >
          <rect
            x="6"
            y="10"
            width="28"
            height="24"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M13 10V8C13 6.89543 13.8954 6 15 6H25C26.1046 6 27 6.89543 27 8V10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M14 20H26M14 26H22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-sm font-medium text-muted-foreground">
          No tasks yet
        </p>
        <p className="text-xs text-muted-foreground/70">
          Add your first task above to get started
        </p>
      </div>
    );
  }

  return (
    <ul
      className="flex flex-col gap-2"
      aria-label="Task list"
      aria-live="polite"
    >
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          style={{ animationDelay: `${index * 40}ms` }}
        />
      ))}
    </ul>
  );
}
