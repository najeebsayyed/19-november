# Product Requirements — 19 NOVEMBER: The Trauma Center

> **Product type:** Lightweight, client-side, shareable cricket-fan experience  
> **Working title:** 19 NOVEMBER — The Indian Cricket Fans' Trauma Center  
> **Tagline:** 10 wins. 1 final. 3 years. Still not recovered.  
> **Primary audience:** Indian cricket fans, especially people who followed the 2023 ICC Men's Cricket World Cup  
> **Deployment target:** Vercel (static frontend)  
> **Core constraint:** No backend, authentication, database, paid APIs, or AI APIs.

---

## 1. Product vision

Create a funny, nostalgic, highly interactive website where Indian cricket fans can revisit the 19 November 2023 World Cup final through games, quizzes, meme creation, playful achievements, and shareable results.

The site should turn a shared cricket memory into a short, delightful experience that people want to send to friends and post on social media. It must feel like a playful internet experience—not a generic SaaS dashboard, a news site, or a long article.

The humor should be affectionate and self-aware. The site must not insult individual fans, players, or nationalities. It can tease the collective heartbreak, but it should remain good-natured.

### Product promise

In approximately 2–5 minutes, a visitor can:

1. Understand the concept immediately.
2. Take a funny, non-clinical “trauma” assessment.
3. Test their memory of the final.
4. Create and download an original meme.
5. Set a playful self-reported healing meter.
6. Unlock achievements stored on their own device.
7. Share a result or meme with friends.

### Success signals

The product is successful when:

- Visitors understand the joke within the first screen.
- The assessment and quiz are easy to complete on a phone.
- Meme creation and download work reliably on desktop and mobile.
- Visitors can share a result without creating an account.
- The experience feels fast, responsive, and stable on mid-range phones.
- The site remains useful even when the browser is offline after the initial page load, except for native sharing targets that require connectivity.

No analytics service is required. Do not invent traffic, user counts, leaderboards, or social proof.

---

## 2. Non-goals and hard constraints

These are non-negotiable:

- **No backend or server functions.**
- **No authentication, registration, or user accounts.**
- **No database, hosted or local.**
- **No paid APIs or subscription services.**
- **No AI APIs or generative AI calls.**
- **No API keys or secrets in the frontend.**
- **No third-party tracking or analytics by default.**
- **No fake global leaderboard or fabricated live statistics.**
- **No dependency on remote images, video, or runtime font downloads.**

Use browser capabilities and `localStorage` only for optional local progress. If storage is blocked or unavailable, the games must still work for the current session.

The app is a static frontend suitable for Vercel. Do not add a backend “just in case.”

---

## 3. Audience and usage context

### Primary audience

- Indian cricket fans who remember the 2023 final.
- Friends sharing the website in WhatsApp groups.
- Visitors coming from Instagram Stories, X, Reddit, or direct links.
- Mobile-first users who may open the site inside an in-app browser.

### Usage context

Assume many visitors will:

- Open the site on a phone with a narrow viewport.
- Have an inconsistent mobile connection.
- Scroll quickly and interact with one or two features only.
- Use touch rather than a mouse.
- Have reduced-motion enabled.
- Use an in-app browser where some Web Share API capabilities may be unavailable.

The experience must not depend on hover, precise pointer movement, or a wide screen.

---

## 4. Brand voice and content principles

### Voice

Funny, punchy, dramatic, familiar, and affectionate. Use short sentences, cricket references, and playful exaggeration.

### Example copy

- “Some dates are unforgettable. This one hurts.”
- “Welcome to the unofficial Indian cricket fans' therapy center.”
- “10 matches won. We thought the script was already written.”
- “Then Travis Head entered the chat.”
- “Healing progress: currently under review.”
- “Medical accuracy: 0%. Emotional accuracy: questionable.”

### Content rules

- Make it clear that the “trauma” language is a joke and not a medical assessment.
- Do not present the site as real therapy or health advice.
- Do not use hateful, abusive, or xenophobic content.
- Do not use copyrighted broadcast footage, ICC assets, team crests, player photographs, or unlicensed memes.
- Prefer original CSS/SVG artwork, scoreboard graphics, and canvas-drawn illustrations.
- Verify match facts against the curated data in this project before publishing. Do not add invented statistics.

---

## 5. Information architecture and visitor journey

Build a single-page experience unless the existing project has a strong reason to use multiple routes. The main sections should be reachable through in-page navigation and clear calls to action.

Recommended order:

1. Hero and live elapsed-time counter.
2. Match memory / scoreboard.
3. Trauma assessment.
4. Cricket memory quiz.
5. Meme studio.
6. Healing meter.
7. Achievements.
8. Final share prompt and footer.

### Primary journey

`Landing → Trauma assessment → Result card → Share`

### Secondary journeys

- `Landing → Memory quiz → Score card → Share`
- `Landing → Meme studio → Meme preview → Download/share`
- `Landing → Healing meter → Save locally`
- `Any activity → Achievement unlocked → Achievement shelf`

Navigation should not trap visitors in a flow. Every game must have a clear way to restart, skip, or return to the main page.

---

## 6. Hero and live counter

### Required content

Eyebrow: `THE UNOFFICIAL INDIAN CRICKET FANS' TRAUMA CENTER`

Headline: `19 NOVEMBER`

Tagline: `10 wins. 1 final. 3 years. Still not recovered.`

Supporting copy: `Remember when we were one match away from lifting the World Cup? Yeah. We remember too.`

Primary CTA: `CHECK MY TRAUMA`

Secondary CTA: `RELIVE THE HEARTBREAK`

Scoreboard treatment:

- India: 240 all out
- Australia: 241/4
- Result: Australia won by 6 wickets

Disclaimer: `All memories are real. The healing statistics are completely unscientific.`

### Elapsed-time counter

- Start instant: 19 November 2023, 00:00:00 in `Asia/Kolkata`.
- Display years, months, days, hours, minutes, and seconds since that instant.
- Derive the value from the actual current time. Never hardcode “3 years.”
- Update once per second and clean up the timer when the component unmounts.
- Avoid a timer that causes the entire page to re-render every second. Isolate the counter in its own component.
- Show a graceful fallback if the browser cannot provide the required time-zone support.
- Include a small label: `TIME SINCE THE HEARTBREAK`.

---

## 7. Match memory section

Heading: `THE NIGHT WE DON'T TALK ABOUT`

Present the match as a short, visually engaging scoreboard or timeline—not a wall of text.

Curated facts:

- Date: 19 November 2023.
- Competition: ICC Men's Cricket World Cup 2023 final.
- Venue: Narendra Modi Stadium, Ahmedabad, India.
- India: 240 all out in 50 overs.
- Australia: 241/4 in 43 overs.
- Result: Australia won by 6 wickets.
- Player of the Match: Travis Head.
- Travis Head scored 137 runs.
- India's 10-match winning run ended in the final.

Suggested captions:

- “10 matches won. We thought the script was already written.”
- “Then Travis Head entered the chat.”
- “240 felt like a score. 241 felt personal.”

All facts should live in one data file so they can be reviewed and corrected without searching through UI components. Do not create unsupported commentary about player intent, injuries, or private feelings.

---

## 8. Feature A — Trauma assessment

### Purpose

A quick, funny personality-style assessment. It is entertainment only and must not be represented as a real psychological or medical test.

### Interaction

- Five questions, one at a time.
- Four selectable answers per question.
- A visible progress indicator, such as `QUESTION 2 OF 5`.
- Selecting an answer advances only after the visitor taps `CONTINUE`, or use a clearly communicated auto-advance with a short delay. Prefer an explicit Continue button for predictable mobile interaction.
- Back navigation should preserve the current answer.
- On completion, calculate and show a score from 0 to 100.
- Allow retaking the assessment.

### Question set

**Q1 — What happens when someone mentions 19 November?**
- “What happened that day?”
- “Please change the topic.”
- “I remember every single moment.”
- “I still haven't emotionally recovered.”

**Q2 — What's your reaction when you see a picture of Travis Head?**
- “Nice player.”
- “Respect the performance.”
- “Instant flashbacks.”
- “Close the browser immediately.”

**Q3 — How many times have you watched the final highlights?**
- “Never.”
- “Once.”
- “A few times.”
- “Why would I do that to myself?”

**Q4 — What was your reaction as India's wickets fell?**
- “Still confident.”
- “Slightly worried.”
- “Something feels wrong.”
- “I knew this wasn't going to end well.”

**Q5 — Have you moved on?**
- “Completely.”
- “Mostly.”
- “Not really.”
- “We are still discussing it.”

### Scoring

- Assign answer weights from 0 to 3, increasing with the comedic “trauma” response.
- Maximum raw score: 15.
- Normalize to a whole number from 0 to 100 using `round(raw / 15 * 100)`.
- Keep the weights in the question data, not scattered through components.
- Do not make score depend on timing, device, or hidden behavior.

### Result bands

- 0–24: `SLIGHTLY TRAUMATIZED`
- 25–49: `EMOTIONALLY WOUNDED`
- 50–74: `PERMANENTLY DAMAGED`
- 75–100: `BEYOND RECOVERY`

Example result copy: `Congratulations. Your recovery progress is still under investigation.`

### Result card

Include:

- Product branding.
- Score and result band.
- One funny message.
- A simple visual meter.
- `RETAKE TEST` action.
- `DOWNLOAD RESULT` action.
- WhatsApp, X, native share, and copy actions where supported.

Do not show a result until all five questions are answered.

---

## 9. Feature B — Cricket memory quiz

### Purpose

A short knowledge game about the final. It should feel like a quiz show, not an exam.

### Interaction

- 10 multiple-choice questions, four choices per question.
- Randomize question order once at the start of a quiz run.
- Avoid randomizing answer options if that makes the source data or accessibility labels confusing; if options are shuffled, preserve the correct answer by ID, not array position.
- Show question number, progress, selected answer, and feedback.
- After an answer, reveal the correct answer and a short explanation.
- Continue to the next question.
- Show the final score out of 10 and a humorous description.
- Provide `PLAY AGAIN` and share/download result actions.

### Curated fact bank

Use the following facts to write questions and answer options:

1. India scored 240 all out.
2. Australia scored 241/4.
3. Australia won by 6 wickets.
4. The final was played at Narendra Modi Stadium in Ahmedabad.
5. Australia won the toss and chose to field.
6. Travis Head scored 137 runs.
7. Travis Head was Player of the Match.
8. KL Rahul scored 66 runs.
9. Rohit Sharma scored 47 runs.
10. India had won its first 10 matches of the tournament before the final.

Use only questions with one clearly correct answer. Avoid ambiguous wording and trick questions.

### Score messages

- 10/10: `You remember everything. Even the pain.`
- 8–9/10: `Certified cricket historian.`
- 5–7/10: `The memories are a little blurry.`
- 0–4/10: `Maybe your brain is protecting you.`

---

## 10. Feature C — Meme studio

### Purpose

A genuinely useful and shareable meme maker. It must create an actual image that can be downloaded, not just show static sample cards.

### Templates

Provide at least six original designs:

1. `TEN WINS. ONE HEARTBREAK.`
2. `WHEN SOMEONE MENTIONS 19 NOVEMBER`
3. `ME TRUSTING THE SCOREBOARD`
4. `TRAVIS HEAD ENTERS THE CHAT`
5. `BEFORE THE FINAL / AFTER THE FINAL`
6. `INDIAN FANS: 10-WIN STREAK EDITION`

Use original canvas/SVG/CSS artwork. Do not use downloaded movie stills, broadcast screenshots, player photos, official tournament marks, or existing meme images.

### Editing controls

- Template selector with thumbnail previews.
- Editable top caption and bottom caption.
- Clear character limits and live text preview.
- Reset text to template defaults.
- Preview the final image before export.
- Download as PNG.
- Share the generated file using `navigator.share({ files })` where supported.
- Fall back to download plus shareable text/link when file sharing is unavailable.

### Canvas requirements

- Use a fixed, high-quality output ratio, preferably 4:5 for social posts, with clear safe margins.
- Scale the canvas for high-density screens without changing the logical design dimensions.
- Wrap text and shrink font size within a defined minimum so captions never overflow.
- Handle emoji/font rendering gracefully; use text labels that remain understandable if an emoji glyph is unavailable.
- Draw all visual elements locally to avoid cross-origin canvas tainting.
- Show a clear error and preserve the editor state if export fails.
- Do not claim a download succeeded until the browser download action has been initiated.

---

## 11. Feature D — Healing meter

Heading: `HOW MUCH HAVE YOU HEALED?`

Supporting text: `Be honest. Nobody is judging you.`

Create a slider from 0% to 100% with keyboard-accessible controls and a visible value.

Messages:

- 0–10%: `Brother, it's been years.`
- 11–25%: `You're still watching the highlights?`
- 26–50%: `Progress has been detected.`
- 51–75%: `Maybe there is hope.`
- 76–99%: `Almost recovered. Don't watch the final again.`
- 100%: `Congratulations. You're officially stronger than the scoreboard.`

Button: `DECLARE MY RECOVERY`

Persist the selected value locally. The value is self-reported and must not be inferred from quiz scores or browsing behavior.

Disclaimer: `Medical accuracy: 0%. Emotional accuracy: questionable.`

---

## 12. Feature E — Achievements

Display achievements in a responsive badge shelf with clearly distinct locked and unlocked states.

| Achievement | Unlock condition |
|---|---|
| First Diagnosis | Complete the trauma assessment once |
| Cricket Historian | Complete one full memory quiz |
| Perfect Memory | Score 10/10 in a memory quiz |
| Meme Therapist | Successfully initiate a meme PNG download |
| Never Forget 19/11 | Complete at least one activity |
| Still Standing | Return on a later local calendar day after the first recorded visit |

Rules:

- Only unlock an achievement when its condition is met.
- Persist unlocks locally.
- Show a lightweight unlock animation and an accessible text announcement.
- Locked badges should explain their condition.
- Achievements are local to the current browser/device; do not imply they sync across devices.
- A browser storage reset may clear progress. Explain this in the reset UI.

---

## 13. Sharing and virality

Sharing is a primary product feature, not an afterthought.

Provide context-aware share actions for:

- Trauma assessment result.
- Memory quiz result.
- Generated meme file.
- General website link.

Preferred sharing order:

1. Use Web Share API when available and appropriate.
2. For file sharing, check `navigator.canShare({ files })` before passing files.
3. Provide WhatsApp and X intent links with encoded text and the canonical site URL.
4. Provide Copy Link / Copy Result using the Clipboard API with a fallback for unsupported browsers.
5. Keep a visible fallback instruction if all automated sharing methods are unavailable.

Use a configurable canonical URL. During local development, never share a fake production URL. If the canonical URL has not been configured, use `window.location.origin` and omit it only if that is not a valid public origin.

Example copy:

`I just checked my 19 November trauma level: PERMANENTLY DAMAGED 😭 Take the test: [site URL]`

Do not auto-open share dialogs without a user click.

---

## 14. Local progress and privacy

Use `localStorage` for small, non-sensitive game progress only.

Potential saved values:

- Latest assessment score and result band.
- Best quiz score and total completed quiz count.
- Healing meter percentage.
- Achievement IDs and unlock timestamps.
- First visit date and last visit date.
- App state schema version.

Requirements:

- Use one versioned storage key, such as `nov19:progress:v1`.
- Validate data when reading it; never trust malformed JSON.
- Wrap storage access in `try/catch` because private browsing or browser policies may block storage.
- If storage fails, fall back to in-memory state and show no blocking error.
- Do not store names, emails, phone numbers, location, or other personal information.
- Provide `RESET MY LOCAL PROGRESS` with a confirmation step.
- Explain that progress is stored only in this browser and may be lost when site data is cleared.

---

## 15. Accessibility and usability

- Use semantic landmarks and heading order.
- All controls must work by keyboard.
- Every input must have an accessible label.
- Show visible focus styles.
- Do not rely on color alone for correct/incorrect, locked/unlocked, or score states.
- Maintain readable contrast.
- Use touch targets around 44 × 44 CSS pixels where practical.
- Support `prefers-reduced-motion`.
- Ensure dialogs can be dismissed with Escape and return focus to the trigger.
- Announce quiz feedback and achievement unlocks to screen readers without making every animation noisy.
- Avoid auto-advancing interactions that a user cannot control.

---

## 16. Mobile-first acceptance requirements

The mobile experience is the primary experience. Desktop is an enhancement, not the baseline.

Test widths:

- 320px minimum fallback check.
- 360px.
- 375px.
- 390px.
- 430px.
- 768px.
- 1024px.
- 1440px.

At all tested widths:

- No horizontal page overflow.
- No clipped text or buttons.
- Hero content fits without awkward stacking.
- Navigation is usable with touch.
- Quiz cards and answer choices are easy to tap.
- Slider can be operated with touch and keyboard.
- Meme editor controls remain usable and preview stays visible.
- Result cards fit the viewport and export at their intended image ratio.
- Achievement cards reflow cleanly.
- Sticky elements do not cover important content or the active control.

Use a single-column layout on small screens. Do not squeeze desktop multi-column layouts into narrow widths.

---

## 17. Performance requirements

The site should feel immediate on a mid-range Android phone and a normal mobile connection.

- Prefer CSS transitions/animations over a heavyweight animation framework.
- Avoid large component libraries and unnecessary dependencies.
- Do not use autoplay video or large background videos.
- Use locally generated CSS/SVG artwork instead of large photographic assets where possible.
- Lazy-render or defer non-critical sections only when it improves actual performance without causing layout shifts.
- Keep the one-second elapsed-time update isolated to the counter component.
- Avoid unnecessary global state updates.
- Avoid expensive blur, giant shadows, and continuously animated full-screen effects.
- Respect reduced-motion settings.
- Use `requestAnimationFrame` only for genuinely continuous visual updates; do not use it for ordinary counters or progress values.
- Aim for a small initial JavaScript payload and a production build without avoidable large chunks.
- No runtime network requests are required for any core feature.

---

## 18. SEO and social metadata

Set:

**Title:** `19 November — The Indian Cricket Fans' Trauma Center`

**Description:** `10 wins. 1 final. Still not recovered. Take the trauma test, challenge your cricket memory, create a 19 November meme, and share the laughs.`

Also include:

- Canonical URL placeholder/configuration.
- Open Graph title, description, URL, and image.
- X/Twitter card metadata.
- Favicon and theme color.
- A branded 1200 × 630 social preview image created from original artwork.
- Semantic HTML and descriptive section headings.

Do not claim that the app has a global score or community ranking.

---

## 19. Definition of done

The product is ready to publish only when:

- Every required section is implemented and visually coherent.
- The assessment has five working questions and correct scoring.
- The memory quiz has ten working questions and correct scoring.
- Meme templates can be edited, previewed, and downloaded as PNG.
- Healing meter updates and persists locally when storage is available.
- Achievements unlock only when conditions are met.
- Local progress survives refresh and has a working reset flow.
- Share actions have appropriate fallbacks.
- The app works without backend, auth, database, paid APIs, or AI APIs.
- The website is usable at the listed mobile widths.
- No horizontal overflow, broken buttons, placeholder links, or console errors remain.
- The production build succeeds.
- Vercel deployment configuration is documented.

The finished website should be fun within the first 10 seconds, useful on a phone, and shareable without asking for personal information.
