# Design System — 19 November: The Trauma Center

## 1. Creative direction

**Mood:** Cinematic cricket-night atmosphere meets playful internet humor.

The site should feel dramatic at first glance, then reveal its funny personality through copy, quizzes, badges, and interactions. It should be visually polished without feeling heavy or over-designed.

Avoid the visual language of:

- A generic SaaS admin dashboard.
- A sportsbook or gambling product.
- An official ICC/team website.
- A hospital or actual mental-health service.
- A cluttered meme forum.

## 2. Color tokens

Use CSS custom properties so the palette can be tuned in one place.

```css
:root {
  color-scheme: dark;
  --color-bg: #070b14;
  --color-bg-elevated: #0d1422;
  --color-surface: #111c2d;
  --color-surface-hover: #17253a;
  --color-text: #f5f7fb;
  --color-text-muted: #a8b3c5;
  --color-border: rgba(255, 255, 255, 0.10);
  --color-blue: #2563eb;
  --color-blue-bright: #4f8cff;
  --color-saffron: #f59e0b;
  --color-red: #ef4444;
  --color-green: #22c55e;
  --color-focus: #93c5fd;
}
```

Use blue as the primary action color. Use saffron and red sparingly as accents—not as large competing surfaces. Keep long-form text high contrast.

## 3. Typography

Prefer a self-hosted font if one is already available in the project. Otherwise use a system font stack to avoid runtime font requests.

Suggested system stack:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use a bold display style for `19 NOVEMBER` and section headlines. Keep body text comfortable and not overly condensed.

Use fluid typography with `clamp()` rather than separate hard-coded sizes for every device.

## 4. Layout and spacing

- Mobile content gutter: approximately 18–20px.
- Tablet gutter: approximately 28–32px.
- Desktop gutter: approximately 40px.
- Main content max width: approximately 1120–1200px.
- Comfortable text measure: approximately 60–70 characters.
- Section spacing should create clear rhythm without excessive blank space.
- Use flexible grid/flex layouts with `minmax(0, 1fr)`.
- Avoid fixed heights for text-driven cards.

Suggested breakpoints (adapt if the project already has a consistent system):

- Small phone: up to 359px.
- Phone: 360–639px.
- Tablet: 640–899px.
- Desktop: 900px and above.
- Wide desktop: 1200px and above.

Do not rely on breakpoints alone. Use fluid widths and content-aware wrapping.

## 5. Components

### Buttons

- Primary: strong blue fill, clear text, generous touch target.
- Secondary: transparent/dark surface with subtle border.
- Tertiary: text button for lower-priority actions.
- All buttons need hover, active, disabled, and visible focus states.
- Minimum practical touch target: 44 × 44 CSS pixels.

### Cards

Use cards selectively for match facts, questions, result summaries, and achievements. Give them a subtle surface contrast and border. Avoid wrapping every paragraph in a card.

### Scoreboard

Use tabular numerals, clear team labels, and a restrained accent color. Keep it legible at 320–360px widths.

### Quiz options

- Full-width tap targets on mobile.
- Clear selected state.
- Correct/incorrect states must include text or an icon, not color alone.
- Avoid tiny radio controls as the sole target.

### Progress indicators

- Include a text equivalent such as `3 of 5`.
- Animate only the fill transform/width when appropriate.
- Do not use a continuously moving or distracting bar.

### Achievement badges

- Use original SVG/CSS iconography.
- Locked and unlocked states should be distinct but readable.
- Provide text labels and unlock requirements.

## 6. Hero composition

The hero should be memorable but not slow to load.

- Deep navy/black base.
- Locally generated radial gradients for floodlight ambience.
- Optional CSS crowd silhouette or simple SVG line work.
- Large `19 NOVEMBER` headline.
- Tagline and two clear CTAs.
- Compact scoreboard treatment.
- Elapsed-time counter that stacks cleanly on phones.

Do not use a large autoplay video or a remote stadium background image.

## 7. Motion and interaction

Use motion to reinforce feedback, not to decorate every element.

Preferred:

- Short opacity/transform transitions.
- Button press feedback.
- Small progress changes.
- Quiz question transitions.
- A restrained achievement unlock effect.

Avoid:

- Parallax on mobile.
- Constantly moving backgrounds.
- Large blur/filter animations.
- Spring animations on every card.
- Full-page transitions that delay interaction.

Respect `prefers-reduced-motion: reduce`; remove or minimize non-essential movement.

## 8. Responsive rules

- Design at 360px first.
- Use one column on small screens.
- Only introduce multi-column cards when there is enough room.
- Never set a section or card to a fixed width that can exceed the viewport.
- Use `overflow-wrap: anywhere` for long user text where appropriate.
- Keep mobile navigation compact and touch-friendly.
- Keep quiz actions and the next button visible without covering content.
- Let the meme editor stack controls and preview vertically on narrow screens.
- On wide screens, place the meme editor controls beside the preview.
- Avoid sticky bottom bars unless they do not obscure controls or browser UI.

## 9. Accessibility and readability

- High contrast for all primary text.
- Visible focus rings.
- Comfortable body line-height around 1.5–1.7.
- No text smaller than needed for legal/secondary metadata; avoid tiny UI labels.
- Icons must have accessible names when meaningful.
- Decorative icons should be hidden from assistive technology.
- Do not use color alone for status.

## 10. Performance guardrails

- Prefer CSS/SVG artwork and Canvas-generated memes.
- No external font request required for first paint.
- No large image or video backgrounds.
- Use `transform` and `opacity` for transitions.
- Avoid expensive blur and shadow layers, especially on mobile.
- Keep animations short and stop them when off-screen when practical.
- Do not animate the entire page or re-render the full app every second.
