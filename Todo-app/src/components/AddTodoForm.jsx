import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/context/TodoContext";
import { useState } from "react";

export default function AddTodoForm() {
  const [formText, setFormText] = useState("");
  const { dispatch } = useTodo();

  function handleSubmit(e) {
    e.preventDefault();

    if (!formText.trim()) return;

    dispatch({ type: "Add/Todo", text: formText.trim() });

    setFormText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
      aria-label="Add a new task"
    >
      <label htmlFor="new-todo" className="sr-only">
        New task
      </label>
      <Input
        id="new-todo"
        value={formText}
        onChange={(e) => setFormText(e.target.value)}
        placeholder="Add a new task…"
        autoComplete="off"
        className="min-w-0 flex-1 bg-white text-sm"
        aria-label="New task text"
      />
      <Button type="submit" className="shrink-0">
        Add task
      </Button>
    </form>
  );
}
