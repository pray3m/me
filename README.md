<div align="center">
  <h1>premgautam.me</h1>
  <p>🔥 Personal website built with Next.js, TypeScript and Tailwind CSS</p>

  <p align="center">
    <a href="https://biomejs.dev"><img alt="Checked with Biome" src="https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome"></a>
  </p>
</div>

<br />

## Introduction

My personal site — portfolio, dashboard, and a place to try things out. Built from scratch on the Next.js App Router with React 19, TypeScript and Tailwind CSS v4.

All content is static (`data/`, `common/constant/`). There is no database.

## Features

### 🤖 Command palette with ChatGPT

You can access this feature by opening the command palette [cmd+k], then typing whatever you want to search/ask for.

> **Note:** `/api/chat` runs as a serverless function, so a long OpenAI response can hit the execution timeout. Memory and `maxDuration` for that route are raised in [vercel.json](vercel.json); bump them further if your plan allows.

### 📊 Dashboard

- **WakaTime** — coding activity, fetched server-side from the WakaTime API.
- **GitHub** — contribution graph, fetched server-side from the GitHub API.
- **Spotify** — now-playing, fetched client-side through `/api/now-playing`.

### 🗳 Projects

Project content lives in [data/projects.ts](data/projects.ts) and drives `generateStaticParams`, so every `/projects/[slug]` page is statically generated at build time. Any slug not in that list 404s.

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # fill in the keys
pnpm dev                     # http://localhost:3000
```

Requires Node 24 and pnpm.

### Scripts

```bash
pnpm build        # production build (postbuild runs next-sitemap)
pnpm start        # serve the production build

pnpm lint         # biome check .
pnpm lint:fix     # biome check --write .
pnpm typecheck    # tsc --noEmit
```

Tooling is [Biome](https://biomejs.dev), not ESLint/Prettier. Husky runs Biome on staged files pre-commit and commitlint (Conventional Commits) on the message.

## Deployment

Deployed on Vercel. Any push to `main` triggers a deployment.
