# Architecture & Portfolio Roadmap

> Current as of 2026-06-30. This is a living engineering roadmap for
> `premgautam.me`, focused on improvements that make the site stronger as a
> portfolio and better as a learning project.

## Current Baseline

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.
- Static portfolio content lives in `data/projects.ts` and
  `common/constant/*`.
- Project pages are statically generated from typed project data.
- Design-system guidance lives in `DESIGN.md`.
- Env validation is centralized in `lib/env.ts`.
- External calls use `fetch` / `resilientFetch`; `axios`, `moment`,
  `supercons`, Headless UI, and Emotion have already been removed.
- Image config already enables AVIF and WebP in `next.config.mjs`.
- Bundle analysis is available with `pnpm analyze`.

## Recently Completed

- Reworked public project data into mini case studies.
- Replaced placeholder project images with public-safe project mockups.
- Project detail pages now render role, problem, build, constraints, outcome,
  proof points, highlights, stack, and links.
- Replaced the pirate AI prompt with a public-safe portfolio assistant prompt.
- Added current flagship work: Pikeah, Maison & Architecture, CRO Scan, Netra
  Guardian, ZyFlow, aaza, and this portfolio.

## Highest-Value Backlog

### 1. API Contracts And Abuse Protection

Current gap: `/api/chat` still reads raw JSON and has no rate limit.

Do:
- Add Zod schemas for route inputs.
- Add shared response helpers for success and error envelopes.
- Rate-limit `/api/chat` by IP or session.
- Return clear validation errors instead of generic failures.

Why:
- This turns the AI endpoint from a demo route into a safer production-style
  route.

### 2. AI Assistant V2

Current gap: the command-palette assistant has a better prompt, but no retrieval
or streaming yet.

Do:
- Move to streaming responses.
- Add a tiny public-context retrieval layer over `data/projects.ts`,
  `common/constant/careers.ts`, `common/constant/credentials.ts`, and sanitized
  public facts.
- Keep private Obsidian notes out of the public prompt unless they are
  explicitly sanitized into repo content.

Why:
- The assistant should answer accurately about the portfolio without leaking
  private career notes.

### 3. Dashboard Server Rendering

Current gap: GitHub, WakaTime, and now-playing widgets still fetch client-side.

Do:
- Move dashboard data loading toward Server Components where practical.
- Use `Suspense`, route `loading.tsx`, and segment `error.tsx`.
- Keep client components only where animation or live interactivity requires
  them.

Why:
- This improves perceived performance and demonstrates modern App Router data
  patterns.

### 4. Tests And CI Depth

Current gap: Biome runs in CI, but there is no test runner.

Do:
- Add Vitest for service/date/SEO/content helpers.
- Add one Playwright smoke test: homepage loads, project card opens, command
  palette opens.
- Keep CI fast: lint, typecheck, unit tests, one smoke test.

Why:
- The site is now content-driven enough that regressions are easy to catch with
  a small test suite.

### 5. Content Pipeline

Current gap: the blog route is intentionally empty.

Do:
- Add MDX or a typed local-content pipeline.
- Start with posts already supported by the knowledge base:
  Pikeah release/reliability lessons, Netra Guardian system design, and the
  intern-to-lead full-cycle engineer story.
- Add RSS and include posts in the sitemap.

Why:
- Writing turns private learning logs into public proof of engineering judgment.

## Maintenance Notes

- Keep `README.md` in sync with the actual project. It should not carry old
  2023 TODO history or removed Prisma/PlanetScale claims.
- Keep `CLAUDE.md` aligned with real dependencies. If a dependency is removed,
  update the architecture notes in the same change.
- Treat the Obsidian SecondBrain as private source material. Only sanitized,
  intentional public facts should be copied into this repo.
- Prefer project-specific screenshots where public, and public-safe mockups
  where product UIs are private.
