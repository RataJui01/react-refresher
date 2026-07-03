import { useNotes } from "../context/NotesContext";
import NoteCard from "./NoteCard";

/**
 * NoteList
 * -----------------------------------------------------------------------
 * PURPOSE
 *   Container responsible for laying out the collection of notes. It
 *   should receive an array of notes and render one <NoteCard /> per
 *   note. It also owns the "no notes yet" empty state.
 *
 * PROPS YOU'LL LIKELY ADD
 *   - notes: Array<{ id, title, body }>
 *   - onDeleteNote: (id) => void        passed through to each NoteCard
 *   - onEditNote: (id, newTitle, newBody) => void   passed through too
 *
 * WHAT'S MISSING ON PURPOSE
 *   - No real notes array — currently rendering SAMPLE_NOTES below purely
 *     so the layout has something to display. Delete SAMPLE_NOTES once
 *     you wire in real data from props/state.
 *   - No .map() driven by props — replace the hardcoded render with
 *     notes.map(note => <NoteCard key={note.id} ... />)
 *   - No empty-state logic (e.g. "show this message when notes.length
 *     === 0") — the empty state markup exists below but isn't
 *     conditionally rendered yet.
 * -----------------------------------------------------------------------
 */

// Sample data — for layout preview only. Remove once real notes are wired.
/*
const SAMPLE_NOTES = [
  {
    id: 1,
    title: "Welcome",
    body: "This is what a note card looks like with some body text in it.",
  },
  {
    id: 2,
    title: "Grocery list",
    body: "Eggs, oat milk, coffee beans, the good kind of bread.",
  },
];
*/

export default function NoteList() {
  const { notes, onHandleDeleteNote, onHandleEditNote } = useNotes();
  return (
    <div>
      {/* ---------- Section label ---------- */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-xs tracking-[0.2em] text-[#8a8072] uppercase dark:text-[#78716c]">
          All notes
        </h2>
        <span className="font-mono text-xs text-[#b3a890] dark:text-[#57534e]">
          {notes.length} total
        </span>
      </div>

      {/* ---------- Notes grid ----------
         Swap SAMPLE_NOTES for your real `notes` prop, e.g.:
         notes.map((note) => (
           <NoteCard
             key={note.id}
             title={note.title}
             body={note.body}
             onDelete={() => onDeleteNote(note.id)}
             onSave={(newTitle, newBody) => onEditNote(note.id, newTitle, newBody)}
           />
         ))
      */}

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              onHandleDeleteNote={() => onHandleDeleteNote(note.id)}
              onHandleEditNote={onHandleEditNote}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#e3d9c4] bg-white/30 px-6 py-14 text-center dark:border-[#44403c] dark:bg-[#292524]/30">
          <p className="font-serif text-lg text-[#8a8072] dark:text-[#78716c]">
            No notes yet
          </p>
          <p className="mt-1 text-sm text-[#b3a890] dark:text-[#57534e]">
            Add your first one using the form above.
          </p>
        </div>
      )}
    </div>
  );
}
