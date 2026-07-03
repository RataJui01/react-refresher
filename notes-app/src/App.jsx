import { useEffect } from "react";
import { useNotes } from "./context/NotesContext";
import { useTheme } from "./context/ThemeContext";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export default function App() {
  const { theme, onToggleTheme } = useTheme();
  const { notes } = useNotes();

  // const [notes, setNotes] = useState(() => {
  //   const savedData = localStorage.getItem("notes");
  //   return savedData ? JSON.parse(savedData) : [];
  // });

  useEffect(
    function () {
      notes.length === 0
        ? (document.title = "Take notes here")
        : (document.title = `Notes (${notes.length})`);
    },
    [notes.length],
  );

  useEffect(
    function () {
      localStorage.setItem("notes", JSON.stringify(notes));
    },
    [notes],
  );

  useEffect(
    function () {
      localStorage.setItem("themes", JSON.stringify(theme));
    },
    [theme],
  );

  return (
    <div
      className={`${theme === "dark" ? "dark" : ""} min-h-screen bg-[#f7f2e9] dark:bg-[#1c1917]`}
    >
      {/* Decorative background texture layer — purely cosmetic, no logic */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #2b2622 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* ---------- Page header ---------- */}
        <header className="mb-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-amber-700/70 uppercase dark:text-amber-500/60">
                Personal Archive
              </p>
              <h1 className="mt-1 font-serif text-4xl font-medium text-[#2b2622] sm:text-5xl dark:text-[#e7e5e4]">
                Notes
              </h1>
              <p className="mt-2 text-sm text-[#6b6358] dark:text-[#a8a29e]">
                Jot it down before it slips away.
              </p>
            </div>

            {/* TODO: wire onClick to toggleTheme from ThemeContext */}
            <button
              type="button"
              aria-label="Toggle theme"
              className="mt-1 rounded-lg border border-[#e3d9c4] bg-white/60 p-2 text-[#8a8072] transition-colors hover:bg-[#f0e9d8] hover:text-[#2b2622] dark:border-[#44403c] dark:bg-[#292524] dark:text-[#a8a29e] dark:hover:bg-[#3c3835] dark:hover:text-[#e7e5e4]"
              onClick={onToggleTheme}
            >
              <SunIcon />
            </button>
          </div>
        </header>

        <section className="mb-12">
          <NoteForm />
          {/* <NoteForm onHandleAddNote={handleAddNote} /> handleAddNote */}
        </section>

        <section>
          <NoteList />
          {/* <NoteList
              notes={notes}
              onHandleDeleteNote={handleDeleteNote}
              onHandleEditNote={handleEditNote}
            />
            notes, handleDeleteNote, handleEeditNote */}
        </section>
      </div>
    </div>
  );
}
