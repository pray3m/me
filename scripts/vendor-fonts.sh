#!/usr/bin/env bash
#
# Vendors the two web fonts this site ships, so `next build` never talks to the
# network. `next/font/google` fetches the @font-face CSS from Google at build
# time; in Sep 2026 Google briefly answered with its dynamic-instancing
# endpoint (fonts.gstatic.com/l/font?kit=…&skey=…&v=…) instead of a static
# .woff2, and Turbopack's font handler — which packs the URL into an import
# query — choked on the embedded `&`, failing the build with 28 copies of
# "next/font/google queries have exactly one entry". Vendoring removes the
# whole class of problem: no build-time fetch, no third-party outage, no
# response-shape surprises, byte-identical builds offline.
#
# The Open Graph cards had the same disease in a nastier form: lib/seo/og.tsx
# asked Google for a per-card subset with `&text=`, which *always* answers with
# that dynamic endpoint, and serves it as format('woff') — a shape the caller's
# regex never matched, so every social card had silently been rendering in
# Satori's fallback font. Those faces are vendored here too.
#
# Sources are the upstream OFL originals from google/fonts, pinned by commit.
# Everything is subset to the codepoints this site actually renders (RANGES).
#
# Run after changing RANGES or bumping a pin:  bun run fonts:vendor
set -euo pipefail

cd "$(dirname "$0")/.."
OUT="common/styles/fonts"

# Pinned to the commit that last touched each family's upstream directory.
GEIST_REF="718e1db4deb9e4d9d85a0ead1b9f5fde2761ccfd"
GEIST_MONO_REF="9e25e2ba265e5298f70f6182dd4e8a3ebf1b9123"

# Google's own "latin" + "latin-ext" unicode-ranges, merged into one file: a
# single @font-face beats per-subset slices here, since next/font/local has no
# way to attach a unicode-range per src entry.
LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
LATIN_EXT="U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
# Nothing outside those two ranges is worth carrying: the only non-latin glyphs
# in rendered copy are ✦ (CommandPalette) and the Devanagari/CJK/emoji in
# Greeting and Footer, and upstream Geist has none of them — those already fell
# back to a system font under next/font/google.
RANGES="$LATIN,$LATIN_EXT"

vendor() {
  local name="$1" ref="$2" dir="$3" file="$4" out="$5"
  local tmp
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' RETURN

  echo "→ $name"
  curl -gsSfL "https://raw.githubusercontent.com/google/fonts/$ref/ofl/$dir/$file" -o "$tmp/src.ttf"
  curl -sSfL "https://raw.githubusercontent.com/google/fonts/$ref/ofl/$dir/OFL.txt" -o "$OUT/$out.LICENSE.txt"

  # --layout-features='*' keeps tnum: the dashboard renders figures with
  # Tailwind's tabular-nums, which is a no-op if the feature is subset away.
  uvx --quiet --from 'fonttools[woff]' pyftsubset "$tmp/src.ttf" \
    --unicodes="$RANGES" \
    --layout-features='*' \
    --flavor=woff2 \
    --output-file="$OUT/$out.woff2"

  echo "  $OUT/$out.woff2 ($(du -h "$OUT/$out.woff2" | cut -f1))"
}

# Satori (next/og) can read neither woff2 nor a variable axis, so the OG card in
# lib/seo/og.tsx gets its own copies: the same subset, pinned to the three
# weights it renders, as plain TTF. Build-time only — never served to a browser.
OG_WEIGHTS=(400 600 800)

vendor_og() {
  local ref="$1" dir="$2" file="$3"
  local tmp
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' RETURN

  echo "→ Geist (Open Graph static faces)"
  mkdir -p "$OUT/og"
  curl -gsSfL "https://raw.githubusercontent.com/google/fonts/$ref/ofl/$dir/$file" -o "$tmp/src.ttf"
  # No layout features: Satori measures words without Geist's kerning but draws
  # them with it, which leaves ragged double-width gaps between words.
  uvx --quiet --from 'fonttools[woff]' pyftsubset "$tmp/src.ttf" \
    --unicodes="$RANGES" \
    --layout-features='' \
    --output-file="$tmp/subset.ttf"

  for w in "${OG_WEIGHTS[@]}"; do
    uvx --quiet --from 'fonttools[woff]' fonttools varLib.instancer \
      "$tmp/subset.ttf" "wght=$w" -o "$OUT/og/geist-$w.ttf" >/dev/null 2>&1
    echo "  $OUT/og/geist-$w.ttf ($(du -h "$OUT/og/geist-$w.ttf" | cut -f1))"
  done
}

vendor "Geist"      "$GEIST_REF"      "geist"     "Geist[wght].ttf"     "geist-variable"
vendor "Geist Mono" "$GEIST_MONO_REF" "geistmono" "GeistMono[wght].ttf" "geist-mono-variable"
vendor_og           "$GEIST_REF"      "geist"     "Geist[wght].ttf"
