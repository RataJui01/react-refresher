import { createContext, useContext, useReducer } from "react";

export const TodoContext = createContext(null);

const initialState = {
  todos: [],
  filter: "all",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "Add/Todo":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), text: action.text, done: false },
        ],
      };
    case "Toggle/Todo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo,
        ),
      };
    case "Delete/Todo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "Set/Filter":
      return { ...state, filter: action.filter };
    case "Clear/Complete":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.done),
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ dispatch, state }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
