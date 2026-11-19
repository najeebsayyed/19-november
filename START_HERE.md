# Start Here — Antigravity Build Instructions

This folder contains the source-of-truth specifications for **19 NOVEMBER — The Indian Cricket Fans' Trauma Center**.

## Read these files in order

1. `product.md` — what to build, who it is for, game rules, content, and acceptance criteria.
2. `agents.md` — mandatory working rules and quality bar for the coding agent.
3. `architecture.md` — application structure, state, persistence, Canvas, sharing, and deployment design.
4. `design-system.md` — visual identity, responsive behavior, accessibility, and motion rules.
5. `implementation-plan.md` — phased build plan and manual QA checklist.

## Prompt to give Antigravity

> Read every Markdown file in this project folder before changing code. Treat them as the product and technical source of truth. Inspect the current working directory, preserve useful existing work, and then implement the complete website described in the specifications. Follow `agents.md` strictly. The website must be highly mobile responsive, interactive, gamified, and performant. It must be a static client-side app only: no backend, authentication, database, paid APIs, AI APIs, tracking, or runtime external service dependency. Do not stop after planning or building a visual mockup. Implement all features, run checks, test the responsive layouts and interactions, fix errors, and report the exact build/deployment status and any remaining limitations.

## Deployment target

Vercel static hosting. For a standard Vite project, the expected production output directory is `dist`. No environment variables should be required for core functionality.
