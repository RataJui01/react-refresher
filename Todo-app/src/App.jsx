import Header from "@/components/Header";
import AddTodoForm from "@/components/AddTodoForm";
import FilterBar from "@/components/FilterBar";
import TodoList from "@/components/TodoList";
import Footer from "@/components/Footer";
import TodoProvider from "./context/TodoContext";

export default function App() {
  return (
    <TodoProvider>
      <div className="flex min-h-screen items-start justify-center bg-background px-4 pt-16 pb-24">
        <main id="main-content" className="w-full max-w-[520px]" tabIndex={-1}>
          <Header />
          <div className="mt-6 space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
            <AddTodoForm />
            <FilterBar />
            <TodoList />
            <Footer />
          </div>
        </main>
      </div>
    </TodoProvider>
  );
}
