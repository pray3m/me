# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site `premgautam.me` — Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Package manager is **pnpm** (Node 24). No test runner is configured.

## Commands

```bash
pnpm dev           # next dev --turbo
pnpm build         # next build (postbuild runs next-sitemap)
pnpm start         # serve production build

pnpm lint          # biome check .            (lint + format check)
pnpm lint:fix      # biome check --write .     (autofix + format)
pnpm lint:strict   # biome ci .                (CI mode, used in .github/workflows/lint.yml)
pnpm format        # biome format --write .
pnpm typecheck     # tsc --noEmit --incremental false
```

Tooling is **Biome**, not ESLint/Prettier. Husky `pre-commit` runs `lint-staged` (biome on staged files); `commit-msg` runs commitlint (Conventional Commits + a custom `vercel` type). Match Biome's enforced style: no semicolons, double quotes, 2-space indent, 80-col width, es5 trailing commas. `noExcessiveCognitiveComplexity` is an **error**, and Tailwind classes inside `cn`/`cva`/`cx`/`clsx`/`twMerge` must be sorted (autofix with `pnpm lint:fix`).

## Path aliases

`@/*` maps to the repo root (see [tsconfig.json](tsconfig.json)) — e.g. `@/components`, `@/modules`, `@/services`, `@/lib/utils`, `@/common`, `@/data`, `@/hooks`. (There is also a stale `db` alias pointing at a nonexistent `common/lib/prisma`; ignore it — see Gotchas.)

## Architecture

Layered by responsibility. Adding a page typically touches an `app/` shell + a `modules/` component, reusing primitives from `components/`.

- **[app/](app/)** — App Router. Route files (`page.tsx`) are thin shells: they set `metadata`, wrap content in `@/components/ds/container` + `page-heading`, and render a feature component from `modules/`. Don't put feature logic here.
- **[modules/](modules/)** — feature UI grouped by domain (`home`, `about`, `blog`, `dashboard`, `projects`, `contact`, `cmdpalette`), each as `modules/<feature>/components/*.tsx`. This is where page-specific composition lives.
- **[components/](components/)** — three distinct buckets, keep them separate:
  - **[components/ui/](components/ui/)** — shadcn/ui primitives (new-york style, see [components.json](components.json)). Generated; add via the shadcn CLI rather than hand-authoring.
  - **[components/ds/](components/ds/)** — the project's own design-system wrappers (`container`, `page-heading`, `button`, etc.) with a barrel [index.ts](components/ds/index.ts). Prefer these in app/module code.
  - **[components/blocks/](components/blocks/)** — composite app widgets (`CommandPalette`, `NowPlayingBar`, `MarkdownRenderer`, `ThemeToggle`…).
  - **[components/layout/](components/layout/)** — the sidebar shell wrapping every page.
- **[services/](services/)** — external API clients: `chatgpt` (OpenAI), `github`, `wakatime`, `spotify`, plus `fetcher` (a plain `fetch` + `res.json()` helper). Keep all third-party calls here.
- **[app/api/](app/api/)** — only two handlers: `chat` and `now-playing`. There are **two** data-fetching shapes, not one:
  - Client-side (`now-playing`): client → `fetcher` via react-query → `app/api/now-playing` → `services/spotify`.
  - Server-side (dashboard): the `github` and `wakatime` services are called **directly from Server Components** ([Contributions](modules/dashboard/components/Contributions/Contributions.tsx), [CodingActive](modules/dashboard/components/CodingActive/CodingActive.tsx)) with no API route in between. Don't add one out of habit.
- **[common/](common/)** — `constant/` (static content like careers, credentials, menu, stacks), `context/` (React contexts), `lib/`, `styles/fonts.ts`, `types/`.
- **[data/projects.ts](data/projects.ts)** — static project content; drives `generateStaticParams` for `/projects/[slug]`.

### Providers & global features

[app/providers.tsx](app/providers.tsx) (`ProvidersSandwich`) nests: `LazyMotion` (framer-motion, `domAnimation` features only) → `MotionConfig` (`reducedMotion="user"`) → `ThemeProvider` (next-themes, class-based dark mode) → `CommandPaletteProvider` → `QueryClientProvider` (@tanstack/react-query) + `CommandPaletteMount`.

The **command palette (cmd+k)** is the AI feature: it POSTs to `/api/chat`, which calls OpenAI via `services/chatgpt`. It is **lazily loaded** — `CommandPaletteMount` `dynamic()`-imports it and mounts it on first open, keeping ~400 KB of cmdk/dialog/AI code out of every route's initial bundle. Because of that the cmd+k / Escape listener lives in `CommandPaletteProvider`, **not** in the palette: if the palette owned its own shortcut, the shortcut wouldn't exist until something else had already opened it. Keep it that way.

Analytics is Umami (script in [app/layout.tsx](app/layout.tsx)).

## Environment

Copy [.env.example](.env.example). Keys: `SITE_URL`, `SPOTIFY_*`, `WAKATIME_API_KEY`, `GITHUB_READ_USER_TOKEN`, `OPENAI_API_KEY`. The `/api/chat` function has raised memory/duration in [vercel.json](vercel.json).

## Commit messages
- **Conventional Commits** (enforced by commitlint; custom `vercel` type also allowed) with a **slightly creative twist (dont be overly robotic)** — the subject line should be informative but have personality, not robotic.
- Subject: lowercase `type(scope): summary`, imperative mood, no trailing period.
- Add a short body only when the *why* isn't obvious from the subject.
- **Never** add Claude as a co-author or include any `Co-Authored-By`/"Generated with" trailer.
- Unless told otherwise, commit everything currently staged in a single commit; don't stage extra files yourself.

## Gotchas

- **There is no database.** All content is static (`data/projects.ts`, `common/constant/`). The `db` tsconfig alias still points at a nonexistent `common/lib/prisma` — ignore it, or delete it.
- **Never import from the `@/components/ds` barrel in page or module code.** [index.ts](components/ds/index.ts) re-exports Dialog, Select, DropdownMenu, Tabs, Tooltip, Accordion, Form (→ react-hook-form) and Sonner, so pulling one heading off it drags the whole design system into that route's bundle. Three such imports were costing the homepage 278 KB. Always import the leaf: `@/components/ds/section-heading`, not `{ SectionHeading } from "@/components/ds"`.
- `components/ui` (shadcn, generated) vs `components/ds` (hand-written wrappers) are easy to confuse — check which one a name lives in before editing.
- **The blog is a stub.** `BLOG_DATA` in [BlogList.tsx](modules/blog/components/BlogList.tsx) is an empty array rendering an empty state, and `/blog` is `noIndex`. There is no `blog/[slug]` route.
- There is **no AOS**, no SWR, and no route progress bar, whatever older docs or commit messages suggest. Scroll/motion work goes through framer-motion's `LazyMotion`.
