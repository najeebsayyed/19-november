# Implementation Plan and QA Checklist — 19 November: The Trauma Center

This file turns the product and architecture requirements into an execution sequence. Antigravity should complete the phases in order, while preserving existing working project code.

## Phase 0 — Repository inspection

- [ ] Inspect current directory and repository status.
- [ ] Read `product.md`, `agents.md`, `architecture.md`, and `design-system.md`.
- [ ] Identify existing framework, package manager, CSS setup, scripts, and lint/test tooling.
- [ ] Check whether the app is already initialized.
- [ ] Preserve useful existing components and dependencies.
- [ ] Confirm no backend, auth, database, paid API, or AI API is present or needed.

**Exit condition:** A clear implementation plan exists and the current project can be safely modified.

## Phase 1 — Foundation and design tokens

- [ ] Establish responsive page shell and semantic landmarks.
- [ ] Add global color, typography, spacing, and focus tokens.
- [ ] Build shared buttons, section headings, progress indicators, and basic card styles.
- [ ] Implement responsive navigation and mobile menu.
- [ ] Add reduced-motion behavior.
- [ ] Add page metadata and favicon placeholders/assets.

**Exit condition:** The app shell is responsive and the shared design system is in place.

## Phase 2 — Hero and match memory

- [ ] Build cinematic but lightweight hero.
- [ ] Add the elapsed-time counter using the 19 November 2023 start instant and Asia/Kolkata display.
- [ ] Isolate counter updates from the rest of the app.
- [ ] Add the curated match facts and scoreboard.
- [ ] Verify facts and make the data editable in a single module.

**Exit condition:** The first screen explains the product immediately and the match-memory section displays accurate facts.

## Phase 3 — Trauma assessment

- [ ] Add five questions and four choices per question.
- [ ] Add answer weights and pure scoring function.
- [ ] Add progress, back, continue, and completion states.
- [ ] Prevent completion when unanswered questions remain.
- [ ] Add four result bands and result copy.
- [ ] Add retake action.
- [ ] Add result download/share actions.
- [ ] Trigger the First Diagnosis and Never Forget achievements correctly.

**Exit condition:** All assessment paths work, including the score boundaries 0, 24, 25, 49, 50, 74, 75, and 100.

## Phase 4 — Cricket memory quiz

- [ ] Add ten fact-based questions with stable IDs.
- [ ] Confirm one correct answer per question.
- [ ] Randomize question order per run.
- [ ] Add selected-answer feedback and explanation.
- [ ] Add score calculation and final messages.
- [ ] Add replay and share/download result card.
- [ ] Trigger Cricket Historian and Perfect Memory achievements correctly.

**Exit condition:** Quiz scoring is correct, replay works, and the best score persists when storage is available.

## Phase 5 — Meme studio

- [ ] Implement at least six original templates.
- [ ] Build template selection and caption editing.
- [ ] Add live preview.
- [ ] Implement Canvas PNG export.
- [ ] Handle long captions, line wrapping, and minimum font size.
- [ ] Add branding/watermark.
- [ ] Add download action.
- [ ] Add native file sharing where supported and clear fallbacks elsewhere.
- [ ] Trigger Meme Therapist only after a download is actually initiated.

**Exit condition:** Each template exports a valid PNG, including on a narrow mobile viewport.

## Phase 6 — Healing meter and achievements

- [ ] Build accessible 0–100% slider.
- [ ] Add dynamic messages for the specified ranges.
- [ ] Save the selected value locally.
- [ ] Build the achievement shelf.
- [ ] Add locked explanations and unlock notifications.
- [ ] Add distinct-later-day return logic for Still Standing.
- [ ] Prevent duplicate achievements.

**Exit condition:** Healing state and achievement state persist safely, with no false unlocks.

## Phase 7 — Persistence, sharing, and result cards

- [ ] Implement versioned LocalStorage wrapper.
- [ ] Validate loaded data and recover from malformed JSON.
- [ ] Handle storage being unavailable.
- [ ] Add reset-progress confirmation.
- [ ] Implement Web Share feature detection.
- [ ] Implement WhatsApp and X sharing links.
- [ ] Implement Clipboard API fallback.
- [ ] Generate downloadable result cards locally.
- [ ] Verify share text uses the deployed canonical URL when configured.

**Exit condition:** Sharing and persistence work without any server or external API.

## Phase 8 — Responsive and accessibility polish

- [ ] Test 320px, 360px, 375px, 390px, 430px, 768px, 1024px, and 1440px widths.
- [ ] Fix horizontal overflow and clipped content.
- [ ] Check touch targets and in-app-browser usability.
- [ ] Test keyboard-only navigation.
- [ ] Test focus visibility and dialog focus behavior.
- [ ] Test reduced-motion mode.
- [ ] Check color contrast and text alternatives.
- [ ] Check long captions and long result messages.

**Exit condition:** The entire experience works comfortably on mobile and remains polished on desktop.

## Phase 9 — Performance and release checks

- [ ] Remove unused dependencies and assets.
- [ ] Confirm there are no unnecessary runtime network requests.
- [ ] Check for heavy animation, excessive blur, and unnecessary re-renders.
- [ ] Confirm the elapsed timer only updates its own component.
- [ ] Confirm all timers and event listeners are cleaned up.
- [ ] Check object URL cleanup after file downloads.
- [ ] Run type check.
- [ ] Run lint if configured.
- [ ] Run production build.
- [ ] Inspect browser console for errors.
- [ ] Inspect the network panel for unexpected requests.
- [ ] Verify refresh and direct URL load on Vercel after deployment.

**Exit condition:** Production build succeeds and no known blocking issues remain.

---

# Manual QA Test Matrix

## Trauma assessment

- [ ] Can start the test from the hero.
- [ ] Cannot continue without selecting an answer.
- [ ] Back button preserves the previous answer.
- [ ] All five questions can be completed.
- [ ] Lowest possible score maps to Slightly Traumatized.
- [ ] Highest possible score maps to Beyond Recovery.
- [ ] Boundary values map to the correct band.
- [ ] Retake resets the in-progress test.
- [ ] Result card is legible and downloadable.

## Memory quiz

- [ ] Ten questions are displayed exactly once per run.
- [ ] Question order changes between runs when possible.
- [ ] Correct answers are accepted regardless of rendered option order.
- [ ] Wrong answers show the correct answer.
- [ ] Score is between 0 and 10.
- [ ] Score message matches the specified range.
- [ ] Replay starts a clean run.

## Meme studio

- [ ] All six templates can be selected.
- [ ] Top and bottom captions update the preview.
- [ ] Empty captions are allowed where the template supports them.
- [ ] Long text wraps without clipping.
- [ ] Emoji does not break export.
- [ ] PNG is non-empty and opens correctly.
- [ ] Export failure does not erase edits.
- [ ] File sharing is attempted only when supported.
- [ ] Download achievement unlocks only after the download action is initiated.

## Healing meter

- [ ] Slider can be changed by touch, mouse, and keyboard.
- [ ] Numeric value updates visibly.
- [ ] Message changes at each defined range.
- [ ] Value persists after refresh when LocalStorage is available.
- [ ] Value can be reset or changed later.

## Achievements and storage

- [ ] Locked achievements remain locked until conditions are met.
- [ ] Achievements unlock once and do not duplicate.
- [ ] Still Standing does not unlock on the first visit date.
- [ ] Progress survives refresh when storage is available.
- [ ] Malformed stored JSON does not crash the app.
- [ ] Disabled storage does not prevent current-session gameplay.
- [ ] Reset clears only the app's progress key.

## Sharing

- [ ] Native text sharing is used only when available.
- [ ] File sharing checks `canShare` first.
- [ ] WhatsApp link contains encoded share text.
- [ ] X link contains encoded share text.
- [ ] Copy action has a fallback.
- [ ] User cancellation does not display a false success message.
- [ ] Production share links do not include localhost.

## Responsive and accessibility

- [ ] No horizontal overflow at any test width.
- [ ] Header and menu work on touch.
- [ ] All buttons have visible focus.
- [ ] All controls have accessible labels.
- [ ] Quiz feedback is announced accessibly.
- [ ] Reduced-motion mode disables non-essential animation.
- [ ] Dialogs can be closed and return focus correctly.
- [ ] Browser zoom does not break layout.

---

## Release checklist

- [ ] `npm run build` (or the equivalent package-manager command) succeeds.
- [ ] No TypeScript errors.
- [ ] No blocking console errors.
- [ ] Vercel build command and output directory are correct (`dist` for Vite).
- [ ] Canonical production URL is configured before sharing publicly.
- [ ] README includes local setup and deployment instructions.
- [ ] No secrets, tracking scripts, API integrations, or backend files have been added.
