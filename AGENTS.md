# AGENTS.md - Solarium

## Project Overview

Solarium is a **Solar System Explorer** SPA built with **React 19**, **TypeScript ~5.9**, **Vite 7**, and **Tailwind CSS 4**. It renders planets in a 3D CSS perspective with navigation, descriptions, and a slide-in info panel.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check (tsc -b) + production build (vite build)
npm run lint      # Run ESLint on **/*.{ts,tsx}
npm run preview   # Preview production build locally
```

**No test framework is configured.** There are no test files, no test dependencies, and no test scripts.

## Architecture

```
src/
  main.tsx              # Entry point (createRoot → #root)
  App.tsx               # Root component, state management, layout
  constants.ts          # PlanetData/Moon interfaces + PLANETS data array
  index.css             # Tailwind import, custom @keyframes, base styles
  components/
    Background.tsx      # Star field + nebula gradient
    Navigation.tsx      # Left-side planet selection menu
    Planet.tsx          # 3D planet sphere with moons, description, "Read More"
    InfoPanel.tsx       # Slide-in detail panel
  lib/
    utils.ts            # cn() helper (clsx + tailwind-merge)
public/                 # Static planet textures (.webp)
```

## Code Style

### Imports
- Use `import type` for type-only imports (enforced by `verbatimModuleSyntax`)
- React imports first, then local imports (relative paths with `./` or `../`)
- Default exports for components, named exports for utilities/types

### Formatting
- **Indentation:** 4 spaces
- **Semicolons:** Required at end of statements
- **Quotes:** Single quotes for strings/imports, double quotes for JSX attributes and Tailwind class strings
- **File naming:** PascalCase for components (`Planet.tsx`), camelCase for utilities (`utils.ts`)

### TypeScript
- **Strict mode** enabled
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` all true
- `target: ES2022`, `module: ESNext`, `moduleResolution: bundler`
- Use `FC<Props>` for component typing with explicit interface definitions
- `noEmit: true` — Vite handles compilation

### Naming Conventions
- **Components:** PascalCase (`Planet`, `InfoPanel`)
- **Interfaces/Types:** PascalCase (`PlanetData`, `Moon`, `PlanetProps`)
- **Variables/Functions:** camelCase (`selectedPlanetIndex`, `handlePlanetSelect`)
- **Constants:** UPPER_SNAKE_CASE (`PLANETS`)
- **Event handlers:** `handle` prefix (`handlePlanetSelect`)

### Styling
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (no PostCSS config needed)
- Use `cn()` from `src/lib/utils.ts` for conditional class merging
- Custom `@keyframes` defined in `src/index.css`
- Inline `style` props for dynamic values (transforms, opacity, box-shadow)

### Error Handling
- No explicit error boundaries configured
- State defaults used (e.g., `useState(2)` for Earth, `useState<PlanetData | null>(null)`)
- Use `Math.max(0, value)` patterns for safe numeric clamping

## ESLint Config (`eslint.config.js`)

Flat config format extending:
- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-react-hooks` recommended
- `eslint-plugin-react-refresh` (Vite HMR support)

## Notes

- No Prettier, EditorConfig, or cursor/copilot rules exist
- No test framework — if adding tests, Vitest is the natural fit for Vite projects
- `animejs` is installed but not currently used in components
- Planet/moon/star textures are served from `/public/` as `.jpg` files
- `PlanetData` includes a `bodyType` field: `'star' | 'planet' | 'moon' | 'dwarf'`
- Bodies are ordered: Sun, Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Ceres, Haumea, Makemake, Eris
