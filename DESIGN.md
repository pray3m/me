# Design System — premgautam.me

> **Name:** premgautam.me design system · **Version:** 0.1 · **Source of truth:**
> [app/globals.css](app/globals.css)
>
> The visual contract for the portfolio. A calm, "papered" surface with one
> token system, so dark mode, theming, and polish are automatic rather than
> hand-tuned per component. Read this before touching UI.
>
> **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · shadcn/ui (new-york) on
> Base UI · Biome.

---

## Design tokens

Everything visual derives from a small set of tokens. Reference them; don't
reinvent their values inline.

**Color** — oklch semantic tokens, one value per theme, auto-switched by `.dark`:

| Token | Light | Dark | Use for |
|---|---|---|---|
| `background` / `foreground` | `oklch(1 0 0)` / `oklch(.145 0 0)` | `oklch(.145 0 0)` / `oklch(.985 0 0)` | page surface / primary text |
| `card` · `popover` (`-foreground`) | `oklch(1 0 0)` | `oklch(.205 0 0)` | raised surfaces |
| `primary` (`-foreground`) | `oklch(.205 0 0)` | `oklch(.922 0 0)` | high-emphasis buttons |
| `secondary` · `accent` · `muted` | `oklch(.97 0 0)` | `oklch(.269 0 0)` | quiet fills |
| `muted-foreground` | `oklch(.41 0 0)` | `oklch(.829 0 0)` | secondary text |
| `border` · `input` | `oklch(.922 0 0)` | `oklch(1 0 0 / 10%)` | hairlines, fields |
| `ring` | `oklch(.708 0 0)` | `oklch(.556 0 0)` | focus rings |
| `destructive` | `oklch(.577 .245 27)` | `oklch(.704 .191 22)` | errors |

**Radius** — base `--radius: 0.625rem` (10px), scaled `sm … 4xl`.
**Type** — one family, **Onest** (`--font-sans`). Tailwind step scale.
**Spacing** — Tailwind 4px scale; rhythm in §Layout.

---

## Overview

Four principles, in priority order:

1. **Tokens over literals.** A raw `text-neutral-600 dark:text-neutral-400` is a
   bug, not a style — it's `text-muted-foreground`. Literals are reserved for
   true brand accents (§Colors).
2. **Calm and papered.** Content floats on a subtle paper texture. Surfaces are
   quiet (`muted`, hairline borders, soft shadows); color is used sparingly for
   meaning, not decoration.
3. **Restraint in motion.** Animate to clarify a change, never to fill space.
4. **Accessible by default.** Visible focus, real semantics, contrast, and
   labels are part of "done," not a later pass.

---

## Colors

Surfaces and text use **semantic tokens only**. Each token carries both themes,
so a `dark:` on a color is the signal you reached for a raw value you shouldn't.

| Need | Class |
|---|---|
| Page surface / primary text | `bg-background` · `text-foreground` |
| Raised surface (card, panel, popover) | `bg-card` / `bg-popover` · `*-foreground` |
| Secondary text | `text-muted-foreground` |
| Quiet fill / hover fill | `bg-muted` · `bg-secondary` · `bg-accent` |
| Hairline / divider | `border-border` |
| Input | `bg-input` · `border-input` |
| Focus ring | `ring-ring` |
| Error | `text-destructive` · `bg-destructive` |

**Allowed literals** (brand accents that must read identically in both themes):
the `green-400/500` "available / now-playing" strip, the `#fffd00` route
progress bar, `react-icons` brand marks (monochrome marks like Next.js / GitHub
correctly inherit `text-foreground`), and syntax-highlighting colors.

---

## Typography

- **Onest** is the only family — body, UI, and headings. It's applied on
  `<body>`; never set it explicitly. (Sora and Plus Jakarta were removed: loaded
  but unused. Re-add a display face in [fonts.ts](common/styles/fonts.ts) only
  if the system genuinely needs one.)
- Weights: 400 / 500 / 600 / 700.

**Scale — use the steps, not arbitrary px:**

| Role | Class |
|---|---|
| Page title (h1) | `text-2xl font-semibold` |
| Section title (h2) | `text-xl font-medium` |
| Card title | `text-base` / `md:text-lg font-medium` |
| Body | inherited (`leading-1.65` from `body`) |
| Secondary / meta | `text-sm text-muted-foreground` |
| Caption / label | `text-xs` |

Map any arbitrary size: `15px → text-sm`, `17–18px → text-lg`, `10px → text-xs`.
Headings always go through `PageHeading` / `SectionHeading` / `SectionSubHeading`
— never a hand-rolled `<h1>` with ad-hoc classes.

---

## Layout

- **Page shell:** `app/<route>/page.tsx` → `Container` → `PageHeading` → a
  feature component from `modules/`. Keep route files thin.
- **`Container`** owns the frame (`mt-20 mb-10 p-8 lg:mt-0`); don't re-pad on top.
- **Three-step rhythm:** tight groups `gap-2/3`, related blocks `space-y-4`,
  sections `space-y-6`. Pick one rhythm per page and hold it.
- **Grids:** cards in `grid gap-5 sm:grid-cols-2`.
- **Breakpoints:** Tailwind defaults; `lg` (1024px) is the desktop/sidebar pivot.

---

## Elevation & depth

Prefer **hairline + soft shadow** over heavy borders.

- Cards: `border border-border` + `shadow-sm`.
- Floating surfaces (dialog, command palette): `shadow-2xl` + `ring-1
  ring-foreground/10` for a crisp edge.
- Modal backdrop: `bg-background/70 backdrop-blur-sm` — strong enough to focus
  attention.
- **Paper texture:** `--paper-tint` gradient on `<body>` + a tiled
  `bg-pattern.png` via `body::before` (opacity/blend differ per theme). Keep
  content on `bg-background`/`bg-card` so it reads above the texture.

---

## Shapes

Radius is consistent **per element type** — hold this line.

| Element | Radius |
|---|---|
| Cards, panels, callouts | `rounded-xl` |
| Command palette / large surfaces | `rounded-2xl` |
| Buttons, inputs, list items | `rounded-lg` |
| Badges, pills, status dots | `rounded-full` |
| Inline code, tiny chips | `rounded-sm` / `rounded-md` |

---

## Motion

Durations `150–300ms`, `ease-out`. Apply `transition-*` at the element's base, not
inside a `lg:` variant, so mobile gets it too.

- **Scroll reveal:** AOS via `data-aos` on containers.
- **Component animation:** `framer-motion` through **`LazyMotion` + `m.*`** with
  `domAnimation` (provider in [app/providers.tsx](app/providers.tsx)). Never
  import `motion` directly — it ships the full engine.
- **Marquee:** `--animate-marquee` (skills row).
- **Theme switch:** circular view-transition "bubble" wipe (globals.css).
- Honor `prefers-reduced-motion` for non-essential motion.

---

## Components

Three buckets — keep them separate:

- **`components/ui/`** — shadcn primitives (generated; add via CLI), Base UI under
  the hood.
- **`components/ds/`** — the project's own wrappers (`Container`, `Button`,
  `Badge`, `PageHeading`, `SectionHeading`, `Card`…). **Prefer these in
  app/module code** — they're the leverage points: fix a token here and every
  page benefits.
- **`components/blocks/`** — composite widgets (CommandPalette, NowPlaying,
  MarkdownRenderer, ThemeToggle…).
- **`components/layout/`** — the sidebar shell.

Component states:

- **Buttons** are `bg-primary text-primary-foreground` (default) with
  `hover:bg-primary/90` and `hover:scale-[101%]`.
- **Focus:** every interactive element shows `focus-visible:ring-2
  focus-visible:ring-ring`. Don't rely on hover alone.
- **Loading:** data-driven components render a `Skeleton` while fetching and a
  quiet error line on failure — never a blank flash or layout shift.

---

## Voice & content

- **Sentence case** for body and microcopy; concise, free of filler.
- Error messages state what happened in plain language ("Couldn't load
  contributions right now."), not stack traces or "Error".
- Buttons are an action + noun ("Contact me", "View all articles").

---

## Do's & don'ts

- **Do** reach for a token first; if you're writing a `dark:` color, stop.
- **Do** route headings through the `ds` heading components.
- **Do** give icon-only controls an `aria-label` and external links
  `rel="noopener noreferrer"`.
- **Don't** hardcode `neutral/gray/zinc` for surfaces or text.
- **Don't** introduce a new radius or font size for a one-off — use the scale.
- **Don't** communicate state by color alone (pair the green dot with text).
- **Don't** add a CSS-in-JS engine or a second font for a single component.
