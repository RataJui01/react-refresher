/**
 * NoteCard
 * -----------------------------------------------------------------------
 * PURPOSE
 *   Represents ONE note. This component needs to visually support TWO
 *   modes:
 *     1. VIEW mode   — shows title + body as static text, with
 *                       "Edit" / "Delete" buttons
 *     2. EDIT mode   — shows title + body as editable inputs, with
 *                       "Save" / "Cancel" buttons
 *
 *   Both modes are written out below as two separate return blocks so
 *   you can see/style each one. Only ONE is actually rendered right now
 *   (controlled by the hardcoded `MODE_PREVIEW` constant) — there is NO
 *   real isEditing state yet.
 *
 * PROPS YOU'LL LIKELY ADD
 *   - title, body                  the note's current content
 *   - onDelete: () => void
 *   - onSave: (newTitle, newBody) => void
 *   - (optionally) id, if you want NoteCard to know its own id rather
 *     than having the parent close over it
 *
 * STATE YOU'LL LIKELY ADD (inside this component)
 *   - isEditing: boolean            toggled by Edit/Cancel/Save buttons
 *   - draftTitle, draftBody: string local editable copies of title/body,
 *                                   so typing doesn't mutate the real
 *                                   note until Save is clicked
 *
 * WHAT'S MISSING ON PURPOSE
 *   - No useState("isEditing")
 *   - No onClick handlers on any button (Edit, Delete, Save, Cancel)
 *   - No controlled input state for the edit-mode fields
 *   - No logic deciding which of the two return blocks to show — change
 *     MODE_PREVIEW below to "view" or "edit" to manually preview each
 *     mode's styling while you build, then replace this whole mechanism
 *     with `isEditing ? (...) : (...)`
 * -----------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

// Manually flip this between "view" and "edit" to preview each mode's
// styling. Replace with real isEditing state once wired up.

/*
const MODE_PREVIEW = "view"; // "view" | "edit"
*/

export default function NoteCard({
  title,
  body,
  id,
  onHandleDeleteNote,
  onHandleEditNote,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftBody, setDraftBody] = useState(body);

  function saveEdit() {
    if (draftTitle === "") {
      onHandleEditNote(id, title, draftBody);
    } else {
      onHandleEditNote(id, draftTitle, draftBody);
    }

    setIsEditing((value) => !value);
  }

  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.key === "Escape") setIsEditing((value) => !value);
      }

      if (isEditing) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => window.removeEventListener("keydown", handleKeyDown);
    },
    [isEditing],
  );

  if (isEditing) {
    // ---------------------------------------------------------------
    // EDIT MODE
    // ---------------------------------------------------------------
    return (
      <div className="rounded-xl border border-amber-600/40 bg-white p-5 shadow-[0_2px_10px_rgba(43,38,34,0.08)] ring-1 ring-amber-600/10 dark:border-amber-600/20 dark:bg-[#292524] dark:ring-amber-600/10">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            defaultValue={title}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="w-full rounded-md border border-[#e3d9c4] bg-[#fdfbf6] px-3 py-2 font-serif text-lg text-[#2b2622] focus:border-amber-600/60 focus:ring-2 focus:ring-amber-600/20 focus:outline-none dark:border-[#44403c] dark:bg-[#1c1917] dark:text-[#e7e5e4] dark:focus:border-amber-600/40"
          />
          <textarea
            defaultValue={body}
            rows={3}
            onChange={(e) => setDraftBody(e.target.value)}
            className="w-full resize-none rounded-md border border-[#e3d9c4] bg-[#fdfbf6] px-3 py-2 text-sm leading-relaxed text-[#2b2622] focus:border-amber-600/60 focus:ring-2 focus:ring-amber-600/20 focus:outline-none dark:border-[#44403c] dark:bg-[#1c1917] dark:text-[#e7e5e4] dark:focus:border-amber-600/40"
          />

          <div className="mt-1 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing((value) => !value)}
              className="rounded-md px-3.5 py-1.5 text-sm font-medium text-[#8a8072] transition-colors hover:bg-[#f0e9d8] dark:text-[#a8a29e] dark:hover:bg-[#3c3835]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-[#b4751a] px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#9c6315]"
              onClick={saveEdit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // VIEW MODE (default)
  // -----------------------------------------------------------------
  return (
    <div className="group rounded-xl border border-[#e3d9c4] bg-white p-5 shadow-[0_2px_10px_rgba(43,38,34,0.06)] transition-shadow hover:shadow-[0_4px_16px_rgba(43,38,34,0.1)] dark:border-[#44403c] dark:bg-[#292524]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-medium text-[#2b2622] dark:text-[#e7e5e4]">
          {title}
        </h3>

        {/* Action buttons — visible always on mobile, fade in on hover for desktop */}
        <div className="flex shrink-0 gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <button
            type="button"
            aria-label="Edit note"
            onClick={() => setIsEditing((value) => !value)}
            className="rounded-md p-1.5 text-[#8a8072] transition-colors hover:bg-[#f0e9d8] hover:text-[#2b2622] dark:text-[#a8a29e] dark:hover:bg-[#3c3835] dark:hover:text-[#e7e5e4]"
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            aria-label="Delete note"
            onClick={onHandleDeleteNote}
            className="rounded-md p-1.5 text-[#8a8072] transition-colors hover:bg-red-50 hover:text-red-600 dark:text-[#a8a29e] dark:hover:bg-red-950 dark:hover:text-red-400"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-[#5c5448] dark:text-[#a8a29e]">{body}</p>
    </div>
  );
}

/* ----------------------------------------------------------------------
   Tiny inline icon components, kept local to this file so there's no
   external icon-library dependency required for the spec to render.
   Swap these for lucide-react or similar if you'd prefer.
---------------------------------------------------------------------- */
function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
