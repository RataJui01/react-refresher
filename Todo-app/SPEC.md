# Todo App — Implementation Spec

> **For Claude Code:** Implement this spec task-by-task in order. Complete each task fully before moving to the next. After each task, verify the browser renders correctly before continuing. Only make changes described in each task — do not add extra features or refactor beyond what is asked.

**Goal:** Build a Todo App using `useReducer` + `useContext` to practice React state management patterns. The app manages a list of tasks with add, toggle, delete, filter, and clear-completed actions.

**Stack:** JavaScript · React (JSX) · Vite · Tailwind CSS · shadcn/ui

**Design:** Clean minimal light — DM Serif Display for the heading, DM Sans for UI text, neutral off-white palette, white card, no color accents.

---

## Context: Why this architecture

- **`useReducer`** centralises all state mutations into one pure function (the reducer). Every change goes through a named action — easier to reason about than scattered `setState` calls.
- **`useContext`** makes `state` and `dispatch` available to any component in the tree without prop drilling.
- This pattern maps directly to Redux, Zustand, and server-side state patterns used in real apps — learning it now pays off in the backend integration phase.

---

## File structure

Every file to be created. Do not create any file not listed here.

```
src/
├── main.jsx                        ← Vite entry, mounts <App /> in StrictMode
├── index.css                       ← Tailwind directives + CSS variables + fonts + animations
├── App.jsx                         ← Root layout, wraps everything in <TodoProvider>
├── lib/
│   └── utils.js                    ← cn() helper (clsx + tailwind-merge)
├── context/
│   └── TodoContext.jsx             ← createContext, useReducer, TodoProvider, useTodo hook
└── components/
    ├── Header.jsx                  ← App title + remaining count + date
    ├── AddTodoForm.jsx             ← Controlled input + submit button
    ├── FilterBar.jsx               ← All / Active / Completed filter pills
    ├── TodoList.jsx                ← Maps filteredTodos → <TodoItem>, shows empty state
    ├── TodoItem.jsx                ← Single task row: checkbox + text + delete button
    ├── Footer.jsx                  ← "N items left" + "Clear completed" button
    └── ui/
        ├── button.jsx              ← shadcn Button
        ├── input.jsx               ← shadcn Input
        └── checkbox.jsx            ← shadcn Checkbox (Radix primitive)
```

---

## Design tokens

Apply these throughout. Do not use hardcoded hex values — always use CSS variables or Tailwind tokens mapped to them.

```css
/* index.css — :root */
--background:             0 0% 98%;        /* page bg: off-white #fafafa  */
--foreground:             0 0% 9%;         /* primary text: near-black     */
--card:                   0 0% 100%;       /* card bg: white               */
--card-foreground:        0 0% 9%;
--primary:                0 0% 9%;         /* buttons, active states       */
--primary-foreground:     0 0% 98%;
--secondary:              0 0% 95%;
--secondary-foreground:   0 0% 9%;
--muted:                  0 0% 95%;
--muted-foreground:       0 0% 45%;        /* placeholder, helper text     */
--border:                 0 0% 89%;
--input:                  0 0% 89%;
--ring:                   0 0% 9%;
--destructive:            0 72% 51%;
--destructive-foreground: 0 0% 98%;
--radius:                 0.5rem;
```

**Fonts:** Import from Google Fonts in `index.css`.
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Serif+Display&display=swap');
```
- `font-sans` → `DM Sans` (all UI text)
- `font-display` → `DM Serif Display` (H1 title only)

---

## State shape

```js
// The full state object managed by useReducer
{
  todos: [
    { id: string, text: string, done: boolean }
  ],
  filter: 'all' | 'active' | 'completed'
}
```

---

## Reducer actions

Implement all five in `todoReducer`. No other action types exist.

| Action type        | Payload            | Behaviour                                                    |
|--------------------|--------------------|--------------------------------------------------------------|
| `ADD_TODO`         | `{ text: string }` | Append `{ id: crypto.randomUUID(), text, done: false }`      |
| `TOGGLE_TODO`      | `{ id: string }`   | Flip `done` on the matching todo, leave all others unchanged |
| `DELETE_TODO`      | `{ id: string }`   | Remove todo with that id from the array                      |
| `SET_FILTER`       | `{ filter: string }`| Set `state.filter` to the new value                         |
| `CLEAR_COMPLETED`  | none               | Remove all todos where `done === true`                       |

### Reducer skeleton (implement the cases)

```js
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // return new state with todo appended
    case 'TOGGLE_TODO':
      // return new state with matching todo's done flipped
    case 'DELETE_TODO':
      // return new state with matching todo removed
    case 'SET_FILTER':
      // return new state with filter updated
    case 'CLEAR_COMPLETED':
      // return new state with all done todos removed
    default:
      return state
  }
}
```

**Rules:**
- Never mutate `state` directly. Always return a new object and new arrays.
- `todos` array must be a new reference on every write action (`ADD`, `TOGGLE`, `DELETE`, `CLEAR`).

---

## Derived values (compute in `TodoProvider`, pass via context)

```js
// Inside TodoProvider, before the return:
const filteredTodos = state.todos.filter(todo => {
  if (state.filter === 'active')    return !todo.done
  if (state.filter === 'completed') return  todo.done
  return true // 'all'
})

const remainingCount = state.todos.filter(t => !t.done).length
const hasCompleted   = state.todos.some(t =>  t.done)
```

---

## Context API

```js
// What useTodo() returns — every component uses only these values
{
  todos,          // full array (used rarely — prefer filteredTodos)
  filter,         // current filter string
  filteredTodos,  // filtered array — what TodoList renders
  remainingCount, // number — for Header and Footer
  hasCompleted,   // boolean — Footer uses this to show/hide Clear button
  dispatch,       // function — all components call this to trigger actions
}
```

### Custom hook

```js
export function useTodo() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodo must be used inside <TodoProvider>')
  return ctx
}
```

---

## Initial seed data

Use this as `initialState.todos` so the app renders content immediately on load:

```js
const initialState = {
  todos: [
    { id: '1', text: 'Read React docs on useReducer',        done: true  },
    { id: '2', text: 'Build the TodoContext provider',        done: false },
    { id: '3', text: 'Wire up dispatch in each component',    done: false },
    { id: '4', text: 'Set up Vite + React project',           done: true  },
  ],
  filter: 'all',
}
```

---

## Component specifications

### `App.jsx`

Layout only. No state, no logic. Wraps everything in `<TodoProvider>`.

```jsx
export default function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-background flex items-start justify-center pt-16 pb-24 px-4">
        <main id="main-content" className="w-full max-w-[520px]" tabIndex={-1}>
          <Header />
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            <AddTodoForm />
            <FilterBar />
            <TodoList />
            <Footer />
          </div>
        </main>
      </div>
    </TodoProvider>
  )
}
```

---

### `Header.jsx`

Reads `remainingCount` from context. Displays app title + remaining count + today's date.

**Visual:**
- `h1` — `font-display text-4xl leading-none tracking-tight` — text: "My tasks"
- Subtitle line — `text-sm text-muted-foreground` — shows `"{remainingCount} task(s) left"` when `> 0`, or `"All done — great work!"` when `=== 0`
- Date — `text-sm text-muted-foreground` — formatted as `"Mon, Jul 5"` using `Intl.DateTimeFormat`
- Horizontal divider — `<div className="mt-6 h-px bg-border" role="separator" aria-hidden="true" />`

**Accessibility:**
- Include a skip link as the very first child of `<header>`:
  ```jsx
  <a href="#main-content"
     className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-3 focus-visible:py-1.5 focus-visible:text-sm focus-visible:text-primary-foreground">
    Skip to content
  </a>
  ```

---

### `AddTodoForm.jsx`

Reads `dispatch` from context. Manages its own local `text` state with `useState`.

**Behaviour:**
- `text` state starts as `''`
- On `onChange` of the input: `setText(e.target.value)`
- On `onSubmit` of the form:
  1. Call `e.preventDefault()`
  2. If `text.trim()` is empty, return early (do nothing)
  3. Dispatch `{ type: 'ADD_TODO', text: text.trim() }`
  4. Reset: `setText('')`
- Enter key submits (because it's the only input in the form, the native `<form onSubmit>` handles this automatically)

**Visual:**
```jsx
<form onSubmit={handleSubmit} className="flex gap-2" aria-label="Add a new task">
  <label htmlFor="new-todo" className="sr-only">New task</label>
  <Input
    id="new-todo"
    value={text}
    onChange={e => setText(e.target.value)}
    placeholder="Add a new task…"
    autoComplete="off"
    className="flex-1 min-w-0 bg-white text-sm"
    aria-label="New task text"
  />
  <Button type="submit" disabled={!text.trim()} className="shrink-0">
    Add task
  </Button>
</form>
```

---

### `FilterBar.jsx`

Reads `filter` and `dispatch` from context.

**Behaviour:**
- On click of a filter button: `dispatch({ type: 'SET_FILTER', filter: value })`

**Visual — three buttons rendered from this array:**
```js
const FILTERS = [
  { value: 'all',       label: 'All'       },
  { value: 'active',    label: 'Active'    },
  { value: 'completed', label: 'Completed' },
]
```

**Button classes:**
- Base (all buttons): `h-8 rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Active (`filter === value`): add `bg-primary text-primary-foreground`
- Inactive: add `bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted`

**Accessibility:**
- Wrap in `<nav aria-label="Filter tasks">`
- Each button gets `aria-pressed={filter === value}`
- Use `<button type="button">` — not a link, not a div

---

### `TodoList.jsx`

Reads `filteredTodos` from context.

**Behaviour:**
- If `filteredTodos.length === 0` → render empty state (see below)
- Otherwise → render `<ul>` with one `<TodoItem>` per todo

**Empty state:**
```jsx
<div className="flex flex-col items-center justify-center gap-3 py-16 text-center"
     role="status" aria-live="polite">
  {/* Clipboard SVG icon — see Icon spec below */}
  <p className="text-sm font-medium text-muted-foreground">No tasks yet</p>
  <p className="text-xs text-muted-foreground/70">Add your first task above to get started</p>
</div>
```

**Clipboard icon SVG** (inline, no external library):
```jsx
<svg width="40" height="40" viewBox="0 0 40 40" fill="none"
     xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
     className="text-muted-foreground/30">
  <rect x="6" y="10" width="28" height="24" rx="3"
        stroke="currentColor" strokeWidth="1.5"/>
  <path d="M13 10V8C13 6.89543 13.8954 6 15 6H25C26.1046 6 27 6.89543 27 8V10"
        stroke="currentColor" strokeWidth="1.5"/>
  <path d="M14 20H26M14 26H22" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round"/>
</svg>
```

**Task list:**
```jsx
<ul className="flex flex-col gap-2" aria-label="Task list" aria-live="polite">
  {filteredTodos.map((todo, index) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      style={{ animationDelay: `${index * 40}ms` }}
    />
  ))}
</ul>
```

---

### `TodoItem.jsx`

**Props:** `todo: { id, text, done }` and `style` (for animation delay passthrough).

Reads `dispatch` from context.

**Behaviour:**
- Checkbox click → `dispatch({ type: 'TOGGLE_TODO', id: todo.id })`
- Delete button click → `dispatch({ type: 'DELETE_TODO', id: todo.id })`

**Visual structure:**
```jsx
<li style={style}
    className={cn(
      'group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3',
      'animate-in-item transition-opacity duration-200',
      todo.done && 'opacity-50'
    )}>

  {/* Checkbox */}
  <Checkbox
    checked={todo.done}
    onChange={handleToggle}
    aria-label={`Mark "${todo.text}" as ${todo.done ? 'incomplete' : 'complete'}`}
  />

  {/* Text */}
  <span className={cn(
    'relative flex-1 min-w-0 select-none text-sm leading-snug transition-colors duration-200',
    todo.done ? 'text-muted-foreground line-through' : 'text-foreground'
  )}>
    {todo.text}
  </span>

  {/* Delete button */}
  <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={handleDelete}
    aria-label={`Delete task: ${todo.text}`}
    className={cn(
      'h-7 w-7 shrink-0 rounded-md text-muted-foreground',
      'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
      'hover:text-destructive hover:bg-destructive/10 transition-opacity duration-150'
    )}>
    {/* Trash icon SVG — see below */}
  </Button>
</li>
```

**Trash icon SVG** (inline, no external library):
```jsx
<svg width="15" height="15" viewBox="0 0 15 15" fill="none"
     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM2 3.5C2 3.22386 2.22386 3 2.5 3H12.5C12.7761 3 13 3.22386 13 3.5C13 3.77614 12.7761 4 12.5 4H11.9201L11.1517 11.6911C11.0509 12.6946 10.2072 13.5 9.19898 13.5H5.80102C4.79282 13.5 3.94912 12.6946 3.84832 11.6911L3.0799 4H2.5C2.22386 4 2 3.77614 2 3.5ZM4.08533 4L4.84921 11.5953C4.90765 12.1733 5.39386 12.6 5.97461 12.6H9.02539C9.60614 12.6 10.0924 12.1733 10.1508 11.5953L10.9147 4H4.08533Z"
        fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
</svg>
```

---

### `Footer.jsx`

Reads `remainingCount`, `hasCompleted`, and `dispatch` from context.

**Behaviour:**
- "Clear completed" button click → `dispatch({ type: 'CLEAR_COMPLETED' })`
- Hide the button entirely when `hasCompleted === false`

**Visual:**
```jsx
<footer className="flex items-center justify-between pt-4 border-t border-border">
  <p className="text-xs text-muted-foreground tabular-nums">
    {remainingCount === 0
      ? "Nothing left — you're done!"
      : `${remainingCount} item${remainingCount !== 1 ? 's' : ''} left`}
  </p>

  {hasCompleted && (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClear}
      className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10">
      Clear completed
    </Button>
  )}
</footer>
```

---

## UI primitives (`src/components/ui/`)

Install via shadcn CLI. Do not hand-write these — use the CLI output directly.

```bash
# Run these from the project root BEFORE writing any component code
npx shadcn@latest init          # choose: Vite, not Next.js; Style: Default; BaseColor: Neutral
npx shadcn@latest add button input checkbox
```

Import paths after install:
```js
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
```

### Checkbox usage note

shadcn's `Checkbox` uses a Radix primitive — it does **not** use a native `<input type="checkbox">`. The `onChange` prop does not exist on it. Use `onCheckedChange` instead:

```jsx
// CORRECT
<Checkbox
  checked={todo.done}
  onCheckedChange={handleToggle}
  aria-label="..."
/>

// WRONG — this does nothing on shadcn Checkbox
<Checkbox onChange={handleToggle} />
```

---

## `lib/utils.js`

```js
import { clsx }    from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

Install deps: `npm install clsx tailwind-merge`

---

## `tailwind.config.js`

Must extend with shadcn CSS variable tokens so Tailwind classes like `bg-background`, `text-muted-foreground`, `border-border` resolve correctly.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      colors: {
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
```

---

## `vite.config.js`

Add path alias so `@/` resolves to `src/`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path  from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

---

## `index.css`

Full file — replace the default Vite `index.css` entirely:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Serif+Display&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background:             0 0% 98%;
    --foreground:             0 0% 9%;
    --card:                   0 0% 100%;
    --card-foreground:        0 0% 9%;
    --popover:                0 0% 100%;
    --popover-foreground:     0 0% 9%;
    --primary:                0 0% 9%;
    --primary-foreground:     0 0% 98%;
    --secondary:              0 0% 95%;
    --secondary-foreground:   0 0% 9%;
    --muted:                  0 0% 95%;
    --muted-foreground:       0 0% 45%;
    --accent:                 0 0% 95%;
    --accent-foreground:      0 0% 9%;
    --destructive:            0 72% 51%;
    --destructive-foreground: 0 0% 98%;
    --border:                 0 0% 89%;
    --input:                  0 0% 89%;
    --ring:                   0 0% 9%;
    --radius:                 0.5rem;
  }

  * { @apply border-border; box-sizing: border-box; }

  html { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
  }

  :focus-visible {
    @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer utilities {
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-in-item {
    animation: slideInUp 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .font-display {
    font-family: 'DM Serif Display', Georgia, serif;
  }
}
```

---

## `main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot }  from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

---

## Implementation order

Implement in this exact sequence. Each step must render without errors before proceeding.

- [ ] **Step 1 — Config files**
  - `vite.config.js` — add `@/` alias
  - `tailwind.config.js` — replace with full config above
  - `index.css` — replace with full CSS above

- [ ] **Step 2 — Dependencies**
  ```bash
  npm install clsx tailwind-merge
  npx shadcn@latest init
  npx shadcn@latest add button input checkbox
  ```

- [ ] **Step 3 — `src/lib/utils.js`**
  - Implement `cn()` using clsx + tailwind-merge

- [ ] **Step 4 — `src/context/TodoContext.jsx`**
  - Implement `todoReducer` with all 5 action types
  - Implement `TodoProvider` with `useReducer`, derived values, and context value
  - Implement `useTodo()` hook
  - Verify: import and render `<TodoProvider><p>works</p></TodoProvider>` in App — no errors in console

- [ ] **Step 5 — `src/components/Header.jsx`**
  - Read `remainingCount` from `useTodo()`
  - Render title, remaining count, date, skip link, divider

- [ ] **Step 6 — `src/components/AddTodoForm.jsx`**
  - Local `useState('')` for input text
  - Read `dispatch` from `useTodo()`
  - Submit handler: validate, dispatch `ADD_TODO`, reset
  - Verify: type a task and press Enter — it appears in the list

- [ ] **Step 7 — `src/components/FilterBar.jsx`**
  - Read `filter` and `dispatch` from `useTodo()`
  - Render 3 pill buttons with active state
  - Dispatch `SET_FILTER` on click

- [ ] **Step 8 — `src/components/TodoItem.jsx`**
  - Receive `todo` prop and `style` prop
  - Read `dispatch` from `useTodo()`
  - Dispatch `TOGGLE_TODO` on checkbox change
  - Dispatch `DELETE_TODO` on delete button click

- [ ] **Step 9 — `src/components/TodoList.jsx`**
  - Read `filteredTodos` from `useTodo()`
  - Render empty state when length is 0
  - Render `<TodoItem>` list with staggered animation delay

- [ ] **Step 10 — `src/components/Footer.jsx`**
  - Read `remainingCount`, `hasCompleted`, `dispatch` from `useTodo()`
  - Dispatch `CLEAR_COMPLETED` on button click

- [ ] **Step 11 — `src/App.jsx`**
  - Assemble all components inside `<TodoProvider>`
  - Verify full app renders and all interactions work

---

## Accessibility checklist

Verify every item before calling the implementation complete.

- [ ] Every `<button>` has visible text or `aria-label`
- [ ] Checkbox has `aria-label` describing the task by name
- [ ] Delete button has `aria-label` including the task text
- [ ] Filter buttons have `aria-pressed` set correctly
- [ ] `<FilterBar>` is wrapped in `<nav aria-label="Filter tasks">`
- [ ] `<TodoList>` `<ul>` has `aria-label="Task list"` and `aria-live="polite"`
- [ ] Empty state container has `role="status"` and `aria-live="polite"`
- [ ] Skip link is the first focusable element on the page
- [ ] Form has `aria-label="Add a new task"` and input has `aria-label`
- [ ] `prefers-reduced-motion` disables animations
- [ ] All interactive elements reachable by Tab key
- [ ] No `onClick` on non-interactive elements (`div`, `span`)

---

## What NOT to implement

Do not add any of the following — they are out of scope:

- Local storage persistence
- Drag-and-drop reordering
- Edit existing todo text inline
- Due dates or priority levels
- Dark mode toggle
- Backend API calls
- Authentication
- Tests
