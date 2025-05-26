<div align="center">
  <h1>premgautam.me</h1>
  <p>🔥 Personal website built with Next.js, TypeScript, Tailwind CSS, SWR and Prisma with Vercel Postgres</p>

 <p align="center">
<a href="https://biomejs.dev"><img alt="Checked with Biome" src="https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome"></a>
</p>

</div>

<br />

## Introduction

This website was built from scratch using Next.js and was first initialized in April 2024. It will undergo regular updates and serve as both a valuable learning resource and a platform for me to share my knowledge.

## Features

On this website there are several features that will continue to be updated and added in the future.

## 🎯 FOCUS TASKS (Jun 23 '23)

- [x] Fix update services (Jun 23 `23)
- [x] Feature add project list render animation (Jun 23 `23)
- [x] Fix: toggle (Jun 23 `23)
- [x] Command Palette (Jun 25 `23)
- [x] Feature: integrate Command Palette with chatGPT (ask ai assistant)
- [ ] add vercel json (memory, duration) for api/chat

## TODO :

- [ ] remove vercel analytics
- [ ] Feature add jest unit test (Jun 23 `23)
- [ ] remove supercons (update icons with react-icons)

## NICE TO HAVE:
- [ ] buy me a beer (support me)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### 🕗 Wakatime

Data is retrieved using the Wakatime API and then displayed on the dashboard, built with Next.js API routes deployed as serverless functions.

### 🗳 Projects

The data projects on this blog are taken from the MySQL database connected through the Prisma Client. The database for this application is hosted on PlanetScale DB. (WIP)

The data fetching method used to retrieve data projects is Incremental Static Regeneration (ISR) with 1 second revalidation and Server-Side Rendering (SSR) for the project details..

## Deployment

This project is deployed on Vercel. Any push to the `main` branch will trigger a deployment.

### TODO LATER:

- [ ] Integrate projects api (may 30 `23)
- [ ] Integrate prisma client (may 31 `23)
- [ ] update prisma db (may 31 `23) to init project detail (may 31 `23)
- [ ] feat: add favicon for different devices (may 31 `23)
- [ ] chore: add prisma migration (Jun 3 `23)

## FOR BLOGS (NICE TO HAVE )

- [ ] feat: integrate blog (may 31 `23)
- [ ] feat: add pagination (Jun 1 `23)
- [ ] feat: blog detail to add loading state (Jun 1 `23)
- [ ] fix: improve ssr (Jun 1 `23) to fix: remove styled emotion library (Jun 1 `23)
- [ ] feat: integrate comment system (Jun 2 `23)
- [ ] feat: add blog tags (Jun 2 `23) && fix : blog
- [ ] All Commits on Jun 5, `23
- [ ] fix: blog card and params #8 (jun 6 )
- [ ] fix: codeblock dynamic import #11
- [ ] feat: add blog header sticky effect #13 (jun 22 )
- [ ] feat: add blog list comment counter #22 (jun 23 `23)
- [ ] fix: update blog detail reference #23 (jun 23 `23)
- [ ] fix: validate blog data source owner
- [ ] feat: change default blog list view #25 (jun 23 `23)
- feat: add blog card skeleton component (jun 23 `23)
- Fix update blog card
- Feature add blog list render animation
- Feature add blog carousel component
- Feature new homepage blog preview for desktop view (Jun 23 `23)
