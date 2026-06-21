# Architecture & Learning Roadmap (TEMPORARY)

> Scratch doc capturing an architectural review of this portfolio + a learning-oriented
> improvement roadmap. Goal: make the site better **and** deliberately learn full-stack
> system-design patterns. Delete or fold into proper docs once acted on.
>
> Generated: 2026-06-21 · Branch: `main`

---

## What's already solid (don't touch)

The structure is genuinely good. Recommendations below are about **leveling up**, not fixing rot.

- Real layered architecture: `app/` thin shells → `modules/` features → `components/{ui,ds,blocks}` → `services/` → `app/api/`.
- ~83% Server Components (34 of 41); only 7 client components.
- SSG for `/projects/[slug]` via `generateStaticParams`.
- Fully typed static content (`data/projects.ts`, `common/constant/*`, `common/types/*`) — no untyped JSON.
- Edge cache headers on API routes (`s-maxage=60, stale-while-revalidate=30`).
- Tooling discipline: Biome + Husky + commitlint + lint-staged.

---

## Highest-leverage gaps (ranked by learning value)

### 1. ✅ DONE — No env validation → pattern: *validate at the boundary / fail-fast*
- **Now:** only `services/github.ts:5-9` throws on a missing token. The other four services read `process.env.X as string` and fail at runtime with cryptic errors.
- **Do:** one Zod-parsed env schema (Zod already installed).
  ```ts
  // /lib/env.ts
  const env = z.object({ OPENAI_API_KEY: z.string().min(1), /* ... */ }).parse(process.env)
  ```
- **Learn:** parse-don't-validate; one typed gateway gives autocomplete + guarantees downstream.
- **Effort:** ~1 hr. **Payoff:** high habit value.
- **Shipped (`41400ab`):** `lib/env.ts` server/client-split Zod gateway

### 2. API routes: no input validation, no shared error contract → pattern: *contract-first API design*
- **Now:** `/api/chat` reads `{ prompt }` with zero validation; `/api/landing` passes a raw query string straight to the backend. Every route hand-rolls its own error shape.
- **Do:** Zod schemas for request bodies + shared `apiError()` / `apiSuccess()` envelope helpers.
- **Learn:** the discipline that separates hobby APIs from production ones.

### 3. AI feature rebuild → biggest missed learning opportunity (HIGH RESUME VALUE)
- **Now:** command palette (`components/blocks/CommandPalette.tsx`) does a **non-streaming** axios POST to `gpt-5-nano` (`services/chatgpt.ts:11`), no rate limiting, no abuse protection, hardcoded "talk like a pirate" system prompt. Works, but leaves the most relevant skills on the table.
- **Do (in order):**
  1. **Vercel AI SDK** (`streamText` + `useChat`) — replaces manual axios/Typewriter with real token streaming. *The* in-demand skill.
  2. **Rate limiting** — Upstash Redis (`@upstash/ratelimit`) keyed by IP. Teaches distributed rate limiting (classic system-design topic).
  3. **Tiny RAG** — embed `data/projects.ts` + careers + credentials so the assistant answers from real facts, not a static prompt. Demonstrates embeddings + vector search + retrieval. Single most impressive add.
- **Available helpers:** `ai-sdk` skill, `vercel:ai-gateway` skill.

### 4. No `loading.tsx` / `error.tsx` / Suspense → learn React 19 + streaming SSR
- **Now:** dashboard components (`Contributions.tsx`, `CodingActive.tsx`) fetch client-side via SWR → waterfall, no SSR for that data. Zero error boundaries; only `app/not-found.tsx` exists.
- **Do:**
  - Move dashboard fetching to **Server Components + `Suspense` streaming** (fetch GitHub/WakaTime server-side, stream in). Kills client waterfall.
  - Add `error.tsx` + `loading.tsx` per route segment.
  - Next.js 16 **Cache Components** (`use cache`, `cacheLife`, `cacheTag`) to replace manual `s-maxage` headers with tag-based invalidation.
- **Available helper:** `vercel:next-cache-components` skill.

### 5. Zero tests → learn the testing pyramid
- **Now:** no test runner at all.
- **Do:** **Vitest** unit tests for `services/*` (mock fetch, assert normalization logic) + **Playwright** for one E2E happy-path (load home → open cmd+k → get reply). Wire into existing `.github/workflows`.
- **Learn:** CI gating.

---

## Performance & loading roadmap (active focus)

> Goal: smaller client bundle, faster first paint, fewer round-trips. Findings below are
> from a real audit of the current tree (deps, `use client` map, fonts, image config) — not
> generic advice. Ranked by **effort-to-payoff**. Measure first (P4) so wins are provable.

### 📊 Baseline (measured 2026-06-21, `pnpm analyze` → `.next/analyze/client.html`)
Top client-bundle `node_modules` by gzip (webpack-analyzer estimate; relative sizes are the signal):

| KB (gzip) | Package | Verdict |
|---:|---|---|
| ~176 | **`supercons`** | 🔴 **biggest win.** `import Icon from "supercons"` embeds the *entire* icon catalog as inline SVG — no tree-shaking, all 9 import sites pay full cost. Replace with `lucide-react`. |
| ~45 | `react-syntax-highlighter` (+8 `refractor`) | 🟢 OK — already `dynamic()`-loaded via `CodeBlock`, uses `PrismLight` + 5 registered languages. Leave. |
| ~53 | `framer-motion` (+`motion-dom`) | 🟡 6 files; consider `LazyMotion`/`m` or dropping where a CSS transition suffices. |
| ~32 | `@headlessui/react` | 🟡 only `CommandPalette`; migrate to `@base-ui/react` (already a dep). |
| ~18 | `moment` | 🟡 4 files; replace with `Intl` (gzip cost lower than feared, but it's pure dead-weight vs native). |
| ~16 | `axios` | 🟡 leaks to client via `sendMessage`; swap for `fetch`, drop dep. |
| ~9 | `typewriter-effect` | 🟡 cmd-palette only; small. |
| ~6 | `react-icons` | 🟢 **fine** — tree-shakes well. Earlier "3 icon libs" worry was wrong; the problem is `supercons`, not this. |

`@base-ui/react` (~98) is the new primitive lib and used widely — not removable, just noted. Re-run `pnpm analyze` after each change to confirm deltas.

> ⚠️ **Read the report by import-shape, not raw size.** The analyzer prints `No bundles were parsed`, so it only has `statSize` (raw source in the module graph, *before* minify/tree-shake) — absolute KB is unreliable. By `statSize` alone, `react-icons` looks like the worst offender (~11.8 MB!), but that's the **whole library source**; named imports (`react-icons/fa`) tree-shake to ~nothing → **not a problem**. The rule: *named-import barrels* (`react-icons`, `lucide`, `@base-ui`, `date-fns`) are over-counted and mostly free; *default/monolithic imports* (`supercons`, `moment`, `axios`) ≈ what actually ships → those are the real targets. For trustworthy absolute numbers use the Turbopack-native `pnpm next experimental-analyze` (matches the prod bundler).

### P0 — Dead weight: delete unused deps (zero risk, pure win)
These are in `package.json` / the source tree but imported **nowhere** in `app|modules|components`:
- **`date-fns`** — 0 usages. Remove from deps.
- **`recharts`** — only reachable via `components/ui/chart.tsx`, which nothing imports. Delete the file + drop `recharts` (heavy, ~else-unused charting lib).
- **`embla-carousel-react`** — only via `components/ui/carousel.tsx`, imported nowhere. Delete file + dep. (Live carousel is `react-slick` in `ImageCarousel.tsx` — leaves one carousel lib, not two.)
- **`jakartaSans`** font — declared in `common/styles/fonts.ts` but never applied (layout uses only `soraSans` + `onestSans`). Remove the declaration.
- **Learn:** dead-code/dep hygiene; `knip` or `depcheck` to automate finding these.
- **Effort:** ~20 min. **Payoff:** immediate install-size + tree shrink, no behavior change.

### P1 — Client-bundle diet (the real first-load weight, ordered by measured payoff)
1. ✅ **DONE — `supercons` → `lucide-react` (~176 KB)** (`8a4da0b`). All 9 sites migrated; brand/social icons routed to `react-icons/fa6`; `supercons` dep removed. Single largest win, confirmed gone from the bundle.
2. ✅ **DONE — `@headlessui/react` → shadcn `Command` + base-ui `Dialog` (~32 KB)** (`8a4da0b`, palette later redesigned in `7f7f3b4`). `@headlessui` dep removed; cmdk was already bundled.
3. ✅ **DONE — `framer-motion` slimming** (`8a4da0b`). Wrapped once in `LazyMotion` + `domAnimation` (providers); all 5 `motion.*` → `m.*`. (Cleared the React Doctor `use-lazy-motion` rule too.)
4. ⏳ **`axios` → `fetch` (~16 KB).** Still the last MONOLITH. `services/chatgpt.ts` imports axios, pulled to client via `sendMessage` (just `axios.post("/api/chat")`). Swap for `fetch`, migrate server-side `wakatime.ts`, drop the dep.
5. ✅ **DONE — `moment` → native `Intl`** (`8a4da0b`). Replaced with `lib/date.ts` (format/relative-time/duration); `moment` dep removed.
6. ⏳ **`@emotion/react` + `@emotion/styled` → Tailwind.** Still used only in `ThemeToggleButton.tsx`. A runtime CSS-in-JS engine for one button — rewrite with Tailwind, drop both.
- **Not worth it:** `react-icons` measured at ~6 KB (tree-shakes fine) — leave it. The earlier "3 icon libs" framing was wrong; the real culprit was `supercons`.

### P2 — ✅ DONE — Fonts (`8a4da0b` + later)
- Dropped **Sora** and **Plus Jakarta Sans** entirely (loaded but used in ~3 spots / never; `fonts.ts` is now Onest-only). Weights trimmed to 400–700; `display: "swap"`. One font family ships now instead of three.

### P3 — Config-level wins (`next.config.mjs`)
- **`images.formats: ["image/avif", "image/webp"]`** — not set today; AVIF typically cuts image bytes 20–50% over the default.
- **`experimental.optimizePackageImports`** for `lucide-react`, `react-icons`, `recharts` (until removed), `date-fns`-style barrels → smaller, faster cold builds and bundles.
- **Umami `<Script>`** is `afterInteractive`; `lazyOnload` defers analytics off the critical path.
- **AOS** (`common/lib/aos.tsx`) ships JS + a CSS file and runs scroll listeners app-wide — consider CSS/`IntersectionObserver` reveal instead, or scope it to pages that need it.

### P4 — Measure (do this first, then re-measure after each P-tier)
- ✅ **`@next/bundle-analyzer` wired up.** `pnpm analyze` (`ANALYZE=true next build --webpack`) emits `.next/analyze/{client,nodejs,edge}.html`. Baseline captured above — re-run after each P1 item to confirm the delta. Note: the analyzer is webpack-only, so `--webpack` is required (Next 16 builds with Turbopack by default, under which the plugin is a no-op).
- **Lighthouse CI** (or `unlighthouse`) wired into `.github/workflows` → track LCP / TBT / CLS over time so regressions are visible. *(not yet done)*
- Cross-ref **gap #4** (dashboard → Server Components + Suspense): moving `Contributions`/`CodingActive` server-side also strips SWR + their client fetching JS — a perf win, not just an architecture one.

---

## ✅ UI/UX tokenization overhaul (DONE — 2026-06-22)

A full design-consistency pass. Codified in [DESIGN.md](DESIGN.md).
- **Colors tokenized:** ~150 hardcoded `neutral/gray` refs (and 67 redundant `dark:` overrides) → semantic tokens (`text-muted-foreground`, `bg-muted`, `border-border`, …) across ~25 files. Brand literals (green strip, syntax colors, brand icons) intentionally preserved.
- **Design-system primitives fixed** (highest leverage): `ds/page-heading`, `ds/section-heading`, `ds/button` now token-based (`bg-primary` CTA).
- **Command palette redesigned** (`7f7f3b4`): strong backdrop, elevated panel, tall input.
- **Type scale:** arbitrary `text-[Npx]` → scale steps.
- **A11y:** `aria-label`s on icon-only controls (now-playing, mobile menu, theme toggle), `focus-visible` rings on menu items, `rel="noopener noreferrer"` on external links.
- **Loading states:** dashboard `Contributions`/`CodingActive` now show a `Skeleton` while fetching + a quiet error line (no more "No Data" flash / layout shift).
- **Dead code removed:** template `alt="Ryan Aulia"` block, `.b` debug CSS class.
- **Open follow-up:** `@emotion` still in `ThemeToggleButton` (P1 #6); a few hover-only Calendar tooltips lack keyboard access.

---

## System-design patterns worth deliberately adding

| Pattern | Where it fits | Why it grows you |
|---|---|---|
| Resilience: timeout + retry | every `services/*` call has no timeout | `AbortController` + exponential backoff |
| Caching layers | CDN-only today | add Vercel Runtime Cache / Redis between route → service; learn cache invalidation |
| Repository pattern | `data/projects.ts` is static | abstract content behind an interface → swapping to DB/CMS is a one-file change |
| Real database | content is static today (`data/`) | Neon Postgres + Prisma for blog views/post storage; proves full-stack |
| Observability | only Umami analytics | structured logging + error tracking (Sentry) |

---

## The blog: best full-stack showcase
Currently an empty placeholder (`modules/blog/components/BlogList.tsx` has `BLOG_DATA = []`, no `app/blog/[slug]` route, no MDX). Building it properly touches the whole stack:
- **MDX** (`next-mdx-remote` / `@next/mdx`) + `gray-matter` → content pipelines.
- **Postgres view counts** → read/write DB + optimistic UI.
- **`generateStaticParams` + ISR** → extend the projects pattern.
- **RSS/sitemap** → already have `next-sitemap`; add a feed.

---

## Recommended sequencing (steepest learning curve)
1. Env validation with Zod (1 hr, instant good-habit).
2. Migrate AI feature to Vercel AI SDK with streaming + rate limiting (highest resume value).
3. Add RAG over own data (most impressive, deepest learning).
4. Server-side dashboard with Suspense streaming + error boundaries (modern Next.js mastery).
5. Real blog with Postgres + MDX (proves full-stack end-to-end).
6. Vitest + Playwright + CI (engineering maturity).

---

## Key file references
- AI feature: `components/blocks/CommandPalette.tsx`, `services/chatgpt.ts`, `app/api/chat/route.ts`
- Env reads (unvalidated): `services/{chatgpt,spotify,wakatime,pray3m}.ts`
- Env validation (the one good example): `services/github.ts:5-9`
- Client-fetch dashboard: `modules/dashboard/components/{Contributions/Contributions,CodingActive/CodingActive}.tsx`
- Static content: `data/projects.ts`, `common/constant/*`, `common/types/*`
- Blog placeholder: `modules/blog/components/BlogList.tsx`
- Providers nesting: `app/providers.tsx` (ThemeProvider → CommandPaletteProvider → SWRConfig → AOSInit + progress + CommandPalette)
