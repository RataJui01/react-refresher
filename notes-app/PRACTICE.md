# React Refresher — `useEffect` & `useContext` Practice

Features to add to this notes app, grouped by hook. Implement them in order — each one builds on the previous.

---

## `useEffect` Features

### 1. Persist notes to `localStorage`

**What it does:** Notes survive a page refresh. Load from storage on mount, save to storage whenever notes change.

**Where to implement:** `App.jsx`

**Steps:**
1. Add a `useEffect` with an **empty dependency array `[]`** — this runs once on mount. Inside it, read `localStorage.getItem("notes")`, parse the JSON, and call `setNotes()` with the result. Guard against `null` (first visit) with `?? []`.
2. Add a second `useEffect` with `[notes]` as the dependency. Inside it, call `localStorage.setItem("notes", JSON.stringify(notes))`.
3. Test: add a note, refresh the page — it should still be there.

**Key concepts to observe:**
- Why two separate effects instead of one?
- What happens if you put `notes` in the first effect's dependency array?
- Why does the save effect run on the very first render (before the user does anything)?

---

### 2. Document title note counter

**What it does:** The browser tab shows `Notes (3)` — updates live as you add/delete notes.

**Where to implement:** `App.jsx`

**Steps:**
1. Add a `useEffect` that sets `document.title` to `\`Notes (${notes.length})\``.
2. Add `[notes.length]` as the dependency array.
3. Test: open the browser tab and watch the title change as you add/delete notes.

**Key concepts to observe:**
- This is a "side effect on something outside React" — the DOM's `<title>` tag.
- Try using `[notes]` instead of `[notes.length]` — does it behave differently? Why?
- What should `document.title` be when there are 0 notes? Add that condition.

---

### 3. `Escape` key cancels edit mode

**What it does:** Pressing `Escape` while a note is in edit mode cancels the edit, same as clicking Cancel.

**Where to implement:** `NoteCard.jsx`

**Steps:**
1. Inside `NoteCard`, add a `useEffect` that is **conditional on `isEditing`**.
2. Inside the effect, define a handler: `function handleKeyDown(e) { if (e.key === "Escape") setIsEditing(false) }`.
3. Attach it: `window.addEventListener("keydown", handleKeyDown)`.
4. **Return a cleanup function** that calls `window.removeEventListener("keydown", handleKeyDown)`.
5. Set the dependency array to `[isEditing]`.
6. Test: click Edit on a note, then press `Escape` — it should close.

**Key concepts to observe:**
- Without the cleanup `return`, what would happen every time `isEditing` toggles?
- Why is `[isEditing]` the right dependency here, not `[]`?
- When the component unmounts while in edit mode, does the listener get removed? (It should — check the cleanup.)

---

### 4. Auto-save draft badge (debounce + cleanup)

**What it does:** While editing a note, if the user stops typing for 1 second, a small "Draft saved" badge appears briefly.

**Where to implement:** `NoteCard.jsx`

**Steps:**
1. Add a `useState` for `showSavedBadge` (boolean, starts `false`).
2. Add a `useEffect` that depends on `[draftTitle, draftBody]`.
3. Inside the effect, set a timeout: `const timer = setTimeout(() => setShowSavedBadge(true), 1000)`.
4. Return a cleanup: `return () => clearTimeout(timer)`.
5. Add another small effect (or handle inside the same one) to hide the badge after another 2 seconds once it appears.
6. Render the badge conditionally in the edit-mode JSX near the Save button.

**Key concepts to observe:**
- Remove the `return () => clearTimeout(timer)` line and type quickly — what happens? (Badge flickers on every keystroke.)
- This pattern (effect + cleanup with a timer) is the standard React way to debounce.
- Why can't you just use `setTimeout` outside of `useEffect` for this?

---

## `useContext` Features

### 5. Theme toggle (dark / light mode)

**What it does:** A toggle button in the header switches the app between light and dark mode. Any component can read the current theme without prop drilling.

**Where to implement:** New file `src/context/ThemeContext.jsx`, consumed in `App.jsx` and `NoteCard.jsx`.

**Steps:**
1. Create `src/context/ThemeContext.jsx`:
   - `const ThemeContext = createContext(null)` (export it)
   - Write a `ThemeProvider` component that owns `useState("light")` and a `toggleTheme` function.
   - It returns `<ThemeContext.Provider value={{ theme, toggleTheme }}>` wrapping `{children}`.
   - Export `ThemeProvider` as default and export a custom hook `export function useTheme() { return useContext(ThemeContext) }`.
2. In `main.jsx` (or `App.jsx`), wrap everything in `<ThemeProvider>`.
3. In `App.jsx`, call `useTheme()` to get `theme` and `toggleTheme`. Add a toggle button to the header.
4. Apply a conditional class to the root `<div>` based on `theme` (e.g., `dark` class or swap the background color).
5. In `NoteCard.jsx`, call `useTheme()` and adjust card colors based on `theme` — no props needed.

**Key concepts to observe:**
- What does `createContext(null)` — the default value — actually do? When is it used?
- Try reading `theme` in `NoteCard` via props instead — compare how much prop-drilling that requires.
- The custom `useTheme()` hook is optional but notice how it cleans up consumer code.

---

### 6. Move notes state into `NotesContext`

**What it does:** `notes`, `handleAddNote`, `handleDeleteNote`, and `handleEditNote` move out of `App.jsx` into a context. `NoteForm` and `NoteList` consume them directly — `App` passes zero props.

**Where to implement:** New file `src/context/NotesContext.jsx`.

**Steps:**
1. Create `src/context/NotesContext.jsx`:
   - `const NotesContext = createContext(null)` (export it)
   - Write a `NotesProvider` component. Move all notes state and handler functions from `App.jsx` into it.
   - Provide them via `<NotesContext.Provider value={{ notes, handleAddNote, handleDeleteNote, handleEditNote }}>`.
   - Export a custom hook `export function useNotes() { return useContext(NotesContext) }`.
2. Wrap `<NotesProvider>` in `main.jsx` (or inside `App.jsx`).
3. In `App.jsx`, delete all the state and handlers. Remove all props from `<NoteForm>` and `<NoteList>`.
4. In `NoteForm.jsx`, replace the `onHandleAddNote` prop with `const { handleAddNote } = useNotes()`.
5. In `NoteList.jsx` and `NoteCard.jsx`, do the same for `notes`, `handleDeleteNote`, `handleEditNote`.
6. Verify the app works exactly as before — same behaviour, no props passed through `App`.

**Key concepts to observe:**
- `App.jsx` should now be almost empty — just layout JSX. Does that feel clean or wrong?
- What is the difference between context and props? When is each appropriate?
- If you have both `ThemeContext` and `NotesContext`, how do you nest two providers? Does order matter?
- Context re-renders every consumer when the value changes. What would happen if you split `notes` and the handlers into two separate contexts?

---

## Implementation order

| # | Feature | Hook | New concept |
|---|---------|------|-------------|
| 1 | `localStorage` persistence | `useEffect` | deps array, mount-only effect |
| 2 | Document title counter | `useEffect` | DOM side effects |
| 3 | `Escape` key cancels edit | `useEffect` | cleanup functions |
| 4 | Auto-save draft badge | `useEffect` | debounce pattern with cleanup |
| 5 | Theme toggle | `useContext` | createContext, Provider, custom hook |
| 6 | Notes state in context | `useContext` | context as shared state store |
