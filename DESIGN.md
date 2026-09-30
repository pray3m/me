# Design System — premgautam.com

> **Name:** premgautam.com design system · **Version:** 0.2 · **Source of truth:**
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
| `brand` (`-foreground`) | `oklch(.58 .2 255)` | `oklch(.65 .19 255)` | **the one accent** — primary action, links, focus |
| `destructive` | `oklch(.577 .245 27)` | `oklch(.704 .191 22)` | errors |

**Radius** — base `--radius: 0.625rem` (10px), scaled `sm … 4xl`.
**Type** — **Geist** (`--font-sans`) for everything; **Geist Mono** (`--font-mono`)
for tags, indices, code, and tabular figures. Tailwind steps plus one custom
step, `text-body` (15px / 24px). Eight roles, §Typography.
**Motion** — `--ease-snappy` (one curve) + 150/200/300ms tiers.
**Elevation** — `--shadow-card` / `--shadow-popover` / `--shadow-modal`.
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
| Focus ring | `ring-brand` (2px ring + offset) |
| **Accent** — the single most important action + state | `bg-brand` · `text-brand` |
| Error | `text-destructive` · `bg-destructive` |

**Use the accent sparingly** (Geist principle): the primary CTA, links, focus
rings, and the active nav state — not decoration. Everything else stays neutral.

**Allowed literals** (brand accents that must read identically in both themes):
the `green-400/500` "available / now-playing" strip, `react-icons` brand marks (monochrome marks like Next.js / GitHub
correctly inherit `text-foreground`), and syntax-highlighting colors.

---

## Typography

- **Geist** is the only sans family — body, UI, and headings. Applied on
  `<body>`; never set it explicitly. (Replaced Onest; Sora and Plus Jakarta were
  removed earlier: loaded but unused.)
- **Geist Mono** (`font-mono`) is for **small machine-ish text only**: tags,
  row indices (`01`, `02`…), code, and figures that should align (pair with
  `tabular-nums`). Never for sentences.
- Weights: **400** text · **500** titles, labels, links · **600** the page h1.
- Fonts are vendored and subset by `pnpm fonts:vendor`
  ([scripts/vendor-fonts.sh](scripts/vendor-fonts.sh)); the OG cards use static
  Geist faces from the same script.

**Roles — every piece of text is exactly one of these.** If a new element
doesn't fit a role, it's the element that's wrong, not the scale.

| Role | Classes | Size / line | Use for |
|---|---|---|---|
| Display | `text-2xl lg:text-3xl font-semibold tracking-tight` | 24–30 / 36 | the one page h1 (`Greeting`, `PageHeading`) |
| Title | `SectionHeading` → `text-2xl font-medium tracking-tight` | 24 / 32 | section h2 |
| Heading | `text-base font-medium leading-snug` | 16 / 22 | row, card, and callout titles (h3) |
| Lead | `text-base leading-7` | 16 / 28 | the intro paragraph under the h1 — once per page |
| Body | `text-body` (foreground) | 15 / 24 | descriptions, bullet lists, section intros |
| Meta | `text-sm text-muted-foreground` | 14 / 20 | roles, dates, locations, subtitles, secondary links |
| Label | `text-sm` (foreground) · `font-medium` for actions | 14 / 20 | row labels, buttons, "Read case study", "Show more" |
| Tag | `Tag` → `font-mono text-xs text-muted-foreground` | 12 / 16 | stack names, short chips |
| Eyebrow | `text-xs font-medium uppercase tracking-[0.18em] text-brand` | 12 / 16 | the role line above the h1 only |

Rules that keep it from drifting:

- **Body text is foreground, not muted.** Muted is for *meta* — metadata about
  the content, never the content itself.
- **No arbitrary sizes** (`text-[15px]`, `text-[10px]`…). 15px is `text-body`;
  anything else maps to the nearest step (`10–13px → text-xs`,
  `17–18px → text-lg`).
- **Tighten only large type.** `tracking-tight` on Display and Title; body and
  smaller stay at the font's default spacing.
- Headings go through `PageHeading` / `SectionHeading` / `SectionSubHeading` —
  never a hand-rolled `<h2>` with ad-hoc classes.

---

## Layout

- **Page shell:** `app/<route>/page.tsx` → `Container` → `PageHeading` → a
  feature component from `modules/`. Keep route files thin.
- **`Container`** owns the frame (`mt-20 mb-10 p-8 lg:mt-0`); don't re-pad on top.
- **Three-step rhythm:** tight groups `gap-2/3`, related blocks `space-y-4`,
  sections `space-y-6`. Pick one rhythm per page and hold it.
- **Panel list** (homepage Projects, Stack, "What I've been working on") — the
  default way to present a set of items:
  - one `rounded-xl border border-border` panel, `overflow-hidden`;
  - rows separated by `border-b` (`last:border-b-0`), hover `bg-accent/60`;
  - a leading `IconTile` column split from the content by a **dashed**
    `border-l border-dashed`; labelled rows use a fixed label column instead
    (`sm:grid-cols-[12rem_1fr]`, index in mono: `01 Frontend`);
  - row padding `p-4` (`py-3.5` for single-line collapsible rows);
  - expandable rows use the Base UI `Collapsible`; lists longer than four rows
    end in a centred "Show more" trigger in its own `border-t` footer.
- **Grids:** only where the image *is* the content (the `/projects` card grid):
  `grid gap-5 sm:grid-cols-2`.
- **Breakpoints:** Tailwind defaults; `lg` (1024px) is the desktop/sidebar pivot.

---

## Elevation & depth

Prefer **hairline + soft shadow** over heavy borders.

- Use the layered shadow tokens: `shadow-card` (raised cards), `shadow-popover`
  (menus), `shadow-modal` (dialogs) — subtle and multi-layer, not flat.
- Floating surfaces (dialog, command palette) add `ring-1 ring-foreground/10` for
  a crisp edge. In dark mode, lean on borders/rings (shadows fade on dark).
- Modal backdrop: `bg-background/70 backdrop-blur-sm` — strong enough to focus
  attention.
- **Paper texture:** `--paper-tint` gradient via `body::before` + a tiled
  160px `feTurbulence` noise data-URI via `body::after` (opacity/blend differ
  per theme). Keep
  content on `bg-background`/`bg-card` so it reads above the texture.

---

## Shapes

Radius is consistent **per element type** — hold this line.

| Element | Radius |
|---|---|
| Cards, panels, callouts | `rounded-xl` |
| Command palette / large surfaces | `rounded-2xl` |
| Buttons, inputs, list items | `rounded-lg` |
| Badges, pills, `Tag`, status dots | `rounded-full` |
| `IconTile`, logo tiles | `rounded-md` |
| Inline code, tiny chips | `rounded-sm` / `rounded-md` |

---

## Motion

One easing — **`ease-snappy`** (`cubic-bezier(0.175, 0.885, 0.32, 1.1)`, slight
overshoot) — and three duration tiers: **150ms** state · **200ms** popover ·
**300ms** modal. Apply `transition-*` at the element's base, not inside a `lg:`
variant, so mobile gets it too.

- **Reduced motion:** honored globally — a `prefers-reduced-motion` CSS reset
  plus `<MotionConfig reducedMotion="user">` for framer. Non-essential motion
  (marquee, reveals, the theme bubble) stops for users who ask.
- **Collapsibles:** height animates from Base UI's `--collapsible-panel-height`
  (`transition-[height] duration-200 ease-out`, `data-starting-style:h-0`,
  `data-ending-style:h-0`, `motion-reduce:transition-none`); chevrons rotate
  180°.
- **Component animation:** `framer-motion` through **`LazyMotion` + `m.*`** with
  `domAnimation` (provider in [app/providers.tsx](app/providers.tsx)). Never
  import `motion` directly — it ships the full engine.
- **Marquee:** `--animate-marquee` (client-logo row); pauses on hover.
- **Theme switch:** circular view-transition "bubble" wipe (globals.css).
- Honor `prefers-reduced-motion` for non-essential motion.

---

## Components

Three buckets — keep them separate:

- **`components/ui/`** — shadcn primitives (generated; add via CLI), Base UI under
  the hood.
- **`components/ds/`** — the project's own wrappers (`Container`, `Button`,
  `Badge`, `PageHeading`, `SectionHeading`, `Card`, `Tag`, `IconTile`…).
  **Prefer these in app/module code** — they're the leverage points: fix a token here and every
  page benefits.
- **`components/blocks/`** — composite widgets (CommandPalette, NowPlaying,
  MarkdownRenderer, ThemeToggle…).
- **`components/layout/`** — the sidebar shell.

Component states:

- **Tag** — the only pill for stack names. Label-only in project rows (the
  Stack panel already pairs each icon with its name); icon + label in Stack.
- **IconTile** — the leading square in a panel row: a monogram letter, a lucide
  icon, or a logo.
- **Buttons** — the primary CTA is `bg-brand text-brand-foreground` with
  `hover:bg-brand/90`, `ease-snappy`, and `hover:scale-[101%]`.
- **Focus:** every interactive element shows a brand ring —
  `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
  focus-visible:ring-offset-background`. Don't rely on hover alone.
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
- **Don't** introduce a new radius or font size for a one-off — use the roles.
- **Don't** hand-roll a pill or a row tile — use `Tag` / `IconTile`.
- **Don't** communicate state by color alone (pair the green dot with text).
- **Don't** add a CSS-in-JS engine or a second font for a single component.
