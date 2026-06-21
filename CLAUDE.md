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
- **[services/](services/)** — external API clients (axios/fetch): `chatgpt` (OpenAI), `github`, `wakatime`, `spotify`, `pray3m` (backend at `NEXT_PUBLIC_API`), plus `fetcher` (the SWR fetcher). Keep all third-party calls here.
- **[app/api/](app/api/)** — route handlers that wrap `services/` and add caching (`Cache-Control: s-maxage / stale-while-revalidate`). The data flow is: client → SWR `fetcher` → `app/api/*` handler → `services/*` → external API.
- **[common/](common/)** — `constant/` (static content like careers, credentials, menu, stacks), `context/` (React contexts), `lib/`, `styles/fonts.ts`, `types/`.
- **[data/projects.ts](data/projects.ts)** — static project content; drives `generateStaticParams` for `/projects/[slug]`.

### Providers & global features

[app/providers.tsx](app/providers.tsx) (`ProvidersSandwich`) nests: `ThemeProvider` (next-themes, class-based dark mode) → `CommandPaletteProvider` → `SWRConfig` → `AOSInit` + route progress bar + `CommandPalette`. The **command palette (cmd+k)** is the AI feature: it POSTs to `/api/chat`, which calls OpenAI via `services/chatgpt`. Scroll-reveal animations use AOS via `data-aos` attributes on page containers. Analytics is Umami (script in [app/layout.tsx](app/layout.tsx)).

## Environment

Copy [.env.example](.env.example). Keys: `NEXT_PUBLIC_API`, `SITE_URL`, `SPOTIFY_*`, `WAKATIME_API_KEY`, `GITHUB_READ_USER_TOKEN`, `OPENAI_API_KEY`. The `/api/chat` function has raised memory/duration in [vercel.json](vercel.json).

## Commit messages
Conventional commits with a creative twist. Dont add claude as a co-author.

## Gotchas

- **README is stale.** It claims Prisma + Vercel Postgres and lists 2023 TODOs; there is no Prisma dependency or schema in the repo, and the `db` tsconfig alias points at a missing file. Treat data as static (`data/`, `common/constant/`) unless code proves otherwise.
- `components/ui` (shadcn, generated) vs `components/ds` (hand-written wrappers) are easy to confuse — check which one a name lives in before editing.
