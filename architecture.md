# Technical Architecture — 19 November: The Trauma Center

## 1. Architecture summary

Build a static, client-side single-page React application. All game logic, rendering, meme generation, sharing, and persistence run in the visitor's browser.

**There is no backend.** The application must not call a custom server, database, AI service, or third-party API. It should be deployable as static assets on Vercel.

### Recommended stack

- React + TypeScript.
- Vite for development and static production builds.
- Existing CSS approach if the repository already has one; otherwise use Tailwind CSS or well-structured CSS modules/global CSS.
- Native CSS transitions and keyframes for most animation.
- Lucide icons only if already installed or if a small icon dependency is justified; inline SVG is also acceptable.
- Browser APIs: `localStorage`, Canvas, Clipboard, Web Share, `Intl.DateTimeFormat`.

Do not add a heavy animation framework, global state library, chart library, or component framework for this project. If the existing repository already contains one, assess whether it can be used without adding runtime cost.

---

## 2. System boundary

### Included in the browser

- UI and navigation.
- Match facts and quiz content bundled with the application.
- Trauma assessment and scoring.
- Cricket memory quiz and scoring.
- Meme template editing and Canvas export.
- Healing meter.
- Achievement rules and progress.
- Local persistence.
- Share intents and browser-native sharing.
- Elapsed-time counter.

### Explicitly excluded

- API server or serverless functions.
- Database or remote persistence.
- User accounts or identity.
- AI inference.
- Paid APIs or paid SDKs.
- Analytics and tracking.
- Remote content fetching.

### Data flow

`Bundled static data → feature UI → pure scoring/formatting utilities → in-memory state → optional localStorage`

For sharing:

`Current result → share utility → Web Share / WhatsApp / X / clipboard fallback`

For meme export:

`Template + user captions → local Canvas renderer → PNG Blob → download or Web Share`

No feature should require a network response to complete.

---

## 3. Application structure

Use feature-based organization with shared UI primitives. Adjust naming to match the existing repository, but preserve the separation of concerns.

```text
src/
  app/
    App.tsx
    appConfig.ts
  components/
    Button.tsx
    SectionHeading.tsx
    ProgressBar.tsx
    Modal.tsx
    ShareActions.tsx
    AchievementBadge.tsx
  sections/
    HeroSection.tsx
    MatchStorySection.tsx
    TraumaAssessmentSection.tsx
    MemoryQuizSection.tsx
    MemeStudioSection.tsx
    HealingMeterSection.tsx
    AchievementsSection.tsx
    FinalCTASection.tsx
  features/
    trauma/
      TraumaAssessment.tsx
      traumaQuestions.ts
      traumaScoring.ts
    quiz/
      MemoryQuiz.tsx
      quizQuestions.ts
      quizScoring.ts
    memes/
      MemeStudio.tsx
      memeTemplates.ts
      renderMeme.ts
    healing/
      HealingMeter.tsx
      healingMessages.ts
    achievements/
      achievementDefinitions.ts
      achievementService.ts
  data/
    matchFacts.ts
  hooks/
    useElapsedTime.ts
    useProgress.ts
    useReducedMotion.ts
  lib/
    storage.ts
    sharing.ts
    resultCard.ts
    time.ts
  types/
    index.ts
  styles/
    tokens.css
    global.css
    components.css
  main.tsx
```

The exact folder structure can differ if the repository already has sensible conventions. Avoid creating empty abstractions or one-file-per-trivial-element structures.

---

## 4. Rendering and navigation model

Prefer one main route with in-page sections. This keeps the application simple and avoids unnecessary routing configuration.

- Use semantic section IDs for navigation.
- Calls to action should scroll to the relevant feature.
- Add `scroll-margin-top` so headings are not hidden under a sticky header.
- Keep the header compact on mobile.
- Use a mobile menu that closes after a navigation selection.
- Do not hide primary content behind hover interactions.

If React Router is already present and genuinely needed, configure Vercel SPA rewrites. Do not add React Router merely for a single page.

---

## 5. State management

Use React component state for feature interactions. Lift state only when separate sections must share it, such as achievement unlock notifications and persistent progress.

Avoid adding Redux, Zustand, MobX, or another state library for this scope.

### State ownership

- Trauma assessment: selected answers, current question, result.
- Memory quiz: ordered question IDs, current index, selected answer, score, completion state.
- Meme studio: selected template ID, captions, preview/export state.
- Healing meter: current percentage.
- Achievement system: unlocked IDs and notification state.
- App progress: versioned persisted progress record.
- Elapsed-time counter: isolated hook/component only.

Do not store derived values if they can be calculated cheaply from source state. For example, derive the trauma score from the five selected answers when completing the assessment.

---

## 6. Type model

Use explicit TypeScript types. A suggested model:

```ts
export type TraumaBand =
  | "slightly-traumatized"
  | "emotionally-wounded"
  | "permanently-damaged"
  | "beyond-recovery";

export interface AssessmentAnswer {
  questionId: string;
  answerId: string;
  weight: 0 | 1 | 2 | 3;
}

export interface TraumaResult {
  score: number; // 0–100
  band: TraumaBand;
  completedAt: string;
}

export interface QuizResult {
  score: number; // 0–10
  completedAt: string;
}

export interface AchievementProgress {
  id: string;
  unlockedAt: string;
}

export interface LocalProgressV1 {
  version: 1;
  firstVisitDate: string;
  lastVisitDate: string;
  latestTraumaResult?: TraumaResult;
  bestQuizScore: number;
  completedQuizCount: number;
  healingPercent: number;
  achievements: AchievementProgress[];
}
```

The implementation may add fields where needed, but it must validate all persisted values and avoid storing personal information.

---

## 7. Local persistence design

Use a single versioned key, for example:

`nov19:progress:v1`

### Storage module responsibilities

- Read and parse progress safely.
- Validate the parsed structure and acceptable value ranges.
- Provide a default progress object if the key is missing or malformed.
- Write updates inside `try/catch`.
- Expose a memory-only fallback when browser storage is unavailable.
- Reset only this application's key, not all browser storage.

### Persistence rules

- Trauma result: save the latest completed result.
- Quiz: save best score and completed count.
- Healing meter: save the self-selected percentage.
- Achievements: save stable achievement IDs and unlock timestamps.
- Visit record: save first and last local dates.

For `Still Standing`, unlock only when the current local calendar date is later than the first visit date. Do not unlock it on a refresh during the same date. Use local date values in a stable `YYYY-MM-DD` representation.

If storage access fails, features must continue in memory. Show a small non-blocking note only if it helps explain that progress will not persist after refresh.

---

## 8. Scoring and game logic

Keep scoring pure and independent of React components.

### Trauma assessment

- Five questions.
- Four answer choices each.
- Answer weights from 0 to 3.
- Maximum raw score 15.
- Normalized score: `Math.round((rawScore / 15) * 100)`.
- Result-band lookup uses inclusive, non-overlapping boundaries: 0–24, 25–49, 50–74, 75–100.

### Memory quiz

- Ten questions from a bundled data array.
- Each question has a stable ID and one correct answer ID.
- Shuffle question IDs at the beginning of each run.
- Score by comparing selected answer ID to correct answer ID.
- Do not derive correctness from option index or rendered order.
- A question can be answered only once per run.

---

## 9. Meme generation architecture

Use the HTML Canvas 2D API. All visual assets must be drawn locally or represented as bundled SVGs that can be loaded safely; the simplest and most reliable approach is to draw the complete template directly on Canvas.

### Rendering pipeline

1. Read selected template configuration.
2. Create an off-screen canvas.
3. Set a logical design size using the chosen social aspect ratio.
4. Scale output pixels by `devicePixelRatio` or a fixed export scale.
5. Draw background, shapes, decorative elements, branding, and captions.
6. Wrap captions within safe margins.
7. Reduce font size down to a defined minimum if necessary.
8. Convert to PNG Blob with `canvas.toBlob`.
9. Trigger a download or pass the Blob as a File to Web Share if supported.

### Reliability rules

- Do not use remote images in Canvas.
- Do not use cross-origin assets that can taint the Canvas.
- Keep captions as plain text; do not inject user text as HTML.
- Preserve the editor state if export fails.
- Show a useful message if file sharing is unavailable.
- Release object URLs after their use is complete.

The preview may use Canvas or a DOM preview, but the final export must match the preview closely.

---

## 10. Sharing architecture

Centralize sharing logic in `lib/sharing.ts`.

### Share targets

- Web Share API for result text and URL.
- Web Share API with a generated File for meme image sharing, after checking file support.
- WhatsApp share URL with URL-encoded text.
- X intent URL with URL-encoded text and URL.
- Clipboard API for copying text or URL.

### Fallback behavior

- If Web Share is unavailable, show WhatsApp and X links.
- If clipboard access is unavailable, show the text in a selectable field or provide a clear manual-copy instruction.
- If file sharing is unsupported, download the meme and offer a separate link/text share action.
- User cancellation is not an application error; do not show a false success message.
- Only invoke native share flows from direct user interactions.

Use a configurable canonical URL in `appConfig.ts`. Never hardcode the local development URL.

---

## 11. Elapsed-time counter

Create a dedicated `useElapsedTime` hook or isolated counter component.

- Start instant: 2023-11-19T00:00:00+05:30.
- Display the elapsed interval using the Asia/Kolkata time zone.
- Update once per second.
- Clean up the interval on unmount.
- Keep counter state local to the counter.
- Use date-aware arithmetic for years/months/days rather than assuming every year is 365 days or every month is 30 days.
- Add tests for dates before and after anniversary boundaries if a test framework exists.

A simpler total-duration display may be used only if the product copy is changed to label units accurately. Do not present approximate month/day arithmetic as exact calendar years/months.

---

## 12. Visual system and responsive layout

Refer to `design-system.md` for color, typography, spacing, breakpoints, interaction, and motion rules.

### Layout strategy

- Mobile-first CSS.
- One column by default.
- Add two-column or wider compositions only at tablet/desktop breakpoints.
- Use flexible widths, `minmax(0, 1fr)`, `clamp()`, and sensible `max-width` containers.
- Prevent grid and flex children from overflowing with `min-width: 0` where needed.
- Avoid fixed heights for content cards.
- Use aspect ratios only for artwork/previews, not text-heavy content.

### Performance-first motion

- Prefer opacity and transform transitions.
- Avoid infinite decorative motion beyond very subtle, low-cost effects.
- Do not animate large blurred backgrounds.
- Respect `prefers-reduced-motion` in CSS and JavaScript.

---

## 13. Accessibility architecture

- Semantic HTML landmarks.
- Button and link elements for actions/navigation.
- Form labels and accessible names.
- Visible keyboard focus.
- `aria-live="polite"` for quiz feedback and achievement announcements.
- Dialog role and focus management for confirmation/modal dialogs.
- Do not use `aria-live` for a per-second counter; it would be disruptive.
- Do not use color alone to express state.
- Respect browser zoom and text scaling.

---

## 14. SEO and static hosting

Configure metadata in the static HTML document and add any needed runtime canonical URL carefully.

Files/assets:

- `index.html`: title, description, theme color, Open Graph and X metadata.
- `public/favicon.svg`: original branded icon.
- `public/og-image.png`: original 1200 × 630 image, no unlicensed photos or logos.
- `public/robots.txt`: allow indexing unless the owner requests otherwise.

Because the app is a single page, a Vercel rewrite is not required unless client-side routing is introduced. If routes are added, configure a safe SPA rewrite in `vercel.json`.

---

## 15. Testing strategy

At minimum, manually test:

- Assessment score boundaries and all result bands.
- Back/next behavior and unanswered-question prevention.
- Quiz correctness, score calculation, replay, and question randomization.
- Meme text wrapping, long captions, emoji fallback, and PNG export.
- Share API unavailable and file-share unavailable scenarios.
- Clipboard unavailable scenario.
- LocalStorage disabled, malformed, and valid saved data.
- Achievement conditions and duplicate unlock prevention.
- Reset progress behavior.
- Time counter across midnight and anniversary boundaries.
- Keyboard-only navigation and reduced motion.
- Viewports from 320px to 1440px.
- Production build and deployed static assets.

If automated tests are already configured, add unit tests for pure scoring, storage validation, achievement rules, and meme text layout. Do not introduce a large test framework for a tiny app unless it is justified; document manual checks where automation is not available.

---

## 16. Vercel deployment

- Build command should use the project's package manager and run the Vite production build.
- Output directory: `dist`.
- No environment variables should be required for core functionality.
- Set canonical production URL in a small app config once the domain is known.
- Ensure the deployed site does not reference localhost.
- If there is only one route, do not add unnecessary rewrites.
- Confirm direct load and refresh work on the deployed URL.

The result should remain a static frontend with no runtime service dependency.
