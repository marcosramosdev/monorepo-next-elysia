# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Learning monorepo: a todo app split into an Elysia (Bun) API and a Next.js web frontend, wired together with pnpm workspaces + Turborepo. Still skeletal — API serves `Hello, World!`, web is the Next.js starter page.

## Layout

- `apps/api` — Elysia HTTP server, **runs on Bun** (not Node). Listens on port `3001`. Entry `src/index.ts`.
- `apps/web` — Next.js 16 app-router frontend (React 19, Tailwind v4). Dev port `3000`.
- `packages/config` — shared TypeScript config. Builds with `tsup`: takes `base/tsconfig.json` + `base/*.ts`, emits to `dist/`, copies the tsconfig over. Consumed via `"extends": "@monorepo-elysia-next-todo-app/config/typescript"` (the `./typescript` subpath in the package's `exports`). The strict base turns on `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`, `noImplicitReturns`, etc. — `packages/config` must be built before `apps/*` typecheck cleanly (Turbo's `^build` handles this).

Workspace pkg names are inconsistent: root is `monorepo-demo`, apps are `api` / `web`, shared config is `@monorepo-elysia-next-todo-app/config`.

## Commands

Run from repo root (Turbo fans out to all workspaces):

- `pnpm dev` — start everything (`turbo run dev`, persistent)
- `pnpm build` — `turbo run build` (respects `^build` ordering; outputs `dist/**`, `.next/**`)
- `pnpm lint` — `turbo run lint`

Per-app:

- API: `cd apps/api && bun run --watch src/index.ts` (or `pnpm dev` there). **No test setup** — `pnpm test` in `apps/api` just errors.
- Web: `cd apps/web && next dev` / `next build` / `next start` / `eslint`. ESLint uses flat config (`eslint.config.mjs`) with `eslint-config-next` core-web-vitals + typescript presets.

Package manager is **pnpm** (`packageManager: pnpm@11.0.9`) at the root. Note `apps/web` also has a `bun.lock` — prefer pnpm unless working inside that app's Bun-specific flow.

## Next.js 16 — read before editing `apps/web`

`apps/web/AGENTS.md` warns this is a newer Next.js than training data reflects: APIs, conventions, and file structure may differ. **Read the relevant guide under `apps/web/node_modules/next/dist/docs/` before writing web code**, and heed deprecation notices.

## Adding API code

Elysia uses method chaining off a single `new Elysia()` instance (`.get(...).post(...).listen(port)`). Keep route handlers returning plain values/objects — Elysia serializes them.
