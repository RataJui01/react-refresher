# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

There are no tests configured yet.

## Architecture

**Stack:** React 19 + Vite 8 + Tailwind CSS 4

**Key details:**
- Tailwind is imported via `@import "tailwindcss"` in `src/index.css` (Tailwind v4 syntax — no `tailwind.config.js`)
- **React Compiler** is enabled via Babel plugin (`babel-plugin-react-compiler`) — this auto-memoizes components and hooks, so manual `useMemo`/`useCallback` are generally unnecessary
- ESLint uses the **flat config** format (`eslint.config.js`), not `.eslintrc`
- Prettier is configured with `prettier-plugin-tailwindcss` for automatic class sorting (references `src/index.css` as the Tailwind entry)
- No routing or state management library is installed

**Entry points:**
- `index.html` → `src/main.jsx` → `src/App.jsx`
- `src/main.jsx` wraps `<App />` in `<StrictMode>` and mounts to `#root`
