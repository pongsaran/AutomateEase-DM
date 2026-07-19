# AutomateEase-DM

AI-first marketing automation dashboard built as a clean, standalone Next.js App Router application.

## Stack

- Next.js 15
- React 19
- TypeScript
- Plain CSS
- Railway Railpack deployment

This repository intentionally does **not** use Turborepo, a monorepo, or Docker.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

The production start command reads Railway's `PORT` environment variable and falls back to port 3000 locally.

## Deploy to Railway

1. Create a Railway service from this GitHub repository.
2. Leave **Root Directory** empty.
3. Use the default **Railpack** builder.
4. Do not set a custom build or start command.
5. Railway detects `npm run build` and `npm start` from the root-level `package.json`.

## Current scope

The initial dashboard includes campaign metrics, recent campaigns, a quick-start campaign brief, and a transparent human-in-the-loop workflow overview.
