# Notes App — Visual / UI Specification

> **Scope:** This document covers only visual appearance, layout, and UI states.
> It intentionally omits all React logic, event handlers, data-fetching, and
> state management. The developer implements all behaviour independently.

---

## Table of Contents

1. [Design Tokens & Color Palette](#1-design-tokens--color-palette)
2. [Typography](#2-typography)
3. [Spacing & Sizing System](#3-spacing--sizing-system)
4. [Component Structure](#4-component-structure)
5. [Overall Page Layout](#5-overall-page-layout)
6. [Component Visual Specs](#6-component-visual-specs)
   - 6.1 [App (root shell)](#61-app-root-shell)
   - 6.2 [Header](#62-header)
   - 6.3 [NoteForm](#63-noteform)
   - 6.4 [NoteList](#64-notelist)
   - 6.5 [NoteCard](#65-notecard)
   - 6.6 [NoteCardSkeleton](#66-notecardskeleton)
   - 6.7 [LoadingState](#67-loadingstate)
   - 6.8 [ErrorState](#68-errorstate)
   - 6.9 [EmptyState](#69-emptystate)
7. [Interactive Element Catalogue](#7-interactive-element-catalogue)
8. [Responsive Breakpoints](#8-responsive-breakpoints)

---

## 1. Design Tokens & Color Palette

These variables are already declared in `src/index.css`. All Tailwind utilities
that reference custom colors use `[var(--token)]` arbitrary-value syntax.

| Token | Light value | Dark value | Semantic role |
|---|---|---|---|
| `--text` | `#6b6375` | `#9ca3af` | Body / secondary text |
| `--text-h` | `#08060d` | `#f3f4f6` | Headings / high-contrast text |
| `--bg` | `#ffffff` | `#16171d` | Page background |
| `--border` | `#e5e4e7` | `#2e303a` | Dividers, card borders |
| `--accent` | `#aa3bff` | `#c084fc` | Primary action color (purple) |
| `--accent-bg` | `rgba(170,59,255,0.10)` | `rgba(192,132,252,0.15)` | Accent tint fill |
| `--accent-border` | `rgba(170,59,255,0.50)` | `rgba(192,132,252,0.50)` | Accent border on hover/focus |
| `--shadow` | `rgba(0,0,0,0.10) 0 10px 15px -3px, …` | `rgba(0,0,0,0.40) 0 10px 15px -3px, …` | Card / popup shadow |
| `--code-bg` | `#f4f3ec` | `#1f2028` | Subtle tinted surfaces (reused for skeletons) |
| `--social-bg` | `rgba(244,243,236,0.50)` | `rgba(47,48,58,0.50)` | Frosted / ghost surfaces |

> **Tailwind usage:** `text-[var(--text)]`, `bg-[var(--bg)]`,
> `border-[var(--border)]`, `text-[var(--text-h)]`, `bg-[var(--accent-bg)]`, etc.

---

## 2. Typography

Global `h1`/`h2`/`p` styles from `index.css` remain in effect. The notes app
overrides heading sizes per-component using Tailwind utilities.

| Element | Size | Weight | Color | Notes |
|---|---|---|---|---|
| App title `<h1>` | `text-2xl` | `font-medium` | `var(--text-h)` | Scoped override — smaller than global `h1` |
| Note count badge | `text-xs` | `font-medium` | `var(--accent)` | Pill next to title |
| Note title (NoteCard) | `text-lg` | `font-semibold` | `var(--text-h)` | |
| Note body (NoteCard) | `text-base` | `font-normal` | `var(--text)` | Clamped to 4 lines in read mode |
| Form labels | `text-sm` | `font-medium` | `var(--text)` | |
| Button text | `text-sm` | `font-medium` | varies | |
| Placeholder text | `text-sm` | `font-normal` | `var(--text)` at 50% opacity | `placeholder:text-[var(--text)] placeholder:opacity-50` |
| Error message | `text-sm` | `font-medium` | `text-red-500` | |
| Empty/Error heading | `text-xl` | `font-medium` | `var(--text-h)` | |
| Empty/Error sub-text | `text-sm` | `font-normal` | `var(--text)` | |

---

## 3. Spacing & Sizing System

All spacing follows Tailwind's 4px base unit.

| Scale | Tailwind | Value |
|---|---|---|
| xs | `gap-1` / `p-1` | 4px |
| sm | `gap-2` / `p-2` | 8px |
| md | `gap-4` / `p-4` | 16px |
| lg | `gap-6` / `p-6` | 24px |
| xl | `gap-8` / `p-8` | 32px |

| Property | Value |
|---|---|
| Card border radius | `rounded-xl` (12px) |
| Button border radius | `rounded-lg` (8px) |
| Input border radius | `rounded-lg` (8px) |
| Max content width | `max-w-[1126px]` (set by `#root` in `index.css`) |
| Note grid min column | `280px` |

---

## 4. Component Structure

```
App
├── Header
├── NoteForm
└── NoteList
    ├── LoadingState          (replaces list while fetching)
    │   └── NoteCardSkeleton  (×3 placeholder cards)
    ├── ErrorState            (replaces list on fetch failure)
    ├── EmptyState            (replaces list when notes array is empty)
    └── NoteCard              (×N, one per note)
```

Each component lives in its own file under `src/components/`.

---

## 5. Overall Page Layout

```
┌──────────────────────────────────────────────────┐  ← max-w-[1126px], centered, border-x
│  Header                                          │  ← sticky top-0, border-b
├──────────────────────────────────────────────────┤
│  NoteForm                                        │  ← full-width section, border-b
├──────────────────────────────────────────────────┤
│  NoteList (flex-1)                               │
│   [ NoteCard ]  [ NoteCard ]  [ NoteCard ] …     │  ← auto-fill grid
│   [ NoteCard ]  [ NoteCard ]                     │
└──────────────────────────────────────────────────┘
```

`#root` in `index.css` already provides:
- `width: 1126px; max-width: 100%; margin: 0 auto`
- `border-inline: 1px solid var(--border)`
- `min-height: 100svh; display: flex; flex-direction: column`

`NoteList` uses `flex-1` to fill all remaining vertical space.

---

## 6. Component Visual Specs

---

### 6.1 App (root shell)

**File:** `src/App.jsx`

Purely structural — no visible chrome of its own. Renders three children:

```jsx
<div className="flex flex-col min-h-svh">
  <Header />
  <NoteForm />
  <NoteList />
</div>
```

> Delete or empty `App.css` — its boilerplate classes conflict with the
> Tailwind-utility approach used here.

---

### 6.2 Header

**File:** `src/components/Header.jsx`

#### Appearance

```
sticky top-0 z-10
bg-[var(--bg)]/90 backdrop-blur-sm
border-b border-[var(--border)]
```

Inner row: `flex items-center justify-between px-6 py-4`

#### Contents

| Element | Classes |
|---|---|
| App title `<h1>` | `text-2xl font-medium tracking-tight text-[var(--text-h)]` |
| Note count badge | `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]` |

The badge displays the total note count, e.g. `"4 notes"`.

---

### 6.3 NoteForm

**File:** `src/components/NoteForm.jsx`

#### Appearance

```
border-b border-[var(--border)]
px-6 py-6
```

Inner layout: `flex flex-col gap-4 max-w-2xl`

#### Fields

**Title input**

```jsx
<input
  type="text"
  placeholder="Note title…"
  className="
    w-full px-4 py-2.5 rounded-lg
    bg-[var(--code-bg)] border border-[var(--border)]
    text-base text-[var(--text-h)]
    placeholder:text-[var(--text)] placeholder:opacity-50
    outline-none transition-colors duration-150
    focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-border)]
  "
/>
```

**Body textarea**

```jsx
<textarea
  placeholder="Write your note here…"
  rows={4}
  className="
    w-full px-4 py-3 rounded-lg
    bg-[var(--code-bg)] border border-[var(--border)]
    text-base text-[var(--text-h)]
    placeholder:text-[var(--text)] placeholder:opacity-50
    outline-none resize-y min-h-[96px] max-h-[320px]
    transition-colors duration-150
    focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-border)]
  "
/>
```

**Add Note button**

```jsx
<button
  type="submit"
  className="
    self-start px-5 py-2.5 rounded-lg
    bg-[var(--accent)] text-white text-sm font-medium
    transition-all duration-150
    hover:opacity-90 hover:shadow-[var(--shadow)]
    focus-visible:outline focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
    active:scale-[0.97]
    disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
  "
>
  Add Note
</button>
```

#### States

| State | Visual change |
|---|---|
| Default | As described |
| Input focused | Accent border + ring |
| Button hover | `opacity-90` + shadow |
| Button active | `scale-[0.97]` |
| Button disabled (fields empty) | `opacity-40 cursor-not-allowed` |

---

### 6.4 NoteList

**File:** `src/components/NoteList.jsx`

#### Appearance

```jsx
<section className="flex-1 px-6 py-6">
  {/* conditional render based on state — see below */}
</section>
```

When notes exist, render a fluid grid:

```jsx
<div
  className="grid gap-5"
  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
>
  {/* NoteCard × N */}
</div>
```

#### State rendering

| State | Renders |
|---|---|
| `loading` | `<LoadingState />` — full area replacement |
| `error` | `<ErrorState />` — full area replacement |
| `notes.length === 0` | `<EmptyState />` — full area replacement |
| `notes.length > 0` | Grid of `<NoteCard />` |

Replacement states are not overlays — they replace the grid entirely.
Each uses `flex flex-col items-center justify-center min-h-[320px]`.

---

### 6.5 NoteCard

**File:** `src/components/NoteCard.jsx`

---

#### Read mode

```jsx
<article
  className="
    group flex flex-col gap-3
    bg-[var(--bg)] border border-[var(--border)]
    rounded-xl p-5 shadow-sm
    transition-shadow duration-200
    hover:shadow-[var(--shadow)]
  "
>
```

**Card anatomy:**

```
┌─────────────────────────────────────────┐
│  [Note title]              [ ✎ ] [ ✕ ]  │  ← title row
├─────────────────────────────────────────┤
│  Note body (clamped to 4 lines)         │
└─────────────────────────────────────────┘
```

| Sub-element | Classes |
|---|---|
| Title row | `flex items-start justify-between gap-2` |
| Title text | `text-lg font-semibold text-[var(--text-h)] leading-snug` |
| Body text | `text-base text-[var(--text)] leading-relaxed line-clamp-4` |
| Button group | `flex items-center gap-1 shrink-0` |

**Edit button (pencil icon — 16×16 SVG)**

```jsx
<button
  aria-label="Edit note"
  className="
    p-1.5 rounded-md
    text-[var(--text)] opacity-0 group-hover:opacity-100
    hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]
    focus-visible:opacity-100
    focus-visible:outline focus-visible:outline-2
    focus-visible:outline-[var(--accent-border)]
    transition-all duration-150
  "
/>
```

**Delete button (× icon — 16×16 SVG)**

```jsx
<button
  aria-label="Delete note"
  className="
    p-1.5 rounded-md
    text-[var(--text)] opacity-0 group-hover:opacity-100
    hover:bg-red-50 hover:text-red-500
    dark:hover:bg-red-950 dark:hover:text-red-400
    focus-visible:opacity-100
    focus-visible:outline focus-visible:outline-2
    focus-visible:outline-red-400
    transition-all duration-150
  "
/>
```

> Both buttons are `opacity-0` until the card is hovered (`group-hover:opacity-100`)
> or keyboard-focused (`focus-visible:opacity-100`).

---

#### Edit mode

The card outer shell is **unchanged** (same border, rounding, padding, shadow).
The interior swaps to an inline form:

```
┌─────────────────────────────────────────┐
│  [Title input — full width           ]  │
│  [Body textarea — full width, 4 rows ]  │
│  [Save]  [Cancel]                       │
└─────────────────────────────────────────┘
```

**Edit title input**

```jsx
<input
  className="
    w-full px-3 py-1.5 rounded-md
    bg-[var(--code-bg)] border border-[var(--accent-border)]
    text-lg font-semibold text-[var(--text-h)]
    outline-none
    focus:ring-2 focus:ring-[var(--accent-border)]
    transition-colors duration-150
  "
/>
```

**Edit body textarea**

```jsx
<textarea
  rows={4}
  className="
    w-full px-3 py-2 rounded-md
    bg-[var(--code-bg)] border border-[var(--border)]
    text-base text-[var(--text)]
    outline-none resize-y min-h-[80px]
    focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-border)]
    transition-colors duration-150
  "
/>
```

**Save button**

```jsx
<button
  className="
    px-4 py-1.5 rounded-lg
    bg-[var(--accent)] text-white text-sm font-medium
    hover:opacity-90
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]
    active:scale-[0.97] transition-all duration-150
  "
>
  Save
</button>
```

**Cancel button**

```jsx
<button
  className="
    px-4 py-1.5 rounded-lg
    bg-transparent text-[var(--text)]
    border border-[var(--border)]
    text-sm font-medium
    hover:bg-[var(--code-bg)]
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--border)]
    active:scale-[0.97] transition-all duration-150
  "
>
  Cancel
</button>
```

Button row: `flex items-center gap-2 mt-1`

---

#### NoteCard state summary

| State | Visual |
|---|---|
| Default (read) | Card + border + `shadow-sm`. Action buttons hidden. Body clamped to 4 lines. |
| Hovered (read) | Shadow deepens to `var(--shadow)`. Action buttons fade in. |
| Edit mode | Interior replaced with inputs. Title input has accent border. |
| Deleting | `opacity-0 scale-95` over `150ms`, then removed from DOM. |

---

### 6.6 NoteCardSkeleton

**File:** `src/components/NoteCardSkeleton.jsx`

A shimmer placeholder that mirrors the NoteCard shape.

**Add to `src/index.css`:**

```css
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
}
.skeleton {
  background: linear-gradient(
    90deg,
    var(--code-bg) 25%,
    var(--border)  50%,
    var(--code-bg) 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
  border-radius: 4px;
}
```

**JSX structure:**

```jsx
<div className="flex flex-col gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5">
  {/* Title line */}
  <div className="skeleton h-5 w-3/5" />
  {/* Body lines */}
  <div className="flex flex-col gap-2">
    <div className="skeleton h-4 w-full" />
    <div className="skeleton h-4 w-full" />
    <div className="skeleton h-4 w-4/5" />
  </div>
</div>
```

---

### 6.7 LoadingState

**File:** `src/components/LoadingState.jsx`

Renders the same grid as NoteList, populated with 3 skeletons:

```jsx
<section
  aria-label="Loading notes"
  aria-busy="true"
  className="grid gap-5"
  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
>
  <NoteCardSkeleton />
  <NoteCardSkeleton />
  <NoteCardSkeleton />
</section>
```

---

### 6.8 ErrorState

**File:** `src/components/ErrorState.jsx`

```jsx
<div className="flex flex-col items-center justify-center gap-4 min-h-[320px] text-center px-6">
  {/* Warning icon circle */}
  <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
    {/* 24×24 warning SVG, className="text-red-500" */}
  </div>

  <h2 className="text-xl font-medium text-[var(--text-h)]">
    Failed to load notes
  </h2>

  <p className="text-sm text-[var(--text)] max-w-xs">
    Something went wrong while fetching your notes. Please try again.
  </p>

  {/* Retry button */}
  <button
    className="
      px-5 py-2.5 rounded-lg
      border border-[var(--border)]
      bg-[var(--code-bg)] text-[var(--text-h)]
      text-sm font-medium
      hover:shadow-[var(--shadow)]
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]
      transition-all duration-150
    "
  >
    Try again
  </button>
</div>
```

---

### 6.9 EmptyState

**File:** `src/components/EmptyState.jsx`

```jsx
<div className="flex flex-col items-center justify-center gap-4 min-h-[320px] text-center px-6">
  {/* Dashed note illustration */}
  <div
    className="
      w-20 h-24 rounded-xl
      border-2 border-dashed border-[var(--border)]
      flex items-center justify-center
      text-[var(--text)] opacity-40
    "
  >
    {/* 32×32 document SVG icon */}
  </div>

  <h2 className="text-xl font-medium text-[var(--text-h)]">
    No notes yet
  </h2>

  <p className="text-sm text-[var(--text)] max-w-xs">
    Add your first note using the form above.
  </p>
</div>
```

---

## 7. Interactive Element Catalogue

| Element | Default | Hover | Focus-visible | Active | Disabled |
|---|---|---|---|---|---|
| Add Note button | `bg-[var(--accent)]` white | `opacity-90` + shadow | `outline-2 outline-[var(--accent)]` offset-2 | `scale-[0.97]` | `opacity-40 cursor-not-allowed` |
| Save button | Same as Add Note | Same | Same | Same | — |
| Cancel button | Ghost + border | `bg-[var(--code-bg)]` | `outline-2 outline-[var(--border)]` offset-2 | `scale-[0.97]` | — |
| Edit button (card) | `opacity-0` | Visible + `bg-[var(--accent-bg)] text-[var(--accent)]` | Always visible + accent ring | — | — |
| Delete button (card) | `opacity-0` | Visible + `bg-red-50 text-red-500` | Always visible + red ring | — | — |
| Try again button | Ghost + border | Shadow lifts | `outline-2 outline-[var(--accent)]` offset-2 | — | — |
| Title input | `bg-[var(--code-bg)]` neutral border | — | Accent border + ring | — | — |
| Body textarea | `bg-[var(--code-bg)]` neutral border | — | Accent border + ring | — | — |

All transitions: `transition-all duration-150` or `transition-colors duration-150`.

---

## 8. Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< sm` (< 640px) | 1-column grid. Section padding reduces to `px-4`. |
| `sm – lg` (640–1023px) | Auto-fill grid — typically 2 columns. |
| `>= lg` (≥ 1024px) | Auto-fill grid — typically 3 columns within the 1126px shell. |

The `repeat(auto-fill, minmax(280px, 1fr))` grid handles all breakpoints
automatically — no manual `sm:` / `lg:` column classes needed.

> `#root` in `index.css` already handles the max-width cap and centering.
> No changes to `index.css` are needed beyond the `.skeleton` addition in §6.6.

---

## File Map

```
notes-app/
├── src/
│   ├── index.css              ← add @keyframes shimmer + .skeleton only
│   ├── main.jsx               ← unchanged
│   ├── App.jsx                ← replace boilerplate; renders Header, NoteForm, NoteList
│   ├── App.css                ← delete or empty (conflicts with Tailwind utilities)
│   └── components/
│       ├── Header.jsx
│       ├── NoteForm.jsx
│       ├── NoteList.jsx
│       ├── NoteCard.jsx
│       ├── NoteCardSkeleton.jsx
│       ├── LoadingState.jsx
│       ├── ErrorState.jsx
│       └── EmptyState.jsx
└── SPEC.md                    ← this file
```

---

*End of visual specification. All React logic (useState, useEffect, fetch,
event handlers, derived state) is left entirely to the developer.*
