# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (HMR enabled)
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # run ESLint
npm run lint:fix   # run ESLint with auto-fix
```

No test runner is configured.

## Architecture

This is a **React 19 + Vite + Tailwind CSS v4** notes app.

### Styling system

- **Tailwind CSS v4** is configured via `@tailwindcss/vite` — there is no `tailwind.config.js`. All Tailwind config is CSS-first.
- **CSS variables** in `src/index.css` (`:root`) define the entire color/shadow/font token system for both light and dark mode. All component colors reference these via Tailwind arbitrary values: `bg-[var(--accent)]`, `text-[var(--text-h)]`, etc.
- `src/App.css` is intentionally empty — do not add styles there.
- The `.skeleton` class and `@keyframes shimmer` in `src/index.css` power loading placeholder animations.
- **Prettier** auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`, pointing at `src/index.css` as the Tailwind stylesheet.

### Layout shell

`#root` in `index.css` provides the outer shell: `1126px` centered, `border-inline`, `min-height: 100svh`, `flex-direction: column`. Components should not fight this — use `flex-1` on `NoteList` to fill remaining space.

### React Compiler

The **React Compiler** (`babel-plugin-react-compiler`) is active via `@rolldown/plugin-babel`. Avoid manual `useMemo`/`useCallback` — the compiler handles memoization automatically.

### ESLint

ESLint runs **in-process during `vite dev`** via `@nabla/vite-plugin-eslint` — lint errors surface as overlay warnings in the browser without a separate terminal step. Unused variables prefixed with `_` are allowed by convention.

### Visual specification

`SPEC.md` at the project root is the authoritative UI/visual reference. Consult it for component structure, Tailwind class patterns, state visuals (loading/error/empty/edit), and the interactive element catalogue before building or modifying any component.
