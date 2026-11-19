# Agent Instructions — 19 November: The Trauma Center

These instructions apply to Antigravity and any coding agent working in this repository. Follow `product.md` and `architecture.md` as the source of truth. If instructions conflict, the hard constraints in this file take priority.

## 1. Your role

Act as a senior frontend engineer, product-minded UI/UX designer, accessibility reviewer, and QA engineer. Build the complete, production-ready static website—not just a prototype, screenshot, or collection of placeholder components.

You are responsible for inspecting the existing project, implementing the product, testing it, and leaving clear deployment instructions.

## 2. Non-negotiable constraints

Do not add or introduce:

- A backend, API server, serverless function, or edge function.
- Authentication, accounts, registration, or user profiles.
- A database, including hosted databases or browser databases.
- Paid APIs, paid SDKs, or services requiring a subscription.
- AI APIs or model calls.
- API keys, secrets, or credentials.
- Third-party analytics, tracking pixels, or advertising scripts.
- Runtime dependencies on remote image hosts, remote fonts, or remote data services.

The application must be a static client-side React app deployable to Vercel. Browser APIs such as `localStorage`, Canvas, Clipboard, and Web Share are allowed, with graceful fallbacks.

## 3. Required workflow

### Before coding

1. Inspect the current working directory and all existing project files.
2. Read `product.md`, `architecture.md`, `design-system.md`, and `implementation-plan.md` in full.
3. Identify the current framework, package manager, scripts, and existing conventions.
4. Preserve useful existing code and dependencies. Do not overwrite a working project without reason.
5. Write a concise implementation checklist based on the requirements.

### During implementation

1. Build in small, coherent increments.
2. Keep content and quiz data separate from presentation components.
3. Keep storage, scoring, sharing, and Canvas export logic in testable utility modules.
4. Use TypeScript types for quiz data, assessment answers, scores, achievements, and persisted progress.
5. Do not leave TODOs, fake buttons, dead links, or placeholder interactions in the finished product.
6. Do not add dependencies for functionality that can be implemented cleanly with native browser APIs and CSS.
7. Avoid adding a package solely for animations. Prefer CSS transitions and keyframes.
8. If a dependency already exists and is useful, retain it unless it creates a concrete performance or reliability problem.
9. Keep UI state local to the feature where possible. Avoid a large global state library.
10. Keep all user-facing copy respectful, funny, and clearly fictional where it refers to “trauma” or “healing.”

### Before finishing

1. Run the project's type check, lint command if present, and production build.
2. Fix all errors introduced by the implementation.
3. Test each interaction listed in the QA checklist.
4. Test LocalStorage failure and malformed-data fallbacks.
5. Test Canvas export and mobile sharing fallbacks.
6. Inspect the application at all viewport widths listed in `product.md`.
7. Check the browser console and network panel.
8. Confirm core features make no runtime API requests.
9. Update the README with setup and Vercel deployment instructions.
10. Report any item that could not be tested honestly. Never claim a test passed if it was not run.

## 4. Quality bar

### Functionality

- Every button must have a real action.
- Every form/input must update the visible application state.
- Every quiz must have deterministic scoring for a given set of answers.
- Every achievement must have a verifiable unlock condition.
- Share buttons must use feature detection and provide fallbacks.
- Downloads must generate real image files.
- Reloading the page must not break persisted progress.

### Visual quality

- Use a consistent dark, cinematic sports-editorial identity.
- Keep the interface uncluttered and content-led.
- Use spacing and hierarchy rather than excessive borders and glow effects.
- Do not make every section a dashboard card.
- Use bold, expressive headlines but preserve mobile readability.
- Maintain consistent button, input, badge, and section styles.

### Mobile quality

Mobile is the primary target. Start with narrow screens and progressively enhance for larger viewports.

- No hover-only interactions.
- No horizontal scrolling.
- No tiny controls.
- No fixed-width cards that overflow.
- No text clipped by animation or container sizing.
- No sticky navigation that hides anchor targets; use scroll margin where needed.
- The meme editor must remain usable on a phone in portrait orientation.

## 5. Performance rules — “no lag” means these things

- Do not add heavy animation, charting, state-management, or UI libraries without a compelling need.
- Prefer CSS transforms and opacity for transitions.
- Avoid animating layout properties such as width, height, top, or left when a transform can be used.
- Do not run a continuous animation loop for decorative effects.
- Keep the elapsed-time counter isolated so it does not re-render the whole application every second.
- Avoid unnecessary state at the app root.
- Avoid large images, videos, and remote assets.
- Avoid expensive full-screen backdrop filters and excessive box shadows.
- Use lazy loading only when it helps; do not introduce visible loading gaps or layout shifts.
- Clean up intervals, event listeners, object URLs, and animation resources.
- Revoke generated object URLs after downloads when safe to do so.
- Do not block the initial render on LocalStorage, Canvas, or any network request.

## 6. Data and fact integrity

Use only the match facts defined in `product.md` unless they are independently verified before adding more. Put facts in a single data module. Never invent scores, player statistics, awards, dates, or venue details.

Keep question and answer data explicit. Each question must have exactly one correct answer. Store the correct answer by stable ID, not by display position.

## 7. Browser API and fallback rules

- `localStorage`: wrap reads and writes in `try/catch`; the app must still work in memory if unavailable.
- `navigator.share`: feature-detect it and call only after a user gesture.
- File sharing: verify `navigator.canShare({ files })` before attempting it.
- Clipboard: feature-detect `navigator.clipboard.writeText`; provide a fallback message or copy technique.
- Canvas: report export errors without clearing the user's captions or template selection.
- Time zone: use `Asia/Kolkata` for the elapsed-time display and handle unsupported environments gracefully.
- Object URLs: revoke them after use, not before the browser has consumed the file.

## 8. Accessibility rules

- Use semantic buttons, links, headings, navigation, main, and footer elements.
- Use real labels for inputs.
- Ensure all interactive features can be used with keyboard and touch.
- Provide visible focus states.
- Provide text feedback in addition to color and animation.
- Respect `prefers-reduced-motion`.
- Manage focus for modal dialogs and return focus to the trigger when closed.
- Announce quiz answer feedback and newly unlocked achievements accessibly.

## 9. Security and privacy

- Collect no personal information.
- Do not add tracking or fingerprinting.
- Do not store user-generated captions outside local browser memory/storage.
- Escape/render user-entered caption text as text; never inject it as HTML.
- Do not use `dangerouslySetInnerHTML` for user content.
- Do not put secrets in Vite environment variables. A Vite variable is public in the built client bundle.

## 10. Git and repository hygiene

- Do not delete user files that are unrelated to the project.
- Do not force-push, rewrite Git history, or change remotes.
- Do not commit secrets, local environment files, build output, or dependency folders.
- Keep `.gitignore` suitable for a Vite project.
- Use clear, focused changes and meaningful file names.

## 11. Final report format

When the build is complete, provide:

1. What was implemented.
2. Project structure.
3. Dependencies added or removed, with reasons.
4. Commands executed.
5. Type-check/lint/build results.
6. Manual viewport and interaction tests completed.
7. Known limitations or untested items.
8. Exact Git commands to publish the repository.
9. Exact Vercel deployment steps.

Do not say “production-ready” if build or core interactions remain broken. State the exact remaining blocker instead.
