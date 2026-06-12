# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for Applitechture (software studio). The site is mid-rebuild: v1 was deleted and a fresh scaffold is being built up per `.plans/2026-06-12-redesign-rebrand-design.md` (design spec) and `.plans/2026-06-12-redesign-rebrand-plan.md` (task-by-task implementation plan). Consult those files for architecture and remaining work.

## Commands

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # ESLint (flat config, eslint.config.mjs)
npm run format  # Prettier (with tailwind class sorting)
```

No test suite — build + lint are the quality gates.

## Stack

Next.js 16 (App Router) + React 19, TypeScript strict, Tailwind CSS v4 (tokens via `@theme` in `src/app/globals.css`), ESLint 9 flat config, Prettier. Deployed on Vercel.
