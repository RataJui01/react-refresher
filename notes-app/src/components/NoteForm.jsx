import { useState } from "react";
import { useNotes } from "../context/NotesContext";

/**
 * NoteForm
 * -----------------------------------------------------------------------
 * PURPOSE
 *   Form for creating a brand-new note (title + body). This is a PURE
 *   presentational form — it has no internal state and no submit logic
 *   yet. It just renders the inputs and a submit button.
 *
 * PROPS YOU'LL LIKELY ADD
 *   - titleValue, bodyValue        controlled input values
 *   - onTitleChange, onBodyChange  (e) => void
 *   - onSubmit                     (e) => void  — call e.preventDefault()
 *                                   inside, then create the note
 *
 * WHAT'S MISSING ON PURPOSE
 *   - No useState for title/body
 *   - No onSubmit handler (the <form> tag has no onSubmit prop wired)
 *   - No validation (e.g. preventing empty title submission)
 *   - No "clear inputs after submit" behavior
 *
 * SUGGESTED WIRING
 *   Either:
 *     (a) Lift state up — App owns title/body state, passes value +
 *         onChange handlers down as props, and NoteForm stays "dumb", or
 *     (b) Let NoteForm own its own input state internally and only call
 *         a single onAddNote(title, body) prop on submit.
 *   Both are valid; (b) is usually simpler for a form like this.
 * -----------------------------------------------------------------------
 */
export default function NoteForm() {
  const { onHandleAddNote } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || body === "") return;

    onHandleAddNote(title, body);

    setTitle("");
    setBody("");
  }

  return (
    <form
      className="rounded-xl border border-[#e3d9c4] bg-white/60 p-5 shadow-[0_2px_10px_rgba(43,38,34,0.06)] sm:p-6 dark:border-[#44403c] dark:bg-[#292524]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4">
        {/* Title input */}
        <div>
          <label
            htmlFor="note-title"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#8a8072] uppercase dark:text-[#a8a29e]"
          >
            Title
          </label>
          <input
            id="note-title"
            type="text"
            placeholder="Give it a name…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-[#e3d9c4] bg-[#fdfbf6] px-3.5 py-2.5 font-serif text-lg text-[#2b2622] placeholder:text-[#b3a890] focus:border-amber-600/60 focus:ring-2 focus:ring-amber-600/20 focus:outline-none dark:border-[#44403c] dark:bg-[#1c1917] dark:text-[#e7e5e4] dark:placeholder:text-[#57534e] dark:focus:border-amber-600/40"
          />
        </div>

        {/* Body textarea */}
        <div>
          <label
            htmlFor="note-body"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#8a8072] uppercase dark:text-[#a8a29e]"
          >
            Note
          </label>
          <textarea
            id="note-body"
            rows={3}
            placeholder="What's on your mind?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full resize-none rounded-lg border border-[#e3d9c4] bg-[#fdfbf6] px-3.5 py-2.5 text-sm leading-relaxed text-[#2b2622] placeholder:text-[#b3a890] focus:border-amber-600/60 focus:ring-2 focus:ring-amber-600/20 focus:outline-none dark:border-[#44403c] dark:bg-[#1c1917] dark:text-[#e7e5e4] dark:placeholder:text-[#57534e] dark:focus:border-amber-600/40"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-[#b4751a] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#9c6315] active:bg-[#85540f]"
          >
            Add note
          </button>
        </div>
      </div>
    </form>
  );
}
